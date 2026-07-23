"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { createVehicle } from "@/actions/vehicle-master.action"


export function CreateVehicleDialog() {

  const [open, setOpen] = useState(false)

  const [type, setType] = useState("")
  const [avgSpeed, setAvgSpeed] = useState("")
  const [fuelConsumption, setFuelConsumption] = useState("")
  const [toll, setToll] = useState("")
  const [dieselPrice, setDieselPrice] = useState("")


  async function save() {

    await createVehicle({
      type,
      avgSpeed: Number(avgSpeed),
      fuelConsumption: Number(fuelConsumption),
      toll: Number(toll),
      dieselPrice: Number(dieselPrice),
    })


    setOpen(false)

    setType("")
    setAvgSpeed("")
    setFuelConsumption("")
    setToll("")
    setDieselPrice("")
  }


  return (
    <>

      <Button
        onClick={() => setOpen(true)}
      >
        + Fahrzeug
      </Button>


      <Dialog
        open={open}
        onOpenChange={setOpen}
      >

        <DialogContent>

          <DialogHeader>

            <DialogTitle>
              Fahrzeug anlegen
            </DialogTitle>

          </DialogHeader>


          <div className="space-y-4">


            <Input
              placeholder="Fahrzeugtyp"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />


            <Input
              placeholder="Ø Geschwindigkeit km/h"
              type="number"
              value={avgSpeed}
              onChange={(e) => setAvgSpeed(e.target.value)}
            />


            <Input
              placeholder="Ø Verbrauch l / 100 km"
              type="number"
              value={fuelConsumption}
              onChange={(e) => setFuelConsumption(e.target.value)}
            />


            <Input
              placeholder="Ø Maut €/km"
              type="number"
              step="0.01"
              value={toll}
              onChange={(e) => setToll(e.target.value)}
            />


            <Input
              placeholder="Diesel €/Liter"
              type="number"
              step="0.01"
              value={dieselPrice}
              onChange={(e) => setDieselPrice(e.target.value)}
            />


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