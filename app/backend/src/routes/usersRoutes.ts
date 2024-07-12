import { Router } from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import prisma from "../prisma/client";
import jwt from "jsonwebtoken";
import validateJwtToken from "../middleware/authMiddleware";
import type { IGetUserAuthInfoRequest } from "../types/express";

const router = Router();

// Signup route
router.post(
  "/signup",
  [
        // Validation middleware for the signup route
    body("email").isEmail().withMessage("Enter a valid email"),
    body("firstName").not().isEmpty().withMessage("First name is required"),
    body("lastName").not().isEmpty().withMessage("Last name is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, firstName, lastName, password } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email is already taken" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: hashedPassword,
        },
      });

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// Login route
router.post("/login", async (req: IGetUserAuthInfoRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Protected dashboard route
router.get(
  "/user/:userId",
  validateJwtToken,
  async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { userId } = req.params;

    if (!req.user) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
        include: {
          transactions: true,// Ensure transactions are included
          budget: true, 
          Account: true
        },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const balance = user.transactions.reduce((acc, transaction) => {
        return transaction.type === "Income"
          ? acc + transaction.amount
          : acc - transaction.amount;
      }, 0);

      res.json({
        user,
        balance,
        transactions: user.transactions,
        budgets: user.budget,
        accounts: user.Account
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
