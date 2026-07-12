-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "debtorNo" TEXT,
    "street" TEXT,
    "postalCode" TEXT,
    "city" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- CreateTable
CREATE TABLE "CompanyContact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "CompanyContact_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "verkaufsId" TEXT NOT NULL,
    "projektname" TEXT,
    "auftragsnummer" TEXT,
    "status" TEXT NOT NULL DEFAULT 'OFFEN',
    "companyId" TEXT NOT NULL,
    "street" TEXT,
    "postalCode" TEXT,
    "city" TEXT,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "Project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Calculation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "title" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Calculation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CalculationSummary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "calculationId" TEXT NOT NULL,
    "materialTotal" REAL NOT NULL DEFAULT 0,
    "transportTotal" REAL NOT NULL DEFAULT 0,
    "containerTotal" REAL NOT NULL DEFAULT 0,
    "labourTotal" REAL NOT NULL DEFAULT 0,
    "disposalTotal" REAL NOT NULL DEFAULT 0,
    "otherTotal" REAL NOT NULL DEFAULT 0,
    "profit" REAL NOT NULL DEFAULT 0,
    "offerPrice" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "CalculationSummary_calculationId_fkey" FOREIGN KEY ("calculationId") REFERENCES "Calculation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuctionPosition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "calculationId" TEXT NOT NULL,
    "positionNo" INTEGER NOT NULL,
    "avv" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "customText" TEXT,
    "quantity" REAL NOT NULL,
    "metalShare" REAL,
    "exchangePrice" REAL,
    "discount" REAL,
    "rawValue" REAL,
    "dismantlingCost" REAL,
    "materialValue" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuctionPosition_calculationId_fkey" FOREIGN KEY ("calculationId") REFERENCES "Calculation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectTransport" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "calculationId" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "distanceKm" REAL,
    "trips" INTEGER,
    "avgSpeed" REAL,
    "fuelConsumption" REAL,
    "dieselPrice" REAL,
    "toll" REAL,
    "totalCost" REAL,
    CONSTRAINT "ProjectTransport_calculationId_fkey" FOREIGN KEY ("calculationId") REFERENCES "Calculation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectContainer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "calculationId" TEXT NOT NULL,
    "containerType" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "standingDays" INTEGER,
    "price" REAL,
    "total" REAL,
    CONSTRAINT "ProjectContainer_calculationId_fkey" FOREIGN KEY ("calculationId") REFERENCES "Calculation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "category" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "mimeType" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProjectDocument_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Activity_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AvvMaster" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "avv" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "VehicleMaster" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "avgSpeed" REAL NOT NULL,
    "fuelConsumption" REAL NOT NULL,
    "toll" REAL NOT NULL,
    "dieselPrice" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "ContainerMaster" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL
);

-- CreateTable
CREATE TABLE "DocumentTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "filePath" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AppSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_verkaufsId_key" ON "Project"("verkaufsId");

-- CreateIndex
CREATE UNIQUE INDEX "Calculation_projectId_version_key" ON "Calculation"("projectId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "CalculationSummary_calculationId_key" ON "CalculationSummary"("calculationId");

-- CreateIndex
CREATE UNIQUE INDEX "AvvMaster_avv_key" ON "AvvMaster"("avv");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleMaster_type_key" ON "VehicleMaster"("type");

-- CreateIndex
CREATE UNIQUE INDEX "ContainerMaster_name_key" ON "ContainerMaster"("name");
