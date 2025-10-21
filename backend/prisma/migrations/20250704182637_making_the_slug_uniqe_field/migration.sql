/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `ProductMeta` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductMeta_slug_key" ON "ProductMeta"("slug");
