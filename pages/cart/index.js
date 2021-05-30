import { useContext } from "react";
import { Navbar } from "../../components/navbar";
import { SectionWrapper } from "../../components/atoms/section-wrapper";
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Image,
  Spacer,
  Flex,
  Text,
  Button,
  Stack,
  Box,
  Heading,
  Link as ChakraLink,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { CartContext } from "../../context/cart-context";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { AiOutlineArrowRight } from "@react-icons/all-files/ai/AiOutlineArrowRight";
import Link from "next/link";
import { Button as CustomButton } from "../../components/atoms/Button";
import { formatRupiah } from "../../utils/functions";

export default function Cart() {
  const {
    cartItems,
    removeItemFromCart,
    emptyCart,
    incrementItemRentDays,
    decrementItemRentDays,
    cartTotal,
  } = useContext(CartContext);

  const getTotal = () => {
    return cartItems.reduce((totalPrice, item) => {
      return totalPrice + item.price * item.days;
    }, 0);
  };

  return (
    <div>
      <Navbar />
      <SectionWrapper>
        <Container maxW="container.xl" pb="20">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Name</Th>
                <Th>
                  <Flex alignItems="center">
                    <Text mr="3"> Total Days (Rent)</Text>
                    {cartItems && cartItems.length > 0 && (
                      <NumberInput
                        defaultValue={cartItems[0].days}
                        min={1}
                        max={30}
                        maxW="100px"
                      >
                        <NumberInputField alue={cartItems[0].days} />
                        <NumberInputStepper>
                          <NumberIncrementStepper
                            onClick={() => incrementItemRentDays()}
                          />
                          <NumberDecrementStepper
                            onClick={() => decrementItemRentDays()}
                          />
                        </NumberInputStepper>
                      </NumberInput>
                    )}
                  </Flex>
                </Th>
                <Th>Price</Th>
              </Tr>
            </Thead>
            {cartItems && cartItems.length > 0 && (
              <>
                <Tbody>
                  {cartItems.map((item) => (
                    <Tr key={item.id}>
                      <Td>
                        <Image
                          src={item.images[0]}
                          h="150px"
                          w="150px"
                          objectFit="cover"
                        />
                      </Td>
                      <Td>{item.name}</Td>
                      <Td>{item.days}</Td>
                      <Td isNumeric>{formatRupiah(item.price)} </Td>
                    </Tr>
                  ))}
                </Tbody>

                <Tfoot>
                  <Tr>
                    <Th>
                      <Stack direction="row" spacing="5">
                        <Button
                          colorScheme="red"
                          variant="ghost"
                          leftIcon={<AiOutlineDelete />}
                          onClick={emptyCart}
                        >
                          Empty Cart
                        </Button>
                      </Stack>
                    </Th>
                    <Th></Th>
                    <Th></Th>
                    <Th>
                      <Flex>
                        <Text>To Pay:</Text>
                        <Spacer />
                        <Text fontSize="lg" color="brand.100">
                          {formatRupiah(getTotal())}
                        </Text>
                      </Flex>
                    </Th>
                  </Tr>
                </Tfoot>
              </>
            )}
          </Table>
          {cartItems && cartItems.length <= 0 && (
            <Flex justifyContent="center" alignItems="center" h="xs">
              <Box textAlign="center">
                <Heading mb="2">No Items In Cart</Heading>
                <Link href="/cars">
                  <ChakraLink textDecoration="underline" fontSize="lg">
                    Go To Catalog
                  </ChakraLink>
                </Link>
              </Box>
            </Flex>
          )}
          {cartItems && cartItems.length > 0 && (
            <Flex justifyContent="flex-end" mt="5">
              <CustomButton rightIcon={<AiOutlineArrowRight />}>
                <Link href="/cart/checkout">Go To Checkout</Link>
              </CustomButton>
            </Flex>
          )}
        </Container>
      </SectionWrapper>
    </div>
  );
}
