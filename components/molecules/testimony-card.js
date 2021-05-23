import { Box, Text, Stack } from "@chakra-ui/react";

export const TestimonyCard = () => {
  return (
    <Box
      bg="white"
      flex="1"
      boxShadow="xl"
      borderRadius="xl"
      minH="36"
      p="5"
      borderWidth="1px"
      borderColor="gray.200"
      borderStyle="solid"
    >
      <Text mb="3" fontWeight="semibold">
        “ Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. “
      </Text>
      <Stack direction="row" spacing="2" alignItems="center">
        <Text fontWeight="bold" color="brand.100">
          Andi B.
        </Text>
        <Text color="gray.500">|</Text>
        <Text color="gray.500">CEO of BurgerByte</Text>
      </Stack>
    </Box>
  );
};
