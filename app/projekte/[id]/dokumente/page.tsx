import { prisma } from "@/lib/prisma"
import { UploadDocumentDialog } from "@/components/documents/upload-document-dialog"
import { DocumentTable } from "@/components/documents/document-table"


export default async function DocumentsPage({
params
}:{
params:Promise<{
id:string
}>
})
{


const {id}=await params



const documents =
await prisma.projectDocument.findMany({

where:{
projectId:id
},

orderBy:{
createdAt:"desc"
}

})



return (

<div className="space-y-6">


<div className="flex justify-between items-center p-5 border-b">

<div>

<h2 className="text-lg font-semibold">
Dokumente
</h2>

<p className="text-sm text-muted-foreground">
Alle Projektdokumente
</p>

</div>


<UploadDocumentDialog
projectId={id}
/>


</div>



<DocumentTable
documents={documents}
/>



</div>

)

}