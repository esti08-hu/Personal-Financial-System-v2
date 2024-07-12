import { Router } from "express";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client and Express Router
const prisma = new PrismaClient();
const router = Router();

// Route to fetch all transactions (reports)
router.get("/", async (req, res) => {
  try {
    // Fetch all transactions from the database
    const reports = await prisma.transaction.findMany();
    // Respond with the fetched transactions
    res.json(reports);
  } catch (error) {
    // Log and respond with an error message
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
