import { Navbar } from "../../components/navbar";
import { Box, Flex } from "@chakra-ui/react";
import { SideBar } from "../../components/admin/sidebar";
import { OrderCard } from "../../components/molecules/order-card";

export default function Orders() {
  return (
    <Flex direction="column" minH="100vh" position="relative">
      <Navbar isAdmin />
      <Flex flex="1">
        <SideBar route="orders" />
        <Box flex="1" p="10">
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </Box>
      </Flex>
    </Flex>
  );
}
