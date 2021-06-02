import React, { useState, useEffect } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { SectionWrapper } from "../../components/atoms/section-wrapper";
import { CarCard } from "../../components/molecules/car-card";
import axios from "axios";
import db from "../../utils/db/index";

const Car = (props) => {
  const [products, setProducts] = useState(props.products);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    brand: "",
    year: "",
    price: "desc",
  });

  const { brand, year, price } = filters;

  const fetchProducts = async () => {
    setIsLoading(true);

    let url = "/api/product";

    url = url.concat(brand !== "" ? `/${brand}` : "/null");
    url = url.concat(year !== "" ? `/${year}` : "/null");
    url = url.concat(price !== "" ? `/${price}` : "/null");

    console.log(url);
    try {
      const res = await axios.get(url);

      console.log(res);

      setProducts(res.data.products);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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
          {isLoading && (
            <Flex justifyContent="center" minH="md">
              <Spinner size="xl" color="brand.100" />
            </Flex>
          )}
          {!isLoading && (
            <React.Fragment>
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
                    value={brand}
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
                    value={year}
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
                    focusBorderColor="brand.100"
                    borderColor="brand.100"
                    value={price}
                    onChange={(e) => handleChangeFilters(e)}
                  >
                    <option value="desc">Highest Price</option>
                    <option value="asc">Lowest Price</option>
                  </Select>
                  <Button
                    variant="ghost"
                    colorScheme="red"
                    px="5"
                    onClick={() =>
                      setFilters({
                        brand: "",
                        year: "",
                        price: "desc",
                      })
                    }
                  >
                    Reset
                  </Button>
                </Stack>
              </Flex>
              {products && products.length > 0 ? (
                <SimpleGrid columns={4} spacing={10}>
                  {products.map((product) => (
                    <CarCard key={product.id} product={product} />
                  ))}
                </SimpleGrid>
              ) : (
                <Box textAlign="center">
                  <Heading fontSize="xl" color="gray.700">
                    No Cars Found
                  </Heading>
                  <Text>Try using a different filter</Text>
                </Box>
              )}
            </React.Fragment>
          )}
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
