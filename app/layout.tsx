import "./globals.css"

import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/layout/app-sidebar"

import { Geist } from "next/font/google"


const geist = Geist({
  subsets: ["latin"],
})


export const metadata = {
  title: "Firmenprogramm",
  description: "Interne Projektverwaltung",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

return (

<html lang="de">

<body className={geist.className}>

<SidebarProvider>

<AppSidebar />


<main className="flex-1">

<div className="border-b p-3">
<SidebarTrigger />
</div>


{children}

</main>


</SidebarProvider>

</body>

</html>

)

}