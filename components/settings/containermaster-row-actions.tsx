"use client"

import { useState } from "react"

import {
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  deleteContainerMaster,
} from "@/actions/container-master.action"

import {
  EditContainerMasterDialog,
} from "./edit-containermaster-dialog"



export function ContainerMasterRowActions({
  container,
}: {
  container:any
}) {

  const [open, setOpen] = useState(false)


  async function handleDelete(){

    const confirmed = confirm(
      "Container wirklich löschen?"
    )

    if(!confirmed) return


    await deleteContainerMaster(
      container.id
    )

  }


  return(

    <>

      <DropdownMenu>

        <DropdownMenuTrigger
          className="inline-flex h-9 h-9 w-9 items-center justify-center rounded-md hover:bg-accent"
        >

          <MoreVertical className="h-4 w-4" />

        </DropdownMenuTrigger>


        <DropdownMenuContent align="end">


          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >

            <Pencil className="mr-2 h-4 w-4"/>

            Bearbeiten

          </DropdownMenuItem>


          <DropdownMenuItem
            variant="destructive"
            onClick={handleDelete}
          >

            <Trash2 className="mr-2 h-4 w-4"/>

            Löschen

          </DropdownMenuItem>


        </DropdownMenuContent>


      </DropdownMenu>


      <EditContainerMasterDialog
        container={container}
        open={open}
        onOpenChange={setOpen}
      />


    </>

  )

}