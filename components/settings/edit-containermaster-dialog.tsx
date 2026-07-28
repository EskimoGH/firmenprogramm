"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Button,
} from "@/components/ui/button"

import {
  Input,
} from "@/components/ui/input"

import {
  useState,
} from "react"

import {
  updateContainerMaster,
} from "@/actions/container-master.action"



export function EditContainerMasterDialog({
  container,
  open,
  onOpenChange,
}: {
  container:any
  open:boolean
  onOpenChange:(open:boolean)=>void
}) {


  const [name, setName] = useState(container.name)
  const [containerNumber, setContainerNumber] = useState(
    container.containerNumber
  )
  const [volumeTon, setVolumeTon] = useState(
    container.volumeTon
  )


  async function handleSubmit(){

    await updateContainerMaster(
      container.id,
      {
        name,
        containerNumber,
        volumeTon:Number(volumeTon),
      }
    )


    onOpenChange(false)

  }


  return(

    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent>


        <DialogHeader>

          <DialogTitle>
            Container bearbeiten
          </DialogTitle>

        </DialogHeader>


        <div className="space-y-4">


          <Input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Name"
          />


          <Input
            value={containerNumber}
            onChange={(e)=>setContainerNumber(e.target.value)}
            placeholder="Containernummer"
          />


          <Input
            type="number"
            value={volumeTon}
            onChange={(e)=>setVolumeTon(e.target.value)}
            placeholder="Volumen"
          />


          <Button
            onClick={handleSubmit}
          >

            Speichern

          </Button>


        </div>


      </DialogContent>

    </Dialog>

  )

}