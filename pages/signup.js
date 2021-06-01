import React, { useRef, useState } from "react";
import axios from "axios";
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
  FormControl,
  Textarea,
} from "@chakra-ui/react";
import { Button } from "../components/atoms/Button";
import { Footer } from "../components/footer";
import Link from "next/link";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { AiFillCheckCircle } from "@react-icons/all-files/ai/AiFillCheckCircle";
import { getSession } from "next-auth/client";

const SignUp = () => {
  const [hasSignedUp, setHasSignedUp] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  const handleSubmitSignUp = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const address = addressRef.current.value;

    try {
      const res = await axios.post("/api/auth/signup", {
        email,
        password,
        name,
        phone,
        address,
      });

      console.log(res);

      setHasSignedUp(true);
    } catch (error) {
      console.log(error);
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
            mb="14"
            borderWidth="1px"
            borderColor="gray.200"
            borderStyle="solid"
          >
            {hasSignedUp ? (
              <Flex direction="column" alignItems="center">
                <Icon
                  as={AiFillCheckCircle}
                  color="green.500"
                  boxSize="12"
                  mb="3"
                />
                <Box textAlign="center" mb="5">
                  <Heading fontSize="lg">Sign Up Successful!</Heading>
                  <Text>Please login by clicking the button below</Text>
                </Box>
                <Button>
                  <Link href="/login">Go To Login Page</Link>
                </Button>
              </Flex>
            ) : (
              <Flex direction="column" minH="xs">
                <Box textAlign="center">
                  <Icon
                    as={AiOutlineUser}
                    color="brand.100"
                    boxSize="12"
                    mb="3"
                  />
                  <Heading as="h5" color="gray.800" fontSize="xl" mb="5">
                    Let's Get You Started!
                  </Heading>
                </Box>
                <FormControl>
                  <Input
                    variant="flushed"
                    type="text"
                    placeholder="Name"
                    mb="3"
                    ref={nameRef}
                    focusBorderColor="brand.100"
                  />
                </FormControl>
                <FormControl>
                  <Input
                    variant="flushed"
                    type="email"
                    placeholder="Email Address"
                    mb="3"
                    ref={emailRef}
                    focusBorderColor="brand.100"
                  />
                </FormControl>
                <FormControl>
                  <Input
                    variant="flushed"
                    type="password"
                    placeholder="Password"
                    mb="3"
                    ref={passwordRef}
                    focusBorderColor="brand.100"
                  />
                </FormControl>
                <FormControl>
                  <Input
                    variant="flushed"
                    type="text"
                    placeholder="Phone Number"
                    mb="3"
                    ref={phoneRef}
                    focusBorderColor="brand.100"
                  />
                </FormControl>

                <FormControl>
                  <Textarea
                    variant="flushed"
                    type="text"
                    placeholder="Address"
                    ref={addressRef}
                    focusBorderColor="brand.100"
                  />
                </FormControl>
                <Text mb="5">
                  Already have an account?{" "}
                  <Link href="/login">
                    <ChakraLink color="brand.100" fontWeight="bold">
                      Login
                    </ChakraLink>
                  </Link>
                </Text>
                <Spacer />
                <Button onClick={handleSubmitSignUp}>Sign Up</Button>
              </Flex>
            )}
          </Box>
        </Container>
      </Flex>
      <Footer />
    </div>
  );
};

export default SignUp;

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
