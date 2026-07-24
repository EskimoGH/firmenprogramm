import { FleetTable } from "./fleet-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FleetVehicle } from "@prisma/client"
import { CreateFleetDialog } from "./create-fleet-dialog"


type Props = {
  vehicles: FleetVehicle[]
}


export function FleetCard({
  vehicles,
}: Props) {

  return (
    <Card>

      <CardHeader>

        <div className="flex items-center justify-between">

          <CardTitle>
            Eigene Flotte
          </CardTitle>

          <CreateFleetDialog />

        </div>

      </CardHeader>


      <CardContent>

        <FleetTable vehicles={vehicles} />

      </CardContent>

    </Card>
  )
}