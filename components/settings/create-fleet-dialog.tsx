"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Plus } from "lucide-react"
import { createFleetVehicle } from "@/actions/fleet.action"


export function CreateFleetDialog() {

  const [open, setOpen] = useState(false)

  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [licensePlate, setLicensePlate] = useState("")
  const [weight, setWeight] = useState("")


  async function save() {

    await createFleetVehicle({

      name,
      type,
      licensePlate: licensePlate || undefined,
      weight: weight
        ? Number(weight)
        : undefined,

    })


    setOpen(false)

    setName("")
    setType("")
    setLicensePlate("")
    setWeight("")
  }


  return (

    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger
        render={
          <Button>

            + Flotte

          </Button>
        }
      />


      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Neues Flottenfahrzeug
          </DialogTitle>

        </DialogHeader>


        <div className="space-y-4">


          <input
            className="border rounded-md p-2 w-full"
            placeholder="Bezeichnung"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />


          <input
            className="border rounded-md p-2 w-full"
            placeholder="Fahrzeugtyp"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />


          <input
            className="border rounded-md p-2 w-full"
            placeholder="Kennzeichen"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
          />


          <input
            className="border rounded-md p-2 w-full"
            placeholder="Gewicht (t)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />


          <Button onClick={save}>
            Speichern
          </Button>


        </div>


      </DialogContent>

    </Dialog>

  )
}