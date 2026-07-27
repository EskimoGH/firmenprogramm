"use client"

import { useState } from "react"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog"

import {
  Button,
} from "@/components/ui/button"

import {
  Upload
} from "lucide-react"

import {
  uploadDocument
} from "@/actions/document.actions"



export function UploadDocumentDialog({
  projectId,
}:{
  projectId:string
}) {


const [open,setOpen] = useState(false)

const [file,setFile] = useState<File | null>(null)

const [type,setType] = useState<
  "OFFER" |
  "ORDER" |
  "EXECUTION" |
  "INVOICE" |
  "OTHER"
>("OTHER")



async function submit(){


if(!file) return


const formData = new FormData()


formData.append(
  "file",
  file
)


formData.append(
  "projectId",
  projectId
)


formData.append(
  "type",
  type
)


await uploadDocument(formData)



setFile(null)

setType("OTHER")

setOpen(false)


}



return (

<Dialog
open={open}
onOpenChange={setOpen}
>


<DialogTrigger
  render={
    <Button>
      <Upload className="mr-2 h-4 w-4"/>
      Dokument hochladen
    </Button>
  }
/>



<DialogContent>


<div className="space-y-5">


<h2 className="text-lg font-semibold">
Dokument hochladen
</h2>



<div className="space-y-2">

<label className="text-sm font-medium">
Datei
</label>


<label
htmlFor="document-upload"
className="
flex
flex-col
items-center
justify-center
gap-3
border-2
border-dashed
rounded-lg
p-8
cursor-pointer
hover:bg-muted
transition
"
>


<Upload
className="
h-8
w-8
text-muted-foreground
"
/>


<div className="text-center">


{
file ?

<>

<p className="font-medium">
{file.name}
</p>

<p className="text-sm text-muted-foreground">
{(file.size / 1024 / 1024).toFixed(2)} MB
</p>

</>

:

<>

<p className="font-medium">
Dokument auswählen
</p>

<p className="text-sm text-muted-foreground">
Klicken oder Datei hier ablegen
</p>

</>

}


</div>


</label>



<input

id="document-upload"

type="file"

className="hidden"

onChange={(e)=>
setFile(
e.target.files?.[0] ?? null
)
}

/>


</div>



<div className="space-y-2">

<label className="text-sm font-medium">
Kategorie
</label>


<select

className="border rounded-md p-2 w-full"

value={type}

onChange={(e)=>
 setType(
  e.target.value as typeof type
 )
}

>


<option value="OFFER">
01 Angebot
</option>

<option value="ORDER">
02 Auftrag
</option>

<option value="EXECUTION">
03 Ausführung
</option>

<option value="INVOICE">
04 Rechnung
</option>

<option value="OTHER">
05 Sonstiges
</option>


</select>


</div>



<Button
disabled={!file}
onClick={submit}
className="w-full"
>

Speichern

</Button>



</div>


</DialogContent>


</Dialog>

)

}