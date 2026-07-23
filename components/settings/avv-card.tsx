import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { CreateAvvDialog } from "./create-avv-dialog"
import { AvvRowActions } from "./avv-row-actions"


type AvvCardProps = {
  avvs: {
    id: string
    avv: string
    description: string
  }[]
}


export function AvvCard({ avvs }: AvvCardProps) {

  return (

    <Card>

      <CardHeader className="flex flex-row items-center justify-between">

        <CardTitle>
          AVV Stammdaten
        </CardTitle>


        <CreateAvvDialog />


      </CardHeader>


      <CardContent>

        <div className="space-y-2">


          {avvs.length === 0 ? (

            <p className="text-sm text-muted-foreground">
              Keine AVV-Einträge vorhanden.
            </p>


          ) : (


            avvs.map((item) => (

              <div
                key={item.id}
                className="flex items-center justify-between border-b py-3"
              >


                <div>

                  <p className="font-medium">
                    {item.avv}
                  </p>


                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>


                </div>


                <div className="flex items-center gap-4">

                  <AvvRowActions
                    avv={item}
                  />


                </div>


              </div>

            ))

          )}


        </div>


      </CardContent>


    </Card>

  )
}