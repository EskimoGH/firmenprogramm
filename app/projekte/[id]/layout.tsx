import { ProjectSidebar } from "@/components/layout/project-sidebar"


export default async function ProjectLayout({
  children,
  params,
}:{
  children: React.ReactNode
  params: Promise<{
    id:string
  }>
}) {

  const { id } = await params


  return (
    <>
      <ProjectSidebar projectId={id}/>

      <main className="flex-1">
        {children}
      </main>
    </>
  )
}