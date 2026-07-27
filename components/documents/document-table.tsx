"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  FileText,
} from "lucide-react"


const categories = [

{
  key:"ALL",
  title:"Alle"
},

{
  key:"OFFER",
  title:"01 Angebot"
},

{
  key:"ORDER",
  title:"02 Auftrag"
},

{
  key:"EXECUTION",
  title:"03 Ausführung"
},

{
  key:"INVOICE",
  title:"04 Rechnung"
},

{
  key:"OTHER",
  title:"05 Sonstiges"
},

]



function formatSize(size:number){

if(size < 1024 * 1024){

return `${Math.round(size / 1024)} KB`

}

return `${(size / 1024 / 1024).toFixed(1)} MB`

}




export function DocumentTable({
documents
}:{
documents:any[]
}){


const [activeCategory,setActiveCategory] =
useState("ALL")



const filteredDocuments =
activeCategory === "ALL"

?
documents

:

documents.filter(
(doc)=>
doc.type === activeCategory
)




return (

<div className="space-y-6">



{/* Kategorien */}

<div className="grid grid-cols-6 gap-4">


{
categories.map((category)=>(


<Card

key={category.key}

onClick={()=>
setActiveCategory(category.key)
}

className={`
cursor-pointer transition

${
activeCategory === category.key
? "bg-muted"
: "hover:bg-muted"
}

`}

>


<CardContent
className="p-4 flex items-center gap-3"
>


<FileText
className="h-5 w-5 text-muted-foreground"
/>


<span className="font-medium text-sm">
{category.title}
</span>


</CardContent>


</Card>


))

}


</div>





{/* Tabelle */}


<Card>


<CardContent className="p-0">


<table className="w-full">


<thead className="border-b bg-muted/40">

<tr className="text-left text-sm">

<th className="p-4">
Name
</th>

<th className="p-4">
Kategorie
</th>

<th className="p-4">
Größe
</th>

<th className="p-4">
Datum
</th>

</tr>

</thead>



<tbody>


{
filteredDocuments.map((doc)=>(


<tr
key={doc.id}
className="border-b last:border-0 hover:bg-muted/40"
>


<td className="p-4 flex items-center gap-3">


<FileText
className="h-4 w-4 text-muted-foreground"
/>


<Link

href={`/api/documents/${doc.id}`}

target="_blank"

className="hover:underline"

>

{doc.originalName}

</Link>


</td>


<td className="p-4 text-sm">

{
categories.find(
(c)=>c.key === doc.type
)?.title
}

</td>


<td className="p-4 text-sm text-muted-foreground">

{formatSize(doc.size)}

</td>


<td className="p-4 text-sm text-muted-foreground">

{
new Intl.DateTimeFormat(
"de-DE"
).format(doc.createdAt)
}

</td>


</tr>


))

}



{
filteredDocuments.length === 0 &&

<tr>

<td
colSpan={4}
className="p-5 text-muted-foreground"
>

Keine Dokumente in dieser Kategorie

</td>

</tr>

}


</tbody>


</table>


</CardContent>


</Card>


</div>

)

}