import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { Container, Text, Stack, Box, Heading } from "@chakra-ui/react";
import { SectionWrapper } from "../components/atoms/section-wrapper";
import { SectionHeader } from "../components/atoms/section-header";
import Image from "next/image";
import { FounderCard } from "../components/molecules/founder-card";

const About = () => {
  return (
    <div>
      <Navbar />
      <SectionWrapper>
        <Container maxW="container.xl">
          <Stack direction="row" spacing="5" mb="5">
            <Box flex="0.6">
              <Heading color="brand.100" size="md" mb="3">
                About Us
              </Heading>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{" "}
              </Text>
            </Box>
            <Box flex="1">
              <Heading color="brand.100" size="md" mb="3">
                Our Vision
              </Heading>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{" "}
              </Text>
            </Box>
          </Stack>
          <Stack direction="row" spacing="5">
            <Box flex="0.6">
              <Heading color="brand.100" size="md" mb="3">
                Our Goal
              </Heading>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{" "}
              </Text>
            </Box>
            <Box flex="1">
              <Box flex="1">
                <Box
                  h="sm"
                  w="full"
                  position="relative"
                  borderRadius="3xl"
                  overflow="hidden"
                >
                  <Image
                    src="/placeholder.png"
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
              </Box>
            </Box>
          </Stack>
        </Container>
      </SectionWrapper>
      <SectionWrapper>
        <Container maxW="container.xl" pb="20">
          <SectionHeader textAlign="center" text="Meet The Founders" mb="10" />
          <Stack direction="row" spacing="5">
            <FounderCard />
            <FounderCard />
            <FounderCard />
            <FounderCard />
          </Stack>
        </Container>
      </SectionWrapper>
      <Footer />
    </div>
  );
};

export default About;
