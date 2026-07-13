import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/prisma"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"


export default async function ProjektDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params


  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      company: true,
    },
  })


  if (!project) {
    return (
      <div className="p-8">
        Projekt nicht gefunden
      </div>
    )
  }

return (

<div className="p-8 space-y-6">


<Breadcrumb>

<BreadcrumbList>


<BreadcrumbItem>

<BreadcrumbLink href="/">
Firmenprogramm
</BreadcrumbLink>

</BreadcrumbItem>



<BreadcrumbSeparator />



<BreadcrumbItem>

<BreadcrumbLink href="/projekte">
Projekte
</BreadcrumbLink>

</BreadcrumbItem>



<BreadcrumbSeparator />



<BreadcrumbItem>

<BreadcrumbPage>
{project.verkaufsId}
</BreadcrumbPage>

</BreadcrumbItem>


</BreadcrumbList>

</Breadcrumb>


<div className="flex justify-between items-center">

<div>

<h1 className="text-3xl font-semibold">
Projekt {project.verkaufsId}
</h1>

<p className="text-muted-foreground mt-1">
{project.company.name}
</p>

</div>


<Badge>
In Bearbeitung
</Badge>


</div>



<div className="grid gap-6 md:grid-cols-3">


<Card>

<CardHeader>

<CardTitle>
Projektinformationen
</CardTitle>

</CardHeader>


<CardContent className="space-y-3">


<div>
<span className="text-muted-foreground">
Verkaufs-ID
</span>

<p>
{project.verkaufsId}
</p>

</div>



<div>
<span className="text-muted-foreground">
Auftragsnummer
</span>

<p>
{project.auftragsnummer}
</p>

</div>


<div>
<span className="text-muted-foreground">
Auftraggeber
</span>

<p>
{project.company.name}
</p>

</div>


<div>
<span className="text-muted-foreground">
Debitor
</span>

<p>
Müller Holding
</p>

</div>


</CardContent>

</Card>





<Card>

<CardHeader>
<CardTitle>
Übernahmeort
</CardTitle>
</CardHeader>


<CardContent>


<p>
{project.street}
</p>

<p>
{project.postalCode} {project.city}
</p>


<div className="mt-4 h-40 rounded-lg bg-muted flex items-center justify-center">

Karte

</div>


</CardContent>


</Card>





<Card>

<CardHeader>

<CardTitle>
Ansprechpartner
</CardTitle>

</CardHeader>


<CardContent>

<p>
Max Mustermann
</p>

<p>
Telefon:
01234 56789
</p>

<p>
mail@example.de
</p>


</CardContent>


</Card>


</div>





<Card>


<CardHeader>

<CardTitle>
Auktionspositionen
</CardTitle>

</CardHeader>



<CardContent>


<table className="w-full">

<thead>

<tr className="border-b">

<th className="text-left p-2">
AVV
</th>

<th className="text-left p-2">
Position
</th>

<th className="text-left p-2">
Menge
</th>

</tr>

</thead>


<tbody>

<tr className="border-b">

<td className="p-2">
170101
</td>

<td className="p-2">
Bauschutt
</td>

<td className="p-2">
20 t
</td>


</tr>


</tbody>


</table>


</CardContent>


</Card>





<Card>

<CardHeader>

<CardTitle>
Dokumente
</CardTitle>

</CardHeader>


<CardContent>

<p className="text-muted-foreground">
Noch keine Dokumente vorhanden.
</p>


</CardContent>


</Card>




</div>

)

}