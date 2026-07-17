import { Card, CardContent } from "@/components/ui/card"
import { PositionDialog } from "./position-dialog"
import { MaterialTable } from "./material-table"


export function MaterialSection({
  calculation,
  avvMaster,
}: {
  calculation: any
  avvMaster: any[]
}) {

  return (

    <Card>

      <CardContent className="p-6 space-y-4">


        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-xl font-semibold">
              Materialpositionen
            </h2>

          </div>


          <PositionDialog
            calculation={calculation}
            avvMaster={avvMaster}
          />


        </div>



        <MaterialTable
          positions={calculation.positions}
        />


      </CardContent>

    </Card>

  )
}