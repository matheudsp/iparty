/*
  Warnings:

  - You are about to drop the column `valueForEachParcipant` on the `Party` table. All the data in the column will be lost.
  - You are about to drop the column `paid` on the `PartyParticipant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Party" DROP COLUMN "valueForEachParcipant",
ADD COLUMN     "isPaymentActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "valueForEachParticipant" TEXT;

-- AlterTable
ALTER TABLE "PartyParticipant" DROP COLUMN "paid",
ADD COLUMN     "isPaid" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripeCustomerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");
