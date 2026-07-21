"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import {
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react"


type RowActionsProps = {
  onEdit?: () => void
  onDelete?: () => void
}


export function RowActions({
  onEdit,
  onDelete,
}: RowActionsProps) {

  return (
    <DropdownMenu>

      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        }
      />


      <DropdownMenuContent align="end">

        {onEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Bearbeiten
          </DropdownMenuItem>
        )}


        {onDelete && (
          <DropdownMenuItem
            onClick={onDelete}
            className="text-red-600"
          >
            <Trash className="mr-2 h-4 w-4" />
            Löschen
          </DropdownMenuItem>
        )}

      </DropdownMenuContent>

    </DropdownMenu>
  )
}