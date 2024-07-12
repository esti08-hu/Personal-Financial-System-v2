/*
  Warnings:

  - You are about to drop the column `name` on the `Budget` table. All the data in the column will be lost.
  - Added the required column `title` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "name",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
