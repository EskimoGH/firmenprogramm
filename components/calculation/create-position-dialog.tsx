"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { createPosition } from "@/actions/position.actions"


export function PositionDialog({
  calculation,
  avvMaster,
}: {
  calculation: any
  avvMaster: any[]
}) {

  return (

    <Dialog>

        <DialogTrigger render={<Button />}>
        + Position
        </DialogTrigger>


      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Neue Materialposition
          </DialogTitle>

        </DialogHeader>


        <form
          action={createPosition}
          className="space-y-4"
        >

          <input
            type="hidden"
            name="calculationId"
            value={calculation.id}
          />

          <input
            type="hidden"
            name="projectId"
            value={calculation.project.id}
          />


          <div>

            <label className="text-sm">
              AVV
            </label>

                <select
                name="avv"
                className="
                    flex
                    h-10
                    w-full
                    rounded-md
                    border
                    bg-background
                    px-3
                    py-2
                    text-sm
                "
                >

                <option value="">
                    AVV auswählen
                </option>


                {avvMaster.map((avv) => (

                    <option
                    key={avv.id}
                    value={avv.avv}
                    >
                    {avv.avv} - {avv.description}
                    </option>

                ))}


                </select>

          </div>


          <div>

          </div>


          <div>

            <label className="text-sm">
              Menge (t)
            </label>

            <Input
              name="quantity"
              type="number"
              step="0.01"
              defaultValue="0"
            />

          </div>


          <Button type="submit">
            Speichern
          </Button>


        </form>


      </DialogContent>

    </Dialog>

  )
}