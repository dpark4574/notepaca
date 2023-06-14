import {
  Box,
  ChakraProvider,
  Flex,
  Heading,
  Text,
  Image,
  HStack,
  Button,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
  return (
    <ChakraProvider>
      <VStack h="100vh">
        <HStack
          alignSelf="flex-start"
          py="4"
          px="6"
          position="sticky"
          top="0"
          zIndex="sticky"
          _hover={{
            cursor: "pointer",
          }}
          onClick={() => setSideBarOpen(true)}
        >
          <Image
            alt="logo"
            boxSize="35px"
            shadow="base"
            rounded="lg"
            src="logo192.png"
          />

          <Heading as="h1" size="md">
            Notepaca
          </Heading>
        </HStack>

        <HStack w="full" h="full">
          <Box w="250px" h="full">
            {sideBarOpen && (
              <Sidebar isOpen={sideBarOpen} setIsOpen={setSideBarOpen}>
                {/* Sidebar content goes here */}
              </Sidebar>
            )}
          </Box>

          <Box p="4">
            {/* Main content goes here */}
            <Heading as="h2" size="md">
              Main Content
            </Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
          </Box>
        </HStack>
      </VStack>
    </ChakraProvider>
  );
};

export default Layout;
