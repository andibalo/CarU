import db from "../../../utils/db/index";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const brand = req.query.filters[0];
    const year = req.query.filters[1];
    const price = req.query.filters[2];

    const productsRef = db.collection("products");

    let products = [];

    let snapshot;

    if (year === "null" && brand === "null") {
      snapshot = await productsRef.orderBy("price", price).get();
    } else if (year !== "null" && brand !== "null") {
      snapshot = await productsRef
        .where("brand", "==", brand)
        .where("year", "==", year)
        .orderBy("price", price)
        .get();
    } else if (year === "null") {
      snapshot = await productsRef
        .where("brand", "==", brand)
        .orderBy("price", price)
        .get();
    } else if (brand === "null") {
      snapshot = await productsRef
        .where("year", "==", year)
        .orderBy("price", price)
        .get();
    }

    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp._seconda,
      });
      console.log(doc.id, "=>", doc.data());
    });

    return res.status(200).json({ products });
  }

  return res.status(400).json({ message: "Invalid http method" });
}
