import React, { useState } from "react";
import { Navbar } from "../../components/navbar";
import {
  Box,
  Flex,
  Link as ChakraLink,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { SideBar } from "../../components/admin/sidebar";
import { OrderCard } from "../../components/molecules/order-card";
import { getSession } from "next-auth/client";
import db from "../../utils/db/index";
import axios from "axios";
import Link from "next/link";
import { OrderModal } from "../../components/molecules/order-modal";

export default function Dashboard(props) {
  const [orders, setOrders] = useState(props.orders);
  const [modalContent, setModalContent] = useState({
    id: "",
    address: "",
    amount: "",
    contactNumber: "",
    dateIssued: "",
    days: "",
    items: "",
    receiverName: "",
    status: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getOrders = async () => {
    try {
      const res = await axios.get("/api/user/order");

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeOrderStatus = async (status, orderId) => {
    try {
      const res = await axios.put(`/api/order/${orderId}`, { status });

      console.log(res);

      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = (content) => {
    setModalContent({ ...modalContent, ...content });

    onOpen();
  };

  return (
    <React.Fragment>
      <Flex direction="column" minH="100vh" position="relative">
        <Navbar />
        <Flex flex="1">
          <SideBar route="user-orders" isUser />
          <Box flex="1" p="10">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard
                  order={order}
                  handleChangeOrderStatus={handleChangeOrderStatus}
                  onOpen={onOpen}
                  modalContent={modalContent}
                  setModalContent={setModalContent}
                  handleOpenModal={handleOpenModal}
                />
              ))
            ) : (
              <Flex
                w="full"
                h="full"
                justifyContent="center"
                alignItems="center"
              >
                <Box textAlign="center">
                  <Heading mb="3">No Orders Yet</Heading>
                  <Link href="/cars">
                    <ChakraLink textDecoration="underline">
                      Go To Catalog
                    </ChakraLink>
                  </Link>
                </Box>
              </Flex>
            )}
          </Box>
        </Flex>
      </Flex>
      <OrderModal
        isOpen={isOpen}
        onClose={onClose}
        modalContent={modalContent}
      />
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  let orders = [];

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: true,
      },
    };
  }

  const ordersRef = db.collection("orders");
  const snapshot = await ordersRef
    .where("userId", "==", session.user.id)
    .orderBy("dateIssued", "desc")
    .get();
  if (snapshot.empty) {
    console.log("No matching documents.");
  }

  snapshot.forEach((doc) => {
    orders.push({
      ...doc.data(),
      id: doc.id,
      dateIssued: doc.data().dateIssued._seconds,
      timestamp: doc.data().timestamp._seconds,
    });
  });

  return {
    props: {
      orders,
    },
  };
}
