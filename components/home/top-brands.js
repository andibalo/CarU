import { SectionWrapper } from "../atoms/section-wrapper";
import {
  Container,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
} from "@chakra-ui/react";
import { SectionHeader } from "../atoms/section-header";
import { CarCard } from "../molecules/car-card";

export const TopBrands = ({ products }) => {
  return (
    <SectionWrapper zIndex="15">
      <Container maxW="container.xl">
        <SectionHeader text="Rent Cars From Top Brands" />
        <Tabs>
          <TabList>
            <Tab>Toyota</Tab>
            <Tab>Audi</Tab>
            <Tab>BMW</Tab>
            <Tab>Mercedes</Tab>
            <Tab>Lamborghini</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid columns="4" spacing="5">
                {products &&
                  products
                    .filter((product) => product.brand === "toyota")
                    .map((product) => (
                      <CarCard key={product.id} product={product} />
                    ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns="4" spacing="5">
                {products &&
                  products
                    .filter((product) => product.brand === "audi")
                    .map((product) => (
                      <CarCard key={product.id} product={product} />
                    ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns="4" spacing="5">
                {products &&
                  products
                    .filter((product) => product.brand === "audi")
                    .map((product) => (
                      <CarCard key={product.id} product={product} />
                    ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns="4" spacing="5">
                {products &&
                  products
                    .filter((product) => product.brand === "audi")
                    .map((product) => (
                      <CarCard key={product.id} product={product} />
                    ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid columns="4" spacing="5">
                {products &&
                  products
                    .filter((product) => product.brand === "audi")
                    .map((product) => (
                      <CarCard key={product.id} product={product} />
                    ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </SectionWrapper>
  );
};
