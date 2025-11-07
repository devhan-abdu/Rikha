-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "tx_ref" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "isRemoved" BOOLEAN NOT NULL DEFAULT false,
    "totalAmount" REAL NOT NULL,
    "orderStatus" TEXT NOT NULL DEFAULT 'PENDING_PAYMENT',
    "paymentStatus" TEXT NOT NULL,
    "orderDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("id", "orderDate", "orderStatus", "paymentMethod", "paymentStatus", "totalAmount", "tx_ref", "userId") SELECT "id", "orderDate", "orderStatus", "paymentMethod", "paymentStatus", "totalAmount", "tx_ref", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_tx_ref_key" ON "Order"("tx_ref");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
