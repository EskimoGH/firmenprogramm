import { prisma } from "@/lib/prisma"

import { readFile } from "fs/promises"

import path from "path"

import { NextResponse } from "next/server"



export async function GET(
request:Request,
{
params
}:{
params:Promise<{
id:string
}>
}
){

const {id}=await params



const document =
await prisma.projectDocument.findUnique({

where:{
id
}

})


if(!document){

return new NextResponse(
"Dokument nicht gefunden",
{
status:404
}
)

}



const filepath =
path.join(
process.cwd(),
"storage",
document.path
)



const file =
await readFile(filepath)



return new NextResponse(
file,
{

headers:{

"Content-Type":
document.mimeType,


"Content-Disposition":
`inline; filename="${document.originalName}"`

}

}

)


}