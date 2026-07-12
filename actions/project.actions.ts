"use server"

import { prisma } from "@/lib/prisma"

export async function createProject() {
  const company = await prisma.company.create({
    data: {
      name: "Neue Firma",
    },
  })

  await prisma.project.create({
    data: {
      verkaufsId: `V-${Date.now()}`,
      companyId: company.id,
    },
  })
}