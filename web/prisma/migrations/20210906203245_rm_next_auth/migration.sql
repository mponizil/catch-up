/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "phone" TIMESTAMP(3),
ADD COLUMN     "phoneVerifiedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User.phone_unique" ON "User"("phone");
