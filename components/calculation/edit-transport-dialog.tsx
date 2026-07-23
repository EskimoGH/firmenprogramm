"use client"

import { useEffect, useMemo, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { calculateTransportCost } from "@/lib/calculation/transport-calculation"

import { updateTransportPosition } from "@/actions/transport-position.action"



export function EditTransportDialog({
  transport,
  vehicleMaster,
  projectId,
  open,
  onOpenChange,
}:{
  transport:any
  vehicleMaster:any[]
  projectId:string
  open:boolean
  onOpenChange:(open:boolean)=>void
}){


const [vehicle,setVehicle] =
useState<any>(null)

const [hourlyRate,setHourlyRate] =
useState(0)


const [distanceKm,setDistanceKm] =
useState(0)

const [trips,setTrips] =
useState(1)


const [overnightStops,setOvernightStops] =
useState(0)

const [overnightCost,setOvernightCost] =
useState(0)


function selectVehicle(type: string | null){

  if(!type){
    setVehicle(null)
    return
  }


  const selected =
    vehicleMaster.find(
      (v)=>v.type === type
    )


  setVehicle(selected)

}



useEffect(()=>{

if(!transport) return


const selected =
vehicleMaster.find(
(v)=>v.type === transport.vehicleType
)


setVehicle(selected ?? null)


setHourlyRate(
transport.hourlyRate ?? 0
)


setDistanceKm(
transport.distanceKm ?? 0
)

setTrips(
transport.trips ?? 1
)


setOvernightStops(
transport.overnightStops ?? 0
)

setOvernightCost(
transport.overnightCost ?? 0
)


},[transport,vehicleMaster])

const calculation = useMemo(()=>{


return calculateTransportCost({

distanceKm,

trips,

avgSpeed:
vehicle?.avgSpeed ?? 0,

fuelConsumption:
vehicle?.fuelConsumption ?? 0,

dieselPrice:
vehicle?.dieselPrice ?? 0,

hourlyRate,

toll:
vehicle?.toll ?? 0,


overnightStops,

overnightCost,

})


},[
distanceKm,
trips,
vehicle,
hourlyRate,
overnightStops,
overnightCost
])


async function handleSave(){


await updateTransportPosition(

transport.id,

transport.calculationId,

projectId,

{


vehicleType: vehicle.type ?? "",

distanceKm,

trips,

hourlyRate,

avgSpeed:
vehicle?.avgSpeed ?? 0,

fuelConsumption:
vehicle?.fuelConsumption ?? 0,

dieselPrice:
vehicle?.dieselPrice ?? 0,

toll:
vehicle?.toll ?? 0,


overnightStops,

overnightCost,


drivingHours:
calculation.drivingHours,


labourCost:
calculation.labourCost,


dieselCost:
calculation.fuelCost,


tollCost:
calculation.tollCost,


overnightTotal:
calculation.overnightTotal,

totalCost:
calculation.totalCost,


}

)


onOpenChange(false)

}





return (

<Dialog
open={open}
onOpenChange={onOpenChange}
>


<DialogContent className="max-w-4xl">


<DialogHeader>

<DialogTitle>
Transport bearbeiten
</DialogTitle>

</DialogHeader>




<div className="grid grid-cols-2 gap-4">
<div className="space-y-3">

<Card>

<CardHeader>

<CardTitle>
🚛 Fahrzeug
</CardTitle>

</CardHeader>


<CardContent className="space-y-3">


<label>
Fahrzeugtyp
</label>


<Select
value={vehicle?.type ?? ""}
onValueChange={selectVehicle}
>


<SelectTrigger>

<SelectValue placeholder="Fahrzeug auswählen"/>

</SelectTrigger>


<SelectContent>

{
vehicleMaster.map((v)=>(

<SelectItem
key={v.id}
value={v.type}
>

{v.type}

</SelectItem>

))
}

</SelectContent>


</Select>



<label>
Stundenlohn (€ / h)
</label>

<Input
type="number"
value={hourlyRate}
onChange={(e)=>
setHourlyRate(Number(e.target.value))
}
/>


</CardContent>

</Card>

<Card>

<CardHeader>

<CardTitle>
📍 Strecke
</CardTitle>

</CardHeader>


<CardContent className="space-y-3">



<label>
Gesamtstrecke (km)
</label>

<Input
type="number"
value={distanceKm}
onChange={(e)=>
setDistanceKm(Number(e.target.value))
}
/>




<label>
Anzahl Fahrten
</label>

<Input
type="number"
value={trips}
onChange={(e)=>
setTrips(Number(e.target.value))
}
/>




<label>
Übernachtungen
</label>

<Input
type="number"
value={overnightStops}
onChange={(e)=>
setOvernightStops(Number(e.target.value))
}
/>




<label>
Kosten pro Nacht (€)
</label>

<Input
type="number"
value={overnightCost}
onChange={(e)=>
setOvernightCost(Number(e.target.value))
}
/>


</CardContent>


</Card>
</div>

<Card className="h-full">

<CardHeader>

<CardTitle>
🧮 Berechnung
</CardTitle>

</CardHeader>


<CardContent className="space-y-2">


<div>
Fahrzeit:
<strong>
{" "}
{calculation.drivingHours.toFixed(2)}
h
</strong>
</div>


<div>
Lohnkosten:
<strong>
{" "}
{calculation.labourCost.toFixed(2)}
€
</strong>
</div>



<div>
Diesel:
<strong>
{" "}
{calculation.fuelCost.toFixed(2)}
€
</strong>
</div>



<div>
Maut:
<strong>
{" "}
{calculation.tollCost.toFixed(2)}
€
</strong>
</div>



<div>
Übernachtung:
<strong>
{" "}
{calculation.overnightTotal.toFixed(2)} €
</strong>
</div>



<Separator />



<div className="text-lg">

Gesamtkosten:

<strong>
{" "}
{calculation.totalCost.toFixed(2)}
€
</strong>

</div>



</CardContent>


</Card>




<div className="col-span-2 flex justify-end gap-2">


<Button
variant="outline"
onClick={()=>
onOpenChange(false)
}
>
Abbrechen
</Button>



<Button
onClick={handleSave}
>
Speichern
</Button>



</div>





</div>


</DialogContent>


</Dialog>

)

}