"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { updateOfferPrice } from "./calculation-summary.action"


async function updateOtherTotal(calculationId: string) {

  const costs = await prisma.additionalCost.findMany({
    where: {
      calculationId,
    },
    select: {
      total: true,
    },
  })


  const total = costs.reduce(
    (sum, cost) => sum + cost.total,
    0
  )


  await prisma.calculationSummary.upsert({
    where: {
      calculationId,
    },

    update: {
      otherTotal: total,
    },

    create: {
      calculationId,
      otherTotal: total,
    },
  })
}



export async function createAdditionalCost(
  projectId: string,
  calculationId: string,
  data: {
    description: string
    quantity: number
    unitPrice: number
  }
) {


  await prisma.additionalCost.create({

    data: {

      calculationId,

      description: data.description,

      quantity: data.quantity,

      unitPrice: data.unitPrice,

      total:
        data.quantity *
        data.unitPrice,

    },

  })
  
await updateOtherTotal(calculationId)
await updateOfferPrice(calculationId)

revalidatePath(
  `/projekte/${projectId}/kalkulation/${calculationId}`
)

}