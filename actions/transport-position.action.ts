"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { updateOfferPrice, updateTransportTotal } from "./calculation-summary.action"


export async function deleteTransportPosition(
  id: string,
  calculationId: string,
  projectId: string
) {

  await prisma.projectTransport.delete({
    where: {
      id,
    },
  })


  await updateTransportTotal(calculationId)
  await updateOfferPrice(calculationId)

  revalidatePath(
    `/projekte/${projectId}/kalkulation/${calculationId}`
  )
  revalidatePath(
  `/projekte/${projectId}`
)
}

export async function updateTransportPosition(
  id: string,
  calculationId: string,
  projectId: string,
  data: {

    vehicleType: string

    distanceKm: number
    trips: number

    avgSpeed: number
    fuelConsumption: number
    dieselPrice: number
    toll: number

    hourlyRate: number

    overnightStops: number
    overnightCost: number


    drivingHours: number
    labourCost: number
    dieselCost: number
    tollCost: number
    overnightTotal: number

    totalCost: number

  }
) {


await prisma.projectTransport.update({

  where:{
    id,
  },

  data:{


    vehicleType:data.vehicleType,


    distanceKm:data.distanceKm,

    trips:data.trips,


    avgSpeed:data.avgSpeed,

    fuelConsumption:data.fuelConsumption,

    dieselPrice:data.dieselPrice,

    toll:data.toll,


    hourlyRate:data.hourlyRate,


    overnightStops:data.overnightStops,

    overnightCost:data.overnightCost,


    drivingHours:data.drivingHours,

    labourCost:data.labourCost,

    dieselCost:data.dieselCost,

    tollCost:data.tollCost,

    overnightTotal:data.overnightTotal,


    totalCost:data.totalCost,


  }

})


// Summary aktualisieren
await updateTransportTotal(calculationId)
await updateOfferPrice(calculationId)


revalidatePath(
 `/projekte/${projectId}/kalkulation/${calculationId}`
)
revalidatePath(
  `/projekte/${projectId}`
)

}