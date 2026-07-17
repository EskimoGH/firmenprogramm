import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export function MaterialTable({
  positions,
}: {
  positions: any[]
}) {

  return (

    <div className="rounded-md border">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>AVV</TableHead>

            <TableHead>Position</TableHead>

            <TableHead>Menge</TableHead>

            <TableHead>Buntmetall-Anteil</TableHead>

            <TableHead>Börsenpreis</TableHead>

            <TableHead>Abschlag</TableHead>

            <TableHead>Materialrohwert</TableHead>

            <TableHead>Demontagekosten</TableHead>

            <TableHead>
              Materialwert nach Abzug
            </TableHead>

          </TableRow>

        </TableHeader>



        <TableBody>


          {positions.map((position) => (

            <TableRow key={position.id}>


              <TableCell>
                {position.avv}
              </TableCell>


              <TableCell>
                {position.description}
              </TableCell>


              <TableCell>
                {position.quantity}
              </TableCell>


              <TableCell>
                {position.metalShare ?? 0} %
              </TableCell>


              <TableCell>
                {position.exchangePrice?.toFixed(2) ?? "-"} €
              </TableCell>


              <TableCell>
                {position.discount ?? 0} %
              </TableCell>


              <TableCell>
                {position.rawValue?.toFixed(2) ?? "-"} €
              </TableCell>


              <TableCell>
                {position.dismantlingCost?.toFixed(2) ?? "-"} €
              </TableCell>


              <TableCell className="font-semibold">

                {position.materialValue?.toFixed(2) ?? "-"} €

              </TableCell>


            </TableRow>

          ))}


        </TableBody>

      </Table>


    </div>

  )
}