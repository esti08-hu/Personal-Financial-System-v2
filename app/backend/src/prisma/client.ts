import { PrismaClient } from "@prisma/client";


// Use a relative path to import the generated Prisma client
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

export default prisma;