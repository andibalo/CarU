import db from "../../../utils/db/index";
import admin from "firebase-admin";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import {
  initMiddleware,
  validateMiddleware,
} from "../../../utils/middleware/validate-middleware";

const validateBody = initMiddleware(
  validateMiddleware(
    [
      check("email")
        .exists({ checkFalsy: true })
        .withMessage("Email must not be empty")
        .isEmail()
        .withMessage("Email must be in correct format"),
      check("password")
        .exists({ checkFalsy: true })
        .withMessage("Password must not be empty")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
      check("phone")
        .exists({ checkFalsy: true })
        .withMessage("Phone must not be empty"),
      check("name")
        .exists({ checkFalsy: true })
        .withMessage("Name must not be empty"),
      check("address")
        .exists({ checkFalsy: true })
        .withMessage("Address must not be empty")
        .isLength({ max: 150 })
        .withMessage("Address not exceed 150 characters"),
    ],
    validationResult
  )
);

const handler = async (req, res) => {
  if (req.method === "POST") {
    const FieldValue = admin.firestore.FieldValue;
    const usersRef = db.collection("users");
    const { email, password, name, phone, address } = req.body;

    await validateBody(req, res);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const snapshot = await usersRef.where("email", "==", email).get();

    if (!snapshot.empty) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await db.collection("users").add({
      email,
      password: hashedPassword,
      isAdmin: false,
      name,
      phone,
      address,
      timestamp: FieldValue.serverTimestamp(),
    });

    if (!response) {
      throw new Error("Could not insert into database");
    }

    return res.status(200).json({ message: "ok" });
  }

  return res.status(400).json({ message: "invalid http method" });
};

export default handler;
