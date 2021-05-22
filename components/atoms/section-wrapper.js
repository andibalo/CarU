import { Box } from "@chakra-ui/react";

export const SectionWrapper = ({ children, zIndex = "docked" }) => {
  return (
    <Box py="20" position="relative" zIndex={zIndex}>
      {children}
    </Box>
  );
};
