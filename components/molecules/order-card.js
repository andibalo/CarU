import { Box, Flex, Text, Heading, Center, Stack } from "@chakra-ui/react";
import { Button } from "../atoms/Button";

export const OrderCard = () => {
  return (
    <Box
      p="5"
      boxShadow="xl"
      flex="1"
      bg="white"
      minH="2xs"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
      borderStyle="solid"
      display="flex"
      flexDirection="column"
      mb="5"
    >
      <Center mb="5">
        <Heading size="md" color="gray.500">
          Order Id:{" "}
          <Heading color="brand.100" display="inline" size="md">
            SOME ORDER ID
          </Heading>
        </Heading>
      </Center>
      <Flex>
        <Box flex="1">
          <Text color="gray.500">
            Date Issued:{" "}
            <Text color="gray.900" display="inline" fontWeight="bold">
              12/03/2021
            </Text>
          </Text>
          <Text color="gray.500">
            Amount:{" "}
            <Text color="gray.900" display="inline" fontWeight="bold">
              Rp. 1.230.000
            </Text>
          </Text>
          <Text color="gray.500">
            Quantity:{" "}
            <Text color="gray.900" display="inline" fontWeight="bold">
              3
            </Text>
          </Text>
        </Box>
        <Box flex="1">
          <Text color="gray.500">Status:</Text>
          <Heading size="sm" color="brand.100">
            Sudah Dikirim
          </Heading>
        </Box>
      </Flex>
      <Stack direction="row" spacing="5" mt="auto">
        <Button fullWidth>View Order Detail</Button>
        <Button fullWidth variant="outline">
          Set For Pickup
        </Button>
      </Stack>
    </Box>
  );
};
