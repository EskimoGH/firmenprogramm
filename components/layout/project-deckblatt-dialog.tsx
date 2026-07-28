"use client"

import { memo, useState } from "react"
import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer"
import { FileDown, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

type CoverSheetData = {
  projectTitle: string
  projectNumber: string
  customerName: string
  createdAt: string
  contactName: string | null
  avvCodes: string[]
}

type CoverField = "projectTitle" | "projectNumber" | "customerName" | "createdAt" | "contactName" | "avvCodes"

type Visibility = Record<CoverField, boolean>

const defaultVisibility: Visibility = {
  projectTitle: true,
  projectNumber: true,
  customerName: true,
  createdAt: true,
  contactName: true,
  avvCodes: true,
}

const fieldLabels: Record<CoverField, string> = {
  projectTitle: "Projekttitel",
  projectNumber: "Projektnummer",
  customerName: "Kundenname",
  createdAt: "Anlagedatum",
  contactName: "Ansprechpartner",
  avvCodes: "Ausgewählte AVV-Kennungen",
}

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
})

const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: 64,
    paddingHorizontal: 56,
    paddingBottom: 56,
    color: "#172033",
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  eyebrow: {
    color: "#52627a",
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 14,
    color: "#102a56",
    fontSize: 27,
    fontFamily: "Helvetica-Bold",
  },
  rule: {
    height: 3,
    marginTop: 20,
    marginBottom: 28,
    backgroundColor: "#2563eb",
  },
  sectionTitle: {
    marginBottom: 10,
    color: "#102a56",
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d9e1ec",
    paddingVertical: 9,
  },
  label: {
    width: "38%",
    color: "#52627a",
  },
  value: {
    width: "62%",
    fontFamily: "Helvetica-Bold",
  },
  notes: {
    marginTop: 30,
    padding: 14,
    borderWidth: 1,
    borderColor: "#d9e1ec",
    backgroundColor: "#f8fafc",
  },
  noteText: {
    lineHeight: 1.5,
  },
  footer: {
    position: "absolute",
    bottom: 32,
    left: 56,
    right: 56,
    color: "#718096",
    fontSize: 8,
    textAlign: "center",
  },
})

function CoverSheetPdf({
  data,
  visibility,
  notes,
}: {
  data: CoverSheetData
  visibility: Visibility
  notes: string
}) {
  const fields: Array<{ key: CoverField; value: string | null }> = [
    { key: "projectTitle", value: data.projectTitle },
    { key: "projectNumber", value: data.projectNumber },
    { key: "customerName", value: data.customerName },
    { key: "createdAt", value: dateFormatter.format(new Date(data.createdAt)) },
    { key: "contactName", value: data.contactName },
    { key: "avvCodes", value: data.avvCodes.join(", ") || "Keine AVV-Kennung hinterlegt" },
  ]

  return (
    <Document title={`Deckblatt ${data.projectNumber}`} author="Firmenprogramm">
      <Page size="A4" style={pdfStyles.page}>
        <Text style={pdfStyles.eyebrow}>Projektunterlagen</Text>
        <Text style={pdfStyles.title}>Projektdeckblatt</Text>
        <View style={pdfStyles.rule} />

        <Text style={pdfStyles.sectionTitle}>Projektdaten</Text>
        {fields.filter((field) => visibility[field.key]).map((field) => (
          <View key={field.key} style={pdfStyles.row}>
            <Text style={pdfStyles.label}>{fieldLabels[field.key]}</Text>
            <Text style={pdfStyles.value}>{field.value ?? "Nicht hinterlegt"}</Text>
          </View>
        ))}

        {notes.trim() && (
          <View style={pdfStyles.notes}>
            <Text style={pdfStyles.sectionTitle}>Notizen</Text>
            <Text style={pdfStyles.noteText}>{notes.trim()}</Text>
          </View>
        )}

        <Text style={pdfStyles.footer}>Erstellt mit Firmenprogramm</Text>
      </Page>
    </Document>
  )
}

const PdfPreview = memo(function PdfPreview({
  data,
  visibility,
  notes,
}: {
  data: CoverSheetData
  visibility: Visibility
  notes: string
}) {
  return (
    <div className="h-[34rem] overflow-hidden rounded-lg border bg-muted">
      <PDFViewer className="h-full w-full border-0" showToolbar={false}>
        <CoverSheetPdf data={data} visibility={visibility} notes={notes} />
      </PDFViewer>
    </div>
  )
})

export function ProjectCoverSheetDialog({ data }: { data: CoverSheetData }) {
  const [open, setOpen] = useState(false)
  const [visibility, setVisibility] = useState<Visibility>(defaultVisibility)
  const [notes, setNotes] = useState("")
  const [draftNotes, setDraftNotes] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)

    if (!nextOpen) {
      setVisibility(defaultVisibility)
      setNotes("")
      setDraftNotes("")
    }
  }

  function setFieldVisibility(field: CoverField, checked: boolean) {
    setVisibility((current) => ({ ...current, [field]: checked }))
  }

  async function downloadPdf() {
    setIsGenerating(true)

    try {
      const blob = await pdf(
        <CoverSheetPdf data={data} visibility={visibility} notes={notes} />
      ).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      const safeProjectNumber = data.projectNumber.replace(/[^a-zA-Z0-9_-]/g, "_")

      link.href = url
      link.download = `Deckblatt_${safeProjectNumber || "Projekt"}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button />}>
        <FileText />
        Deckblatt erstellen
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto p-6 sm:max-w-6xl" showCloseButton>
        <DialogHeader>
          <DialogTitle>Deckblatt erstellen</DialogTitle>
          <DialogDescription>
            Passen Sie die sichtbaren Angaben an. Die Vorschau aktualisiert sich unmittelbar.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <section className="min-w-0">
            <p className="mb-2 text-sm font-medium">PDF-Vorschau</p>
            <PdfPreview data={data} visibility={visibility} notes={notes} />
          </section>

          <div className="space-y-6">
            <section className="space-y-3">
              <p className="text-sm font-medium">Wählen Sie die anzuzeigenden Informationen:</p>
              {(Object.keys(fieldLabels) as CoverField[]).map((field) => (
                <div key={field} className="flex items-center justify-between gap-3">
                  <Label htmlFor={`cover-field-${field}`} className="cursor-pointer text-sm">
                    {fieldLabels[field]}
                  </Label>
                  <Switch
                    id={`cover-field-${field}`}
                    checked={visibility[field]}
                    onCheckedChange={(checked) => setFieldVisibility(field, checked)}
                  />
                </div>
              ))}
            </section>

            <section className="space-y-2">
              <Label htmlFor="cover-sheet-notes">Persönliche Notizen für dieses Deckblatt</Label>
              <Textarea
                id="cover-sheet-notes"
                value={draftNotes}
                onChange={(event) => setDraftNotes(event.target.value)}
                placeholder="Ergänzende Hinweise für die Projektunterlagen …"
                className="min-h-36 resize-y"
              />
              <p className="text-xs text-muted-foreground">
                Notizen sind nur für diesen Vorgang lokal gespeichert.
              </p>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setNotes(draftNotes)}
                disabled={draftNotes === notes}
              >
                Übernehmen
              </Button>
            </section>

            <Button className="w-full" onClick={downloadPdf} disabled={isGenerating}>
              <FileDown />
              {isGenerating ? "PDF wird erstellt …" : "PDF generieren & herunterladen"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
