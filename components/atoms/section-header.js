import { Heading } from "@chakra-ui/react";

export const SectionHeader = ({ text, mb = "3", textAlign = "left" }) => {
  return (
    <Heading as="h3" size="lg" mb={mb} color="brand.100" textAlign={textAlign}>
      {text}
    </Heading>
  );
};
