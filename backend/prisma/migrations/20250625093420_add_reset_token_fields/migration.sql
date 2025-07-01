-- AlterTable
ALTER TABLE "User" ADD COLUMN "resetExpires" DATETIME;
ALTER TABLE "User" ADD COLUMN "resetToken" TEXT;
