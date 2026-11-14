"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  createBackTexture,
  createCardGeometry,
  createFrontTexture,
  createStrapTexture,
  loadCardFont,
  loadImage,
  type CardInfo,
} from "./lanyard-assets";
import { StrapRibbon } from "./lanyard-strap";

export interface LanyardProps {
  photoUrl?: string;
  fullCardUrl?: string;
  /** Solo para el aria-label */
  fullName?: string;
  role?: string;
  githubUsername?: string;
  accentColor?: string;
  strapText?: string;
  lang?: "es" | "en";
  className?: string;
}

type Vec3 = [number, number, number];

const SEGMENTS = 4;
const SEG_LEN = 0.64;
const ROPE: [Vec3, Vec3, number] = [[0, 0, 0], [0, 0, 0], SEG_LEN];
const HANG_Y = CARD_HEIGHT / 2 + 0.14; // donde cuelga la cinta del carnet
const ANCHOR_Y = 3.9; // punto fijo de arriba, fuera del encuadre

// Luces de estudio para el reflejo del carnet. Las que no traen color usan el de acento
const LIGHTS: { intensity: number; color?: string; position: Vec3; rotation: Vec3; scale: Vec3 }[] = [
  { intensity: 2.2, color: "#ffffff", position: [0, 6, 4], rotation: [Math.PI / 3, 0, 0], scale: [10, 4, 1] },
  { intensity: 1.6, position: [-6, 1, 3], rotation: [0, Math.PI / 3, 0], scale: [6, 8, 1] },
  { intensity: 1.8, color: "#ffffff", position: [6, -1, 4], rotation: [0, -Math.PI / 3, 0], scale: [6, 8, 1] },
  { intensity: 1.2, color: "#e4e4e7", position: [0, -5, 5], rotation: [-Math.PI / 3, 0, 0], scale: [8, 3, 1] },
];

