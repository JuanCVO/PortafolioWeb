"use client"

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@app/components/ui/menubar"
import {
  Home,
  Briefcase,
  GraduationCap,
  Wrench,
  Languages,
  Handshake,
} from "lucide-react"

export function MenubarComponent() {

  const scrollTo = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <Menubar className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-6 h-12 rounded-2xl shadow-sm border border-muted bg-background/50 backdrop-blur-md text-base">
      <MenubarMenu>
        <MenubarTrigger onClick={() => scrollTo("inicio")} className="cursor-pointer">
          <Home className="mr-2 h-4 w-4" /> Inicio
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={() => scrollTo("experiencia")} className="cursor-pointer">
          <Briefcase className="mr-2 h-4 w-4" /> Experiencia
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={() => scrollTo("educacion")} className="cursor-pointer">
          <GraduationCap className="mr-2 h-4 w-4" /> Educación
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={() => scrollTo("habilidades")} className="cursor-pointer">
          <Wrench className="mr-2 h-4 w-4" /> Habilidades
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={() => scrollTo("idiomas")} className="cursor-pointer">
          <Languages className="mr-2 h-4 w-4" /> Idiomas
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={() => scrollTo("contacto")} className="cursor-pointer">
          <Handshake className="mr-2 h-4 w-4" /> Contacto
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  )
}
