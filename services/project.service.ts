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
          additionalCosts:true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export async function getProject(id: string) {
  return prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      company: {
        include: {
          contacts: true
        },
      },
      calculations: {
        include: {
          positions: true,
          transports: true,
          additionalCosts:true,
          summary: true,
        },
      },
        vehicleAssignments: {
          include: {
            vehicle: true,
        },
      },
      projectContainers: { 
        orderBy: {
           createdAt: "desc", 
          }, 
        },
      documents: true,
    },
  })
}