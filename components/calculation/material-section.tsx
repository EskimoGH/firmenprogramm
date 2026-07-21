import { Card, CardContent } from "@/components/ui/card"
import { PositionDialog } from "./position-dialog"
import { MaterialTable } from "./material-table"
import { formatCurrency } from "@/lib/format/currency"


export function MaterialSection({
  calculation,
  avvMaster,
  projectId,
}: {
  calculation: any
  avvMaster: any[]
  projectId: string
}) {

const materialTotal =
  calculation.summary?.materialTotal ?? 0
  
  return (

    <Card>

      <CardContent className="p-6 space-y-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-6">

              <h2 className="text-xl font-semibold">
                Materialpositionen
              </h2>

              <div className="text-sm">

                <span className="font-semibold text-lg">
                  {formatCurrency(materialTotal)}
                </span>
              </div>

            </div>

            <PositionDialog
              calculation={calculation}
              avvMaster={avvMaster}
            />

          </div>

        <MaterialTable
          positions={calculation.positions}
          projectId={projectId}
        />


      </CardContent>

    </Card>

  )
}