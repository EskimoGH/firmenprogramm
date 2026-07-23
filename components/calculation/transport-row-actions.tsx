"use client"


import { useState } from "react"


import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import {
MoreVertical,
Pencil,
Trash2,
} from "lucide-react"


import { EditTransportDialog } from "./edit-transport-dialog"
import { deleteTransportPosition } from "@/actions/transport-position.action"



export function TransportRowActions({
transport,
vehicleMaster,
}:{
transport:any
vehicleMaster:any[]
}){


const [open,setOpen]=useState(false)

async function handleDelete(){

  await deleteTransportPosition(
    transport.id,
    transport.calculationId,
    transport.projectId
  )

} 

return (

<>


<DropdownMenu>


<DropdownMenuTrigger
className="inline-flex h-9 h-9 w-9 items-center justify-center rounded-md hover:bg-accent"
>

<MoreVertical className="h-4 w-4"/>

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
onClick={handleDelete}
>

<Trash2 className="mr-2 h-4 w-4"/>

Löschen

</DropdownMenuItem>


</DropdownMenuContent>


</DropdownMenu>



<EditTransportDialog
transport={transport}
vehicleMaster={vehicleMaster}
projectId={transport.projectId}
open={open}
onOpenChange={setOpen}
/>


</>


)
}