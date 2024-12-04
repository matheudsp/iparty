/*
  Warnings:

  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_stripeCustomerId_key";

-- AlterTable
ALTER TABLE "Party" ADD COLUMN     "pixKey" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isActive",
DROP COLUMN "stripeCustomerId";
