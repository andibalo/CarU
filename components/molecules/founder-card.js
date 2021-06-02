import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

export function FounderCard({ name, position, desc, imageName }) {
  return (
    <Box
      maxW={"320px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"xl"}
      rounded={"xl"}
      p={6}
      textAlign={"center"}
      borderWidth="1px"
      borderColor="gray.200"
      borderStyle="solid"
    >
      <Avatar
        size={"xl"}
        src={`/${imageName}.jpg`}
        alt={"Avatar Alt"}
        mb={4}
        pos={"relative"}
        _after={{
          content: '""',
          w: 4,
          h: 4,
          bg: "green.300",
          border: "2px solid white",
          rounded: "full",
          pos: "absolute",
          bottom: 0,
          right: 3,
        }}
      />
      <Heading fontSize={"xl"} fontFamily={"body"}>
        {name}
      </Heading>
      <Text fontWeight={600} color={"gray.500"} mb={4}>
        {position}
      </Text>
      <Text
        textAlign={"center"}
        color={useColorModeValue("gray.700", "gray.400")}
        px={3}
      >
        {desc}
      </Text>
    </Box>
  );
}
