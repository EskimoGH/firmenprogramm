"use client"


import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog"


import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue
} from "@/components/ui/select"


import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { useEffect, useState } from "react"


import {
 getFleetVehicles,
 updateVehicleAssignment
} from "@/actions/fahrzeugeinsatz.actions"



export function EditFahrzeugeinsatzDialog({
 assignment,
 open,
 onOpenChange
}:{
 assignment:any
 open:boolean
 onOpenChange:(open:boolean)=>void
}){


const [vehicleId,setVehicleId] =
useState<string | null>(
 assignment.vehicleId
)


const [departureAt,setDepartureAt] =
useState(
 assignment.departureAt
 ? new Date(assignment.departureAt)
   .toISOString()
   .slice(0,16)
 : ""
)


const [arrivalSiteAt,setArrivalSiteAt] =
useState(
 assignment.arrivalSiteAt
 ? new Date(assignment.arrivalSiteAt)
   .toISOString()
   .slice(0,16)
 : ""
)


const [arrivalCompanyAt,setArrivalCompanyAt] =
useState(
 assignment.arrivalCompanyAt
 ? new Date(assignment.arrivalCompanyAt)
   .toISOString()
   .slice(0,16)
 : ""
)


const [driverId,setDriverId] =
useState(
 assignment.driverId ?? ""
)



const [vehicles,setVehicles] =
useState<any[]>([])



useEffect(()=>{

getFleetVehicles()
.then(setVehicles)

},[])



async function handleSave(){


if(!vehicleId) return


await updateVehicleAssignment(
 assignment.id,
 {
  vehicleId,
  departureAt,
  arrivalSiteAt,
  arrivalCompanyAt,
  driverId
 }
)


onOpenChange(false)

}



return (

<>

<Dialog
 open={open}
 onOpenChange={onOpenChange}
>

<DialogContent>


<DialogHeader>

<DialogTitle>
Fahrzeugeinsatz bearbeiten
</DialogTitle>

</DialogHeader>



<div className="space-y-4">



<Select
value={vehicleId}
onValueChange={setVehicleId}
>


<SelectTrigger>

<SelectValue placeholder="Fahrzeug auswählen"/>

</SelectTrigger>



<SelectContent>

{vehicles.map(vehicle=>(

<SelectItem
key={vehicle.id}
value={vehicle.id}
>

{vehicle.name}

{vehicle.licensePlate &&
` (${vehicle.licensePlate})`
}

</SelectItem>

))}


</SelectContent>


</Select>




<div>

<Label>
Abreise Betrieb
</Label>

<Input
type="datetime-local"
value={departureAt}
onChange={(e)=>setDepartureAt(e.target.value)}
/>

</div>



<div>

<Label>
Baustellenankunft
</Label>

<Input
type="datetime-local"
value={arrivalSiteAt}
onChange={(e)=>setArrivalSiteAt(e.target.value)}
/>

</div>



<div>

<Label>
Ankunft Betrieb
</Label>

<Input
type="datetime-local"
value={arrivalCompanyAt}
onChange={(e)=>setArrivalCompanyAt(e.target.value)}
/>

</div>



<div>

<Label>
Fahrer
</Label>

<Input
value={driverId}
onChange={(e)=>setDriverId(e.target.value)}
placeholder="Name Fahrer"
/>

</div>



<Button
onClick={handleSave}
>

Speichern

</Button>



</div>


</DialogContent>


</Dialog>


</>

)

}