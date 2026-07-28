/*
  Warnings:

  - You are about to drop the column `price` on the `ContainerMaster` table. All the data in the column will be lost.
  - You are about to drop the column `calculationId` on the `ProjectContainer` table. All the data in the column will be lost.
  - You are about to drop the column `containerType` on the `ProjectContainer` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ProjectContainer` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `ProjectContainer` table. All the data in the column will be lost.
  - You are about to drop the column `standingDays` on the `ProjectContainer` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `ProjectContainer` table. All the data in the column will be lost.
  - Added the required column `containerNumber` to the `ContainerMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ContainerMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volumeTon` to the `ContainerMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `containerName` to the `ProjectContainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `containerNumber` to the `ProjectContainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `ProjectContainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProjectContainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volumeTon` to the `ProjectContainer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContainerMaster" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "containerNumber" TEXT NOT NULL,
    "volumeTon" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ContainerMaster" ("id", "name") SELECT "id", "name" FROM "ContainerMaster";
DROP TABLE "ContainerMaster";
ALTER TABLE "new_ContainerMaster" RENAME TO "ContainerMaster";
CREATE UNIQUE INDEX "ContainerMaster_containerNumber_key" ON "ContainerMaster"("containerNumber");
CREATE TABLE "new_ProjectContainer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "containerMasterId" TEXT,
    "containerName" TEXT NOT NULL,
    "containerNumber" TEXT NOT NULL,
    "volumeTon" REAL NOT NULL,
    "departureOperationDate" DATETIME,
    "arrivalSiteDate" DATETIME,
    "arrivalOperationDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProjectContainer_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProjectContainer_containerMasterId_fkey" FOREIGN KEY ("containerMasterId") REFERENCES "ContainerMaster" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProjectContainer" ("id") SELECT "id" FROM "ProjectContainer";
DROP TABLE "ProjectContainer";
ALTER TABLE "new_ProjectContainer" RENAME TO "ProjectContainer";
CREATE INDEX "ProjectContainer_projectId_idx" ON "ProjectContainer"("projectId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
