import { useContext, useState } from "react";
import {
  Box,
  Container,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Heading,
  Flex,
  Spacer,
  Text,
  Divider,
} from "@chakra-ui/react";
import { SectionWrapper } from "../../components/atoms/section-wrapper";
import Link from "next/link";
import { CartContext } from "../../context/cart-context";
import { formatRupiah } from "../../utils/functions";
import { Button } from "../../components/atoms/Button";
import axios from "axios";
import { useRouter } from "next/router";

export default function Checkout() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    receiverName: "",
    contactNumber: "",
    address: "",
  });

  const { receiverName, contactNumber, address } = formData;

  const { cartItems, cartTotal, emptyCart } = useContext(CartContext);

  const handleConfirmOrder = async () => {
    console.log(formData);

    const requestBody = {
      ...formData,
      amount: cartTotal,
      items: cartItems,
      days: cartItems[0].days,
    };

    try {
      const res = await axios.post("/api/order", requestBody);

      // console.log(res);

      emptyCart();

      setFormData({
        receiverName: "",
        contactNumber: "",
        address: "",
      });
      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Container maxW="container.xl" pb="20">
        <SectionWrapper>
          <Heading color="brand.100" mb="5">
            Checkout
          </Heading>
          <Stack direction="row" spacing="10">
            <Box flex="1">
              <Box>
                <FormControl mb="3">
                  <FormLabel>Nama Penerima</FormLabel>
                  <Input
                    type="text"
                    name="receiverName"
                    value={receiverName}
                    onChange={(e) => handleChange(e)}
                  />
                </FormControl>
                <FormControl mb="3">
                  <FormLabel>No. Kontak</FormLabel>
                  <Input
                    type="text"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={(e) => handleChange(e)}
                  />
                </FormControl>
                <FormControl mb="3">
                  <FormLabel>Alamat Pengiriman</FormLabel>
                  <Textarea
                    name="address"
                    value={address}
                    onChange={(e) => handleChange(e)}
                  />
                </FormControl>
                <Button fullWidth onClick={handleConfirmOrder}>
                  Confirm Order
                </Button>
              </Box>
            </Box>
            <Box flex="1">
              <Box
                p="5"
                boxShadow="xl"
                flex="1"
                bg="white"
                height="full"
                borderRadius="lg"
                alignItems="center"
                borderWidth="1px"
                borderColor="gray.200"
                borderStyle="solid"
              >
                <Heading fontSize="lg" color="gray.600" mb="3">
                  Order Summary
                </Heading>
                <Box>
                  {cartItems &&
                    cartItems.length > 0 &&
                    cartItems.map((item, index) => (
                      <Flex mb="2" key={item.id}>
                        <Text>{`${index + 1}. ${item.name} (${
                          item.days
                        } day/s)`}</Text>
                        <Spacer />
                        <Text>{formatRupiah(item.price)}</Text>
                      </Flex>
                    ))}
                </Box>
                <Divider />
                <Flex mt="5">
                  <Text fontWeight="semibold">Total</Text>
                  <Spacer />
                  <Text color="brand.100" fontSize="lg" fontWeight="bold">
                    {formatRupiah(cartTotal)}
                  </Text>
                </Flex>
              </Box>
            </Box>
          </Stack>
        </SectionWrapper>
      </Container>
    </div>
  );
}
