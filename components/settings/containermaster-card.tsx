import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ContainerMasterTable } from "./containermaster-table"

import { CreateContainerMasterDialog } from "./create-containermaster-dialog"


export function ContainerMasterCard({
  containers,
}: {
  containers: any[]
}) {

  return (

    <Card>

      <CardHeader className="flex flex-row items-center justify-between">

        <CardTitle>
          Container-Stammdaten
        </CardTitle>


        <CreateContainerMasterDialog />

      </CardHeader>


      <CardContent>

        <ContainerMasterTable
          containers={containers}
        />

      </CardContent>


    </Card>

  )

}