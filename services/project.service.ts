import { prisma } from "@/lib/prisma"

export async function getProjects() {
  return prisma.project.findMany({
    include: {
      company: true,
      calculations: {
        include: {
          summary: true,
          positions: true,
          transports: true,
          containers: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}