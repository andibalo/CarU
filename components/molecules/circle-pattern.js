import { Box, Grid } from "@chakra-ui/react";

export const CirclePattern = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" w="20" gap={2} mb="8">
      <Box w="100%" h="5" bg="brand.100" borderRadius="50%" />
      <Box w="100%" h="5" bg="brand.100" borderRadius="50%" />
      <Box w="100%" h="5" bg="brand.100" borderRadius="50%" />
      <Box w="100%" h="5" bg="brand.100" borderRadius="50%" />
      <Box w="100%" h="5" bg="brand.100" borderRadius="50%" />
      <Box w="100%" h="5" bg="brand.100" borderRadius="50%" />
    </Grid>
  );
};
