import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator } from "lucide-react"


export function CalculationHeader({
  calculation,
}: {
  calculation: any
}) {

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            <Calculator className="h-6 w-6" />
          </div>


          <div>
            <h1 className="text-xl font-semibold">
              {calculation.title || "Berechnung"}
            </h1>

            <p className="text-sm text-muted-foreground">
              {calculation.project.company.name}
            </p>
          </div>

        </div>


        <div className="flex gap-2">

          <Badge variant="outline">
            Version {calculation.version}
          </Badge>


          {calculation.active && (
            <Badge>
              Aktiv
            </Badge>
          )}

        </div>

      </CardContent>
    </Card>
  )
}