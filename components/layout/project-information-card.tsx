"use client"

import { useState } from "react"

import {
  updateProjectInformation,
} from "@/actions/project.actions"


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  FileText,
  Hash,
  FolderKanban,
  Pencil,
} from "lucide-react"


type ProjectInformationCardProps = {
  projectId: string

  project: {
    verkaufsId: string
    projektname: string | null
    auftragsnummer: string | null
  }
}


export function ProjectInformationCard({
  projectId,
  project,
}: ProjectInformationCardProps) {


  const [editing, setEditing] = useState(false)

  const [projektname, setProjektname] = useState(
    project.projektname ?? ""
  )

  const [auftragsnummer, setAuftragsnummer] = useState(
    project.auftragsnummer ?? ""
  )



  function cancelEdit() {

    setProjektname(
      project.projektname ?? ""
    )

    setAuftragsnummer(
      project.auftragsnummer ?? ""
    )

    setEditing(false)
  }



  async function saveInformation() {

    await updateProjectInformation(
      projectId,
      {
        projektname,
        auftragsnummer,
      }
    )


    setEditing(false)
  }



  return (

    <Card>


      <CardHeader>


        <div className="flex items-center justify-between">


          <CardTitle className="flex items-center gap-2">

            <FolderKanban size={20} />

            Projektinformationen

          </CardTitle>


          {!editing && (

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditing(true)}
            >

              <Pencil size={16}/>

            </Button>

          )}


        </div>


      </CardHeader>



      <CardContent className="space-y-4">


        {/* Verkaufs-ID */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-muted-foreground">

            <Hash size={16}/>

            <span>
              Verkaufs-ID
            </span>

          </div>


          <span className="font-medium">
            {project.verkaufsId}
          </span>


        </div>



        {editing ? (

          <>


            <div className="space-y-2">

              <label className="text-sm text-muted-foreground">
                Projektname
              </label>


              <Input

                value={projektname}

                onChange={(e) =>
                  setProjektname(e.target.value)
                }

              />

            </div>



            <div className="space-y-2">

              <label className="text-sm text-muted-foreground">
                Auftragsnummer
              </label>


              <Input

                value={auftragsnummer}

                onChange={(e) =>
                  setAuftragsnummer(e.target.value)
                }

              />

            </div>



            <div className="flex justify-end gap-2">


              <Button
                variant="outline"
                onClick={cancelEdit}
              >
                Abbrechen
              </Button>


              <Button
                onClick={saveInformation}
              >
                Speichern
              </Button>


            </div>


          </>


        ) : (

          <>


            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2 text-muted-foreground">

                <FileText size={16}/>

                <span>
                  Projektname
                </span>

              </div>


              <span className="font-medium">
                {project.projektname || "-"}
              </span>

            </div>




            <div className="flex items-center justify-between">


              <div className="flex items-center gap-2 text-muted-foreground">

                <Hash size={16}/>

                <span>
                  Auftragsnummer
                </span>

              </div>


              <span className="font-medium">
                {project.auftragsnummer || "-"}
              </span>


            </div>


          </>

        )}



      </CardContent>


    </Card>

  )
}