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

import { createAvv } from "@/actions/avv.actions"

export function CreateAvvDialog() {

  const [open, setOpen] = useState(false)

  const [avv, setAvv] = useState("")
  const [description, setDescription] = useState("")

  async function save() {

    await createAvv({
      avv,
      description,
    })

    setOpen(false)

    setAvv("")
    setDescription("")
  }

  return (

    <>

      <Button
        onClick={() => setOpen(true)}
      >
        + AVV
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >

        <DialogContent>

          <DialogHeader>

            <DialogTitle>

              AVV anlegen

            </DialogTitle>

          </DialogHeader>

          <div className="space-y-4">

            <Input
              placeholder="AVV"
              value={avv}
              onChange={(e) => setAvv(e.target.value)}
            />

            <Input
              placeholder="Bezeichnung"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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