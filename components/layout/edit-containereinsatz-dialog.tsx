"use client"

import {
  useEffect,
  useState,
} from "react"

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  updateProjectContainer,
  getContainerMasters,
} from "@/actions/containereinsatz.action"



export function EditProjectContainerDialog({
  container,
  open,
  onOpenChange,
}: {
  container:any
  open:boolean
  onOpenChange:(open:boolean)=>void
}) {


  const [containerMasters,setContainerMasters] = useState<any[]>([])


  const [containerMasterId,setContainerMasterId] = useState(
    container.containerMasterId ?? ""
  )


  const [departureOperationDate,setDepartureOperationDate] = useState(
    container.departureOperationDate
      ? new Date(container.departureOperationDate)
          .toISOString()
          .split("T")[0]
      : ""
  )


  const [arrivalSiteDate,setArrivalSiteDate] = useState(
    container.arrivalSiteDate
      ? new Date(container.arrivalSiteDate)
          .toISOString()
          .split("T")[0]
      : ""
  )


  const [arrivalOperationDate,setArrivalOperationDate] = useState(
    container.arrivalOperationDate
      ? new Date(container.arrivalOperationDate)
          .toISOString()
          .split("T")[0]
      : ""
  )



  useEffect(()=>{

    async function load(){

      const data = await getContainerMasters()

      setContainerMasters(data)

    }

    load()

  },[])



  async function handleSubmit(){


    const selectedContainer =
      containerMasters.find(
        c => c.id === containerMasterId
      )


    await updateProjectContainer(
      container.id,
      {

        containerMasterId,

        // Snapshot aktualisieren
        ...(selectedContainer && {

          containerName:selectedContainer.name,
          containerNumber:selectedContainer.containerNumber,
          volumeTon:selectedContainer.volumeTon,

        }),


        departureOperationDate:
          departureOperationDate
            ? new Date(departureOperationDate)
            : null,


        arrivalSiteDate:
          arrivalSiteDate
            ? new Date(arrivalSiteDate)
            : null,


        arrivalOperationDate:
          arrivalOperationDate
            ? new Date(arrivalOperationDate)
            : null,

      }
    )


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
            Container bearbeiten
          </DialogTitle>

        </DialogHeader>



        <div className="space-y-4">


          <Select
            value={containerMasterId}
            onValueChange={setContainerMasterId}
          >

            <SelectTrigger>

              <SelectValue placeholder="Container auswählen"/>

            </SelectTrigger>


            <SelectContent>

              {
                containerMasters.map((c)=>(

                  <SelectItem
                    key={c.id}
                    value={c.id}
                  >

                    {c.containerName} ({c.containerNumber})

                  </SelectItem>

                ))
              }

            </SelectContent>

          </Select>




          <div>

            <label className="text-sm">
              Abreise
            </label>

            <Input
              type="date"
              value={departureOperationDate}
              onChange={(e)=>
                setDepartureOperationDate(e.target.value)
              }
            />

          </div>




          <div>

            <label className="text-sm">
              Baustellenankunft
            </label>

            <Input
              type="date"
              value={arrivalSiteDate}
              onChange={(e)=>
                setArrivalSiteDate(e.target.value)
              }
            />

          </div>




          <div>

            <label className="text-sm">
              Ankunft Betrieb
            </label>

            <Input
              type="date"
              value={arrivalOperationDate}
              onChange={(e)=>
                setArrivalOperationDate(e.target.value)
              }
            />

          </div>




          <Button onClick={handleSubmit}>
            Speichern
          </Button>


        </div>


      </DialogContent>


    </Dialog>

  )

}