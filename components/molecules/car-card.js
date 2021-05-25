import { Text, Flex, Box, Spacer, Icon, Stack, Badge } from "@chakra-ui/react";
import { Button } from "../atoms/Button";
import Image from "next/image";
import { AiOutlineDollarCircle } from "@react-icons/all-files/ai/AiOutlineDollarCircle";
import { formatRupiah } from "../../utils/functions";
import Link from "next/link";

export const CarCard = ({ product = {}, isAdmin = false }) => {
  const {
    name = "Toyota Mercury",
    description = "test",
    price = "300",
    quantity = "4",
    year = "2014",
    brand = "toyota",
    images,
    id,
  } = product;
  return (
    <Box
      p="5"
      boxShadow="xl"
      flex="1"
      bg="white"
      minHeight="sm"
      borderRadius="lg"
      alignItems="center"
      borderWidth="1px"
      borderColor="gray.200"
      borderStyle="solid"
    >
      <Flex direction="column" h="full">
        <Box
          h="40"
          w="full"
          position="relative"
          borderRadius="lg"
          overflow="hidden"
          mb="3"
        >
          <Image
            src={images && images.length > 0 ? images[0] : "/placeholder.png"}
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <Box>
          <Stack direction="row" spacing="2" mb="3">
            <Badge colorScheme="green">{brand}</Badge>
            <Badge colorScheme="orange">{year}</Badge>
          </Stack>

          <Text fontWeight="bold" fontSize="lg" mb="2">
            {name}
          </Text>
          <Flex alignItems="center">
            <Flex alignItems="center">
              <Icon as={AiOutlineDollarCircle} boxSize="6" color="gray.900" />
            </Flex>
            <Spacer />
            <Text fontWeight="bold" color="brand.100" fontSize="xl">
              {formatRupiah(price)}
              <Text
                display="inline"
                color="gray.500"
                fontFamily="body"
                fontSize="sm"
              >
                /day
              </Text>
            </Text>
          </Flex>
          <Text
            textAlign="right"
            color="red.500"
            fontWeight="medium"
            mb="3"
          >{`${quantity} left in stock!`}</Text>
        </Box>
        <Spacer />
        <Stack direction="row">
          <Link href={`/cars/${id}`}>
            <Button variant="outline" fullWidth>
              View Detail
            </Button>
          </Link>
          {isAdmin ? (
            <Link href={`/admin/products/${id}`}>
              <Button fullWidth>Edit Product</Button>
            </Link>
          ) : (
            <Button fullWidth>Rent Now</Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
