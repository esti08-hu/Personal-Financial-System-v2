// app/backend/src/routes/accountRoutes.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/add-account", async (req, res) => {
  const { userId, type, balance, title, } = req.body;

  try {
    const account = await prisma.account.create({
      data: {
        userId: Number(userId),
        type,
        balance: Number(balance),
        title,
      },
    });
    res.status(201).json(account);
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { type, balance, title } = req.body;

  try {
    const updatedAccount = await prisma.account.update({
      where: { id: Number(id) },
      data: {
        type,
        balance: Number(balance),
        title,
      },
    });
    res.json(updatedAccount);
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.account.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
