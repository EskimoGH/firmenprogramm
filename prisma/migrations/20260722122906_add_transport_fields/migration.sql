/*
  Warnings:

  - Added the required column `hourlyRate` to the `ProjectTransport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProjectTransport` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectTransport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "calculationId" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "distanceKm" REAL NOT NULL,
    "trips" INTEGER NOT NULL DEFAULT 1,
    "avgSpeed" REAL NOT NULL,
    "fuelConsumption" REAL,
    "dieselPrice" REAL,
    "hourlyRate" REAL NOT NULL,
    "toll" REAL,
    "totalCost" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProjectTransport_calculationId_fkey" FOREIGN KEY ("calculationId") REFERENCES "Calculation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectTransport" ("avgSpeed", "calculationId", "dieselPrice", "distanceKm", "fuelConsumption", "id", "toll", "totalCost", "trips", "vehicleType") SELECT "avgSpeed", "calculationId", "dieselPrice", "distanceKm", "fuelConsumption", "id", "toll", "totalCost", "trips", "vehicleType" FROM "ProjectTransport";
DROP TABLE "ProjectTransport";
ALTER TABLE "new_ProjectTransport" RENAME TO "ProjectTransport";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
