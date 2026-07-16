/*
  Warnings:

  - Added the required column `updatedAt` to the `AvvMaster` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AvvMaster" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "avv" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_AvvMaster" ("avv", "description", "id") SELECT "avv", "description", "id" FROM "AvvMaster";
DROP TABLE "AvvMaster";
ALTER TABLE "new_AvvMaster" RENAME TO "AvvMaster";
CREATE UNIQUE INDEX "AvvMaster_avv_key" ON "AvvMaster"("avv");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
