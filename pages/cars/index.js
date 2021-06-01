import { useState, useEffect } from "react";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import {
  Container,
  Text,
  Flex,
  Spacer,
  Box,
  Heading,
  Select,
  Stack,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { SectionWrapper } from "../../components/atoms/section-wrapper";
import { CarCard } from "../../components/molecules/car-card";
import db from "../../utils/db/index";

const Car = (props) => {
  const [products, setProducts] = useState(props.products);
  const [filters, setFilters] = useState({
    brand: "",
    year: "",
    price: "",
  });

  const { brand, year, price } = filters;

  const fetchProducts = async () => {
    let url = "/api/product";

    try {
      const res = await axios.get("/api/product");

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  const handleChangeFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Navbar />
      <SectionWrapper>
        <Container maxW="container.xl" pb="20">
          <Flex alignItems="center" mb="10">
            <Box>
              <Heading color="brand.100">Available Cars</Heading>
              <Text color="gray.500">Find the best one for you!</Text>
            </Box>
            <Spacer />
            <Stack direction="row" spacing="3" align="center">
              <Select
                placeholder="Brand"
                focusBorderColor="brand.100"
                borderColor="brand.100"
                name="brand"
                onChange={(e) => handleChangeFilters(e)}
              >
                <option value="toyota">Toyota</option>
                <option value="audi">Audi</option>
                <option value="bmw">BMW</option>
                <option value="mercedes">Mercedes</option>
                <option value="lamborghini">Lamborghini</option>
              </Select>
              <Select
                name="year"
                placeholder="Year"
                focusBorderColor="brand.100"
                borderColor="brand.100"
                onChange={(e) => handleChangeFilters(e)}
              >
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
              </Select>
              <Select
                name="price"
                placeholder="Price"
                focusBorderColor="brand.100"
                borderColor="brand.100"
                onChange={(e) => handleChangeFilters(e)}
              >
                <option value="price-asc">Lowest</option>
                <option value="price-desc">Highest</option>
              </Select>
              <Button variant="ghost" colorScheme="red" px="5">
                Reset
              </Button>
            </Stack>
          </Flex>
          <SimpleGrid columns={4} spacing={10}>
            {products &&
              products.length > 0 &&
              products.map((product) => <CarCard product={product} />)}
          </SimpleGrid>
        </Container>
      </SectionWrapper>
      <Footer />
    </div>
  );
};

export default Car;

export async function getServerSideProps() {
  const products = [];
  const productsRef = db.collection("products");
  const snapshot = await productsRef.get();

  snapshot.forEach((doc) => {
    products.push({
      ...doc.data(),
      id: doc.id,
      timestamp: doc.data().timestamp._seconds,
    });
  });

  return {
    props: {
      products,
    },
  };
}
