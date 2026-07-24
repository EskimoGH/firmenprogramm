"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { ProjectStatus } from "@prisma/client"


export async function awardCalculation(
  projectId: string,
  calculationId: string
) {

  await prisma.calculation.update({
    where:{
      id: calculationId
    },
    data:{
      awarded:true
    }
  })


  await prisma.project.update({
    where:{
      id: projectId
    },
    data:{
      status: ProjectStatus.ZUSCHLAG
    }
  })


  revalidatePath(`/projekte/${projectId}`)
}