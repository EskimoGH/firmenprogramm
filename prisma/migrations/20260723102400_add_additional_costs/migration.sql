-- CreateTable
CREATE TABLE "AdditionalCost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "calculationId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" REAL NOT NULL DEFAULT 1,
    "unitPrice" REAL NOT NULL DEFAULT 0,
    "total" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AdditionalCost_calculationId_fkey" FOREIGN KEY ("calculationId") REFERENCES "Calculation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
