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

export async function updateTransportTotal(
  calculationId: string
) {

  const transports = await prisma.projectTransport.findMany({
    where: {
      calculationId,
    },

    select: {
      totalCost: true,
    },
  })

  const transportTotal = transports.reduce(
    (sum, transport) => {
      return sum + (transport.totalCost ?? 0)
    },
    0
  )

  await prisma.calculationSummary.upsert({

    where: {
      calculationId,
    },

    update: {
      transportTotal,
    },

    create: {
      calculationId,
      transportTotal,
    },

  })

  return transportTotal
}