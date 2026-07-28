"use client"

import { useEffect, useState } from "react"

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Plus } from "lucide-react"

import { getContainerMasters } from "@/actions/container-master.action"
import { createProjectContainer } from "@/actions/project-container.actions"


export function CreateProjectContainerDialog({
  projectId,
}: {
  projectId: string
}) {

  const [open, setOpen] = useState(false)

  const [masters, setMasters] = useState<any[]>([])

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selected, setSelected] = useState<any | null>(null)

  const [
    departureOperationDate,
    setDepartureOperationDate,
  ] = useState("")

  const [
    arrivalSiteDate,
    setArrivalSiteDate,
  ] = useState("")

  const [
    arrivalOperationDate,
    setArrivalOperationDate,
  ] = useState("")


  useEffect(() => {

    getContainerMasters()
      .then(setMasters)

  }, [])


  async function handleSubmit() {

    if (!selectedId) return


    await createProjectContainer({

      projectId,

      containerMasterId: selectedId,

      departureOperationDate,
      arrivalSiteDate,
      arrivalOperationDate,

    })


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

            + Container

          </Button>
        }
      />


      <DialogContent className="sm:max-w-lg">


        <DialogHeader>

          <DialogTitle>
            Container zum Projekt hinzufügen
          </DialogTitle>

        </DialogHeader>


        <div className="space-y-4">


          <div className="space-y-2">

            <Label>
              Container auswählen
            </Label>


            <Select
              value={selectedId}
              onValueChange={(value) => {

                setSelectedId(value)

                setSelected(
                  masters.find(
                    (m) => m.id === value
                  )
                )

              }}
            >

              <SelectTrigger>

                <SelectValue
                  placeholder="Container auswählen"
                />

              </SelectTrigger>


              <SelectContent>

                {masters.map((master) => (

                  <SelectItem
                    key={master.id}
                    value={master.id}
                  >

                    {master.containerNumber}
                    {" – "}
                    {master.name}

                  </SelectItem>

                ))}

              </SelectContent>

            </Select>

          </div>



          {selected && (

            <div className="rounded-lg border p-4 text-sm space-y-1 bg-muted/30">

              <div className="font-medium">
                Stammdaten (zum Zeitpunkt der Zuordnung)
              </div>


              <div>
                Name: {selected.name}
              </div>


              <div>
                Nummer: {selected.containerNumber}
              </div>


              <div>
                Volumen: {selected.volumeTon} t
              </div>


            </div>

          )}



          <div className="grid gap-4 md:grid-cols-3">


            <div className="space-y-2">

              <Label>
                Abreise Betrieb
              </Label>

              <Input
                type="date"
                value={departureOperationDate}
                onChange={(e) =>
                  setDepartureOperationDate(e.target.value)
                }
              />

            </div>



            <div className="space-y-2">

              <Label>
                Ankunft Baustelle
              </Label>

              <Input
                type="date"
                value={arrivalSiteDate}
                onChange={(e) =>
                  setArrivalSiteDate(e.target.value)
                }
              />

            </div>



            <div className="space-y-2">

              <Label>
                Ankunft Betrieb
              </Label>

              <Input
                type="date"
                value={arrivalOperationDate}
                onChange={(e) =>
                  setArrivalOperationDate(e.target.value)
                }
              />

            </div>


          </div>



          <div className="flex justify-end gap-2">


            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >

              Abbrechen

            </Button>



            <Button
              onClick={handleSubmit}
              disabled={!selectedId}
            >

              Hinzufügen

            </Button>


          </div>


        </div>


      </DialogContent>


    </Dialog>

  )

}