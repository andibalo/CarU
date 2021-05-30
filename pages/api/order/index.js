import db from "../../../utils/db/index";
import admin from "firebase-admin";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const FieldValue = admin.firestore.FieldValue;

    const { contactNumber, address, amount, items, receiverName } = req.body;

    const response = await db.collection("orders").add({
      contactNumber,
      address,
      amount: parseInt(amount),
      items,
      receiverName,
      status: "Sedang Dikirim",
      dateIssued: FieldValue.serverTimestamp(),
      timestamp: FieldValue.serverTimestamp(),
    });

    if (!response) {
      throw new Error("Could not insert into database");
    }

    return res.status(200).json({ message: "Order created" });
  }

  if (req.method === "GET") {
    return res.status(200).json({ message: "Order GEt" });
  }

  return res.status(400).json({ message: "Invalid http method" });
}
