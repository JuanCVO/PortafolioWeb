# Portafolio de Juan Camilo Vélez

Desarrollador Frontend y Full Stack. Estudiante de Ingeniería de Sistemas en la Universidad del Valle.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

Demo: https://portafolio-web-juancvos-projects.vercel.app

## Qué es

Mi portafolio personal. Mantiene el layout de un perfil de GitHub (pestañas, sidebar, tarjetas de repositorios) con una estética retro pixelada sobre la paleta GitHub Dark.

Secciones: resumen, repositorios destacados, proyectos, stack técnico, trayectoria (experiencia, educación, certificación e idiomas) y contacto. Todo el contenido está en español e inglés.

## Detalles de diseño

- Tipografías Press Start 2P (títulos y botones) y DotGothic16 (texto), cargadas con `next/font`.
- La foto de perfil se dibuja en un canvas a baja resolución y paleta reducida; al pasar el cursor se muestra la foto real.
- Bordes gruesos, sombras duras y transiciones por pasos, definidos en `src/app/globals.css`.
- Modal con carrusel de capturas de RestaurantOS.
- Las pestañas siguen el scroll: marcan la sección visible y se centran solas en pantallas angostas. El nombre de la sección también aparece en la ruta de la barra superior.
- Nube 3D de tecnologías dibujada en canvas, con los íconos de Simple Icons y el nombre de cada uno al pasar el cursor o tocarlo.
- Sección de contacto con botón para copiar el correo.
- Explosión de píxeles al hacer clic, texto que se escribe solo y aparición de secciones por pasos.
- Animaciones con Framer Motion. Con `prefers-reduced-motion` activado se desactivan las partículas, la escritura, la nube en movimiento y los efectos CSS.

## Stack

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion y lucide-react.

## Estructura

```
src/
  app/
    layout.tsx        Fuentes y metadatos (SEO y Open Graph)
    page.tsx          Página única y textos ES/EN
    globals.css       Tema retro y utilidades pixel
  components/ui/      Componentes de la interfaz
public/
  cv/                 CV en PDF
  restaurantos/       Capturas del modal de RestaurantOS
  foto.png
```
## Contacto

[GitHub](https://github.com/JuanCVO) · [LinkedIn](https://www.linkedin.com/in/jcvo07) · velezospinajuancamilo@gmail.com
