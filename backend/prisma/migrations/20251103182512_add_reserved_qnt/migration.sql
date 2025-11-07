-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "specs" JSONB,
    "price" REAL NOT NULL,
    "discount" REAL,
    "shortDesc" TEXT NOT NULL,
    "longDesc" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 1,
    "reserved_qnt" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isNewArrival" BOOLEAN NOT NULL DEFAULT false,
    "isHot" BOOLEAN NOT NULL DEFAULT false,
    "rating" REAL NOT NULL DEFAULT 0,
    "numReviews" INTEGER NOT NULL DEFAULT 0,
    "categoryId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("brand", "categoryId", "createdAt", "discount", "id", "image", "isFeatured", "isHot", "isNewArrival", "longDesc", "numReviews", "price", "rating", "shortDesc", "slug", "specs", "stock", "title", "updatedAt") SELECT "brand", "categoryId", "createdAt", "discount", "id", "image", "isFeatured", "isHot", "isNewArrival", "longDesc", "numReviews", "price", "rating", "shortDesc", "slug", "specs", "stock", "title", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
