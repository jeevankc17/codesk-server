/*
  Warnings:

  - You are about to drop the column `settings` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userType` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "settings",
DROP COLUMN "userType",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';
