import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator } from "lucide-react"
import { formatCurrency } from "@/lib/format/currency"


export function CalculationHeader({
  calculation,
  offerPrice,
}: {
  calculation: any
  offerPrice: number
}) {

const totalTons = calculation.positions.reduce(
  (sum: number, position: any) =>
    sum + (position.quantity ?? 0),
  0
)

const offerPricePerTon =
  totalTons > 0
    ? offerPrice / totalTons
    : 0
  
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            <Calculator className="h-6 w-6" />
          </div>

            <div>
              <h1 className="text-2xl font-bold">
                {calculation.title || "Berechnung"}
              </h1>

              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  Angebotspreis: {formatCurrency(offerPrice)}
                </span>

                <span className="text-sm text-muted-foreground">
                  {formatCurrency(offerPricePerTon)} €/t · {totalTons.toFixed(2)} t
                </span>
              </div>

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