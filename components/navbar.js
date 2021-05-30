import { useState, useEffect, useContext } from "react";
import {
  Flex,
  Spacer,
  Container,
  HStack,
  Box,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { Brand } from "./atoms/brand";
import Link from "next/link";
import { signOut, getSession } from "next-auth/client";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { AiOutlineShoppingCart } from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import { AiOutlineAppstore } from "@react-icons/all-files/ai/AiOutlineAppstore";
import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";
import { AiOutlineCrown } from "@react-icons/all-files/ai/AiOutlineCrown";
import { CartContext } from "../context/cart-context";

export const Navbar = ({ isAdmin = false }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSession().then((data) => {
      setSession(data);
      setLoading(false);
    });
  }, []);

  const { cartItems } = useContext(CartContext);

  const handleLogout = () => {
    signOut();
  };

  console.log(cartItems);

  return (
    <Box boxShadow={isAdmin ? "lg" : null} zIndex={isAdmin ? "docked" : null}>
      <Container maxW="container.xl" py={4}>
        <Flex>
          <Brand isAdmin={isAdmin} />
          <Spacer />
          <HStack spacing={8}>
            <Link href="/cars">
              <ChakraLink>Car List </ChakraLink>
            </Link>
            <Link href="/about">
              <ChakraLink>About Us</ChakraLink>
            </Link>
            {!session && !loading && (
              <Link href="/login">
                <ChakraLink color="brand.100">Login</ChakraLink>
              </Link>
            )}
            {session && !loading && (
              <Menu>
                <Box position="relative">
                  {cartItems && cartItems.length > 0 && (
                    <Box
                      w="10px"
                      h="10px"
                      bg="red.500"
                      position="absolute"
                      top="-5px"
                      right="-5px"
                      zIndex="docked"
                      borderRadius="full"
                    ></Box>
                  )}
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<AiOutlineUser />}
                  />
                </Box>

                <MenuList zIndex="dropdown">
                  <Link href="/dashboard">
                    <MenuItem icon={<AiOutlineAppstore />}>Dashboard</MenuItem>
                  </Link>
                  {session && !loading && session.user.isAdmin && (
                    <Link href="/admin">
                      <MenuItem icon={<AiOutlineCrown />}>
                        Admin dashboard
                      </MenuItem>
                    </Link>
                  )}
                  <Link href="/cart">
                    <MenuItem icon={<AiOutlineShoppingCart />}>
                      <Flex alignItems="center">
                        <Text>View Cart</Text>
                        <Spacer />
                        {cartItems && cartItems.length > 0 && (
                          <Flex
                            alignItems="center"
                            justifyContent="center"
                            bg="red.500"
                            h="20px"
                            w="20px"
                            borderRadius="50%"
                          >
                            <Text color="white" fontSize="xs">
                              {cartItems.length}
                            </Text>
                          </Flex>
                        )}
                      </Flex>
                    </MenuItem>
                  </Link>
                  <MenuItem
                    icon={<AiOutlineLogout />}
                    color="red.500"
                    onClick={handleLogout}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
            {loading && <Skeleton height="40px" width="40px" />}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
