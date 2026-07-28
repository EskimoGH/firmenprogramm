"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Plus } from "lucide-react"

import { createContainerMaster } from "@/actions/container-master.action"


export function CreateContainerMasterDialog() {

  const [open, setOpen] = useState(false)

  const [name, setName] = useState("")
  const [containerNumber, setContainerNumber] = useState("")
  const [volumeTon, setVolumeTon] = useState("")


  async function handleSubmit() {

    if (!name || !containerNumber || !volumeTon) return


    await createContainerMaster({
      name,
      containerNumber,
      volumeTon: Number(volumeTon),
    })


    setName("")
    setContainerNumber("")
    setVolumeTon("")

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
            onClick={() => setOpen(true)}
          >
            + Container
          </Button>
        }
      />


      <DialogContent className="sm:max-w-md">

        <DialogHeader>

          <DialogTitle>
            Container-Stammdaten hinzufügen
          </DialogTitle>

        </DialogHeader>


        <div className="space-y-4">


          <div className="space-y-2">

            <Label>
              Name
            </Label>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bauschutt-Container"
            />

          </div>


          <div className="space-y-2">

            <Label>
              Containernummer
            </Label>

            <Input
              value={containerNumber}
              onChange={(e) => setContainerNumber(e.target.value)}
              placeholder="AB-1001"
            />

          </div>


          <div className="space-y-2">

            <Label>
              Volumen (t)
            </Label>

            <Input
              type="number"
              step="0.1"
              value={volumeTon}
              onChange={(e) => setVolumeTon(e.target.value)}
              placeholder="10.0"
            />

          </div>


          <div className="flex justify-end gap-2">

            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Abbrechen
            </Button>

            <Button onClick={handleSubmit}>
              Speichern
            </Button>

          </div>


        </div>


      </DialogContent>


    </Dialog>

  )

}