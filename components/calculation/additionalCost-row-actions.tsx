"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  MoreVertical,
} from "lucide-react"

import { EditAdditionalCostDialog } from "./edit-additionalCost-dialog"

import { deleteAdditionalCost } from "@/actions/additionalCost-position.action"

export function AdditionalCostRowActions({
  cost,
  projectId,
  calculationId,
}:{
  cost:any
  projectId:string
  calculationId:string
}) {


const [open,setOpen] = useState(false)



async function remove(){

  await deleteAdditionalCost(
    cost.id,
    calculationId,
    projectId
  )

}



return (

<>


<DropdownMenu>


<DropdownMenuTrigger
  render={
    <Button
      variant="ghost"
      size="icon"
    />
  }
>

<MoreVertical className="h-4 w-4"/>

</DropdownMenuTrigger>



<DropdownMenuContent align="end">


<DropdownMenuItem
  onClick={() => setOpen(true)}
>
Bearbeiten
</DropdownMenuItem>



<DropdownMenuItem
  onClick={remove}
  className="text-destructive"
>
Löschen
</DropdownMenuItem>



</DropdownMenuContent>


</DropdownMenu>



<EditAdditionalCostDialog

  cost={cost}

  projectId={projectId}

  open={open}

  onOpenChange={setOpen}

/>


</>

)

}