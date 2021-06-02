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
        .withMessage("Name must not be empty")
        .isLength({ max: 50 })
        .withMessage("Field has maximum of 50 characters"),
      check("phone")
        .exists({ checkFalsy: true })
        .withMessage("Phone must not be empty"),
      check("address")
        .exists({ checkFalsy: true })
        .withMessage("Address must not be empty")
        .isLength({ max: 150 })
        .withMessage("Field has maximum of 150 characters"),
    ],
    validationResult
  )
);

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { name, address, phone } = req.body;

    await validateBody(req, res);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const userRef = db.collection("users").doc(req.query.userId);

    const response = await userRef.update({
      name,
      phone,
      address,
    });

    if (!response) {
      throw new Error("Could not insert into database");
    }

    return res.status(200).json({ message: "ok" });
  }

  return res.status(400).json({ message: "Invalid http method" });
}
