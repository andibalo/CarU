import { SectionWrapper } from "../atoms/section-wrapper";
import { Container, Text, Flex, Stack, Box, Heading } from "@chakra-ui/react";
import { SectionHeader } from "../atoms/section-header";

export const Works = () => {
  return (
    <SectionWrapper>
      <Container maxW="container.xl">
        <Flex alignItems="center">
          <Box>
            <SectionHeader text="How It Works" />
            <Text maxW="sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Box>
          <Stack direction="row" spacing="5" flex="1" ml="5">
            <Flex
              p="5"
              boxShadow="xl"
              flex="1"
              bg="white"
              minHeight="md"
              borderRadius="lg"
              alignItems="center"
            >
              <Box>
                <Heading as="h5" size="md" mb="3">
                  Create A Profile
                </Heading>

                <Text color="gray.500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
            </Flex>
            <Flex
              p="5"
              boxShadow="xl"
              flex="1"
              bg="white"
              borderRadius="lg"
              minHeight="md"
              alignItems="center"
            >
              <Box>
                <Heading as="h5" size="md" mb="3">
                  Choose A Car
                </Heading>
                <Text color="gray.500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
            </Flex>
            <Flex
              p="5"
              boxShadow="xl"
              flex="1"
              bg="white"
              borderRadius="lg"
              minHeight="md"
              alignItems="center"
            >
              <Box>
                <Heading as="h5" size="md" mb="3">
                  Place An Order
                </Heading>
                <Text color="gray.500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
            </Flex>
          </Stack>
        </Flex>
      </Container>
    </SectionWrapper>
  );
};
