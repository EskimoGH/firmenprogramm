import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"

const projects = [
  {
    id: "1",
    verkaufsId: "V-2026-001",
    ag: "Müller GmbH",
  },
  {
    id: "2",
    verkaufsId: "V-2026-002",
    ag: "Schmidt AG",
  },
]

export default async function ProjektDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {

const { id } = await params

const project = projects.find(
  (p) => p.id === id
)

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
{project?.verkaufsId}
</BreadcrumbPage>

</BreadcrumbItem>


</BreadcrumbList>

</Breadcrumb>


<div className="flex justify-between items-center">

<div>

<h1 className="text-3xl font-semibold">
Projekt {project?.verkaufsId}
</h1>

<p className="text-muted-foreground mt-1">
{project?.ag}
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
V-2026-001
</p>

</div>



<div>
<span className="text-muted-foreground">
Auftragsnummer
</span>

<p>
A-12345
</p>

</div>


<div>
<span className="text-muted-foreground">
Auftraggeber
</span>

<p>
Müller GmbH
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
Hauptstraße 1
</p>

<p>
01067 Dresden
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