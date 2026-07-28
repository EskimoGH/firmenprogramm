import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { CreateProjectContainerDialog } from "./create-container-dialog"

import { ContainerRowActions } from "./containereinsatz-row-actions"


function formatDate(date?: Date | null) {

  if (!date) return "-"

  return new Date(date).toLocaleDateString("de-DE")

}



export function ContainereinsatzCard({
  projectId,
  containers,
}: {
  projectId: string
  containers: any[]
}) {


  return (

    <Card>


      <CardHeader className="flex flex-row items-center justify-between">


        <CardTitle>
          Containereinsatz
        </CardTitle>


        <CreateProjectContainerDialog
          projectId={projectId}
        />


      </CardHeader>



      <CardContent>


        <div className="rounded-md border">


          <Table>


            <TableHeader>


              <TableRow>


                <TableHead>
                  Nummer
                </TableHead>


                <TableHead>
                  Name
                </TableHead>


                <TableHead>
                  Volumen
                </TableHead>


                <TableHead>
                  Abreise Betrieb
                </TableHead>


                <TableHead>
                  Baustellenankunft
                </TableHead>


                <TableHead>
                  Ankunft Betrieb
                </TableHead>


                <TableHead className="text-right">
                  Aktionen
                </TableHead>


              </TableRow>


            </TableHeader>



            <TableBody>



              {containers.length === 0 ? (


                <TableRow>


                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground"
                  >

                    Keine Container zugeordnet

                  </TableCell>


                </TableRow>


              ) : (


                containers.map((container) => (


                  <TableRow
                    key={container.id}
                  >


                    <TableCell>

                      {container.containerNumber}

                    </TableCell>



                    <TableCell>

                      {container.containerName}

                    </TableCell>



                    <TableCell>

                      {container.volumeTon?.toFixed(1)} t

                    </TableCell>



                    <TableCell>

                      {formatDate(
                        container.departureOperationDate
                      )}

                    </TableCell>



                    <TableCell>

                      {formatDate(
                        container.arrivalSiteDate
                      )}

                    </TableCell>



                    <TableCell>

                      {formatDate(
                        container.arrivalOperationDate
                      )}

                    </TableCell>



                    <TableCell className="text-right">

                      <ContainerRowActions
                        container={container}
                      />

                    </TableCell>



                  </TableRow>


                ))


              )}



            </TableBody>


          </Table>


        </div>


      </CardContent>


    </Card>

  )

}