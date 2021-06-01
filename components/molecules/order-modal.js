import {
  Box,
  Flex,
  Link as ChakraLink,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Spacer,
} from "@chakra-ui/react";
import moment from "moment";
import { orderStatusColorResolver, formatRupiah } from "../../utils/functions";

export const OrderModal = ({ isOpen, onClose, modalContent }) => {
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
  } = modalContent;

  console.log(modalContent);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Order Id: {id}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <Box>
              <Box mb="3">
                <Heading fontSize="sm">Receiver's Name</Heading>
                <Text>{receiverName}</Text>
              </Box>
              <Box mb="3">
                <Heading fontSize="sm">Contact Number</Heading>
                <Text>{contactNumber}</Text>
              </Box>
              <Box mb="3">
                <Heading fontSize="sm">Rent Duration (days)</Heading>
                <Text>{days}</Text>
              </Box>
            </Box>
            <Spacer />
            <Box>
              <Box mb="3">
                <Heading fontSize="sm">Date Issued</Heading>
                <Text>
                  {moment(dateIssued * 1000).format("DD/MM/YYYY hh:mm:ss A")}
                </Text>
              </Box>
              <Box mb="3">
                <Heading fontSize="sm">Amount</Heading>
                <Text>{formatRupiah(amount)}</Text>
              </Box>
              <Box mb="3">
                <Heading fontSize="sm">Status</Heading>
                <Text
                  color={orderStatusColorResolver(status)}
                  fontWeight="bold"
                  fontSize="md"
                >
                  {status}
                </Text>
              </Box>
            </Box>
          </Flex>
          <Box mb="3">
            <Heading fontSize="sm">Items</Heading>
            {items &&
              items.length > 0 &&
              items.map((item, index) => (
                <Text textTransform="capitalize">{`${index + 1}. ${
                  item.name
                } - ${item.brand} - ${item.year}`}</Text>
              ))}
          </Box>

          <Box>
            <Heading fontSize="sm">Address</Heading>
            <Text>{address}</Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
