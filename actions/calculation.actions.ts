"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"


export async function createCalculation(
  formData: FormData
) {

  const projectId = formData.get("projectId") as string


  const lastCalculation = await prisma.calculation.findFirst({
    where: {
      projectId,
    },
    orderBy: {
      version: "desc",
    },
  })


  const version = lastCalculation
    ? lastCalculation.version + 1
    : 1


  const calculation = await prisma.calculation.create({

    data: {

      projectId,

      version,

      title: `Berechnung Version ${version}`,

      active: false,


      summary: {
        create: {
          materialTotal: 0,
          transportTotal: 0,
          containerTotal: 0,
          labourTotal: 0,
          disposalTotal: 0,
          otherTotal: 0,
          profit: 0,
          offerPrice: 0,
        },
      },

    },

  })


redirect(
  `/projekte/${projectId}/kalkulation/${calculation.id}`
)
}