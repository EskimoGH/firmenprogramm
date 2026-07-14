"use client"

import { useState } from "react"
import { updateProjectNote } from "@/actions/project.actions"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  NotebookPen,
  Pencil,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type NotesCardProps = {
  projectId: string
  note: string | null
}

export function NotesCard({
  projectId,
  note,
}: NotesCardProps) {

  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(note ?? "")
  const [displayNote, setDisplayNote] = useState(note)


  function cancelEdit() {
    setValue(note ?? "")
    setEditing(false)
  }


    async function saveNote() {
    const formData = new FormData()
    formData.append(
        "note",
        value
    )

    await updateProjectNote(
        projectId,
        value
    )
    setDisplayNote(value)
    setEditing(false)
    }

  return (
    <Card>

      <CardHeader>

        <div className="flex items-center justify-between">

          <CardTitle className="flex items-center gap-2">
            <NotebookPen size={20} />
            Notizen
          </CardTitle>

          {!editing && (

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditing(true)}
            >
              <Pencil size={16} />
            </Button>

          )}

        </div>

      </CardHeader>

      <CardContent>

        {editing ? (

          <div className="space-y-3">

            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Notizen hinzufügen..."
              rows={6}
            />

            <div className="flex justify-end gap-2">

              <Button
                variant="outline"
                onClick={cancelEdit}
              >
                Abbrechen
              </Button>

              <Button
                onClick={saveNote}
              >
                Speichern
              </Button>

            </div>
          </div>

        ) : (
          displayNote ? (
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {displayNote}
            </p>
            ) : (
            <p className="text-sm text-muted-foreground">
                Keine Notizen hinterlegt
            </p>
          )
        
        )}


      </CardContent>

    </Card>
  )
}