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
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid columns="4" spacing="5">
                {products &&
                  products.map((product) => <CarCard product={product} />)}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <Stack direction="row" spacing="5">
                <CarCard />
                <CarCard />
                <CarCard />
                <CarCard />
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack direction="row" spacing="5">
                <CarCard />
                <CarCard />
                <CarCard />
                <CarCard />
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </SectionWrapper>
  );
};
