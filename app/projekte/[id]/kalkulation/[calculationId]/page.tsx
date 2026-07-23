import { prisma } from "@/lib/prisma"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { CalculationHeader } from "@/components/calculation/calculation-header"
import { MaterialSection } from "@/components/calculation/material-section"
import { TransportSection } from "@/components/calculation/transport-section"
//import { AdditionalCostCard } from "@/components/calculation/additional-cost-card"
//import { SummaryCard } from "@/components/calculation/summary-card"

export default async function CalculationPage({
  params,
}: {
  params: Promise<{
    id: string
    calculationId: string
    
  }>
}) {

  const { id: projectId, calculationId } = await params

  const calculation = await prisma.calculation.findUnique({

    where: {
      id: calculationId,
    },

    include: {

      project: {
        include: {
          company: true,
        },
      },

      positions: true,
      transports: true,
      containers: true,
      summary: true,

    },

  })

    const avvMaster = await prisma.avvMaster.findMany({
    orderBy: {
      avv: "asc",
    },
  })

    const vehicleMaster = await prisma.vehicleMaster.findMany({
    orderBy: {
      type: "asc",
    },
  })

  if (!calculation) {

    return <div>Kalkulation nicht gefunden.</div>

  }

  return (

    <div className="p-8 space-y-6">
      <Breadcrumb>

        <BreadcrumbList>

          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              Firmenprogramm
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/projekte">
              Projekte
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href={`/projekte/${calculation.project.id}`}>
              {calculation.project.verkaufsId}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>
              Berechnung Version {calculation.version}
            </BreadcrumbPage>
          </BreadcrumbItem>

        </BreadcrumbList>

      </Breadcrumb>

      <CalculationHeader calculation={calculation} />

      <MaterialSection calculation={calculation} avvMaster={avvMaster} projectId={projectId}/>

      <TransportSection calculation={calculation} vehicleMaster={vehicleMaster} />

      {/* <AdditionalCostCard calculation={calculation} /> */}

      {/* <SummaryCard calculation={calculation} /> */}

    </div>

  )

}