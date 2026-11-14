"use client"

import React, { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"

const SIZE = 340 // lado del canvas
const RADIUS = 125 // radio de la esfera
const TILE = 28 // lado del azulejo de cada ícono (se escala sin suavizado)

interface Icon {
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  id: number
}

interface IconCloudProps {
  images: string[]
  showControl?: boolean
  onHover?: (index: number | null) => void
  onSelect?: (index: number) => void
  label?: string
  playLabel?: string
  pauseLabel?: string
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function IconCloud({
  images,
  showControl = true,
  onHover,
  onSelect,
  label = "Interactive 3D Icon Cloud",
  playLabel = "Play Animation",
  pauseLabel = "Pause Animation",
}: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [iconPositions, setIconPositions] = useState<Icon[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetRotation, setTargetRotation] = useState<{
    x: number
    y: number
    startX: number
    startY: number
    distance: number
    startTime: number
    duration: number
  } | null>(null)
  const animationFrameRef = useRef<number>(0)
  const rotationRef = useRef({ x: 0, y: 0 })
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([])
  const imagesLoadedRef = useRef<boolean[]>([])

  // Pause animation if user prefers reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      setIsPaused(true)
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setIsPaused(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  // Create icon canvases once when the images change
  useEffect(() => {
    imagesLoadedRef.current = new Array(images.length).fill(false)

    const newIconCanvases = images.map((src, index) => {
      const offscreen = document.createElement("canvas")
      offscreen.width = TILE
      offscreen.height = TILE
      const offCtx = offscreen.getContext("2d")

      if (offCtx) {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = src
        img.onload = () => {
          offCtx.clearRect(0, 0, TILE, TILE)

          // Azulejo cuadrado con borde grueso, estilo pixel
          offCtx.fillStyle = "#0d1117"
          offCtx.fillRect(0, 0, TILE, TILE)
          offCtx.strokeStyle = "#30363d"
          offCtx.lineWidth = 2
          offCtx.strokeRect(1, 1, TILE - 2, TILE - 2)

          // Ícono centrado a baja resolución
          const inner = TILE - 12
          offCtx.drawImage(img, 6, 6, inner, inner)

          imagesLoadedRef.current[index] = true
        }
      }
      return offscreen
    })

    iconCanvasesRef.current = newIconCanvases
  }, [images])

  // Generate initial icon positions on a sphere
  useEffect(() => {
    const newIcons: Icon[] = []
    const numIcons = images.length || 20

    // Fibonacci sphere parameters
    const offset = 2 / numIcons
    const increment = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * increment

      const x = Math.cos(phi) * r
      const z = Math.sin(phi) * r

      newIcons.push({
        x: x * RADIUS,
        y: y * RADIUS,
        z: z * RADIUS,
        scale: 1,
        opacity: 1,
        id: i,
      })
    }
    setIconPositions(newIcons)
  }, [images])

  // Índice del ícono bajo el puntero (el más cercano al frente) o -1
  const hitIndex = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return -1
    const cosX = Math.cos(rotationRef.current.x)
    const sinX = Math.sin(rotationRef.current.x)
    const cosY = Math.cos(rotationRef.current.y)
    const sinY = Math.sin(rotationRef.current.y)

    let best = -1
    let bestZ = -Infinity
    iconPositions.forEach((icon) => {
      const rotatedX = icon.x * cosY - icon.z * sinY
      const rotatedZ = icon.x * sinY + icon.z * cosY
      const rotatedY = icon.y * cosX + rotatedZ * sinX
      const radius = (24 * (rotatedZ + 200)) / 300
      const dx = x - (canvas.width / 2 + rotatedX)
      const dy = y - (canvas.height / 2 + rotatedY)
      if (dx * dx + dy * dy < radius * radius && rotatedZ > bestZ) {
        best = icon.id
        bestZ = rotatedZ
      }
    })
    return best
  }

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect || !canvasRef.current) return

    // El canvas puede mostrarse más pequeño que su resolución interna (móvil)
    const ratio = canvasRef.current.width / rect.width
    const x = (e.clientX - rect.left) * ratio
    const y = (e.clientY - rect.top) * ratio

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const hit = hitIndex(x, y)
    if (hit >= 0) onSelect?.(hit)

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x)
      const sinX = Math.sin(rotationRef.current.x)
      const cosY = Math.cos(rotationRef.current.y)
      const sinY = Math.sin(rotationRef.current.y)

      const rotatedX = icon.x * cosY - icon.z * sinY
      const rotatedZ = icon.x * sinY + icon.z * cosY
      const rotatedY = icon.y * cosX + rotatedZ * sinX

      const screenX = canvasRef.current!.width / 2 + rotatedX
      const screenY = canvasRef.current!.height / 2 + rotatedY

      const scale = (rotatedZ + 200) / 300
      const radius = 24 * scale
      const dx = x - screenX
      const dy = y - screenY

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z)
        )
        const targetY = Math.atan2(icon.x, icon.z)

        const currentX = rotationRef.current.x
        const currentY = rotationRef.current.y
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
        )

        const duration = Math.min(2000, Math.max(800, distance * 1000))

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        })
        return
      }
    })

    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect && canvasRef.current) {
      const ratio = canvasRef.current.width / rect.width
      const x = (e.clientX - rect.left) * ratio
      const y = (e.clientY - rect.top) * ratio
      setMousePos({ x, y })
      const hit = hitIndex(x, y)
      onHover?.(hit >= 0 ? hit : null)
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x
      const deltaY = e.clientY - lastMousePos.y

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      }

      setLastMousePos({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    onHover?.(null)
  }

  // Animation and rendering
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (canvas && ctx) {
      ctx.imageSmoothingEnabled = false // escalado "nearest" para el look pixel
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
        const dx = mousePos.x - centerX
        const dy = mousePos.y - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const speed = 0.003 + (distance / maxDistance) * 0.01

        if (targetRotation) {
          const elapsed = performance.now() - targetRotation.startTime
          const progress = Math.min(1, elapsed / targetRotation.duration)
          const easedProgress = easeOutCubic(progress)

          rotationRef.current = {
            x:
              targetRotation.startX +
              (targetRotation.x - targetRotation.startX) * easedProgress,
            y:
              targetRotation.startY +
              (targetRotation.y - targetRotation.startY) * easedProgress,
          }

          if (progress >= 1) {
            setTargetRotation(null)
          }
        } else if (!isDragging && !isPaused) {
          rotationRef.current = {
            x: rotationRef.current.x + (dy / canvas.height) * speed,
            y: rotationRef.current.y + (dx / canvas.width) * speed,
          }
        }

        iconPositions.forEach((icon, index) => {
          const cosX = Math.cos(rotationRef.current.x)
          const sinX = Math.sin(rotationRef.current.x)
          const cosY = Math.cos(rotationRef.current.y)
          const sinY = Math.sin(rotationRef.current.y)

          const rotatedX = icon.x * cosY - icon.z * sinY
          const rotatedZ = icon.x * sinY + icon.z * cosY
          const rotatedY = icon.y * cosX + rotatedZ * sinX

          const scale = (rotatedZ + 200) / 300
          const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200))

          ctx.save()
          ctx.translate(
            canvas.width / 2 + rotatedX,
            canvas.height / 2 + rotatedY
          )
          ctx.scale(scale, scale)
          ctx.globalAlpha = opacity

          // Solo dibuja los íconos que ya terminaron de cargar
          if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
            ctx.drawImage(iconCanvasesRef.current[index], -24, -24, 48, 48)
          }

          ctx.restore()
        })

        const hasPendingAssets = !imagesLoadedRef.current.every((loaded) => loaded)
        const shouldContinue =
          !isPaused || isDragging || targetRotation !== null || hasPendingAssets

        if (shouldContinue) {
          animationFrameRef.current = requestAnimationFrame(animate)
        }
      }

      animate()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [
    images,
    iconPositions,
    isDragging,
    isPaused,
    mousePos,
    targetRotation,
  ])

  return (
    <div className="relative inline-block w-full max-w-[340px]">
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className="h-auto w-full cursor-grab active:cursor-grabbing"
        aria-label={label}
        role="img"
      />
      {showControl && (
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? playLabel : pauseLabel}
          className="pixel-btn absolute right-1 top-1 flex h-8 w-8 items-center justify-center border border-[#30363d] bg-[#21262d] text-[#e6edf3] hover:border-[#58a6ff] hover:text-[#58a6ff]"
        >
          {isPaused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      )}
    </div>
  )
}
