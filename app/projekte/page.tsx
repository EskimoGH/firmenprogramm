import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createProject } from "@/actions/project.actions"
import { getProjects } from "@/services/project.service"
import { CreateProjectDialog } from "@/components/layout/create-project-dialog"

export default async function Projekte() {

  const projects = await getProjects()

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-semibold">
          Projekte
        </h1>

        <CreateProjectDialog />

      </div>  

      <div className="rounded-md border">

        <table className="w-full">

          <thead className="bg-muted">
            <tr>
              {[
                "AG",
                "Verkaufs-ID",
                "Monat",
                "Status",
                "PLZ",
                "Übernahmeort",
                "Auktionspositionen",
                "Container",
                "Container-Stellzeit",
                "KFZ"
              ].map(header => (
                <th
                  key={header}
                  className="p-3 text-left text-sm font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

            <tbody>
            {projects.map((project) => {
                const activeCalculation = project.calculations.find(
                (c) => c.active
                )

                return (
                <tr
                    key={project.id}
                    className="border-t hover:bg-muted/50 transition"
                >
                    <td className="p-3">
                    <Link
                        href={`/projekte/${project.id}`}
                        className="font-medium hover:underline"
                    >
                        {project.company.name}
                    </Link>
                    </td>

                    <td className="p-3">
                    {project.verkaufsId}
                    </td>

                    <td className="p-3">
                    {new Date(project.createdAt).toLocaleDateString("de-DE", {
                        month: "long",
                        year: "numeric",
                    })}
                    </td>

                    <td className="p-3">
                    {project.status}
                    </td>

                    <td className="p-3">
                    {project.postalCode ?? "-"}
                    </td>

                    <td className="p-3">
                    {project.city ?? "-"}
                    </td>

                    <td className="p-3 text-center">
                    {activeCalculation?.positions.length ?? 0}
                    </td>

                    <td className="p-3 text-center">
                    {activeCalculation?.containers.length ?? 0}
                    </td>

                    <td className="p-3">
                    -
                    </td>

                    <td className="p-3">
                    {activeCalculation?.transports[0]?.vehicleType ?? "-"}
                    </td>
                </tr>
                )
            })}
            </tbody>

        </table>

      </div>

    </div>
  )
}