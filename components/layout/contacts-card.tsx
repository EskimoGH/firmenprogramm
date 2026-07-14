import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  UserRound,
  Mail,
  Phone,
  BriefcaseBusiness,
} from "lucide-react"


type ContactsCardProps = {
  contacts: {
    id: string
    firstName: string
    lastName: string
    role: string | null
    phone: string | null
    email: string | null
  }[]
}


export function ContactsCard({
  contacts,
}: ContactsCardProps) {

  return (
    <Card>

      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserRound size={20} />
          Ansprechpartner
        </CardTitle>
      </CardHeader>


      <CardContent className="space-y-5">


        {contacts.length > 0 ? (

          contacts.map((contact) => (

            <div
              key={contact.id}
              className="space-y-3 rounded-lg border p-4"
            >


              {/* Name */}
              <div>

                <p className="font-medium">
                  {contact.firstName} {contact.lastName}
                </p>

              </div>



              {/* Rolle */}
              {contact.role && (

                <div className="flex items-center gap-2 text-sm">

                  <BriefcaseBusiness
                    size={16}
                    className="text-muted-foreground"
                  />

                  <span>
                    {contact.role}
                  </span>

                </div>

              )}



              {/* Telefon */}
              {contact.phone && (

                <div className="flex items-center gap-2 text-sm">

                  <Phone
                    size={16}
                    className="text-muted-foreground"
                  />

                  <span>
                    {contact.phone}
                  </span>

                </div>

              )}



              {/* E-Mail */}
              {contact.email && (

                <div className="flex items-center gap-2 text-sm">

                  <Mail
                    size={16}
                    className="text-muted-foreground"
                  />

                  <span>
                    {contact.email}
                  </span>

                </div>

              )}


            </div>

          ))


        ) : (


          <p className="text-muted-foreground">
            Keine Ansprechpartner hinterlegt
          </p>


        )}


      </CardContent>

    </Card>
  )
}