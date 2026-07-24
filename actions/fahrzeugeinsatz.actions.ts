"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"



export async function getFleetVehicles(){

return prisma.fleetVehicle.findMany({
 orderBy:{
  name:"asc"
 }
})

}



export async function createVehicleAssignment(data:{
 projectId:string
 vehicleId:string
}){


await prisma.vehicleAssignment.create({

data:{
 projectId:data.projectId,
 vehicleId:data.vehicleId
}

})


revalidatePath(
`/projekte/${data.projectId}`
)

}



export async function updateVehicleAssignment(
id:string,
data:{
 vehicleId:string
 departureAt?:string
 arrivalSiteAt?:string
 arrivalCompanyAt?:string
 driverId?:string
}
){


const assignment =
await prisma.vehicleAssignment.update({

where:{
 id
},

data:{
 vehicleId:data.vehicleId,

 departureAt:data.departureAt
 ? new Date(data.departureAt)
 : null,

 arrivalSiteAt:data.arrivalSiteAt
 ? new Date(data.arrivalSiteAt)
 : null,

 arrivalCompanyAt:data.arrivalCompanyAt
 ? new Date(data.arrivalCompanyAt)
 : null,

 driverId:data.driverId || null
}

})


revalidatePath(
`/projekte/${assignment.projectId}`
)

}



export async function deleteVehicleAssignment(
id:string
){


const assignment =
await prisma.vehicleAssignment.findUnique({

where:{
 id
}

})


if(!assignment) return



await prisma.vehicleAssignment.delete({

where:{
 id
}

})


revalidatePath(
`/projekte/${assignment.projectId}`
)


}