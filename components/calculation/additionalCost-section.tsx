import { Card, CardContent } from "@/components/ui/card"
import { AdditionalCostDialog } from "./create-additionalCost-dialog"
import { AdditionalCostTable } from "./additionalCost-table"
import { formatCurrency } from "@/lib/format/currency"


export function AdditionalCostSection({
  calculation,
  projectId,
}: {
  calculation: any
  projectId: string
}) {


const additionalCostTotal =
  calculation.summary?.otherTotal ?? 0



return (

<Card>

<CardContent className="p-6 space-y-4">


<div className="flex items-center justify-between">


<div className="flex items-center gap-6">


<h2 className="text-xl font-semibold">
Zusatzkosten
</h2>


<div className="text-sm">

<span className="font-semibold text-lg">
{formatCurrency(additionalCostTotal)}
</span>

</div>


</div>



<AdditionalCostDialog
  projectId={projectId}
  calculationId={calculation.id}
/>


</div>



<AdditionalCostTable

  costs={calculation.additionalCosts}

  projectId={projectId}

  calculationId={calculation.id}

/>



</CardContent>


</Card>

)

}