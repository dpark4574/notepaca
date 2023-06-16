import * as React from "react";
import {
  useColorMode,
  useColorModeValue,
  Flex,
  Box,
  BoxProps,
  HStack,
  Text,
} from "@chakra-ui/react";
import { BiSun, BiMoon } from "react-icons/bi";
import { useSpring, animated } from "@react-spring/web";

type ColorModeSwitcherProps = BoxProps;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const isDarkMode = useColorModeValue(false, true);

  const handleToggle = () => {
    toggleColorMode();
  };

  const springProps = useSpring({
    transform: isDarkMode ? "translateX(100%)" : "translateX(0%)",
    config: {
      tension: 300,
      friction: 40,
    },
  });

  return (
    <Flex align="center" justifyContent="flex-end" {...props}>
      <HStack
        as={animated.div}
        w="44"
        h="12"
        p="1"
        borderRadius="xl"
        bg={isDarkMode ? "#293752" : "#F6F6F6"}
        onClick={handleToggle}
        cursor="pointer"
      >
        {isDarkMode ? (
          <HStack p="1" px="2" position="absolute">
            <BiSun size="20px" color="#9DA0A5" />
            <Text fontSize="sm" fontWeight="semibold" color="#9DA0A5">
              Light
            </Text>
          </HStack>
        ) : (
          <HStack p="1" px="2" position="absolute" ml="20">
            <BiMoon size="20px" color="#ACAEB1" />
            <Text fontSize="sm" fontWeight="semibold" color="#ACAEB1">
              Dark
            </Text>
          </HStack>
        )}

        <animated.div
          style={{
            display: "flex",
            width: "50%",
            height: "100%",
            borderRadius: "15%",
            backgroundColor: isDarkMode ? "#192030" : "white",
            ...springProps,
          }}
        >
          {isDarkMode ? (
            <HStack p="1" px="2">
              <BiMoon size="20px" color={isDarkMode ? "#FEFCFE" : "#90CDF4"} />
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color={isDarkMode ? "#FEFCFE" : "gray"}
              >
                Dark
              </Text>
            </HStack>
          ) : (
            <HStack p="1" px="2">
              <BiSun size="20px" color="#1A2233" />
              <Text fontSize="sm" fontWeight="semibold" color="#1A2233">
                Light
              </Text>
            </HStack>
          )}
        </animated.div>
      </HStack>
    </Flex>
  );
};
