"use client"

import { useState } from "react"

import { updateProjectLocation } from "@/actions/project.actions"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  MapPin,
  Navigation,
  Pencil,
} from "lucide-react"

type LocationCardProps = {
  projectId: string
  project: {
    street: string | null
    postalCode: string | null
    city: string | null
  }
}

export function LocationCard({
  projectId,
  project,
}: LocationCardProps) {

  const [editing, setEditing] = useState(false)

  const [street, setStreet] = useState(project.street ?? "")
  const [postalCode, setPostalCode] = useState(project.postalCode ?? "")
  const [city, setCity] = useState(project.city ?? "")

  function cancelEdit() {
    setStreet(project.street ?? "")
    setPostalCode(project.postalCode ?? "")
    setCity(project.city ?? "")
    setEditing(false)
  }

    async function saveLocation() {

    await updateProjectLocation(
        projectId,
        {
        street,
        postalCode,
        city,
        }
    )

  setEditing(false)
}

  const hasLocation =
    street ||
    postalCode ||
    city

  return (
    <Card>

      <CardHeader>

        <div className="flex items-center justify-between">

          <CardTitle className="flex items-center gap-2">
            <MapPin size={20} />
            Übernahmeort
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

            <Input
              placeholder="Straße"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />

            <Input
              placeholder="PLZ"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />

            <Input
              placeholder="Ort"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <div className="flex justify-end gap-2">

              <Button
                variant="outline"
                onClick={cancelEdit}
              >
                Abbrechen
              </Button>

              <Button
                onClick={saveLocation}
              >
                Speichern
              </Button>

            </div>

          </div>

        ) : hasLocation ? (

          <>

            <div>

              <p className="text-sm text-muted-foreground">
                Adresse
              </p>

              <p className="font-medium">
                {street}
                <br />
                {postalCode} {city}
              </p>

            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">

              <Navigation size={16} />

              <span>
                Navigation später verfügbar
              </span>

            </div>

          </>

        ) : (

          <p className="text-muted-foreground">
            Keine Baustellenadresse hinterlegt
          </p>

        )}

      </CardContent>

    </Card>
  )
}