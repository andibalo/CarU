import { useRef } from "react";
import { Navbar } from "../components/navbar";
import {
  Flex,
  Container,
  Box,
  Heading,
  Text,
  Input,
  Spacer,
  Icon,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Button } from "../components/atoms/Button";
import { Footer } from "../components/footer";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { signIn, getSession } from "next-auth/client";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!result.error) {
      router.replace("/dashboard");
    }
  };

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
              <Box textAlign="center">
                <Icon
                  as={AiOutlineUser}
                  color="brand.100"
                  boxSize="12"
                  mb="3"
                />
                <Heading as="h5" color="gray.800" fontSize="xl" mb="5">
                  Welcome Back!
                </Heading>
              </Box>
              <Input
                variant="flushed"
                placeholder="Email Address"
                type="email"
                mb="3"
                ref={emailRef}
                focusBorderColor="brand.100"
              />
              <Input
                variant="flushed"
                placeholder="Password"
                type="password"
                mb="3"
                ref={passwordRef}
                focusBorderColor="brand.100"
              />

              <Text>
                Don’t have an account?{" "}
                <Link href="/signup">
                  <ChakraLink color="brand.100" fontWeight="bold">
                    Sign Up
                  </ChakraLink>
                </Link>
              </Text>
              <Spacer />
              <Button onClick={handleLogin}>Login</Button>
            </Flex>
          </Box>
        </Container>
      </Flex>
      <Footer />
    </div>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
