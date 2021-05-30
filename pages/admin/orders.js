import { Navbar } from "../../components/navbar";
import { Box, Flex } from "@chakra-ui/react";
import { SideBar } from "../../components/admin/sidebar";
import { OrderCard } from "../../components/molecules/order-card";
import db from "../../utils/db/index";
import { getSession } from "next-auth/client";

export default function Orders(props) {
  const { orders, isAdmin } = props;

  return (
    <Flex direction="column" minH="100vh" position="relative">
      <Navbar isAdmin />
      <Flex flex="1">
        <SideBar route="orders" />
        <Box flex="1" p="10">
          {orders.length > 0 ? (
            orders.map((order) => <OrderCard order={order} isAdmin={isAdmin} />)
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

  if (session && !session.user.isAdmin) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const ordersRef = db.collection("orders");
  const snapshot = await ordersRef.get();

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
