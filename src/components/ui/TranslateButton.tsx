import { Button } from "@app/components/ui/button"
import { Globe } from "lucide-react"

interface TranslateButtonProps {
  setLang: (lang: "es" | "en") => void
  lang: "es" | "en"
  className?: string
}

export default function TranslateButton({ setLang, lang, className }: TranslateButtonProps) {
  return (
    <Button
      onClick={() => setLang(lang === "es" ? "en" : "es")}
      className={`fixed top-4 right-4 z-[9999] flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg bg-blue-600 hover:bg-blue-700 text-white ${className}`}
    >
      <Globe size={18} />
      {lang === "es" ? "EN" : "ES"}
    </Button>
  )
}
