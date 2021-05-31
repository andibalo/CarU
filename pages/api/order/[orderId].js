import db from "../../../utils/db/index";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    console.log(req.body);
    const { status } = req.body;

    const orderRef = db.collection("orders").doc(req.query.orderId);

    const response = await orderRef.update({
      status,
    });

    if (!response) {
      throw new Error("Could not insert into database");
    }

    return res.status(200).json({ message: "ok" });
  }

  res.status(400).json({ message: "Invalid http method" });
}
