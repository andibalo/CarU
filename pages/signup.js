import { Navbar } from "../components/navbar";
import {
  Flex,
  Container,
  Box,
  Heading,
  Text,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { Button } from "../components/atoms/Button";
import { Footer } from "../components/footer";
import Link from "next/link";

const SignUp = () => {
  return (
    <div>
      <Flex direction="column" minH="100vh">
        <Navbar />
        <Container
          maxW="container.xl"
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            boxShadow="xl"
            bg="white"
            px="5"
            py="10"
            borderRadius="xl"
            w="full"
            maxW="sm"
            mb="20"
            borderWidth="1px"
            borderColor="gray.200"
            borderStyle="solid"
          >
            <Flex direction="column" minH="xs">
              <Heading
                as="h5"
                color="brand.100"
                fontSize="xl"
                textAlign="center"
                mb="5"
              >
                Let's Get You Started!
              </Heading>
              <Input variant="flushed" placeholder="Email Address" mb="3" />
              <Input variant="flushed" placeholder="Password" mb="3" />

              <Text>
                Already have an account?{" "}
                <Link href="/login">
                  <Text display="inline" color="brand.100" fontWeight="bold">
                    Login
                  </Text>
                </Link>
              </Text>
              <Spacer />
              <Button>Sign Up</Button>
            </Flex>
          </Box>
        </Container>
      </Flex>
      <Footer />
    </div>
  );
};

export default SignUp;
