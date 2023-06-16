import {
  Box,
  Text,
  Flex,
  IconButton,
  VStack,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { BsArrowBarLeft } from "react-icons/bs";
import Avvvatars from "avvvatars-react";
import { useTransition, animated } from "@react-spring/web";
import { PhoneIcon } from "@chakra-ui/icons";

type SidebarProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ children, isOpen, setIsOpen }) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const transition = useTransition(shouldRender, {
    from: { transform: "translateX(-100%)" },
    enter: { transform: "translateX(0%)" },
    leave: { transform: "translateX(-100%)" },
  });

  const handleClose = () => {
    setShouldRender(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 150); // Adjust the delay as needed
  };

  return (
    <VStack h="full">
      {transition((styles, item) =>
        item ? (
          <animated.div style={{ ...styles, height: "100%" }}>
            <Box w="250px" boxShadow="lg" h="full">
              <VStack
                p="3"
                pt="0"
                align="center"
                justify="space-between"
                h="full"
              >
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <div>🔍</div>
                  </InputLeftElement>
                  <Input
                    placeholder="Search"
                    variant="filled"
                    rounded="lg"
                    focusBorderColor="pink.400"
                  />
                </InputGroup>
                <Text>Menu Item 1</Text>
                <Text>Menu Item 2</Text>
                <Text>Menu Item 3</Text>
                <Text>Menu Item 4</Text>
                <ColorModeSwitcher />
                <HStack w="full" justify="space-between">
                  <HStack>
                    <Avvvatars value="dpark4574@apple.com" size={40} />
                    <VStack align="flex-start" fontSize="md" gap={0}>
                      <Text>Daniel Park</Text>
                    </VStack>
                  </HStack>

                  <Button bg="transparent">
                    <BsArrowBarLeft
                      size="26px"
                      aria-label="Close sidebar"
                      onClick={handleClose}
                    />
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </animated.div>
        ) : null
      )}
    </VStack>
  );
};

export default Sidebar;
