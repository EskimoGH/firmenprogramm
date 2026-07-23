import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  FolderKanban,
  FileText,
  Home,
} from "lucide-react"


export function ProjectSidebar({
  projectId,
}:{
  projectId:string
}) {


const items = [
  {
    title:"Übersicht",
    url:"/projekte",
    icon:Home,
  },
  
    {
    title:"Projekt",
    url:`/projekte/${projectId}`,
    icon:FolderKanban,
  },
  {
    title:"Dokumente",
    url:`/projekte/${projectId}/dokumente`,
    icon:FileText,
  },
]


return (

<Sidebar>

<SidebarContent>

<SidebarGroup>

<SidebarGroupLabel>
Projekt
</SidebarGroupLabel>


<SidebarGroupContent>

<SidebarMenu>

{items.map((item)=>(
<SidebarMenuItem key={item.title}>

<Link
href={item.url}
className="flex items-center gap-2"
>

<item.icon />

<span>
{item.title}
</span>

</Link>


</SidebarMenuItem>
))}


</SidebarMenu>


</SidebarGroupContent>

</SidebarGroup>

</SidebarContent>

</Sidebar>

)

}