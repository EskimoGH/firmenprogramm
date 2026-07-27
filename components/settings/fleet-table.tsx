import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { FleetVehicle } from "@prisma/client"
import { FleetRowActions } from "./fleet-row-actions"


type Props = {
  vehicles: FleetVehicle[]
}


export function FleetTable({
  vehicles,
}: Props) {


  return (

    <Table>

      <TableHeader>

        <TableRow>

          <TableHead>
            Bezeichnung
          </TableHead>

          <TableHead>
            Typ
          </TableHead>

          <TableHead>
            Kennzeichen
          </TableHead>

          <TableHead>
            HU bis
          </TableHead>

          <TableHead>
            Letzte Wartung
          </TableHead>

          <TableHead>
            Gewicht
          </TableHead>

          <TableHead className="text-right">
            Aktionen
          </TableHead>

        </TableRow>

      </TableHeader>


      <TableBody>

        {vehicles.length === 0 ? (

          <TableRow>

            <TableCell
              colSpan={7}
              className="text-center text-muted-foreground"
            >
              Keine Fahrzeuge vorhanden
            </TableCell>

          </TableRow>

        ) : (

          vehicles.map((vehicle) => (

            <TableRow key={vehicle.id}>

              <TableCell>
                {vehicle.name}
              </TableCell>

              <TableCell>
                {vehicle.type}
              </TableCell>

              <TableCell>
                {vehicle.licensePlate ?? "-"}
              </TableCell>

              <TableCell>
                {vehicle.inspectionUntil
                  ? vehicle.inspectionUntil.toLocaleDateString("de-DE")
                  : "-"
                }
              </TableCell>

              <TableCell>
                {vehicle.lastService
                  ? vehicle.lastService.toLocaleDateString("de-DE")
                  : "-"
                }
              </TableCell>

              <TableCell>
                {vehicle.weight
                  ? `${vehicle.weight} t`
                  : "-"
                }
              </TableCell>


              <TableCell className="text-right">

                <FleetRowActions vehicle={vehicle}/>

              </TableCell>

            </TableRow>

          ))

        )}

      </TableBody>

    </Table>

  )
}