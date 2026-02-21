-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PLANNED', 'ATTENDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('CONCERT', 'REAL_MEETING', 'REAL_SIGN', 'REAL_GAMESEVENT', 'REAL_EVENT', 'ONLINE_MEETING', 'ONLINE_SIGN', 'OTHER');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventType" "EventType" NOT NULL DEFAULT 'OTHER',
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'PLANNED';

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "memo" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
