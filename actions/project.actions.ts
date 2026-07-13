"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

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