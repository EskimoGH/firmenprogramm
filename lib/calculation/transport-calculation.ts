export function calculateTransportCost({

  distanceKm,
  trips,
  avgSpeed,
  fuelConsumption,
  dieselPrice,
  hourlyRate,
  toll,

}: {

  distanceKm:number
  trips:number
  avgSpeed:number
  fuelConsumption:number
  dieselPrice:number
  hourlyRate:number
  toll:number

}) {


  const totalDistance =
    distanceKm * trips * 2


  const drivingHours =
    totalDistance / avgSpeed


  const labourCost =
    drivingHours * hourlyRate


  const fuelLiters =
    totalDistance *
    fuelConsumption /
    100


  const fuelCost =
    fuelLiters *
    dieselPrice


  const tollCost =
    totalDistance *
    toll



  const totalCost =
    labourCost +
    fuelCost +
    tollCost



  return {

    totalDistance,

    drivingHours,

    labourCost,

    fuelLiters,

    fuelCost,

    tollCost,

    totalCost,

  }

}