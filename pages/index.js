import { Box } from "@chakra-ui/react";
import { Hero } from "../components/home/hero";
import { Works } from "../components/home/works";
import { TopBrands } from "../components/home/top-brands";
import { WhyUs } from "../components/home/why-us";
import { Testimonial } from "../components/home/testimonial";
import { Footer } from "../components/footer";

export default function Home() {
  return (
    <Box overflow="hidden">
      <Hero />
      <Works />
      <TopBrands />
      <WhyUs />
      <Testimonial />
      <Footer />
    </Box>
  );
}
