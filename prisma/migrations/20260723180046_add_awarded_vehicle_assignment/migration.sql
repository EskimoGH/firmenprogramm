-- CreateTable
CREATE TABLE "VehicleAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "departureAt" DATETIME,
    "arrivalSiteAt" DATETIME,
    "arrivalCompanyAt" DATETIME,
    "driverId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "VehicleAssignment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VehicleAssignment_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "FleetVehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FleetVehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "licensePlate" TEXT,
    "inspectionUntil" DATETIME,
    "lastService" DATETIME,
    "weight" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Calculation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "title" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "awarded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Calculation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Calculation" ("active", "createdAt", "id", "projectId", "title", "updatedAt", "version") SELECT "active", "createdAt", "id", "projectId", "title", "updatedAt", "version" FROM "Calculation";
DROP TABLE "Calculation";
ALTER TABLE "new_Calculation" RENAME TO "Calculation";
CREATE UNIQUE INDEX "Calculation_projectId_version_key" ON "Calculation"("projectId", "version");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "FleetVehicle_licensePlate_key" ON "FleetVehicle"("licensePlate");
