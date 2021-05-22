import { SectionWrapper } from "../atoms/section-wrapper";
import {
  Container,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { SectionHeader } from "../atoms/section-header";
import { CarCard } from "../molecules/car-card";

export const TopBrands = () => {
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
