"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { updateTransportTotal } from "./calculation-summary.action"


export async function createTransportPosition(data: {
  projectId: string
  calculationId: string

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

  totalCost:number
}) {


await prisma.projectTransport.create({

  data: {

    calculationId: data.calculationId,


    vehicleType: data.vehicleType,


    distanceKm: data.distanceKm,

    trips: data.trips,


    avgSpeed: data.avgSpeed,

    fuelConsumption: data.fuelConsumption,

    dieselPrice: data.dieselPrice,

    toll: data.toll,


    hourlyRate: data.hourlyRate,


    overnightStops: data.overnightStops,

    overnightCost: data.overnightCost,


    drivingHours: data.drivingHours,

    labourCost: data.labourCost,

    dieselCost: data.dieselCost,

    tollCost: data.tollCost,

    overnightTotal: data.overnightTotal,


    totalCost: data.totalCost,

  },

})

  await updateTransportTotal(data.calculationId)

  revalidatePath(
  `/projekte/${data.projectId}/kalkulation/${data.calculationId}`
)

}