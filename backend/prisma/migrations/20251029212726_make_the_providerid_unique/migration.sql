/*
  Warnings:

  - A unique constraint covering the columns `[providerId]` on the table `OAuthAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccount_providerId_key" ON "OAuthAccount"("providerId");
