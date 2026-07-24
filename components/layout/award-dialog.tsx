"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useState } from "react"

import { awardCalculation } from "@/actions/project-award.action"

export function AwardDialog({
  projectId,
  calculations,
}: {
  projectId: string
  calculations: any[]
}) {
  const [value, setValue] = useState<string | null>(null)

  async function save() {
    if (!value) return

    await awardCalculation(projectId, value)
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button>
            Zuschlag erhalten
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Welches Angebot hat den Zuschlag erhalten?
          </DialogTitle>
        </DialogHeader>

        <Select
          value={value}
          onValueChange={setValue}
        >
          <SelectTrigger>
            <SelectValue placeholder="Angebot auswählen" />
          </SelectTrigger>

          <SelectContent>
            {calculations.map((calc) => (
              <SelectItem
                key={calc.id}
                value={calc.id}
              >
                Angebot Version {calc.version}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          disabled={!value}
          onClick={save}
        >
          Bestätigen
        </Button>
      </DialogContent>
    </Dialog>
  )
}