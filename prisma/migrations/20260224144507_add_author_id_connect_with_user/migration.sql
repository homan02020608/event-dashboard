/*
  Warnings:

  - Added the required column `authodId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "authodId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_authodId_fkey" FOREIGN KEY ("authodId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
