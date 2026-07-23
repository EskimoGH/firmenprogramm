"use client"

import { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import { MoreVertical, Pencil, Trash2 } from "lucide-react"

import { EditAvvDialog } from "./edit-avv-dialog"
import { deleteAvv } from "@/actions/avv.actions"

export function AvvRowActions({
  avv,
}:{
  avv:any
}){

  const [open,setOpen]=useState(false)

  return(

    <>

      <DropdownMenu>

        <DropdownMenuTrigger
        className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent"
        >
        <MoreVertical className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">

          <DropdownMenuItem
            onClick={()=>setOpen(true)}
          >

            <Pencil className="mr-2 h-4 w-4"/>

            Bearbeiten

          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onClick={()=>deleteAvv(avv.id)}
          >

            <Trash2 className="mr-2 h-4 w-4"/>

            Löschen

          </DropdownMenuItem>

        </DropdownMenuContent>

      </DropdownMenu>

      <EditAvvDialog
        avv={avv}
        open={open}
        onOpenChange={setOpen}
      />

    </>

  )

}