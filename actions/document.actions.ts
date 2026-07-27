"use server"

import { prisma } from "@/lib/prisma"

import { writeFile, mkdir } from "fs/promises"

import path from "path"

import { revalidatePath } from "next/cache"



export async function uploadDocument(
formData:FormData
){


const file =
formData.get("file") as File


const projectId =
formData.get("projectId") as string


const type =
formData.get("type") as any



const bytes =
await file.arrayBuffer()


const buffer =
Buffer.from(bytes)



const storageRoot =
path.join(
process.cwd(),
"storage"
)



const projectFolder =
path.join(
storageRoot,
"projects",
projectId
)



await mkdir(
projectFolder,
{
 recursive:true
}
)



const filename =
`${Date.now()}-${file.name}`



const filepath =
path.join(
projectFolder,
filename
)



await writeFile(
filepath,
buffer
)


const project = await prisma.project.findUnique({
  where:{
    id: projectId
  }
})

if(!project){
  throw new Error(
    "Projekt nicht gefunden"
  )
}
await prisma.projectDocument.create({

data:{

originalName:file.name,

filename,

mimeType:file.type,

size:file.size,

type,

path:
`projects/${projectId}/${filename}`,

project:{
  connect:{
    id:projectId
  }
}

}

})



revalidatePath(
`/projekte/${projectId}/dokumente`
)


}