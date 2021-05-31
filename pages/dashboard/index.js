import { useState } from "react";
import { Navbar } from "../../components/navbar";
import { Box, Flex, Text } from "@chakra-ui/react";
import { SideBar } from "../../components/admin/sidebar";
import { OrderCard } from "../../components/molecules/order-card";
import { getSession } from "next-auth/client";
import db from "../../utils/db/index";
import axios from "axios";

export default function Dashboard(props) {
  const [orders, setOrders] = useState(props.orders);

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

  return (
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
              />
            ))
          ) : (
            <Text>no oder</Text>
          )}
        </Box>
      </Flex>
    </Flex>
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
