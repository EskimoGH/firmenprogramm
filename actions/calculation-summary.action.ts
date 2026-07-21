"use server"

import { prisma } from "@/lib/prisma"


export async function updateMaterialTotal(
  calculationId: string
) {

  const positions = await prisma.auctionPosition.findMany({
    where: {
      calculationId,
    },

    select: {
      materialValue: true,
      quantity: true,
    },
  })


  const materialTotal = positions.reduce(
    (sum, position) => {

      const value =
        (position.materialValue ?? 0) *
        position.quantity

      return sum + value

    },
    0
  )


  await prisma.calculationSummary.upsert({

    where: {
      calculationId,
    },

    update: {
      materialTotal,
    },

    create: {
      calculationId,
      materialTotal,
    },

  })


  return materialTotal
}