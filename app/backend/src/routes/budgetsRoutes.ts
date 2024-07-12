// app/backend/src/routes/budget.ts

import { Router } from "express";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client and Express Router
const prisma = new PrismaClient();
const router = Router();

// Route to set a new budget
router.post("/set-budget", async (req, res) => {
  const { userId, type, amount, date, title } = req.body;

  try {
    // Create a new budget entry in the database
    const budget = await prisma.budget.create({
      data: {
        userId: Number(userId),
        type,
        amount: Number(amount),
        date: new Date(date).toISOString(),
        title,
      },
    });
    // Respond with the created budget entry
    res.status(201).json(budget);
  } catch (error) {
    // Log and respond with an error message
    console.error("Error creating budget:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to update an existing budget by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { type, amount, date, title } = req.body;

  try {
    // Update the budget entry in the database
    const updatedbudget = await prisma.budget.update({
      where: { id: Number(id) },
      data: {
        type,
        amount: Number(amount),
        date: new Date(date).toISOString(),
        title,
      },
    });
    // Respond with the updated budget entry
    res.json(updatedbudget);
  } catch (error) {
    // Log and respond with an error message
    console.error("Error updating budget:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to delete a budget by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the budget entry from the database
    await prisma.budget.delete({
      where: { id: Number(id) },
    });
    // Respond with a 204 No Content status
    res.status(204).send();
  } catch (error) {
    // Log and respond with an error message
    console.error("Error deleting budget:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
