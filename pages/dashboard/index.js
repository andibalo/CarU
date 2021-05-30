import { Navbar } from "../../components/navbar";
import { Box, Flex, Text } from "@chakra-ui/react";
import { SideBar } from "../../components/admin/sidebar";
import { OrderCard } from "../../components/molecules/order-card";
import { getSession } from "next-auth/client";
import db from "../../utils/db/index";

export default function Dashboard(props) {
  const { orders } = props;

  return (
    <Flex direction="column" minH="100vh" position="relative">
      <Navbar />
      <Flex flex="1">
        <SideBar route="user-orders" isUser />
        <Box flex="1" p="10">
          {orders.length > 0 ? (
            orders.map((order) => <OrderCard order={order} />)
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
  const snapshot = await ordersRef.where("userId", "==", session.user.id).get();
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
    },
  };
}
