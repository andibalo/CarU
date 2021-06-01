import db from "../../../../utils/db/index";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ message: "Unathorized access" });

      return;
    }

    let orders = [];

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
        id: doc.id,
        ...doc.data(),
        dateIssued: doc.data().dateIssued._seconds,
        timestamp: doc.data().timestamp._seconds,
      });
    });

    return res.status(200).json({ orders });
  }

  res.status(400).json({ message: "Invalid http method" });
}
