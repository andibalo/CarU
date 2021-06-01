import React, { useState } from "react";
import { Navbar } from "../../components/navbar";
import { Box, Flex, Text, Heading, useDisclosure } from "@chakra-ui/react";
import { SideBar } from "../../components/admin/sidebar";
import { OrderCard } from "../../components/molecules/order-card";
import db from "../../utils/db/index";
import { getSession } from "next-auth/client";
import axios from "axios";
import { OrderModal } from "../../components/molecules/order-modal";

export default function Orders(props) {
  const { isAdmin } = props;

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
      const res = await axios.get("/api/order");

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
        <Navbar isAdmin />
        <Flex flex="1">
          <SideBar route="orders" />
          <Box flex="1" p="10">
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard
                  order={order}
                  isAdmin={isAdmin}
                  handleChangeOrderStatus={handleChangeOrderStatus}
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
                  <Text>Try checking again later.</Text>
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

  if (session && !session.user.isAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const ordersRef = db.collection("orders");
  const snapshot = await ordersRef.orderBy("dateIssued", "desc").get();

  if (snapshot.empty) {
    console.log("No matching documents.");
  }

  snapshot.forEach((doc) => {
    orders.push({
      id: doc.id,
      ...doc.data(),
      dateIssued: doc.data().dateIssued._seconds,
      timestamp: doc.data().timestamp._seconds,
    });
  });

  return {
    props: {
      orders,
      isAdmin: session.user.isAdmin,
    },
  };
}
