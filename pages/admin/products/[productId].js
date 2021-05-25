import { useState } from "react";
import { Navbar } from "../../../components/navbar";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image,
  Stack,
  Icon,
  Button as ChakraButton,
} from "@chakra-ui/react";
import { SideBar } from "../../../components/admin/sidebar";
import { Button } from "../../../components/atoms/Button";
import axios from "axios";
import { getSession } from "next-auth/client";
import { AiOutlineFileImage } from "@react-icons/all-files/ai/AiOutlineFileImage";
import { AiOutlineLeft } from "@react-icons/all-files/ai/AiOutlineLeft";
import { useRouter } from "next/router";
import db from "../../../utils/db/index";
import Link from "next/link";

const MAX_IMG_UPLOAD = 3;

export default function EditProduct(props) {
  console.log(props.product);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: props.product.name,
    description: props.product.description,
    quantity: props.product.quantity,
    price: props.product.price,
    year: props.product.year,
    brand: props.product.brand,
    images: props.product.images,
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);

  const { name, description, quantity, price, year, images, brand } = formData;

  const handleSubmit = async () => {
    try {
      console.log(formData);

      const res = await axios.post("/api/product", { ...formData });

      setFormData({
        name: "",
        description: "",
        quantity: 1,
        price: 0,
        year: "",
        images: [],
      });

      router.replace("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async (uploadImage) => {
    // console.log(uploadImage);
    // let metadata = {
    //   contentType: uploadImage.type,
    // };
    // const uploadTask = storage
    //   .ref(`images/${uploadImage.name}}`)
    //   .put(uploadImage, metadata);
    // uploadTask.on(
    //   "state_changed",
    //   function (snapshot) {
    //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //   },
    //   function (error) {
    //     // Handle unsuccessful uploads
    //   },
    //   function () {
    //     uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
    //       console.log("File available at", downloadURL);
    //       setFormData({
    //         ...formData,
    //         images: [...images, downloadURL],
    //       });
    //       return Promise.resolve();
    //     });
    //   }
    // );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChooseImage = (e) => {
    console.log(e.target.files);

    // setUploadImages([...uploadImages, e.target.files[0]]);

    setPreviewImages([
      ...previewImages,
      URL.createObjectURL(e.target.files[0]),
    ]);

    handleUploadImage(e.target.files[0]);
  };

  const renderImageStrip = () => {
    let imageStrips = [];

    if (previewImages.length > 0) {
      previewImages.forEach((img, i) => {
        imageStrips.push(
          <Image
            boxSize="150px"
            objectFit="cover"
            borderRadius="xl"
            src={img}
            alt={"image-" + i}
            key={i}
          />
        );
      });
    }

    if (previewImages.length < MAX_IMG_UPLOAD) {
      imageStrips.push(
        <Flex
          key="placeholderimg"
          alignItems="center"
          justifyContent="center"
          bg="gray.200"
          width="150px"
          height="150px"
          borderRadius="xl"
        >
          <Icon as={AiOutlineFileImage} boxSize="8" />
        </Flex>
      );
    }

    return imageStrips;
  };

  return (
    <Flex direction="column" minH="100vh" position="relative">
      <Navbar isAdmin />
      <Flex flex="1">
        <SideBar route="products" />
        <Box flex="1" p="10">
          <Box
            h="full"
            boxShadow="xl"
            borderRadius="lg"
            borderWidth="1px"
            borderColor="gray.200"
            borderStyle="solid"
            p="5"
          >
            <Link href="/admin/products">
              <ChakraButton leftIcon={<AiOutlineLeft />} variant="ghost" mb="8">
                Return to product list
              </ChakraButton>
            </Link>

            <Stack direction="row" spacing="5">
              {renderImageStrip()}
            </Stack>

            <FormControl mb="3" mt="3">
              <FormLabel>Upload Product Image</FormLabel>
              <Input
                type="file"
                onChange={(e) => handleChooseImage(e)}
                isDisabled={previewImages.length === MAX_IMG_UPLOAD}
              />
              <FormHelperText>Maximum of 3 images</FormHelperText>
            </FormControl>
            <FormControl id="name" mb="3">
              <FormLabel>Product Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl id="description" mb="3">
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={description}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl id="year" mb="3">
              <FormLabel>Year</FormLabel>
              <Select
                name="year"
                value={year}
                onChange={(e) => handleChange(e)}
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
            </FormControl>
            <FormControl id="brand" mb="3">
              <FormLabel>Brand</FormLabel>
              <Select
                name="brand"
                value={brand}
                onChange={(e) => handleChange(e)}
              >
                <option value="audi">Audi</option>
                <option value="bmw">BMW</option>
                <option value="toyota">Toyota</option>
                <option value="mercedes">Mercedes</option>
                <option value="lamborghini">Lamborghini</option>
              </Select>
            </FormControl>
            <FormControl id="quantity" mb="3">
              <FormLabel>Quantity</FormLabel>
              <NumberInput defaultValue={quantity} min={1} max={99}>
                <NumberInputField
                  name="quantity"
                  value={quantity}
                  onChange={(e) => handleChange(e)}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl id="price" mb="6">
              <FormLabel>Price</FormLabel>
              <NumberInput defaultValue={price} min={0}>
                <NumberInputField
                  name="price"
                  value={price}
                  onChange={(e) => handleChange(e)}
                />
              </NumberInput>
            </FormControl>
            <Button onClick={handleSubmit}>Edit</Button>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session && !session.user.isAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const productRef = db.collection("products").doc(context.query.productId);
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
      session,
      product,
    },
  };
}
