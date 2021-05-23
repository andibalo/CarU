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
          bg="brand.100"
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
            fontWeight="semibold"
          >
            Create Product
          </ChakraLink>
        </Link>
      </Box>

      <Box h="20" display="flex" position="relative">
        <Box
          bg="gray.400"
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
            color="gray.500"
          >
            Product List
          </ChakraLink>
        </Link>
      </Box>

      <Box h="20" display="flex" position="relative">
        <Box
          bg="gray.400"
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
            color="gray.500"
          >
            Orders
          </ChakraLink>
        </Link>
      </Box>
    </Stack>
  );
};
