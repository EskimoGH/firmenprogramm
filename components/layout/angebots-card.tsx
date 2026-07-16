import { createCalculation } from "@/actions/calculation.actions"
import { Button } from "@/components/ui/button"

interface AngebotsCardProps {
  projectId: string
  calculations: {
    id: string
    version: number
    title: string | null
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
            + Berechnung erstellen
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

              <div>

                <p className="font-medium">
                  Angebot Version {calc.version}
                </p>

                <p className="text-sm text-gray-500">
                  {calc.title ?? "Entwurf"}
                </p>

              </div>


              <a
                href={`/calculations/${calc.id}`}
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