import { Text, Flex, Box, Spacer, Icon } from "@chakra-ui/react";
import { Button } from "../atoms/Button";
import Image from "next/image";
import { AiOutlineDollarCircle } from "@react-icons/all-files/ai/AiOutlineDollarCircle";

export const CarCard = () => {
  return (
    <Box
      p="5"
      boxShadow="xl"
      flex="1"
      bg="white"
      minHeight="sm"
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
          <Text color="gray.500">2019</Text>
          <Text fontWeight="bold" fontSize="lg" mb="3">
            Toyota Mercury
          </Text>
          <Flex alignItems="center">
            <Flex alignItems="center">
              <Icon as={AiOutlineDollarCircle} boxSize="6" color="gray.900" />
              <Text ml="1">Price</Text>
            </Flex>
            <Spacer />
            <Text fontWeight="bold" color="brand.100" fontSize="xl">
              Rp. 300rb
              <Text
                display="inline"
                color="gray.500"
                fontFamily="body"
                fontSize="sm"
              >
                /day
              </Text>
            </Text>
          </Flex>
        </Box>
        <Spacer />
        <Button>Rent Now</Button>
      </Flex>
    </Box>
  );
};
