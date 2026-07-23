"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { updateMaterialTotal, updateOfferPrice } from "./calculation-summary.action"


export async function updateAuctionPosition(
  id: string,
  calculationId: string,
  projectId: string,
  data: {
    quantity: number
    metalShare: number | null
    exchangePrice: number | null
    discount: number | null
    dismantlingCost: number | null
  }
) {

  const exchangePrice = data.exchangePrice ?? 0
  const discount = data.discount ?? 0
  const metalShare = data.metalShare ?? 0
  const dismantlingCost = data.dismantlingCost ?? 0

  // Materialrohwert €/t
  const rawValue =
    (exchangePrice - discount) * (metalShare / 100)

  // Materialwert €/t
  const materialValue =
    rawValue - dismantlingCost

  await prisma.auctionPosition.update({

    where: {
      id,
    },

    data: {

      quantity: data.quantity,

      metalShare: data.metalShare,

      exchangePrice: data.exchangePrice,

      discount: data.discount,

      dismantlingCost: data.dismantlingCost,

      rawValue,

      materialValue,

    },

  })

  // Materialsumme aktualisieren
  await updateMaterialTotal(calculationId)
  await updateOfferPrice(calculationId)

  revalidatePath(`/projekte/${projectId}/kalkulation/${calculationId}`)
  revalidatePath(`/projekte/${projectId}`)
}


export async function deleteAuctionPosition(
  id: string,
  calculationId: string,
  projectId: string
) {

  await prisma.auctionPosition.delete({
    where: {
      id,
    },
  })


  await updateMaterialTotal(calculationId)
  await updateOfferPrice(calculationId)

  revalidatePath(`/projekte/${projectId}/kalkulation/${calculationId}`)
  revalidatePath(`/projekte/${projectId}`)
}