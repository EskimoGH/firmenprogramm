"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createAvv(
  data:{
    avv:string
    description:string
  }
){

  await prisma.avvMaster.create({

    data:{

      avv:data.avv,
      description:data.description,

    },

  })

  revalidatePath("/einstellungen")

}

export async function updateAvv(
  id:string,
  data:{
    avv:string
    description:string
  }
){

  await prisma.avvMaster.update({

    where:{
      id,
    },

    data:{

      avv:data.avv,
      description:data.description,

    },

  })

  revalidatePath("/einstellungen")

}

export async function deleteAvv(
  id:string
){

  await prisma.avvMaster.delete({

    where:{
      id,
    },

  })

  revalidatePath("/einstellungen")

}