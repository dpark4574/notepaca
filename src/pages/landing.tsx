import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Heading,
  Stack,
  StackDivider,
  Text,
  Image,
  VStack,
  Button,
  HStack,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { usePostHog } from "posthog-js/react";

const Landing = () => {
  const posthog = usePostHog();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [rememberMe, setRemeberMe] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<boolean>(false);

  const loginWithOption = (option: string) => {
    posthog?.capture("Option: " + option);
    console.log("Option:", option);
  };
  return (
    <Center
      h="100vh"
      flexDir="column"
      w="100vw"
      backgroundImage="home-ui-bg.svg"
      pb="16"
    >
      <Box
        rounded="xl"
        mb="5"
        mr="2.5"
        bg="white"
        shadow="2xl"
        border="1px"
        borderColor="yellow.400"
      >
        <Heading
          p="3"
          textDecoration="underline"
          textDecorationColor="yellow.400"
        >
          NOTEPACA
        </Heading>
      </Box>

      <Card
        mr="2.5"
        align="center"
        rounded="3xl"
        w="md"
        p="1"
        shadow="2xl"
        h="2xl"
      >
        <CardHeader
          rounded="2xl"
          w="full"
          //   bgGradient="radial(#fde68a 40%, transparent 100%)"
        >
          <VStack textColor="#451a03">
            <Image
              bgGradient="linear(to-b, #fcd34d , #fffbeb)"
              alt="logo"
              boxSize="80px"
              rounded="full"
              src="logo192.png"
              my="2"
            />
            <Heading
              //   textDecoration="underline"
              //   textDecorationColor="yellow.400"
              size="md"
            >
              Welcome 👋
            </Heading>
            <Text fontSize="sm" textColor="blackAlpha.600" fontWeight="medium">
              Log in with
            </Text>
            <HStack mt="4" w="90%" justify="space-between">
              <Button
                shadow="lg"
                bg="white"
                w="24"
                borderBottomRadius="none"
                borderBottom="2px"
                borderBottomColor="red.300"
                onClick={() => loginWithOption("google")}
              >
                <Image boxSize="30px" src="google.svg" />
              </Button>
              <Button
                shadow="lg"
                bg="white"
                w="24"
                borderBottomRadius="none"
                borderBottom="2px"
                borderBottomColor="cyan.500"
                onClick={() => loginWithOption("twitter")}
              >
                <Image boxSize="30px" src="twitter.svg" />
              </Button>
              <Button
                shadow="lg  "
                bg="white"
                w="24"
                borderBottomRadius="none"
                borderBottom="2px"
                borderBottomColor="black"
                onClick={() => loginWithOption("github")}
              >
                <Image boxSize="30px" src="github.svg" />
              </Button>
            </HStack>
          </VStack>
        </CardHeader>
        <Text pt="3" fontSize="md" fontWeight="bold">
          or
        </Text>
        <CardBody w="full">
          <VStack spacing={3} w="full">
            <VStack align="flex-start" w="sm">
              <Heading size="xs" textTransform="uppercase">
                Email Address
              </Heading>
              <InputGroup size="md" h="10">
                <Input
                  isInvalid={loginError}
                  focusBorderColor="yellow.400"
                  errorBorderColor="pink.400"
                  h="10"
                  pr="32"
                  type="text"
                  placeholder="Enter email"
                />
              </InputGroup>
            </VStack>
            <VStack align="flex-start" w="sm">
              <Heading size="xs" textTransform="uppercase">
                Password
              </Heading>
              <InputGroup size="md" h="10">
                <Input
                  h="10"
                  isInvalid={loginError}
                  pr="14"
                  focusBorderColor="yellow.400"
                  errorBorderColor="pink.400"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="10">
                  <Button
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    size="sm"
                    onClick={handleClick}
                  >
                    {show ? (
                      <BsEyeSlash color="gray" />
                    ) : (
                      <BsEye color="gray" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </VStack>
            <HStack w="95%" justify="space-between" mt="2">
              <Checkbox
                colorScheme="yellow"
                defaultChecked
                isChecked={rememberMe}
                onChange={() => setRemeberMe(!rememberMe)}
              >
                Remember me
              </Checkbox>
              <Text
                onClick={() => console.log("hi")}
                _hover={{ cursor: "pointer" }}
                textDecoration="underline"
                textDecorationColor="yellow.500"
                fontWeight="medium"
              >
                Forgot password?
              </Text>
            </HStack>
            <Button
              mt="4"
              w="full"
              h="12"
              bg="yellow.500"
              textColor="white"
              _hover={{ bg: "yellow.600" }}
              onClick={() => console.log(rememberMe)}
            >
              Sign in
            </Button>
            <HStack>
              <Text textColor="gray.500" fontWeight="medium">
                Don't have an account yet?
              </Text>
              <Text
                onClick={() => console.log("hi")}
                _hover={{ cursor: "pointer" }}
                fontWeight="semibold"
                textDecoration="underline"
                textDecorationColor="yellow.500"
              >
                Sign Up
              </Text>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </Center>
  );
};

export default Landing;
