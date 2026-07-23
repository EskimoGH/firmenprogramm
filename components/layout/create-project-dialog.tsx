"use client"

import { useState } from "react"

import { createProject } from "@/actions/project.actions"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CreateProjectDialog() {

  const [open, setOpen] = useState(false)

  return (

    <Dialog open={open} onOpenChange={setOpen}>

        <Button
        type="button"
        onClick={() => setOpen(true)}
        >
        + Projekt
        </Button>

      <DialogContent className="sm:max-w-2xl">

        <DialogHeader>

          <DialogTitle>
            Neues Projekt anlegen
          </DialogTitle>

        </DialogHeader>

        <form action={createProject} className="space-y-6">

          <div className="grid grid-cols-2 gap-4">

            <div>
              <Label htmlFor="company">
                Auftraggeber *
              </Label>

              <Input
                id="company"
                name="company"
                required
              />
            </div>

            <div>
              <Label htmlFor="verkaufsId">
                Verkaufs-ID *
              </Label>

              <Input
                id="verkaufsId"
                name="verkaufsId"
                required
              />
            </div>

            <div>
              <Label htmlFor="projektname">
                Projektname
              </Label>

              <Input
                id="projektname"
                name="projektname"
                defaultValue="TEST"
              />
            </div>

            <div>
              <Label htmlFor="auftragsnummer">
                Auftragsnummer
              </Label>

              <Input
                id="auftragsnummer"
                name="auftragsnummer"
              />
            </div>

            <div className="col-span-2">

              <Label htmlFor="street">
                Straße
              </Label>

              <Input
                id="street"
                name="street"
              />

            </div>

            <div>

              <Label htmlFor="postalCode">
                PLZ
              </Label>

              <Input
                id="postalCode"
                name="postalCode"
              />

            </div>

            <div>

              <Label htmlFor="city">
                Ort
              </Label>

              <Input
                id="city"
                name="city"
              />

            </div>

          </div>

          <div className="flex justify-end gap-2">

            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Abbrechen
            </Button>

            <Button type="submit">
              Projekt anlegen
            </Button>

          </div>

        </form>

      </DialogContent>

    </Dialog>

  )
}