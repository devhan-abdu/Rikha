/*
  Warnings:

  - Added the required column `slug` to the `ProductMeta` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductMeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sanityId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "rating" REAL NOT NULL DEFAULT 0,
    "numReviews" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ProductMeta" ("brand", "category", "createdAt", "id", "image", "numReviews", "price", "rating", "sanityId", "shortDesc", "stock", "title", "updatedAt") SELECT "brand", "category", "createdAt", "id", "image", "numReviews", "price", "rating", "sanityId", "shortDesc", "stock", "title", "updatedAt" FROM "ProductMeta";
DROP TABLE "ProductMeta";
ALTER TABLE "new_ProductMeta" RENAME TO "ProductMeta";
CREATE UNIQUE INDEX "ProductMeta_sanityId_key" ON "ProductMeta"("sanityId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