function useDispose(resource: { dispose(): void }) {
  useEffect(() => () => resource.dispose(), [resource]);
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function useCardTextures(info: CardInfo, strapText: string) {
  const back = useMemo(() => createBackTexture(info), [info]);
  const strap = useMemo(() => createStrapTexture(strapText, info.accentColor), [strapText, info.accentColor]);
  const [front, setFront] = useState<THREE.Texture>(() => createFrontTexture(info, null));

  useEffect(() => {
    let cancelled = false;

    const withPhoto = async () => {
      const photo = await loadImage(info.photoUrl);
      if (!cancelled) setFront(createFrontTexture(info, photo));
    };

    if (!info.fullCardUrl) {
      withPhoto();
    } else {
      new THREE.TextureLoader().load(
        info.fullCardUrl,
        (texture) => {
          if (cancelled) return texture.dispose();
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = 8;
          setFront(texture);
        },
        undefined,
        withPhoto // si el diseño completo no carga, se arma el carnet con la foto
      );
    }

    return () => {
      cancelled = true;
    };
  }, [info]);

  useDispose(front);
  useDispose(back);
  useDispose(strap);
  return { front, back, strap };
}

interface SceneProps {
  info: CardInfo;
  strapText: string;
  reducedMotion: boolean;
  onGrab: () => void;
}

function Scene({ info, strapText, reducedMotion, onGrab }: SceneProps) {
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const j4 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  const segments = [j1, j2, j3, j4];

  const [dragged, setDragged] = useState<THREE.Vector3 | false>(false);
  const [hovered, setHovered] = useState(false);

  const damping = reducedMotion ? 5.5 : 3;
  const spread = reducedMotion ? 0 : 0.3; // arranca desfasado para que se columpie al cargar

  useRopeJoint(fixed, j1, ROPE);
  useRopeJoint(j1, j2, ROPE);
  useRopeJoint(j2, j3, ROPE);
  useRopeJoint(j3, j4, ROPE);
  useSphericalJoint(j4, card, [[0, 0, 0], [0, HANG_Y, 0]]);

  useEffect(() => {
    if (!hovered && !dragged) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  // Si sueltas fuera del carnet (o del canvas) el onPointerUp del carnet no se entera
  useEffect(() => {
    if (!dragged) return;
    const release = () => setDragged(false);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, [dragged]);

  const geometry = useMemo(createCardGeometry, []);
  useDispose(geometry);
  const textures = useCardTextures(info, strapText);

  const curve = useMemo(() => {
    const points = Array.from({ length: SEGMENTS + 1 }, () => new THREE.Vector3());
    const c = new THREE.CatmullRomCurve3(points);
    c.curveType = "chordal";
    return c;
  }, []);
  const ribbon = useMemo(() => new StrapRibbon(), []);
  useDispose(ribbon.geometry);

  const smoothed = useMemo(() => Array.from({ length: SEGMENTS }, () => new THREE.Vector3()), []);
  const seeded = useRef(false);

  // Se reutilizan para no crear objetos en cada frame
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const quat = useMemo(() => new THREE.Quaternion(), []);

  useFrame((state, delta) => {
    const body = card.current;
    if (!body || !fixed.current || segments.some((s) => !s.current)) return;

    if (dragged) {
      // Puntero en pantalla -> punto 3D a la misma distancia que la cámara
      tmp.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(tmp).sub(state.camera.position).normalize();
      tmp.add(dir.multiplyScalar(state.camera.position.length()));

      [card, fixed, ...segments].forEach((ref) => ref.current.wakeUp());
      body.setNextKinematicTranslation({
        x: tmp.x - dragged.x,
        y: tmp.y - dragged.y,
        z: tmp.z - dragged.z,
      });
    }

    // La curva va del carnet hacia arriba. El primer punto va exacto para que la cinta no se
    // despegue del casquillo; el resto se suaviza para que no se vea quebrada
    const smoothing = seeded.current ? Math.min(1, delta * 24) : 1;
    segments.forEach((_, i) => {
      const t = segments[segments.length - 1 - i].current.translation();
      tmp.set(t.x, t.y, t.z);
      if (i === 0) smoothed[i].copy(tmp);
      else smoothed[i].lerp(tmp, smoothing);
      curve.points[i].copy(smoothed[i]);
    });
    seeded.current = true;

    const top = fixed.current.translation();
    curve.points[SEGMENTS].set(top.x, top.y, top.z);

    const rot = body.rotation();
    ribbon.update(curve, quat.set(rot.x, rot.y, rot.z, rot.w));

    // Un empujoncito para que el carnet vuelva a mirar de frente
    const spin = body.angvel();
    const correction = reducedMotion ? 0.4 : 0.25;
    body.setAngvel({ x: spin.x, y: spin.y - rot.y * correction, z: spin.z }, true);
  });

  const grab = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as unknown as Element).setPointerCapture?.(e.pointerId);
    const t = card.current.translation();
    setDragged(new THREE.Vector3().copy(e.point).sub(tmp.set(t.x, t.y, t.z)));
    onGrab();
  };

  const drop = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as unknown as Element).releasePointerCapture?.(e.pointerId);
    setDragged(false);
  };

  const bodyProps = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: damping,
    linearDamping: damping,
  };

  return (
    <>
      <group position={[0, ANCHOR_Y, 0]}>
        <RigidBody ref={fixed} type="fixed" colliders={false} />

        {segments.map((ref, i) => (
          <RigidBody key={i} ref={ref} position={[spread * (i + 1), -SEG_LEN * (i + 1), 0]} {...bodyProps}>
            <BallCollider args={[0.08]} />
          </RigidBody>
        ))}

        <RigidBody
          ref={card}
          position={[spread * (SEGMENTS + 0.5), -SEG_LEN * SEGMENTS - HANG_Y, 0]}
          {...bodyProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[CARD_WIDTH / 2, CARD_HEIGHT / 2, 0.04]} />

          <group
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerDown={grab}
            onPointerUp={drop}
          >
            <mesh geometry={geometry}>
              <meshPhysicalMaterial
                attach="material-0"
                map={textures.front}
                clearcoat={1}
                clearcoatRoughness={0.12}
                roughness={0.18}
                metalness={0.05}
              />
              <meshPhysicalMaterial
                attach="material-1"
                map={textures.back}
                clearcoat={1}
                clearcoatRoughness={0.12}
                roughness={0.18}
                metalness={0.05}
              />
              <meshStandardMaterial attach="material-2" color="#1c1c24" roughness={0.3} metalness={0.5} />
            </mesh>

            <group position={[0, CARD_HEIGHT / 2 + 0.045, 0]}>
              <mesh>
                <boxGeometry args={[0.26, 0.12, 0.065]} />
                <meshStandardMaterial color="#d4d4d8" metalness={0.7} roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.09, 0]} rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.055, 0.016, 12, 24]} />
                <meshStandardMaterial color="#e4e4e7" metalness={0.75} roughness={0.25} />
              </mesh>
              <mesh position={[0, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.024, 0.024, 0.075, 16]} />
                <meshStandardMaterial color="#71717a" metalness={0.85} roughness={0.28} />
              </mesh>
            </group>

            {/* Casquillo por donde entra la cinta */}
            <RoundedBox args={[0.31, 0.11, 0.085]} radius={0.02} smoothness={3} position={[0, HANG_Y + 0.085, 0]}>
              <meshStandardMaterial color="#e4e4e7" metalness={0.7} roughness={0.28} />
            </RoundedBox>
          </group>
        </RigidBody>
      </group>

      <mesh geometry={ribbon.geometry} frustumCulled={false}>
        <meshPhysicalMaterial
          map={textures.strap}
          bumpMap={textures.strap}
          bumpScale={3}
          roughness={0.7}
          sheen={1}
          sheenRoughness={0.4}
          sheenColor={info.accentColor}
        />
      </mesh>
    </>
  );
}

