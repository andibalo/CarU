import { Box, Flex, Text, Heading, Center, Stack } from "@chakra-ui/react";
import { formatRupiah } from "../../utils/functions";
import { Button } from "../atoms/Button";
import moment from "moment";

export const OrderCard = ({ order, isAdmin = false }) => {
  console.log(order);

  const {
    id,
    address,
    amount,
    contactNumber,
    dateIssued,
    days,
    items,
    receiverName,
    status,
  } = order;

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
          <Box color="brand.100" as="span">
            {id}
          </Box>
        </Heading>
      </Center>
      <Flex>
        <Box flex="1">
          <Text color="gray.500">
            Date Issued:{" "}
            <Box as="span" color="gray.900" display="inline" fontWeight="bold">
              {moment(dateIssued * 1000).format("DD/MM/YYYY hh:mm:ss A")}
            </Box>
          </Text>
          <Text color="gray.500">
            Total Amount:{" "}
            <Box as="span" color="gray.900" display="inline" fontWeight="bold">
              {formatRupiah(amount)}
            </Box>
          </Text>
          <Text color="gray.500">
            Quantity:{" "}
            <Box as="span" color="gray.900" display="inline" fontWeight="bold">
              {items.length}
            </Box>
          </Text>
          <Text color="gray.500">
            Rent Duration:{" "}
            <Box as="span" color="gray.900" display="inline" fontWeight="bold">
              {`${days} days`}
            </Box>
          </Text>
        </Box>
        <Box flex="1">
          <Text color="gray.500">Status:</Text>
          <Heading size="sm" color="brand.100">
            {status}
          </Heading>
        </Box>
      </Flex>
      <Stack direction="row" spacing="5" mt="auto">
        <Button fullWidth>View Order Detail</Button>
        {isAdmin ? (
          <Button fullWidth variant="outline">
            Change Order Status
          </Button>
        ) : (
          <Button fullWidth variant="outline">
            Set For Pickup
          </Button>
        )}
      </Stack>
    </Box>
  );
};
