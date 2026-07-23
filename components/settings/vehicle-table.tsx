"use client"

import { VehicleMaster } from "@prisma/client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { VehicleRowActions } from "./vehicle-row-actions"

type Props = {
  vehicles: VehicleMaster[]
}

export function VehicleTable({
  vehicles,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fahrzeug</TableHead>
          <TableHead>Ø km/h</TableHead>
          <TableHead>Ø l / 100 km</TableHead>
          <TableHead>Ø Maut €/km</TableHead>
          <TableHead>Diesel €/l</TableHead>
          <TableHead className="w-[80px]" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell>{vehicle.type}</TableCell>

            <TableCell>{vehicle.avgSpeed} km/h</TableCell>

            <TableCell>{vehicle.fuelConsumption} l/100 km</TableCell>

            <TableCell>{vehicle.toll.toFixed(2)} €/km</TableCell>

            <TableCell>{vehicle.dieselPrice.toFixed(2)} €/l</TableCell>

            <TableCell>
              <VehicleRowActions vehicle={vehicle} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}