"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useEffect, useState } from "react"

import { updateFleetVehicle } from "@/actions/fleet.action"

import type { FleetVehicle } from "@prisma/client"


type Props = {
  vehicle: FleetVehicle
  open: boolean
  onOpenChange: (open: boolean) => void
}


export function EditFleetDialog({
  vehicle,
  open,
  onOpenChange,
}: Props) {


  const [name, setName] = useState(
    vehicle.name
  )

  const [type, setType] = useState(
    vehicle.type
  )

  const [licensePlate, setLicensePlate] = useState(
    vehicle.licensePlate ?? ""
  )

  const [weight, setWeight] = useState(
    vehicle.weight?.toString() ?? ""
  )

  const [inspectionUntil, setInspectionUntil] = useState(
  vehicle.inspectionUntil
    ? vehicle.inspectionUntil.toISOString().split("T")[0]
    : ""
)

const [lastService, setLastService] = useState(
  vehicle.lastService
    ? vehicle.lastService.toISOString().split("T")[0]
    : ""
)


useEffect(() => {

  setName(vehicle.name)
  setType(vehicle.type)
  setLicensePlate(vehicle.licensePlate ?? "")
  setWeight(vehicle.weight?.toString() ?? "")

  setInspectionUntil(
    vehicle.inspectionUntil
      ? vehicle.inspectionUntil.toISOString().split("T")[0]
      : ""
  )

  setLastService(
    vehicle.lastService
      ? vehicle.lastService.toISOString().split("T")[0]
      : ""
  )

}, [vehicle])


  async function handleSave() {


await updateFleetVehicle({

  id: vehicle.id,

  name,
  type,

  licensePlate:
    licensePlate || undefined,

  weight:
    weight
      ? Number(weight)
      : undefined,


  inspectionUntil:
    inspectionUntil
      ? new Date(inspectionUntil)
      : undefined,


  lastService:
    lastService
      ? new Date(lastService)
      : undefined,

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
            Flottenfahrzeug bearbeiten
          </DialogTitle>

        </DialogHeader>



        <div className="space-y-4">


          <div className="space-y-1">

            <label>
              Bezeichnung
            </label>

            <Input

              value={name}

              onChange={(e) =>
                setName(e.target.value)
              }

            />

          </div>



          <div className="space-y-1">

            <label>
              Fahrzeugtyp
            </label>

            <Input

              value={type}

              onChange={(e) =>
                setType(e.target.value)
              }

            />

          </div>



          <div className="space-y-1">

            <label>
              Kennzeichen
            </label>

            <Input

              value={licensePlate}

              onChange={(e) =>
                setLicensePlate(e.target.value)
              }

            />

          </div>



          <div className="space-y-1">

            <label>
              Gewicht t
            </label>

            <Input

              type="number"

              value={weight}

              onChange={(e) =>
                setWeight(e.target.value)
              }

            />

          </div>

            <div className="space-y-1">

            <label>
                HU bis
            </label>

            <Input

                type="date"

                value={inspectionUntil}

                onChange={(e) =>
                setInspectionUntil(e.target.value)
                }

            />

            </div>



            <div className="space-y-1">

            <label>
                Letzte Wartung
            </label>

            <Input

                type="date"

                value={lastService}

                onChange={(e) =>
                setLastService(e.target.value)
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