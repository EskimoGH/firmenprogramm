"use server"

import { prisma } from "@/lib/prisma"



export async function updateMaterialTotal(
  calculationId: string
) {

  const positions = await prisma.auctionPosition.findMany({
    where: {
      calculationId,
    },

    select: {
      materialValue: true,
      quantity: true,
    },
  })


  const materialTotal = positions.reduce(
    (sum, position) => {

      const value =
        (position.materialValue ?? 0) *
        position.quantity

      return sum + value

    },
    0
  )


  await prisma.calculationSummary.upsert({

    where: {
      calculationId,
    },

    update: {
      materialTotal,
    },

    create: {
      calculationId,
      materialTotal,
    },

  })


  return materialTotal
}

export async function updateTransportTotal(
  calculationId: string
) {

  const transports = await prisma.projectTransport.findMany({
    where: {
      calculationId,
    },

    select: {
      totalCost: true,
    },
  })

  const transportTotal = transports.reduce(
    (sum, transport) => {
      return sum + (transport.totalCost ?? 0)
    },
    0
  )

  await prisma.calculationSummary.upsert({

    where: {
      calculationId,
    },

    update: {
      transportTotal,
    },

    create: {
      calculationId,
      transportTotal,
    },

  })
  await updateOfferPrice(calculationId)
  return transportTotal
}

export async function updateOtherTotal(
  calculationId:string
){

const costs =
await prisma.additionalCost.findMany({

where:{
 calculationId
},

select:{ 
 total:true
}

})


const otherTotal =
costs.reduce(
(sum,cost)=>
sum + cost.total,
0
)


await prisma.calculationSummary.upsert({

where:{
 calculationId
},

update:{
 otherTotal
},

create:{
 calculationId,
 otherTotal
}

})
await updateOfferPrice(calculationId)

return otherTotal

}

export async function updateOfferPrice(
  calculationId:string
){

  const summary =
    await prisma.calculationSummary.findUnique({

      where:{
        calculationId,
      },

    })


  if(!summary){
    return
  }


  const offerPrice =

    (summary.materialTotal ?? 0)

    -

    (summary.transportTotal ?? 0)

    -

    (summary.containerTotal ?? 0)

    -

    (summary.otherTotal ?? 0)



  await prisma.calculationSummary.update({

    where:{
      calculationId,
    },

    data:{
      offerPrice,
    },

  })

}