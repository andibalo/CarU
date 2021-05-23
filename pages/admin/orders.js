import { Navbar } from "../../components/navbar";
import { Box, Flex, Text } from "@chakra-ui/react";
import { SideBar } from "../../components/admin/sidebar";

export default function Orders() {
  return (
    <Flex direction="column" minH="100vh" position="relative">
      <Navbar isAdmin />
      <Flex flex="1">
        <SideBar />
        <Box flex="1" p="10">
          <Text>test</Text>
        </Box>
      </Flex>
    </Flex>
  );
}
