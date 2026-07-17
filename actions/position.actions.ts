"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"


export async function createPosition(
  formData: FormData
) {

  const calculationId = formData.get("calculationId") as string
  const projectId = formData.get("projectId") as string

  const avv = formData.get("avv") as string


  const avvData = await prisma.avvMaster.findUnique({
    where: {
      avv,
    },
  })


  if (!avvData) {
    throw new Error("AVV nicht gefunden")
  }



  const lastPosition =
    await prisma.auctionPosition.findFirst({

      where: {
        calculationId,
      },

      orderBy: {
        positionNo: "desc",
      },

    })


  const nextPositionNo = lastPosition
    ? lastPosition.positionNo + 1
    : 1



  await prisma.auctionPosition.create({

    data: {

      calculationId,

      positionNo: nextPositionNo,

      avv,

      description: avvData.description,

      quantity:
        Number(formData.get("quantity")),


      // spätere Berechnung
      metalShare: 0,
      exchangePrice: 0,
      discount: 0,
      rawValue: 0,
      dismantlingCost: 0,
      materialValue: 0,

    },

  })


  redirect(
    `/projekte/${projectId}/kalkulation/${calculationId}`
  )
}