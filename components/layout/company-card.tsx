import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Building2,
  Mail,
  Phone,
} from "lucide-react"


type CompanyCardProps = {
  company: {
    name: string
    street?: string | null
    postalCode?: string | null
    city?: string | null
    phone?: string | null
    email?: string | null
  }
}


export function CompanyCard({
  company,
}: CompanyCardProps) {

  return (
    <Card>

      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 size={20} />
          Auftraggeber
        </CardTitle>
      </CardHeader>


      <CardContent className="space-y-4">


        {/* Firmenname */}
        <div>
          <p className="text-sm text-muted-foreground">
            Firma
          </p>

          <p className="font-medium">
            {company.name}
          </p>
        </div>



        {/* Adresse */}
        {(company.street ||
          company.postalCode ||
          company.city) && (

          <div>
            <p className="text-sm text-muted-foreground">
              Adresse
            </p>

            <p className="font-medium">
              {company.street}
              <br />

              {company.postalCode} {company.city}
            </p>
          </div>

        )}



        {/* Telefon */}
        {company.phone && (

          <div className="flex items-center gap-2">

            <Phone size={16} className="text-muted-foreground" />

            <span>
              {company.phone}
            </span>

          </div>

        )}



        {/* E-Mail */}
        {company.email && (

          <div className="flex items-center gap-2">

            <Mail size={16} className="text-muted-foreground" />

            <span>
              {company.email}
            </span>

          </div>

        )}


      </CardContent>

    </Card>
  )
}