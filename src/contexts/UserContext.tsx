import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  UserCredential,
} from "firebase/auth";

import firebase from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { User as FirebaseUserType } from "firebase/auth";
import { usePostHog } from "posthog-js/react";

// Create form for license id: first, last, dob, state, license number, expiration date
const provider = new GoogleAuthProvider();

/*
  Logic for onboarding:
  firebaseUser - firebase's internal user object
  user - /users/:uid object linked to firebaseUser.
  */
export type UserType = {
  id: string;
  firstName: string;
  lastName: string;

  displayName: string;
  email: string;
  photoUrl: string;
  createdAt: Date;

  complete: true;
};

type UserContext = {
  firebaseUser: null | FirebaseUserType;
  user: null | UserType;
  error: null | any;
  loading: boolean;
  authDest: string;
  setAuthDest: Dispatch<SetStateAction<string>>;
  logIn: () => Promise<FirebaseUserType | null>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

export const userContext = createContext<UserContext | null>(null);
export const useUserContext = () => {
  const context = useContext(userContext);
  if (context === null) {
    throw Error("Use user context within provider");
  }
  return context;
};

// TODO: change firebaseUser to hook?
export function UserProvider(props: PropsWithChildren<{}>) {
  const [firebaseUser, setFirebaseUser] = useState<null | FirebaseUserType>(
    null
  );
  const [user, setUser] = useState<null | UserType>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authDest, setAuthDest] = useState<string>("/");
  const posthog = usePostHog();

  // Triggers a cascade when auth state changes:
  // firebaseUser is assigned, then user object is requested!
  useEffect(() => {
    onAuthStateChanged(firebase.auth, (user) => {
      if (user) {
        setLoading(true);
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  const getUserDoc = async (uid: string) => {
    try {
      setLoading(true);
      const userDocRef = doc(firebase.db, "users", uid);
      const res = await getDoc(userDocRef);
      if (res.exists()) {
        const userDoc = { id: uid, ...res.data() } as any;
        userDoc["createdAt"] = userDoc["createdAt"]?.toDate();
        setUser(userDoc as UserType);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (firebaseUser != null) {
      getUserDoc(firebaseUser.uid);
    }
  }, [firebaseUser]);

  const logIn = async () => {
    try {
      const userCreds = await signInWithPopup(firebase.auth, provider);
      const userObj = userCreds.user;
      posthog?.identify(userObj.uid, {
        email: userObj.email,
        name: userObj.displayName,
      });
      return userObj;
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(firebase.auth);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshUser = async () => {
    if (firebaseUser) {
      await getUserDoc(firebaseUser.uid);
    }
  };

  return (
    <userContext.Provider
      value={{
        firebaseUser,
        user,
        loading,
        error,
        logIn,
        signOut,
        refreshUser,
        authDest,
        setAuthDest,
      }}
      {...props}
    />
  );
}
