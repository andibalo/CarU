import { useState } from "react";
import { Navbar } from "../../components/navbar";
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
} from "@chakra-ui/react";
import { SideBar } from "../../components/admin/sidebar";
import { Button } from "../../components/atoms/Button";
import axios from "axios";
import { getSession } from "next-auth/client";
import { AiOutlineFileImage } from "@react-icons/all-files/ai/AiOutlineFileImage";
import { storage } from "../../utils/firebase/index";

export default function AdminHome(props) {
  const MAX_IMG_UPLOAD = 3;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 1,
    price: 0,
    year: "",
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);

  const { name, description, quantity, price, year } = formData;

  const handleSubmit = async () => {
    try {
      const res = await axios.post("/api/product", { ...formData });

      setFormData({
        name: "",
        description: "",
        quantity: 1,
        price: 0,
        year: "",
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImages = async () => {
    console.log(uploadImages[0]);

    let metadata = {
      contentType: uploadImages[0].type,
    };

    const uploadTask = storage
      .ref(
        `images/${uploadImages[0].name}.${uploadImages[0].type.split("/")[1]}`
      )
      .put(uploadImages[0], metadata);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function (error) {
        // Handle unsuccessful uploads
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChooseImage = (e) => {
    console.log(e.target.files);

    setUploadImages([...uploadImages, e.target.files[0]]);

    setPreviewImages([
      ...previewImages,
      URL.createObjectURL(e.target.files[0]),
    ]);
  };

  const renderPlaceholderImage = () => {
    let imageStrips = [];

    if (previewImages.length > 0) {
      previewImages.forEach((img, i) => {
        imageStrips.push(
          <Image
            boxSize="150px"
            objectFit="cover"
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
        <SideBar route="create" />
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
            <Stack direction="row" spacing="5">
              {renderPlaceholderImage()}
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
            <FormControl id="quantity" mb="3">
              <FormLabel>Quantity</FormLabel>
              <NumberInput defaultValue={1} min={1} max={99}>
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
              <NumberInput defaultValue={0} min={0}>
                <NumberInputField
                  name="price"
                  value={price}
                  onChange={(e) => handleChange(e)}
                />
              </NumberInput>
            </FormControl>
            <Button onClick={handleSubmit}>Create</Button>
            <Button onClick={handleUploadImages}>Test</Button>
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

  return {
    props: {
      session,
    },
  };
}
