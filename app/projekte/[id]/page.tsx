import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { getProject } from "@/services/project.service"

import { ProjectInformationCard } from "@/components/layout/project-information-card"
import { CompanyCard } from "@/components/layout/company-card"
import { LocationCard } from "@/components/layout/location-card"
import { ContactsCard } from "@/components/layout/contacts-card"
import { NotesCard } from "@/components/layout/notes-card"
import AngebotsCard from "@/components/layout/angebots-card"

export default async function ProjektDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params

  const project = await getProject(id)

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
          {project.status}
        </Badge>

      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <ProjectInformationCard projectId={project.id} project={project}/>

        <CompanyCard company={project.company} />

        <LocationCard projectId={project.id} project={project} />

      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        
        <NotesCard projectId={project.id} note={project.note}/>

        <ContactsCard contacts={project.company.contacts} />

      </div>

      <div className="grid gap-6 md:grid-cols-1">
        
        <AngebotsCard projectId={project.id} calculations={project.calculations} />

      </div>

    </div>

  )

}