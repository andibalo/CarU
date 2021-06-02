import { SectionWrapper } from "../atoms/section-wrapper";
import { Container, Stack, Box, Text } from "@chakra-ui/react";
import { SectionHeader } from "../atoms/section-header";
import Image from "next/image";
import { CirclePattern } from "../molecules/circle-pattern";
import { CircleBg } from "../atoms/circle-bg";

export const WhyUs = () => {
  return (
    <SectionWrapper>
      <Container maxW="container.xl" position="relative">
        <CircleBg
          size="600px"
          top="-300px"
          left="-200px"
          right={null}
          bottom={null}
        />
        <Box position="absolute" right="0" top="0">
          <CirclePattern />
        </Box>
        <Stack direction="row" spacing="10" alignItems="center">
          <Box flex="1">
            <Box
              h="sm"
              w="full"
              position="relative"
              borderRadius="3xl"
              overflow="hidden"
            >
              <Image src="/car.jpg" layout="fill" objectFit="cover" />
            </Box>
          </Box>
          <Box flex="1">
            <SectionHeader text="Why Us" />
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Text>
          </Box>
        </Stack>
      </Container>
    </SectionWrapper>
  );
};
