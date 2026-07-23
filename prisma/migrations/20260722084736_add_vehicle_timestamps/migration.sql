/*
  Warnings:

  - Added the required column `updatedAt` to the `VehicleMaster` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VehicleMaster" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "avgSpeed" REAL NOT NULL,
    "fuelConsumption" REAL NOT NULL,
    "toll" REAL NOT NULL,
    "dieselPrice" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_VehicleMaster" ("avgSpeed", "dieselPrice", "fuelConsumption", "id", "toll", "type") SELECT "avgSpeed", "dieselPrice", "fuelConsumption", "id", "toll", "type" FROM "VehicleMaster";
DROP TABLE "VehicleMaster";
ALTER TABLE "new_VehicleMaster" RENAME TO "VehicleMaster";
CREATE UNIQUE INDEX "VehicleMaster_type_key" ON "VehicleMaster"("type");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
