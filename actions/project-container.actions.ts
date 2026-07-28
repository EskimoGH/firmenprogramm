"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

function normalizeDate(value?: string | null) {
  return value ? new Date(value) : null
}

export async function createProjectContainer(data: {
  projectId: string
  containerMasterId: string
  departureOperationDate?: string | null
  arrivalSiteDate?: string | null
  arrivalOperationDate?: string | null
}) {
  const master = await prisma.containerMaster.findUnique({
    where: { id: data.containerMasterId },
  })

  if (!master) {
    throw new Error("Container nicht gefunden")
  }

  await prisma.projectContainer.create({
    data: {
      projectId: data.projectId,
      containerMasterId: master.id,
      containerName: master.name,
      containerNumber: master.containerNumber,
      volumeTon: master.volumeTon,
      departureOperationDate: normalizeDate(data.departureOperationDate),
      arrivalSiteDate: normalizeDate(data.arrivalSiteDate),
      arrivalOperationDate: normalizeDate(data.arrivalOperationDate),
    },
  })

  revalidatePath(`/projekte/${data.projectId}`)
}

export async function updateProjectContainerDates(data: {
  id: string
  projectId: string
  departureOperationDate?: string | null
  arrivalSiteDate?: string | null
  arrivalOperationDate?: string | null
}) {
  await prisma.projectContainer.update({
    where: { id: data.id },
    data: {
      departureOperationDate: normalizeDate(data.departureOperationDate),
      arrivalSiteDate: normalizeDate(data.arrivalSiteDate),
      arrivalOperationDate: normalizeDate(data.arrivalOperationDate),
    },
  })

  revalidatePath(`/projekte/${data.projectId}`)
}

export async function deleteProjectContainer(id: string, projectId: string) {
  await prisma.projectContainer.delete({
    where: { id },
  })

  revalidatePath(`/projekte/${projectId}`)
}
