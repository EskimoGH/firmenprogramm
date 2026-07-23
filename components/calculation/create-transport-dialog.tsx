"use client"

import { useState } from "react"

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
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { createTransportPosition } from "@/actions/transport.action"
import { calculateTransportCost } from "@/lib/calculation/transport-calculation"


export function CreateTransportDialog({
  vehicleMaster,
  calculationId,
  projectId,
}: {
  vehicleMaster:any[]
  calculationId:string
  projectId:string
}){


  const [open,setOpen] = useState(false)

  const [vehicle,setVehicle] = useState<any>(null)

  const [distanceKm,setDistanceKm] = useState("")
  const [trips,setTrips] = useState("1")    

  const [hourlyRate,setHourlyRate] = useState("")
  const [overnightStops,setOvernightStops] = useState("0")

  const [overnightCost,setOvernightCost] = useState("0")  

    function selectVehicle(type: string | null){

    if (!type) {
        setVehicle(null)
        return
    }

    const selected =
        vehicleMaster.find(
        (v) => v.type === type
        )

    setVehicle(selected)

    }



  async function save(){


    if(!vehicle){
      return
    }

    const calculation = calculateTransportCost({

        distanceKm:Number(distanceKm),

        trips:Number(trips),

        avgSpeed:vehicle.avgSpeed,

        fuelConsumption:vehicle.fuelConsumption,

        dieselPrice:vehicle.dieselPrice,

        hourlyRate:Number(hourlyRate),

        toll:vehicle.toll,

        overnightStops:Number(overnightStops),

        overnightCost:Number(overnightCost), 

        })

        await createTransportPosition({

        projectId,

        calculationId,

        vehicleType: vehicle.type,

        distanceKm:Number(distanceKm),

        trips:Number(trips),

        avgSpeed:vehicle.avgSpeed,

        fuelConsumption:vehicle.fuelConsumption,

        dieselPrice:vehicle.dieselPrice,

        toll:vehicle.toll,

        hourlyRate:Number(hourlyRate),

        overnightStops:Number(overnightStops),

        overnightCost:Number(overnightCost),


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

        totalCost:calculation.totalCost,

        })


    setOpen(false)

    setVehicle(null)
    setDistanceKm("")
    setTrips("1")
    setHourlyRate("")
    setOvernightStops("0")
    setOvernightCost("0")

  }



return (

<>


<Button
onClick={()=>setOpen(true)}
>
+ Transport
</Button>



<Dialog
open={open}
onOpenChange={setOpen}
>


<DialogContent>


<DialogHeader>

<DialogTitle>
Transport hinzufügen
</DialogTitle>

</DialogHeader>



<div className="space-y-4">



<div className="space-y-1">

<label>
Fahrzeug
</label>


<Select
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


</div>



<div className="space-y-1">

<label>
Gesamtstrecke km
</label>


<Input
type="number"
value={distanceKm}
onChange={(e)=>setDistanceKm(e.target.value)}
/>

</div>



<div className="space-y-1">

<label>
Anzahl Fahrten
</label>


<Input
type="number"
value={trips}
onChange={(e)=>setTrips(e.target.value)}
/>

</div>

<div className="space-y-1">

<label>
Stundenlohn €/h
</label>


<Input
type="number"
step="0.01"
value={hourlyRate}
onChange={(e)=>setHourlyRate(e.target.value)}
/>

</div>

{
vehicle && (

<div className="rounded-md border p-4 text-sm space-y-1">

<div>
Ø Geschwindigkeit: {vehicle.avgSpeed} km/h
</div>

<div>
Verbrauch: {vehicle.fuelConsumption} l/100km
</div>

<div>
Diesel: {vehicle.dieselPrice} €/l
</div>

<div>
Maut: {vehicle.toll} €/km
</div>


</div>

)
}



<Button
className="w-full"
onClick={save}
>

Speichern

</Button>



</div>


</DialogContent>


</Dialog>


</>

)

}