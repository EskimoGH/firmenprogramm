"use client"

import { useState } from "react"

import { RowActions } from "@/components/shared/row-actions"
import { EditMaterialDialog } from "./edit-material-dialog"
import { deleteAuctionPosition } from "@/actions/auction-position.actions"


export function MaterialRowActions({
  position,
  projectId,
  calculationId,
}:{
  position:any
  projectId:string
  calculationId:string
}) {


const [open,setOpen]=useState(false)


async function deletePosition(){

  await deleteAuctionPosition(
    position.id,
    calculationId,
    projectId
  )

}


return (

<>

<RowActions

onEdit={() => setOpen(true)}

onDelete={() => {
  deletePosition()
}}

/>


<EditMaterialDialog
  position={position}
  projectId={projectId}
  open={open}
  onOpenChange={setOpen}
/>

</>

)

}