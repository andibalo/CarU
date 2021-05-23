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
        <Container maxW="container.xl">
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
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Select
                placeholder="Year"
                focusBorderColor="brand.100"
                borderColor="brand.100"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Select
                placeholder="Price"
                focusBorderColor="brand.100"
                borderColor="brand.100"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
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
