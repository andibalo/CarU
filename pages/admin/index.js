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
} from "@chakra-ui/react";
import { SideBar } from "../../components/admin/sidebar";
import { Button } from "../../components/atoms/Button";
import axios from "axios";

export default function AdminHome() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 1,
    price: 0,
    year: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
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
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
