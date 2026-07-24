import {
 Card,
 CardContent,
 CardHeader,
 CardTitle
} from "@/components/ui/card"

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow
} from "@/components/ui/table"

import { CreateVehicleAssignmentDialog } from "./create-fahrzeugeinsatz-dialog"
import { FahrzeugRowActions } from "./fahrzeug-row-actions"



export function FahrzeugeinsatzCard({
  projectId,
  assignments
}: {
  projectId: string
  assignments: any[]
}) {


return (

<Card>


<CardHeader className="flex flex-row items-center justify-between">


<CardTitle>
Fahrzeugeinsatz
</CardTitle>


<CreateVehicleAssignmentDialog
 projectId={projectId}
/>


</CardHeader>



<CardContent>

<div className="rounded-md border">
<Table>


<TableHeader>


<TableRow>


<TableHead>
KFZ
</TableHead>


<TableHead>
Abreise Betrieb
</TableHead>


<TableHead>
Baustellenankunft
</TableHead>


<TableHead>
Ankunft Betrieb
</TableHead>


<TableHead>
Fahrer
</TableHead>


<TableHead className="text-right">
Aktionen
</TableHead>


</TableRow>


</TableHeader>



<TableBody>



{assignments.length === 0 ? (

<TableRow>


<TableCell
colSpan={6}
className="text-center text-muted-foreground"
>

Keine Fahrzeuge zugeordnet

</TableCell>


</TableRow>


) : (


assignments.map((item)=>(


<TableRow
key={item.id}
>


<TableCell>
{item.vehicle.name}

{item.vehicle.licensePlate && (
<span className="text-muted-foreground ml-1">
({item.vehicle.licensePlate})
</span>
)}

</TableCell>



<TableCell>

{item.departureAt
 ? new Date(item.departureAt).toLocaleDateString("de-DE")
 : "-"
}

</TableCell>



<TableCell>

{item.arrivalSiteAt
 ? new Date(item.arrivalSiteAt).toLocaleDateString("de-DE")
 : "-"
}

</TableCell>



<TableCell>

{item.arrivalCompanyAt
 ? new Date(item.arrivalCompanyAt).toLocaleDateString("de-DE")
 : "-"
}

</TableCell>



<TableCell>

{item.driverId ?? "-"}

</TableCell>



<TableCell className="text-right">


<FahrzeugRowActions
 assignment={item}
/>


</TableCell>



</TableRow>


))


)}



</TableBody>


</Table>
</div>


</CardContent>


</Card>

)

}