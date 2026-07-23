import { Card, CardContent } from "@/components/ui/card"

import { TransportTable } from "./transport-table"
import { CreateTransportDialog } from "./create-transport-dialog"

import { formatCurrency } from "@/lib/format/currency"


export function TransportSection({
  calculation,
  vehicleMaster,
}: {
  calculation: any
  vehicleMaster: any[]
}) {


  const transportTotal =
    calculation.summary?.transportTotal ?? 0


  return (

    <Card>

      <CardContent className="p-6 space-y-4">


        <div className="flex items-center justify-between">


          <div className="flex items-center gap-6">

            <h2 className="text-xl font-semibold">
              Transportkosten
            </h2>


            <div className="text-sm">

              <span className="font-semibold text-lg">
                {formatCurrency(transportTotal)}
              </span>

            </div>

          </div>


          <CreateTransportDialog
            vehicleMaster={vehicleMaster}
            calculationId={calculation.id}
            projectId={calculation.projectId}
          />


        </div>



        <TransportTable
          transports={calculation.transports}
          vehicleMaster={vehicleMaster}
        />


      </CardContent>

    </Card>

  )
}