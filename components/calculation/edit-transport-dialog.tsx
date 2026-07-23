"use client"


import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle,
} from "@/components/ui/dialog"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export function EditTransportDialog({
transport,
open,
onOpenChange,
}:{
transport:any
open:boolean
onOpenChange:(open:boolean)=>void
}){


return (

<Dialog
open={open}
onOpenChange={onOpenChange}
>


<DialogContent className="max-w-3xl">


<DialogHeader>

<DialogTitle>
Transport bearbeiten
</DialogTitle>

</DialogHeader>



<div className="space-y-4">


<Card>

<CardHeader>
<CardTitle>
Fahrzeug
</CardTitle>
</CardHeader>


<CardContent>

{transport.vehicleType}

</CardContent>


</Card>



<Card>

<CardHeader>
<CardTitle>
Transportdaten
</CardTitle>
</CardHeader>


<CardContent>

Noch Eingabefelder

</CardContent>


</Card>



<Card>

<CardHeader>
<CardTitle>
Berechnung
</CardTitle>
</CardHeader>


<CardContent>

Automatische Berechnung

</CardContent>


</Card>



</div>


</DialogContent>


</Dialog>

)

}