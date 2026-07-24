"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export async function createFleetVehicle(data: {
  name: string
  type: string
  licensePlate?: string
  inspectionUntil?: Date
  lastService?: Date
  weight?: number
}) {


  await prisma.fleetVehicle.create({
    data,
  })


  revalidatePath("/einstellungen")
}



export async function updateFleetVehicle(data: {
  id: string
  name: string
  type: string
  licensePlate?: string
  inspectionUntil?: Date
  lastService?: Date
  weight?: number
}) {


  await prisma.fleetVehicle.update({

    where: {
      id: data.id,
    },

    data: {

      name: data.name,
      type: data.type,
      licensePlate: data.licensePlate,

      inspectionUntil: data.inspectionUntil,

      lastService: data.lastService,

      weight: data.weight,

    },

  })


  revalidatePath("/einstellungen")
}



export async function deleteFleetVehicle(id: string) {


  await prisma.fleetVehicle.delete({

    where: {
      id,
    },

  })


  revalidatePath("/einstellungen")
}