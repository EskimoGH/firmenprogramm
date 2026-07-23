"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export async function createVehicle(data: {
  type: string
  avgSpeed: number
  fuelConsumption: number
  toll: number
  dieselPrice: number
}) {

  await prisma.vehicleMaster.create({
    data,
  })

  revalidatePath("/einstellungen")
}



export async function updateVehicle(data: {
  id: string
  avgSpeed: number
  fuelConsumption: number
  toll: number
  dieselPrice: number
}) {

  await prisma.vehicleMaster.update({
    where: {
      id: data.id,
    },
    data: {
      avgSpeed: data.avgSpeed,
      fuelConsumption: data.fuelConsumption,
      toll: data.toll,
      dieselPrice: data.dieselPrice,
    },
  })

  revalidatePath("/einstellungen")
}



export async function deleteVehicle(id: string) {

  await prisma.vehicleMaster.delete({
    where: {
      id,
    },
  })

  revalidatePath("/einstellungen")
}