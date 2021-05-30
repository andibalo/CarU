import db from "../../../utils/db/index";
import admin from "firebase-admin";
import { getSession } from "next-auth/client";
import { check, validationResult } from "express-validator";
import {
  initMiddleware,
  validateMiddleware,
} from "../../../utils/middleware/validate-middleware";

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("contactNumber")
        .exists({ checkFalsy: true })
        .withMessage("Contact Number name must not be empty")
        .isLength({ max: 50 })
        .withMessage("Field has maximum of 50 characters"),
      check("address")
        .exists({ checkFalsy: true })
        .withMessage("Address must not be empty")
        .isLength({ max: 150 })
        .withMessage("Field has maximum of 150 characters"),
      check("receiverName")
        .exists({ checkFalsy: true })
        .withMessage("Receiver name must not be empty"),
    ],
    validationResult
  )
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Unathorized access" });

      return;
    }

    const FieldValue = admin.firestore.FieldValue;

    console.log(req.body);
    const { contactNumber, address, amount, items, receiverName, days } =
      req.body;

    await validateBody(req, res);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const response = await db.collection("orders").add({
      userId: session.user.id,
      contactNumber,
      address,
      amount: parseInt(amount),
      items,
      days,
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
