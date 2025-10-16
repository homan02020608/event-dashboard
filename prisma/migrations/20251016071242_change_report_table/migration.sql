/*
  Warnings:

  - You are about to drop the column `authodId` on the `Report` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Report" DROP CONSTRAINT "Report_authodId_fkey";

-- AlterTable
ALTER TABLE "public"."Report" DROP COLUMN "authodId",
ADD COLUMN     "authorId" TEXT NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "public"."Report" ADD CONSTRAINT "Report_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
