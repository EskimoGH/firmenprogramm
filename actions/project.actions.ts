"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function createProject(formData: FormData) {
  const companyName = formData.get("company") as string
  const verkaufsId = formData.get("verkaufsId") as string
  const projektname = formData.get("projektname") as string
  const auftragsnummer = formData.get("auftragsnummer") as string
  const street = formData.get("street") as string
  const postalCode = formData.get("postalCode") as string
  const city = formData.get("city") as string

  const company = await prisma.company.create({
    data: {
      name: companyName,
    },
  })

  const project = await prisma.project.create({
    data: {
      verkaufsId,
      projektname,
      auftragsnummer,
      street,
      postalCode,
      city,
      companyId: company.id,
    },
  })

  redirect(`/projekte/${project.id}`)
}

export async function updateProjectNote(
  projectId: string,
  note: string
) {

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      note,
    },
  })

  revalidatePath(`/projekte/${projectId}`)
}

export async function updateProjectLocation(
  projectId: string,
  data: {
    street: string
    postalCode: string
    city: string
  }
) {

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data,
  })

  revalidatePath(`/projekte/${projectId}`)
}

export async function updateProjectInformation(
  projectId: string,
  data: {
    projektname: string
    auftragsnummer: string
  }
) {

  await prisma.project.update({

    where: {
      id: projectId,
    },

    data: {
      projektname: data.projektname || null,
      auftragsnummer: data.auftragsnummer || null,
    },

  })


  revalidatePath(`/projekte/${projectId}`)
}