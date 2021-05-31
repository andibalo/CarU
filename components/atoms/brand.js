import { Heading, Box } from "@chakra-ui/react";
import Link from "next/link";

export const Brand = ({ alt = false, mb, isAdmin = false }) => {
  return (
    <Link href="/">
      <Heading color={alt ? "white" : "gray.800"} mb={mb} cursor="pointer">
        Car
        <Box as="span" color={alt ? "gray.800" : "brand.100"}>
          U
        </Box>
        {isAdmin && " Admin"}
      </Heading>
    </Link>
  );
};
