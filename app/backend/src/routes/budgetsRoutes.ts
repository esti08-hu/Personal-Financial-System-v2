// app/backend/src/routes/budget.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/set-budget", async (req, res) => {
  const { userId, type, amount, date, title } = req.body;

  try {
    const budget = await prisma.budget.create({
      data: {
        userId: Number(userId),
        type,
        amount: Number(amount),
        date: new Date(date).toISOString(),
        title,
      },
    });
    res.status(201).json(budget);
  } catch (error) {
    console.error("Error creating budget:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { type, amount, date, title } = req.body;

  try {
    const updatedbudget = await prisma.budget.update({
      where: { id: Number(id) },
      data: {
        type,
        amount: Number(amount),
        date: new Date(date).toISOString(),
        title,
      },
    });
    res.json(updatedbudget);
  } catch (error) {
    console.error("Error updating budget:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.budget.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting budget:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
