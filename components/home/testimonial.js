import { SectionWrapper } from "../atoms/section-wrapper";
import { Container, Stack } from "@chakra-ui/react";
import { SectionHeader } from "../atoms/section-header";
import { TestimonyCard } from "../molecules/testimony-card";

export const Testimonial = () => {
  return (
    <SectionWrapper>
      <Container maxW="container.xl" pb="20">
        <SectionHeader text="Testimonial" textAlign="center" />
        <Stack direction="row" spacing="10">
          <TestimonyCard />
          <TestimonyCard />
          <TestimonyCard />
        </Stack>
      </Container>
    </SectionWrapper>
  );
};
