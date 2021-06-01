import db from "../../../utils/db/index";
import { ORDER_FINISHED } from "../../../utils/constants";
import admin from "firebase-admin";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { status } = req.body;

    const orderRef = db.collection("orders").doc(req.query.orderId);
    const productsRef = db.collection("products");

    const response = await orderRef.update({
      status,
    });

    if (!response) {
      throw new Error("Could not update resource");
    }

    if (status === ORDER_FINISHED) {
      const orderDoc = await orderRef.get();
      const orderProducts = orderDoc.data().items;

      const promises = orderProducts.map(async (item) => {
        let productRef = await productsRef.doc(item.id);

        await productRef.update({
          quantity: admin.firestore.FieldValue.increment(1),
        });
        let doc = await productRef.get();
        console.log("DOC", doc.data());
        return doc.data();
      });

      const newItems = await Promise.all(promises);

      console.log(newItems);
    }

    return res.status(200).json({ message: "ok" });
  }

  res.status(400).json({ message: "Invalid http method" });
}
