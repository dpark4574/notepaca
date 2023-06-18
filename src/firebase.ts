import { initializeApp } from "firebase/app";
import {
  doc,
  query,
  where,
  collection,
  getFirestore,
  getDocs,
  setDoc,
  addDoc,
} from "firebase/firestore";

import {
  signOut,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import posthog from "posthog-js";

const prodConfig = {
  apiKey: "AIzaSyBN_a8G7C2J2M_Y3e4L-_gT2yP2DBaDu9E",
  authDomain: "notepaca-prod.firebaseapp.com",
  projectId: "notepaca-prod",
  storageBucket: "notepaca-prod.appspot.com",
  messagingSenderId: "325514112100",
  appId: "1:325514112100:web:4b3e7df3fe3d5c0faa4371",
  measurementId: "G-TG5K6ZEE1T",
};

const devConfig = {
  apiKey: "AIzaSyDd4aSwDrOeYzfZ1U7hl79jVIp3bJxAP3A",
  authDomain: "notepaca-dev.firebaseapp.com",
  projectId: "notepaca-dev",
  storageBucket: "notepaca-dev.appspot.com",
  messagingSenderId: "810535196638",
  appId: "1:810535196638:web:1013bc154086f970e02f4f",
  measurementId: "G-LGQFXYCMZ5",
};

const activeConfig =
  process.env.NODE_ENV === "production" ? prodConfig : devConfig;
const app = initializeApp(activeConfig);

console.log(`NODE_ENV (${process.env.NODE_ENV}): ${activeConfig.projectId}`);
const auth = getAuth();
const db = getFirestore(app);

const userRef = collection(db, "users");

const signInWithProvider = async (provider: string) => {
  posthog.capture("Sign in w Provider", {
    property: "auth",
    provider: provider,
  });
  try {
    const response = await signInWithPopup(
      auth,
      provider == "google"
        ? new GoogleAuthProvider()
        : provider == "github"
        ? new GithubAuthProvider()
        : new TwitterAuthProvider()
    );
    const user = response.user;
    const q = query(userRef, where("uid", "==", user.uid));
    const snap = await getDocs(q);
    if (snap.docs.length === 0) {
      await setDoc(doc(userRef, user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (error) {
    posthog.capture("Error @signInWithGoogle", {
      property: "auth",
      errorMsg: error,
    });
    console.log(error);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const logOut = () => {
  posthog.capture("logout", { property: "auth" });
  signOut(auth);
};

const firebase = {
  auth,
  db,
  signInWithProvider,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logOut,
};
export default firebase;
