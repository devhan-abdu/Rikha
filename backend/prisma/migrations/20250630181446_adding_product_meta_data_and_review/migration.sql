-- CreateTable
CREATE TABLE "productMeta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sanityId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "rating" REAL NOT NULL,
    "numReviews" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "productMeta_sanityId_key" ON "productMeta"("sanityId");
