import { Flex, Spacer, Text, Container, HStack } from "@chakra-ui/react";
import { Brand } from "./atoms/brand";
import Link from "next/link";

export const Navbar = () => {
  return (
    <Container maxW="container.xl" py={4}>
      <Flex>
        <Brand />
        <Spacer />
        <HStack spacing={8}>
          <Link href="/cars">
            <Text>Car List</Text>
          </Link>
          <Link href="/about">
            <Text>About Us</Text>
          </Link>
          <Link href="/login">
            <Text color="brand.100">Login</Text>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};
