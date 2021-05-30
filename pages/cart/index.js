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

export default function Cart() {
  const { cartItems, removeItemFromCart, emptyCart } = useContext(CartContext);

  const handleRentDaysChange = (e) => {
    console.log(e.target);
  };
  console.log("CART PAGE", cartItems);
  return (
    <div>
      <Navbar />
      <SectionWrapper>
        <Container maxW="container.xl" pb="20">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Total Days (Rent)</Th>
                <Th>Price</Th>
              </Tr>
            </Thead>
            {cartItems && cartItems.length > 0 && (
              <>
                <Tbody>
                  {cartItems.map((item) => (
                    <Tr>
                      <Td>
                        <Image
                          src={item.images[0]}
                          h="150px"
                          w="150px"
                          objectFit="cover"
                        />
                      </Td>
                      <Td>{item.name}</Td>
                      <Td>
                        <NumberInput
                          defaultValue={item.days}
                          min={1}
                          max={30}
                          maxW="sm"
                        >
                          <NumberInputField
                            name={item.id}
                            value={item.days}
                            onChange={(e) => handleRentDaysChange(e)}
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </Td>
                      <Td isNumeric>{item.price}</Td>
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
                        <Text>test</Text>
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
