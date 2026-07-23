/*
  Warnings:

  - Made the column `avgSpeed` on table `ProjectTransport` required. This step will fail if there are existing NULL values in that column.
  - Made the column `distanceKm` on table `ProjectTransport` required. This step will fail if there are existing NULL values in that column.

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
    "toll" REAL,
    "totalCost" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "ProjectTransport_calculationId_fkey" FOREIGN KEY ("calculationId") REFERENCES "Calculation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectTransport" ("avgSpeed", "calculationId", "dieselPrice", "distanceKm", "fuelConsumption", "id", "toll", "totalCost", "trips", "vehicleType") SELECT "avgSpeed", "calculationId", "dieselPrice", "distanceKm", "fuelConsumption", "id", "toll", coalesce("totalCost", 0) AS "totalCost", coalesce("trips", 1) AS "trips", "vehicleType" FROM "ProjectTransport";
DROP TABLE "ProjectTransport";
ALTER TABLE "new_ProjectTransport" RENAME TO "ProjectTransport";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
