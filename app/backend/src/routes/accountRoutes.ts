// app/backend/src/routes/accountRoutes.ts

import { Router } from "express";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client and Express Router
const prisma = new PrismaClient();
const router = Router();

// Route to add a new account
router.post("/add-account", async (req, res) => {
  const { userId, type, balance, title } = req.body;

  try {
    // Create a new account entry in the database
    const account = await prisma.account.create({
      data: {
        userId: Number(userId),
        type,
        balance: Number(balance),
        title,
      },
    });
    // Respond with the created account entry
    res.status(201).json(account);
  } catch (error) {
    // Log and respond with an error message
    console.error("Error creating account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to update an existing account by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { type, balance, title } = req.body;

  try {
    // Update the account entry in the database
    const updatedAccount = await prisma.account.update({
      where: { id: Number(id) },
      data: {
        type,
        balance: Number(balance),
        title,
      },
    });
    // Respond with the updated account entry
    res.json(updatedAccount);
  } catch (error) {
    // Log and respond with an error message
    console.error("Error updating account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to delete an account by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the account entry from the database
    await prisma.account.delete({
      where: { id: Number(id) },
    });
    // Respond with a 204 No Content status
    res.status(204).send();
  } catch (error) {
    // Log and respond with an error message
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
