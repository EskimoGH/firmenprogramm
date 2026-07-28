import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ContainerMasterRowActions } from "./containermaster-row-actions"


export function ContainerMasterTable({
  containers,
}: {
  containers: any[]
}) {


  if (containers.length === 0) {

    return (

      <div className="text-sm text-muted-foreground">

        Keine Container-Stammdaten vorhanden.

      </div>

    )

  }


  return (

    <div className="overflow-x-auto">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>
              Name
            </TableHead>

            <TableHead>
              Containernummer
            </TableHead>

            <TableHead>
              Volumen
            </TableHead>

            <TableHead className="text-right">
            </TableHead>

          </TableRow>

        </TableHeader>


        <TableBody>

          {containers.map((container) => (

            <TableRow key={container.id}>

              <TableCell>
                {container.name}
              </TableCell>


              <TableCell>
                {container.containerNumber}
              </TableCell>


              <TableCell>
                {container.volumeTon} t
              </TableCell>


              <TableCell className="text-right">

                <ContainerMasterRowActions
                  container={container}
                />

              </TableCell>


            </TableRow>

          ))}


        </TableBody>


      </Table>


    </div>

  )

}