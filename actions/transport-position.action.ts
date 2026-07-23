"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { updateTransportTotal } from "./calculation-summary.action"


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


  revalidatePath(
    `/projekte/${projectId}/kalkulation/${calculationId}`
  )
}