export default function Lanyard({
  photoUrl = "/foto.png",
  fullCardUrl,
  fullName = "Juan Camilo Vélez Ospina",
  role = "Desarrollador Frontend · Full Stack",
  githubUsername = "JuanCVO",
  accentColor = "#58a6ff",
  strapText = "JuanCVO",
  lang = "es",
  className = "",
}: LanyardProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [fontReady, setFontReady] = useState(false);
  const [grabbed, setGrabbed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    setWebgl(supportsWebGL());
    loadCardFont().then(() => setFontReady(true));

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motion.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motion.addEventListener("change", onChange);
    return () => motion.removeEventListener("change", onChange);
  }, []);

  // Fuera de pantalla se pausa la simulación y el render
  useEffect(() => {
    if (!wrapper.current) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(wrapper.current);
    return () => observer.disconnect();
  }, []);

  const info = useMemo<CardInfo>(
    () => ({ photoUrl, fullCardUrl, role, githubUsername, accentColor }),
    [photoUrl, fullCardUrl, role, githubUsername, accentColor]
  );

  return (
    <div
      ref={wrapper}
      role="img"
      aria-label={lang === "es" ? `Credencial 3D interactiva de ${fullName}` : `Interactive 3D ID card of ${fullName}`}
      className={`relative h-full w-full touch-pan-y select-none ${className}`}
    >
      {webgl === false && (
        <Image
          src={photoUrl}
          alt={fullName}
          width={260}
          height={260}
          className="mx-auto h-64 w-64 border-4 border-[#30363d] object-cover object-[50%_15%]"
        />
      )}

      {webgl && fontReady && (
        <Canvas
          frameloop={onScreen ? "always" : "never"}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 8.5], fov: 25 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.65} />

          <Environment resolution={256} frames={1}>
            {LIGHTS.map((light, i) => (
              <Lightformer key={i} {...light} color={light.color ?? accentColor} />
            ))}
          </Environment>

          <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Scene info={info} strapText={strapText} reducedMotion={reducedMotion} onGrab={() => setGrabbed(true)} />
          </Physics>
        </Canvas>
      )}

      {webgl && fontReady && (
        <p
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 bottom-3 text-center font-display text-base font-medium text-[#8b949e] transition-opacity duration-500 ${
            grabbed ? "opacity-0" : "opacity-100"
          }`}
        >
          {lang === "es" ? "Arrástrame" : "Drag me"}
        </p>
      )}
    </div>
  );
}
