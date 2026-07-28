"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export async function getContainerMasters() {

  return prisma.containerMaster.findMany({
    orderBy: {
      containerNumber: "asc",
    },
  })

}



export async function createContainerMaster(data: {
  name: string
  containerNumber: string
  volumeTon: number
}) {

  await prisma.containerMaster.create({
    data: {
      name: data.name,
      containerNumber: data.containerNumber,
      volumeTon: data.volumeTon,
    },
  })


  revalidatePath("/einstellungen")

}



export async function updateContainerMaster(
  id: string,
  data: {
    name: string
    containerNumber: string
    volumeTon: number
  }
) {

  await prisma.containerMaster.update({

    where: {
      id,
    },

    data: {
      name: data.name,
      containerNumber: data.containerNumber,
      volumeTon: data.volumeTon,
    },

  })


  revalidatePath("/einstellungen")

}



export async function deleteContainerMaster(
  id: string
) {

  await prisma.containerMaster.delete({
    where: {
      id,
    },
  })


  revalidatePath("/einstellungen")

}