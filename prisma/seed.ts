import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

import { avvData } from "./data/avv"

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  await prisma.avvMaster.createMany({
    data: avvData,
  })

  console.log("AVV Stammdaten erfolgreich angelegt")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })