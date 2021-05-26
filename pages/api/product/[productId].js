import db from "../../../utils/db/index";
import { check, validationResult } from "express-validator";
import {
  initMiddleware,
  validateMiddleware,
} from "../../../utils/middleware/validate-middleware";

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("name")
        .exists({ checkFalsy: true })
        .withMessage("Product name must not be empty")
        .isLength({ max: 50 })
        .withMessage("Field has maximum of 50 characters"),
      check("description")
        .exists({ checkFalsy: true })
        .withMessage("Description must not be empty")
        .isLength({ max: 150 })
        .withMessage("Field has maximum of 150 characters"),
      check("year")
        .exists({ checkFalsy: true })
        .withMessage("Year must not be empty"),
      check("brand")
        .exists({ checkFalsy: true })
        .withMessage("Brand must not be empty"),
      check("quantity")
        .exists()
        .withMessage("Quantity must not be empty")
        .isNumeric()
        .withMessage("Must be numerical value"),
      check("price")
        .exists()
        .withMessage("Price must not be empty")
        .isNumeric()
        .withMessage("Must be numerical value"),
    ],
    validationResult
  )
);

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { name, description, year, quantity, price, brand, images } =
      req.body;

    await validateBody(req, res);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const productRef = db.collection("products").doc(req.query.productId);

    const response = await productRef.update({
      name,
      description,
      year,
      quantity: parseInt(quantity),
      price: parseInt(price),
      images,
      brand,
    });

    if (!response) {
      throw new Error("Could not insert into database");
    }

    return res.status(200).json({ message: "ok" });
  }

  return res.status(400).json({ message: "Invalid http method" });
}
