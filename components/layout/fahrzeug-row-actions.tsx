"use client"

import {
  MoreVertical,
  Pencil,
  Trash
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import {
  deleteVehicleAssignment
} from "@/actions/fahrzeugeinsatz.actions"

import {
  EditFahrzeugeinsatzDialog
} from "./edit-fahrzeugeinsatz-dialog"

import { useState } from "react"



export function FahrzeugRowActions({
 assignment
}:{
 assignment:any
}) {


const [editOpen,setEditOpen] = useState(false)



async function handleDelete(){

await deleteVehicleAssignment(
 assignment.id
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
>

<MoreVertical className="h-4 w-4"/>

</Button>
}
/>



<DropdownMenuContent align="end">


<DropdownMenuItem
onClick={()=>setEditOpen(true)}
>

<Pencil className="mr-2 h-4 w-4"/>

Bearbeiten

</DropdownMenuItem>



<DropdownMenuItem
onClick={handleDelete}
className="text-red-600"
>

<Trash className="mr-2 h-4 w-4"/>

Löschen

</DropdownMenuItem>


</DropdownMenuContent>


</DropdownMenu>



<EditFahrzeugeinsatzDialog
 assignment={assignment}
 open={editOpen}
 onOpenChange={setEditOpen}
/>


</>

)

}