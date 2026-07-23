import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { AvvRowActions } from "./avv-row-actions"

export function AvvTable({
  avvs,
}:{
  avvs:any[]
}){

  return(

    <div className="rounded-md border">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>
              AVV
            </TableHead>

            <TableHead>
              Bezeichnung
            </TableHead>

            <TableHead className="w-[60px]"/>

          </TableRow>

        </TableHeader>

        <TableBody>

          {avvs.map((avv)=>(

            <TableRow key={avv.id}>

              <TableCell>

                {avv.avv}

              </TableCell>

              <TableCell>

                {avv.description}

              </TableCell>

              <TableCell>

                <AvvRowActions avv={avv}/>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>

  )

}