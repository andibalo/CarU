import { Text, Flex, Box, Spacer } from "@chakra-ui/react";
import { Button } from "../atoms/Button";
import Image from "next/image";

export const CarCard = () => {
  return (
    <Box
      p="5"
      boxShadow="xl"
      flex="1"
      bg="white"
      minHeight="md"
      borderRadius="lg"
      alignItems="center"
      borderWidth="1px"
      borderColor="gray.200"
      borderStyle="solid"
    >
      <Flex direction="column" h="full">
        <Box
          h="40"
          w="full"
          position="relative"
          borderRadius="lg"
          overflow="hidden"
          mb="3"
        >
          <Image src="/placeholder.png" layout="fill" objectFit="cover" />
        </Box>
        <Box>
          <Text color="gray.500" fontWeight="semibold">
            2019
          </Text>
          <Text fontWeight="semibold" fontSize="lg">
            Toyota Mercury
          </Text>
          <Text fontWeight="bold" color="brand.100" fontSize="xl">
            300rb/day
          </Text>
        </Box>
        <Spacer />
        <Button>Rent Now</Button>
      </Flex>
    </Box>
  );
};
