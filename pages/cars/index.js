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

const Car = () => {
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
              >
                <option value="toyota">Toyota</option>
                <option value="audi">Audi</option>
                <option value="bmw">BMW</option>
                <option value="mercedes">Mercedes</option>
                <option value="lamborghini">Lamborghini</option>
              </Select>
              <Select
                placeholder="Year"
                focusBorderColor="brand.100"
                borderColor="brand.100"
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
                placeholder="Price"
                focusBorderColor="brand.100"
                borderColor="brand.100"
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
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
          </SimpleGrid>
        </Container>
      </SectionWrapper>
      <Footer />
    </div>
  );
};

export default Car;
