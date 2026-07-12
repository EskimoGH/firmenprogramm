import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  LayoutDashboard,
  FolderKanban,
  Settings,
} from "lucide-react"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Projekte",
    url: "/projekte",
    icon: FolderKanban,
  },
  {
    title: "Einstellungen",
    url: "/einstellungen",
    icon: Settings,
  },
]


export function AppSidebar() {
  return (
    <Sidebar>

      <SidebarContent>

        <SidebarGroup>

          <SidebarGroupLabel>
            Firmenprogramm
          </SidebarGroupLabel>


          <SidebarGroupContent>

            <SidebarMenu>

              {items.map((item)=>(
                <SidebarMenuItem key={item.title}>

                    <Link href={item.url} className="flex items-center gap-2">

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