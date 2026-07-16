"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export async function createCalculation(
  formData: FormData
){

  const projectId =
    formData.get("projectId") as string


  if(!projectId){
    throw new Error("Projekt fehlt")
  }


  // höchste Version suchen

  const lastCalculation =
    await prisma.calculation.findFirst({
      where:{
        projectId
      },
      orderBy:{
        version:"desc"
      }
    })


  const nextVersion =
    lastCalculation
      ? lastCalculation.version + 1
      : 1



  const calculation =
    await prisma.calculation.create({

      data:{

        projectId,

        version: nextVersion,

        title:
          `Angebot Version ${nextVersion}`,

        active:false

      }

    })


  revalidatePath(
    `/projects/${projectId}`
  )


  redirect(
    `/calculations/${calculation.id}`
  )

}