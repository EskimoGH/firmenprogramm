/*
  Warnings:

  - You are about to drop the column `category` on the `ProjectDocument` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `ProjectDocument` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `ProjectDocument` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `ProjectDocument` table. All the data in the column will be lost.
  - Added the required column `filename` to the `ProjectDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `ProjectDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `ProjectDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `ProjectDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ProjectDocument` table without a default value. This is not possible if the table is not empty.
  - Made the column `mimeType` on table `ProjectDocument` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originalName" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectDocument_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProjectDocument" ("createdAt", "id", "mimeType", "projectId") SELECT "createdAt", "id", "mimeType", "projectId" FROM "ProjectDocument";
DROP TABLE "ProjectDocument";
ALTER TABLE "new_ProjectDocument" RENAME TO "ProjectDocument";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
