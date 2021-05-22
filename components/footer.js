import { SectionWrapper } from "./atoms/section-wrapper";
import { Container, Text, Box } from "@chakra-ui/react";
import { Brand } from "./atoms/brand";

export const Footer = () => {
  return (
    <Box bg="brand.100">
      <SectionWrapper>
        <Container maxW="container.xl">
          <Box textAlign="center">
            <Brand alt mb="3" />
            <Box maxW="sm" m="auto" color="white">
              <Text mb="8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
              <Text>Copyright 2021. All rights reserved.</Text>
            </Box>
          </Box>
        </Container>
      </SectionWrapper>
    </Box>
  );
};
