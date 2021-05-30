import { Box } from "@chakra-ui/react";
import { Hero } from "../components/home/hero";
import { Works } from "../components/home/works";
import { TopBrands } from "../components/home/top-brands";
import { WhyUs } from "../components/home/why-us";
import { Testimonial } from "../components/home/testimonial";
import { Footer } from "../components/footer";
import db from "../utils/db/index";

export default function Home(props) {
  return (
    <Box overflow="hidden">
      <Hero />
      <Works />
      <TopBrands products={props.products} />
      <WhyUs />
      <Testimonial />
      <Footer />
    </Box>
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
