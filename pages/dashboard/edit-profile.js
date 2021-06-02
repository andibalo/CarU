import { useState } from "react";
import { Navbar } from "../../components/navbar";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { SideBar } from "../../components/admin/sidebar";
import { Button } from "../../components/atoms/Button";
import { getSession } from "next-auth/client";
import db from "../../utils/db";
import axios from "axios";
import { useRouter } from "next/router";

export default function Dashboard(props) {
  const router = useRouter();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: props.user.name,
    phone: props.user.phone,
    address: props.user.address,
  });

  const { name, phone, address } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(`/api/user/${props.user.id}`, {
        ...formData,
      });

      toast({
        title: "Profile Update.",
        description: "Your profile has been updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex direction="column" minH="100vh" position="relative">
      <Navbar />
      <Flex flex="1">
        <SideBar route="edit-profile" isUser />
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
            <FormControl mb="3" mt="3">
              <FormLabel>Email</FormLabel>
              <Input type="email" value={props.user.email} isDisabled />
            </FormControl>
            <FormControl mb="3" mt="3">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl mb="3" mt="3">
              <FormLabel>Contact Number</FormLabel>
              <Input
                type="text"
                value={phone}
                name="phone"
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <FormControl mb="3" mt="3">
              <FormLabel>Address</FormLabel>
              <Textarea
                value={address}
                name="address"
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <Button onClick={handleUpdateProfile}>Update Profile</Button>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  const userRef = db.collection("users").doc(session.user.id);

  const doc = await userRef.get();

  const user = {
    id: doc.id,
    name: doc.data().name,
    phone: doc.data().phone,
    email: doc.data().email,
    address: doc.data().address,
  };

  return {
    props: {
      user,
    },
  };
}
