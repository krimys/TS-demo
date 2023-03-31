/*
  Warnings:

  - You are about to drop the column `userId` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userId",
ADD COLUMN     "user" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_key" ON "Profile"("user");
