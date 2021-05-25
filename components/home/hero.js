import { Heading, Flex, Container, Box } from "@chakra-ui/react";
import { Navbar } from "../../components/navbar";
import { CirclePattern } from "../../components/molecules/circle-pattern";
import { Button } from "../atoms/Button";
import Link from "next/link";

export const Hero = () => {
  return (
    <Flex direction="column" minH="100vh" position="relative">
      <Box
        h="800px"
        w="800px"
        bg="brand.100"
        position="absolute"
        right="-200px"
        bottom="-200px"
        borderRadius="50%"
      />
      <Navbar />
      <Container
        maxW="container.xl"
        flex="1"
        display="flex"
        flexDirection="column"
      >
        <Flex align="center" flex="1">
          <Box mb="20">
            <CirclePattern />
            <Heading as="h1" size="3xl">
              Rent The{" "}
              <Box display="inline" color="brand.100">
                Best Car
              </Box>{" "}
              <br /> At{" "}
              <Box display="inline" color="brand.100">
                Minimal Price
              </Box>
            </Heading>
            <Flex mt="6">
              <Link href="/cars">
                <Button>Rent A Car</Button>
              </Link>
              <Button variant="outline" ml="3">
                Learn More
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
};
