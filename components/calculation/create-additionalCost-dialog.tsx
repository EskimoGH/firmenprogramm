"use client"


import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle,
DialogTrigger
} from "@/components/ui/dialog"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useState } from "react"

import {
createAdditionalCost
} from "@/actions/additionalCost.action"



export function AdditionalCostDialog({
calculationId,
projectId
}:{
projectId:string
calculationId:string
}){

const [open, setOpen] = useState(false)
const [description,setDescription]=useState("")
const [quantity,setQuantity]=useState("1")
const [unitPrice,setUnitPrice]=useState("0")



async function save(){

  await createAdditionalCost(
    projectId,
    calculationId,
    {
      description,
      quantity:Number(quantity),
      unitPrice:Number(unitPrice)
    }
  )


  setDescription("")
  setQuantity("1")
  setUnitPrice("0")

  setOpen(false)

}



return (

<Dialog
  open={open}
  onOpenChange={setOpen}
>


<DialogTrigger render={<Button />}>
+ Zusatzkosten
</DialogTrigger>


<DialogContent>


<DialogHeader>

<DialogTitle>
Zusatzkosten anlegen
</DialogTitle>

</DialogHeader>



<div className="space-y-4">


<div>

<label>
Bezeichnung
</label>

<Input
value={description}
onChange={
e=>setDescription(e.target.value)
}
/>

</div>



<div>

<label>
Menge
</label>

<Input
type="number"
value={quantity}
onChange={
e=>setQuantity(e.target.value)
}
/>

</div>



<div>

<label>
Einzelpreis
</label>

<Input
type="number"
value={unitPrice}
onChange={
e=>setUnitPrice(e.target.value)
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