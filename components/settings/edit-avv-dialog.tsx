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

import { updateAvv } from "@/actions/avv.actions"

export function EditAvvDialog({
  avv,
  open,
  onOpenChange,
}: {
  avv: any
  open: boolean
  onOpenChange: (open: boolean) => void
}) {

  const [number, setNumber] = useState(avv.avv)
  const [description, setDescription] = useState(avv.description)

  async function save() {

    await updateAvv(
      avv.id,
      {
        avv: number,
        description,
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

            AVV bearbeiten

          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          <Input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <Input
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

  )

}