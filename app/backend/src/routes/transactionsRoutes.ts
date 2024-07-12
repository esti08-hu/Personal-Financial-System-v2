// app/backend/src/routes/transaction.ts

import { Router } from "express";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client and Express Router
const prisma = new PrismaClient();
const router = Router();

// Route to add a new transaction
router.post("/add-transaction", async (req, res) => {
  const { userId, type, amount, date, description } = req.body;

  try {
    // Create a new transaction in the database
    const transaction = await prisma.transaction.create({
      data: {
        userId: Number(userId),
        type,
        amount: Number(amount),
        date: new Date(date).toISOString(),
        description,
      },
    });
    // Respond with the created transaction
    res.status(201).json(transaction);
  } catch (error) {
    // Log and respond with an error message
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to update an existing transaction by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { type, amount, date, description } = req.body;

  try {
    // Update the transaction in the database
    const updatedTransaction = await prisma.transaction.update({
      where: { id: Number(id) },
      data: {
        type,
        amount: Number(amount),
        date: new Date(date).toISOString(),
        description,
      },
    });
    // Respond with the updated transaction
    res.json(updatedTransaction);
  } catch (error) {
    // Log and respond with an error message
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to delete a transaction by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the transaction from the database
    await prisma.transaction.delete({
      where: { id: Number(id) },
    });
    // Respond with a 204 No Content status
    res.status(204).send();
  } catch (error) {
    // Log and respond with an error message
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
