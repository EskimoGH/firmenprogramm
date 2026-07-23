import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { TransportRowActions } from "./transport-row-actions"

import { formatCurrency } from "@/lib/format/currency"


export function TransportTable({
 transports,
 vehicleMaster,
}:{
 transports:any[]
 vehicleMaster:any[]
}){


return (

<div className="rounded-md border">


<Table>


<TableHeader>

<TableRow>

<TableHead>
Fahrzeug
</TableHead>

<TableHead>
Strecke
</TableHead>

<TableHead>
Fahrten
</TableHead>

<TableHead>
Übernachtungen
</TableHead>

<TableHead>
Gesamtkosten
</TableHead>

<TableHead className="text-right">
Aktionen
</TableHead>

</TableRow>

</TableHeader>



<TableBody>


{transports.map((transport)=>(


<TableRow key={transport.id}>


<TableCell>
{transport.vehicleType}
</TableCell>


<TableCell>
{transport.distanceKm} km
</TableCell>


<TableCell>
{transport.trips}
</TableCell>


<TableCell>
{transport.overnight ?? 0}
</TableCell>


<TableCell className="font-semibold">

{formatCurrency(
  transport.totalCost ?? 0
)}

</TableCell>


<TableCell className="text-right">

<TransportRowActions
  transport={transport}
  vehicleMaster={vehicleMaster}
/>

</TableCell>


</TableRow>


))}


{transports.length === 0 && (

  <TableRow>

    <TableCell
      colSpan={6}
      className="text-center text-muted-foreground"
    >

      Keine Transportkosten vorhanden

    </TableCell>

  </TableRow>

)}


</TableBody>


</Table>


</div>


)

}