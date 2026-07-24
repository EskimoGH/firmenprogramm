"use client"


import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogTrigger
} from "@/components/ui/dialog"


import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue
} from "@/components/ui/select"


import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"

import {
 createVehicleAssignment,
 getFleetVehicles
} from "@/actions/fahrzeugeinsatz.actions"



export function CreateVehicleAssignmentDialog({
 projectId
}:{
 projectId:string
}) {

const [open,setOpen] = useState(false)

const [vehicleId,setVehicleId] = useState<string | null>(null)

const [vehicles,setVehicles] = useState<any[]>([])



useEffect(()=>{

getFleetVehicles()
.then(setVehicles)

},[])

async function handleSave(){

if(!vehicleId) return


await createVehicleAssignment({
 projectId,
 vehicleId
})


setVehicleId(null)
setOpen(false)
}



return (

<Dialog
 open={open}
 onOpenChange={setOpen}
>


<DialogTrigger
  render={
<Button
size="sm"
onClick={() => setOpen(true)}
>

+ Fahrzeug

</Button>
  }
/>

<DialogContent>

<DialogHeader>

<DialogTitle>
Fahrzeug zuordnen
</DialogTitle>

</DialogHeader>


<Select
  value={vehicleId}
  onValueChange={(value) => {
    setVehicleId(value)
  }}
>


<SelectTrigger>

<SelectValue placeholder="Fahrzeug auswählen"/>

</SelectTrigger>



<SelectContent>

{vehicles.map((vehicle)=>(

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



<Button
onClick={handleSave}
disabled={!vehicleId}
>

Speichern

</Button>


</DialogContent>


</Dialog>

)

}