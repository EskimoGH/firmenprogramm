import { createCalculation } from "@/actions/calculation.actions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

interface AngebotsCardProps {
  projectId: string
  calculations: {
    id: string
    version: number
    title: string | null
    awarded: boolean
  }[]
}

export default function AngebotsCard({
  projectId,
  calculations,
}: AngebotsCardProps) {

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex justify-between items-center mb-4">

        <div>
          <h2 className="text-xl font-semibold">
            Angebote
          </h2>

          <p className="text-sm text-muted-foreground">
            Berechnungen und Angebotsversionen
          </p>
        </div>


        <form action={createCalculation}>

          <input
            type="hidden"
            name="projectId"
            value={projectId}
          />

            <Button type="submit" size="sm">
            + Berechnung
            </Button>

        </form>

      </div>


      {calculations.length === 0 ? (

        <div className="text-sm text-gray-500 py-6">
          Noch keine Berechnung vorhanden.
        </div>

      ) : (

        <div className="space-y-3">

          {calculations.map((calc)=>(
            
            <div
              key={calc.id}
              className="
              flex 
              justify-between
              items-center
              rounded-lg
              border
              p-4
              "
            >
            <div className="flex items-center gap-4">

              <div>
                <p className="font-medium">
                  Angebot Version {calc.version}
                </p>

                <p className="text-sm text-gray-500">
                  {calc.title ?? "Entwurf"}
                </p>
              </div>


              {calc.awarded && (
                <Badge>
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Zuschlag
                </Badge>
              )}

            </div>

                <a
                href={`/projekte/${projectId}/kalkulation/${calc.id}`}
                className="
                    rounded-md
                    border
                    px-3
                    py-1
                    text-sm
                "
                >
                Öffnen
                </a>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}