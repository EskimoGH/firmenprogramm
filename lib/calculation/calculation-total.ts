export function getCalculationTotal(summary:any) {

  if (!summary) return 0


  return (

    (summary.materialTotal ?? 0) +

    (summary.transportTotal ?? 0) +

    (summary.containerTotal ?? 0) +

    (summary.labourTotal ?? 0) +

    (summary.disposalTotal ?? 0) +

    (summary.otherTotal ?? 0)

  )

}