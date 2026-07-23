import { VehicleTable } from "./vehicle-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VehicleMaster } from "@prisma/client"
import { CreateVehicleDialog } from "./create-vehicle-dialog"


type Props = {
  vehicles: VehicleMaster[]
}


export function VehicleCard({
  vehicles,
}: Props) {

  return (
    <Card>

        <CardHeader>

        <div className="flex items-center justify-between">

            <CardTitle>
            Fahrzeuge
            </CardTitle>

            <CreateVehicleDialog />

        </div>

        </CardHeader>

      <CardContent>
        <VehicleTable vehicles={vehicles} />
      </CardContent>

    </Card>
  )
}