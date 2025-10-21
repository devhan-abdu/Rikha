/*
  Warnings:

  - You are about to drop the column `firstName` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `UserAddress` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT '',
    "subcity" TEXT NOT NULL,
    "woreda" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserAddress" ("country", "createdAt", "houseNumber", "id", "isDefault", "phoneNumber", "subcity", "updatedAt", "userId", "woreda") SELECT "country", "createdAt", "houseNumber", "id", "isDefault", "phoneNumber", "subcity", "updatedAt", "userId", "woreda" FROM "UserAddress";
DROP TABLE "UserAddress";
ALTER TABLE "new_UserAddress" RENAME TO "UserAddress";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
