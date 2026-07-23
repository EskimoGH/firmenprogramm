import { prisma } from "@/lib/prisma"

import { AvvCard } from "@/components/settings/avv-card"
import { VehicleCard } from "@/components/settings/vehicle-card"

export default async function EinstellungenPage() {

  const avvs = await prisma.avvMaster.findMany({
    orderBy: {
      avv: "asc",
    },
  })

  const vehicles = await prisma.vehicleMaster.findMany({
    orderBy: {
      type: "asc",
    },
  })


  return (
    <div className="p-8 space-y-6">

      <h1 className="text-3xl font-semibold">
        Einstellungen
      </h1>


      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
            <AvvCard avvs={avvs} />
        </div>
        <div className="md:col-span-2">
            <VehicleCard vehicles={vehicles} />
        </div>

      </div>

    </div>
  )
}