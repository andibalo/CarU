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
} from "@chakra-ui/react";
import { Brand } from "./atoms/brand";
import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { AiOutlineShoppingCart } from "@react-icons/all-files/ai/AiOutlineShoppingCart";
import { AiOutlineAppstore } from "@react-icons/all-files/ai/AiOutlineAppstore";
import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";
import { AiOutlineCrown } from "@react-icons/all-files/ai/AiOutlineCrown";

export const Navbar = ({ isAdmin = false }) => {
  const [session, loading] = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <Box boxShadow={isAdmin ? "lg" : null} zIndex={isAdmin ? "docked" : null}>
      <Container maxW="container.xl" py={4}>
        <Flex>
          <Brand isAdmin={isAdmin} />
          <Spacer />
          <HStack spacing={8}>
            <Link href="/cars">
              <ChakraLink>Car List</ChakraLink>
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
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<AiOutlineUser />}
                />
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
                      View Cart
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
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
