"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useState } from "react"

import { updateVehicle } from "@/actions/vehicle-master.action"

import type { VehicleMaster } from "@prisma/client"


type Props = {
  vehicle: VehicleMaster
  open: boolean
  onOpenChange: (open:boolean)=>void
}


export function EditVehicleDialog({
  vehicle,
  open,
  onOpenChange,
}: Props) {

  const [avgSpeed, setAvgSpeed] = useState(
    vehicle.avgSpeed.toString()
  )

  const [fuelConsumption, setFuelConsumption] = useState(
    vehicle.fuelConsumption.toString()
  )

  const [toll, setToll] = useState(
    vehicle.toll.toString()
  )

  const [dieselPrice, setDieselPrice] = useState(
    vehicle.dieselPrice.toString()
  )
    useEffect(() => {
    setAvgSpeed(vehicle.avgSpeed.toString())
    setFuelConsumption(vehicle.fuelConsumption.toString())
    setToll(vehicle.toll.toString())
    setDieselPrice(vehicle.dieselPrice.toString())
    }, [vehicle])

  async function handleSave() {

    await updateVehicle({
      id: vehicle.id,
      avgSpeed: Number(avgSpeed),
      fuelConsumption: Number(fuelConsumption),
      toll: Number(toll),
      dieselPrice: Number(dieselPrice),
    })

    onOpenChange(false)
  }


  return (
        <Dialog
        open={open}
        onOpenChange={onOpenChange}
        >


      <DialogContent>

        <DialogHeader>
          <DialogTitle>
            Fahrzeug bearbeiten
          </DialogTitle>
        </DialogHeader>


        <div className="space-y-4">

          <div className="space-y-1">
            <label>
              Fahrzeugtyp
            </label>

            <Input
              value={vehicle.type}
              disabled
            />
          </div>


          <div className="space-y-1">
            <label>
              Ø Geschwindigkeit km/h
            </label>

            <Input
              type="number"
              value={avgSpeed}
              onChange={(e) =>
                setAvgSpeed(e.target.value)
              }
            />
          </div>


          <div className="space-y-1">
            <label>
              Ø Verbrauch l / 100 km
            </label>

            <Input
              type="number"
              value={fuelConsumption}
              onChange={(e) =>
                setFuelConsumption(e.target.value)
              }
            />
          </div>


          <div className="space-y-1">
            <label>
              Ø Maut €/km
            </label>

            <Input
              type="number"
              step="0.01"
              value={toll}
              onChange={(e) =>
                setToll(e.target.value)
              }
            />
          </div>


          <div className="space-y-1">
            <label>
              Diesel €/Liter
            </label>

            <Input
              type="number"
              step="0.01"
              value={dieselPrice}
              onChange={(e) =>
                setDieselPrice(e.target.value)
              }
            />
          </div>


          <Button
            className="w-full"
            onClick={handleSave}
          >
            Speichern
          </Button>

        </div>

      </DialogContent>

    </Dialog>
  )
}