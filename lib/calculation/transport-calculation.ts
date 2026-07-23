export function calculateTransportCost({

  distanceKm,
  trips,
  avgSpeed,
  fuelConsumption,
  dieselPrice,
  hourlyRate,
  toll,

  overnightStops = 0,
  overnightCost = 0,

}: {

  distanceKm:number
  trips:number
  avgSpeed:number
  fuelConsumption:number
  dieselPrice:number
  hourlyRate:number
  toll:number

  overnightStops?:number
  overnightCost?:number

}) {


  // Strecke inklusive Hin- und Rückfahrt
  const totalDistance =
    distanceKm * trips * 2



  // Fahrzeit
  const drivingHours =
    avgSpeed > 0
      ? totalDistance / avgSpeed
      : 0



  // Personalkosten
  const labourCost =
    drivingHours * hourlyRate



  // Dieselverbrauch
  const fuelLiters =
    totalDistance *
    fuelConsumption /
    100



  // Dieselkosten
  const fuelCost =
    fuelLiters *
    dieselPrice



  // Maut
  const tollCost =
    totalDistance *
    toll



  // Übernachtungen
  const overnightTotal =
    overnightStops *
    overnightCost



  // Gesamtkosten
  const totalCost =
    labourCost +
    fuelCost +
    tollCost +
    overnightTotal



  return {

    totalDistance,

    drivingHours,

    labourCost,

    fuelLiters,

    fuelCost,

    tollCost,

    overnightTotal,

    totalCost,

  }

}