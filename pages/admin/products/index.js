import { Navbar } from "../../../components/navbar";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { SideBar } from "../../../components/admin/sidebar";
import db from "../../../utils/db/index";
import { CarCard } from "../../../components/molecules/car-card";

export default function Products(props) {
  console.log(props.products);
  return (
    <Flex direction="column" minH="100vh" position="relative">
      <Navbar isAdmin />
      <Flex flex="1">
        <SideBar route="products" />
        <Box flex="1" p="10">
          <SimpleGrid columns={3} spacing={5}>
            {props.products.map((product) => (
              <CarCard key={product.id} product={product} isAdmin />
            ))}
          </SimpleGrid>
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
    products.push({
      id: doc.id,
      name: doc.data().name,
      description: doc.data().description,
      price: doc.data().price,
      year: doc.data().year,
      quantity: doc.data().quantity,
      images: doc.data().images,
      brand: doc.data().brand,
    });
  });

  return {
    props: {
      products,
    },
  };
}
