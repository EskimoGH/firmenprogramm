"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"



export async function getContainerMasters(){

  return prisma.containerMaster.findMany({

    orderBy:{
      name:"asc"
    }

  })

}



export async function createProjectContainer(data:{
  projectId:string
  containerId:string
}){


  const container =
    await prisma.containerMaster.findUnique({

      where:{
        id:data.containerId
      }

    })


  if(!container){

    throw new Error(
      "Container nicht gefunden"
    )

  }



  await prisma.projectContainer.create({

    data:{

      projectId:data.projectId,

      containerMasterId:container.id,

      containerName:container.name,

      containerNumber:container.containerNumber,

      volumeTon:container.volumeTon,

    }

  })


  revalidatePath(
    `/projekte/${data.projectId}`
  )

}





export async function updateProjectContainer(
  id:string,
  data:{
    containerMasterId?:string

    containerName?:string
    containerNumber?:string
    volumeTon?:number

    departureOperationDate?:Date|null
    arrivalSiteDate?:Date|null
    arrivalOperationDate?:Date|null
  }
){


  const container =
    await prisma.projectContainer.findUnique({

      where:{
        id
      }

    })


  if(!container){

    throw new Error(
      "Projektcontainer nicht gefunden"
    )

  }



  await prisma.projectContainer.update({

    where:{
      id
    },

    data

  })



  revalidatePath(
    `/projekte/${container.projectId}`
  )

}





export async function deleteProjectContainer(
  id:string
){


  const container =
    await prisma.projectContainer.findUnique({

      where:{
        id
      }

    })


  if(!container) return



  await prisma.projectContainer.delete({

    where:{
      id
    }

  })



  revalidatePath(
    `/projekte/${container.projectId}`
  )


}