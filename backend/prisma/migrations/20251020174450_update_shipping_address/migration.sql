/*
  Warnings:

  - You are about to drop the column `firstName` on the `ShippingAddress` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `ShippingAddress` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShippingAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "name" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Ethiopia',
    "city" TEXT NOT NULL DEFAULT 'Addis Ababa',
    "subcity" TEXT NOT NULL,
    "woreda" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    CONSTRAINT "ShippingAddress_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ShippingAddress" ("country", "houseNumber", "id", "orderId", "phoneNumber", "subcity", "woreda") SELECT "country", "houseNumber", "id", "orderId", "phoneNumber", "subcity", "woreda" FROM "ShippingAddress";
DROP TABLE "ShippingAddress";
ALTER TABLE "new_ShippingAddress" RENAME TO "ShippingAddress";
CREATE UNIQUE INDEX "ShippingAddress_orderId_key" ON "ShippingAddress"("orderId");
CREATE TABLE "new_UserAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT,
    "country" TEXT NOT NULL DEFAULT 'Ethiopia',
    "city" TEXT NOT NULL DEFAULT 'Addis Ababa',
    "subcity" TEXT NOT NULL,
    "woreda" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserAddress" ("city", "country", "createdAt", "houseNumber", "id", "isDefault", "name", "phoneNumber", "subcity", "updatedAt", "userId", "woreda") SELECT "city", "country", "createdAt", "houseNumber", "id", "isDefault", "name", "phoneNumber", "subcity", "updatedAt", "userId", "woreda" FROM "UserAddress";
DROP TABLE "UserAddress";
ALTER TABLE "new_UserAddress" RENAME TO "UserAddress";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
