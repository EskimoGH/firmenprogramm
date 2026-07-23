"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react"

import {
  updateAdditionalCost
} from "@/actions/additionalCost-position.action"



export function EditAdditionalCostDialog({
  cost,
  projectId,
  open,
  onOpenChange,
}: {
  cost:any
  projectId:string
  open:boolean
  onOpenChange:(open:boolean)=>void
}) {


const [description,setDescription] =
  useState(cost.description)

const [quantity,setQuantity] =
  useState(cost.quantity)

const [unitPrice,setUnitPrice] =
  useState(cost.unitPrice)



async function save(){


await updateAdditionalCost(
  cost.id,
  cost.calculationId,
  projectId,
  {
    description,
    quantity:Number(quantity),
    unitPrice:Number(unitPrice),
  }
)


onOpenChange(false)

}



return (

<Dialog
  open={open}
  onOpenChange={onOpenChange}
>


<DialogContent>


<DialogHeader>

<DialogTitle>
Zusatzkosten bearbeiten
</DialogTitle>

</DialogHeader>



<div className="space-y-4">



<div className="space-y-1">

<Label>
Bezeichnung
</Label>

<Input

value={description}

onChange={
(e)=>setDescription(e.target.value)
}

/>

</div>



<div className="space-y-1">

<Label>
Menge
</Label>

<Input

value={quantity}

onChange={
(e)=>setQuantity(e.target.value)
}

/>

</div>



<div className="space-y-1">

<Label>
Einzelpreis (€)
</Label>

<Input

value={unitPrice}

onChange={
(e)=>setUnitPrice(e.target.value)
}

/>

</div>



<Button
onClick={save}
>
Speichern
</Button>



</div>


</DialogContent>


</Dialog>

)

}