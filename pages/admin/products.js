import { Navbar } from "../../components/navbar";
import { Box, Flex, Text } from "@chakra-ui/react";
import { SideBar } from "../../components/admin/sidebar";
import db from "../../utils/db/index";

export default function Products(props) {
  console.log(props.products);
  return (
    <Flex direction="column" minH="100vh" position="relative">
      <Navbar isAdmin />
      <Flex flex="1">
        <SideBar route="products" />
        <Box flex="1" p="10">
          <Text>test</Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps() {
  const products = [];
  const productsRef = db.collection("products");
  const snapshot = await productsRef.get();

  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
    products.push(doc.data());
  });

  return {
    props: {
      products,
    },
  };
}
