// app/backend/src/routes/transaction.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/add-transaction", async (req, res) => {
  const { userId, type, amount, date, description } = req.body;

  try {
    const transaction = await prisma.transaction.create({
      data: {
        userId: Number(userId),
        type,
        amount: Number(amount),
        date: new Date(date).toISOString(),
        description,
      },
    });
    res.status(201).json(transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { type, amount, date, description } = req.body;

  try {
    const updatedTransaction = await prisma.transaction.update({
      where: { id: Number(id) },
      data: {
        type,
        amount: Number(amount),
        date: new Date(date).toISOString(),
        description,
      },
    });
    res.json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.transaction.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
