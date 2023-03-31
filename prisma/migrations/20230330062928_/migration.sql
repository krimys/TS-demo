/*
  Warnings:

  - You are about to drop the column `countryCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNo` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "countryCode",
DROP COLUMN "phoneNo",
ADD COLUMN     "contact" JSONB;
