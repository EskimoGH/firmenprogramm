-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectTransport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "calculationId" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "distanceKm" REAL NOT NULL,
    "trips" INTEGER NOT NULL DEFAULT 1,
    "hourlyRate" REAL NOT NULL,
    "overnightStops" INTEGER NOT NULL DEFAULT 0,
    "overnightCost" REAL NOT NULL DEFAULT 0,
    "avgSpeed" REAL NOT NULL,
    "fuelConsumption" REAL,
    "dieselPrice" REAL,
    "toll" REAL,
    "drivingHours" REAL NOT NULL DEFAULT 0,
    "labourCost" REAL NOT NULL DEFAULT 0,
    "dieselCost" REAL NOT NULL DEFAULT 0,
    "tollCost" REAL NOT NULL DEFAULT 0,
    "overnightTotal" REAL NOT NULL DEFAULT 0,
    "totalCost" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProjectTransport_calculationId_fkey" FOREIGN KEY ("calculationId") REFERENCES "Calculation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectTransport" ("avgSpeed", "calculationId", "createdAt", "dieselPrice", "distanceKm", "fuelConsumption", "hourlyRate", "id", "toll", "totalCost", "trips", "updatedAt", "vehicleType") SELECT "avgSpeed", "calculationId", "createdAt", "dieselPrice", "distanceKm", "fuelConsumption", "hourlyRate", "id", "toll", "totalCost", "trips", "updatedAt", "vehicleType" FROM "ProjectTransport";
DROP TABLE "ProjectTransport";
ALTER TABLE "new_ProjectTransport" RENAME TO "ProjectTransport";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
