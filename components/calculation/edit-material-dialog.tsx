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

import { updateAuctionPosition } from "@/actions/auction-position.actions"


export function EditMaterialDialog({
  position,
  projectId,
  open,
  onOpenChange,
}: {
  position: any
  projectId: string
  open: boolean
  onOpenChange: (open:boolean)=>void
}) {


const [quantity,setQuantity] = useState(position.quantity)
const [metalShare,setMetalShare] = useState(position.metalShare ?? "")
const [exchangePrice,setExchangePrice] = useState(position.exchangePrice ?? "")
const [discount,setDiscount] = useState(position.discount ?? "")
const [dismantlingCost,setDismantlingCost] = useState(position.dismantlingCost ?? "")



async function save(){

await updateAuctionPosition(
  position.id,
  position.calculationId,
  projectId,
  {
    quantity: Number(quantity),
    metalShare: Number(metalShare),
    exchangePrice: Number(exchangePrice),
    discount: Number(discount),
    dismantlingCost: Number(dismantlingCost),
  }
)

onOpenChange(false)

}



return (

<Dialog open={open} onOpenChange={onOpenChange}>

<DialogContent>

<DialogHeader>
<DialogTitle>
Position bearbeiten
</DialogTitle>
</DialogHeader>


<div className="space-y-4">


<div className="space-y-1">
  <Label>Menge (to)</Label>
  <Input
    value={quantity}
    onChange={(e)=>setQuantity(e.target.value)}
  />
</div>


<div className="space-y-1">
  <Label>Buntmetall-Anteil (%)</Label>
  <Input
    value={metalShare}
    onChange={(e)=>setMetalShare(e.target.value)}
  />
</div>


<div className="space-y-1">
  <Label>Börsenpreis (€)</Label>
  <Input
    value={exchangePrice}
    onChange={(e)=>setExchangePrice(e.target.value)}
  />
</div>


<div className="space-y-1">
  <Label>Abschlag (€)</Label>
  <Input
    value={discount}
    onChange={(e)=>setDiscount(e.target.value)}
  />
</div>


<div className="space-y-1">
  <Label>Demontagekosten (€)</Label>
  <Input
    value={dismantlingCost}
    onChange={(e)=>setDismantlingCost(e.target.value)}
  />
</div>


<Button onClick={save}>
  Speichern
</Button>


</div>


</DialogContent>

</Dialog>

)

}