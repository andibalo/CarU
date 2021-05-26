import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Text, Box, Heading, Image, Stack } from "@chakra-ui/react";
import { SectionWrapper } from "../../components/atoms/section-wrapper";
import { Button } from "../../components/atoms/Button";
import db from "../../utils/db/index";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CarDetail = (props) => {
  console.log("PROPS", props.product);

  const {
    brand = "Audi",
    description = "test",
    images = [],
    year = "2019",
    quantity = 3,
    price = 122,
    name = "Toyota Car",
  } = props.product;

  return (
    <div>
      <Navbar />
      <SectionWrapper>
        <Container maxW="container.xl" pb="20">
          <Stack direction="row" spacing="10">
            <Box flex="0.6">
              <Box maxW="500px">
                <Carousel
                  responsive={responsive}
                  showDots={true}
                  infinite={true}
                >
                  {images && images.length > 0 ? (
                    images.map((imageUrl) => (
                      <Box h="full" position="relative" cursor="pointer">
                        <Image
                          src={imageUrl}
                          w="full"
                          h="full"
                          objectFit="cover"
                          pointerEvents="none"
                        />
                      </Box>
                    ))
                  ) : (
                    <Box h="full" position="relative">
                      <Image
                        src="/placeholder.png"
                        layout="fill"
                        objectFit="cover"
                      />
                    </Box>
                  )}
                </Carousel>
              </Box>
            </Box>
            <Box flex="1">
              <Heading
                borderTopWidth="3px"
                borderBottomWidth="3px"
                borderColor="gray.200"
                borderStyle="solid"
                py="3"
                mb="10"
              >
                {name}
              </Heading>
              <Stack direction="row" spacing="5" mb="5">
                <Box flex="1">
                  <Heading fontSize="sm">Description</Heading>
                  <Text>{description}</Text>
                </Box>
                <Box flex="1">
                  <Box mb="5">
                    <Heading fontSize="sm">Brand</Heading>
                    <Text textTransform="capitalize">{brand}</Text>
                  </Box>

                  <Box>
                    <Heading fontSize="sm">Year</Heading>
                    <Text>{year}</Text>
                  </Box>
                </Box>
              </Stack>
              <Stack direction="row" spacing="5" mb="8">
                <Box flex="1">
                  <Heading fontSize="sm">Price</Heading>
                  <Text>{price}</Text>
                </Box>
                <Box flex="1">
                  <Heading fontSize="sm">Stocks Left</Heading>
                  <Text>{quantity}</Text>
                </Box>
              </Stack>
              <Box>
                <Button>Rent Now</Button>
              </Box>
            </Box>
          </Stack>
        </Container>
      </SectionWrapper>
      <Footer />
    </div>
  );
};

export default CarDetail;

export async function getServerSideProps(context) {
  const productRef = db.collection("products").doc(context.query.carId);
  const doc = await productRef.get();

  if (!doc.exists) {
    return {
      notFound: true,
    };
  }

  const product = {
    id: doc.id,
    name: doc.data().name,
    description: doc.data().description,
    price: doc.data().price,
    year: doc.data().year,
    quantity: doc.data().quantity,
    images: doc.data().images,
    brand: doc.data().brand,
  };

  return {
    props: {
      product,
    },
  };
}
