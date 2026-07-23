"use client"

import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/components/ui/table"


import { formatCurrency } from "@/lib/format/currency"
import { AdditionalCostRowActions } from "./additionalCost-row-actions"



export function AdditionalCostTable({
costs,
projectId,
calculationId
}:{
costs:any[]
projectId:string
calculationId:string
}){


return (

<div className="rounded-md border">
    <Table>


        <TableHeader>

            <TableRow>


                <TableHead>
                Bezeichnung
                </TableHead>


                <TableHead>
                Menge
                </TableHead>


                <TableHead>
                Einzelpreis
                </TableHead>


                <TableHead>
                Gesamt
                </TableHead>


                <TableHead className="text-right">
                Aktionen
                </TableHead>


            </TableRow>

        </TableHeader>



        <TableBody>


            {
            costs.map((cost)=>(

            <TableRow
            key={cost.id}
            >


            <TableCell>
            {cost.description}
            </TableCell>


            <TableCell>
            {cost.quantity}
            </TableCell>


            <TableCell>
            {formatCurrency(cost.unitPrice)}
            </TableCell>


            <TableCell className="font-semibold">

            {formatCurrency(cost.total)}

            </TableCell>



            <TableCell className="text-right">

            <AdditionalCostRowActions
                cost={cost}
                projectId={projectId}
                calculationId={calculationId}
            />

            </TableCell>


            </TableRow>


            ))

            }



            {
            costs.length === 0 && (

            <TableRow>

            <TableCell
            colSpan={5}
            className="text-center text-muted-foreground"
            >

            Keine Zusatzkosten vorhanden

            </TableCell>

            </TableRow>

            )

            }


        </TableBody>


    </Table>
</div>
)

}