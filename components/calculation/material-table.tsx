import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { MaterialRowActions } from "@/components/calculation/material-row-actions"
import { formatCurrency} from "@/lib/format/currency"
import { formatNumber } from "@/lib/format/number-to"



export function MaterialTable({
  positions,
  projectId,
}: {
  positions: any[]
  projectId: string
}) {

  return (

    <div className="rounded-md border">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>AVV</TableHead>

            <TableHead className="w-[200px]">Position</TableHead>

            <TableHead>Menge</TableHead>

            <TableHead>Buntmetall-Anteil</TableHead>

            <TableHead>Börsenpreis</TableHead>

            <TableHead>Abschlag</TableHead>

            <TableHead>Materialrohwert</TableHead>

            <TableHead>Demontagekosten</TableHead>

            <TableHead>Materialwert nach Abzug</TableHead>
            
            <TableHead className="text-right">Aktionen</TableHead>

          </TableRow>

        </TableHeader>



        <TableBody>


          {positions.map((position) => (

            <TableRow key={position.id}>


              <TableCell>
                {position.avv}
              </TableCell>


              <TableCell className="max-w-[100px] truncate">
                {position.description}
              </TableCell>


              <TableCell>
                {formatNumber(position.quantity)} to
              </TableCell>


              <TableCell>
                {position.metalShare ?? 0} %
              </TableCell>


              <TableCell>
                {formatNumber(position.exchangePrice)} €/to
              </TableCell>


              <TableCell>
                {formatNumber(position.discount)} €/to
              </TableCell>


              <TableCell>
                {formatNumber(position.rawValue)} €/to
              </TableCell>


              <TableCell>
                {formatNumber(position.dismantlingCost)} €/to
              </TableCell>


              <TableCell className="font-semibold">

                {formatNumber(position.materialValue)} €/to

              </TableCell>

              <TableCell className="text-right">

                <MaterialRowActions
                    position={position}
                    projectId={projectId}
                    calculationId={position.calculationId}
                />

              </TableCell>


            </TableRow>

          ))}


        </TableBody>

      </Table>


    </div>

  )
}