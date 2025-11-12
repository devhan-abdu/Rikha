/*
  Warnings:

  - Added the required column `phoneNumber` to the `ContactMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "phoneNumber" TEXT NOT NULL;
