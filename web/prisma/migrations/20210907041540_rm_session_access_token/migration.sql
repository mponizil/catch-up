/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Session` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Session.accessToken_unique";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "accessToken";
