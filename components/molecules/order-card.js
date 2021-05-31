import {
  Box,
  Flex,
  Text,
  Heading,
  Center,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button as ChakraButton,
  Spacer,
} from "@chakra-ui/react";
import { formatRupiah, orderStatusColorResolver } from "../../utils/functions";
import { Button } from "../atoms/Button";
import moment from "moment";
import { AiOutlineCaretDown } from "@react-icons/all-files/ai/AiOutlineCaretDown";
import {
  DELIVERED,
  DELIVERING,
  ORDER_FINISHED,
  READY_FOR_PICKUP,
} from "../../utils/constants";

export const OrderCard = ({
  order,
  isAdmin = false,
  handleChangeOrderStatus,
}) => {
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
          <Box mb="3">
            <Text color="gray.500">Status:</Text>
            <Heading size="sm" color={orderStatusColorResolver(status)}>
              {status}
            </Heading>
          </Box>
          {isAdmin && status !== ORDER_FINISHED && (
            <Menu>
              <MenuButton as={ChakraButton} rightIcon={<AiOutlineCaretDown />}>
                Set Order Status
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => handleChangeOrderStatus(DELIVERING, id)}
                >
                  <Flex w="full" alignItems="center">
                    <Text> Sedang Dikirim</Text>
                    <Spacer />
                    {status === DELIVERING && (
                      <Box
                        bg="brand.100"
                        h="10px"
                        w="10px"
                        borderRadius="50%"
                      ></Box>
                    )}
                  </Flex>
                </MenuItem>
                <MenuItem
                  onClick={() => handleChangeOrderStatus(DELIVERED, id)}
                >
                  <Flex w="full" alignItems="center">
                    <Text> Sudah Dikirim</Text>
                    <Spacer />
                    {status === DELIVERED && (
                      <Box
                        bg="brand.100"
                        h="10px"
                        w="10px"
                        borderRadius="50%"
                      ></Box>
                    )}
                  </Flex>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Box>
      </Flex>
      <Stack direction="row" spacing="5" mt="auto">
        <Button fullWidth>View Order Detail</Button>
        {!isAdmin ? (
          <Button
            isDisabled={status !== DELIVERED}
            fullWidth
            variant="outline"
            onClick={() => handleChangeOrderStatus(READY_FOR_PICKUP, id)}
          >
            Set For Pickup
          </Button>
        ) : (
          <Button
            isDisabled={status !== READY_FOR_PICKUP}
            fullWidth
            variant="outline"
            onClick={() => handleChangeOrderStatus(ORDER_FINISHED, id)}
          >
            Finish Order
          </Button>
        )}
      </Stack>
    </Box>
  );
};
