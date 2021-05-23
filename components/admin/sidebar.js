import { Box, Stack, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

export const SideBar = ({ route }) => {
  return (
    <Stack
      direction="column"
      flex="0.25"
      bg="white"
      boxShadow="xl"
      borderEndWidth="1px"
      borderColor="gray.300"
      borderStyle="solid"
      spacing="0"
    >
      <Box h="20" display="flex" position="relative">
        <Box
          bg={route === "create" ? "brand.100" : "gray.400"}
          h="full"
          w="10px"
          position="absolute"
          right="0"
          top="0"
        ></Box>
        <Link href="/admin">
          <ChakraLink
            flex="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontSize="xl"
            fontWeight={route === "create" ? "semibold" : "normal"}
            color={route === "create" ? "gray.900" : "gray.400"}
          >
            Create Product
          </ChakraLink>
        </Link>
      </Box>

      <Box h="20" display="flex" position="relative">
        <Box
          bg={route === "products" ? "brand.100" : "gray.400"}
          h="full"
          w="10px"
          position="absolute"
          right="0"
          top="0"
        ></Box>
        <Link href="/admin/products">
          <ChakraLink
            flex="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontSize="xl"
            fontWeight={route === "products" ? "semibold" : "normal"}
            color={route === "products" ? "gray.900" : "gray.400"}
          >
            Product List
          </ChakraLink>
        </Link>
      </Box>

      <Box h="20" display="flex" position="relative">
        <Box
          bg={route === "orders" ? "brand.100" : "gray.400"}
          h="full"
          w="10px"
          position="absolute"
          right="0"
          top="0"
        ></Box>
        <Link href="/admin/orders">
          <ChakraLink
            flex="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontSize="xl"
            fontWeight={route === "orders" ? "semibold" : "normal"}
            color={route === "orders" ? "gray.900" : "gray.400"}
          >
            Orders
          </ChakraLink>
        </Link>
      </Box>
    </Stack>
  );
};
