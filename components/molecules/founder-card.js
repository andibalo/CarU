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

export function FounderCard() {
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
        src={
          "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
        }
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
        Andi Usman Balo
      </Heading>
      <Text fontWeight={600} color={"gray.500"} mb={4}>
        CEO
      </Text>
      <Text
        textAlign={"center"}
        color={useColorModeValue("gray.700", "gray.400")}
        px={3}
      >
        Actress, musician, songwriter and artist. PM for work inquires or{" "}
        <Link href={"#"} color={"blue.400"}>
          #tag
        </Link>{" "}
        me in your posts
      </Text>

      <Stack mt={8} direction={"row"} spacing={4}>
        <Button
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          _focus={{
            bg: "gray.200",
          }}
        >
          Message
        </Button>
        <Button
          flex={1}
          fontSize={"sm"}
          rounded={"full"}
          bg={"blue.400"}
          color={"white"}
          boxShadow={
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
          }
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
        >
          Follow
        </Button>
      </Stack>
    </Box>
  );
}
