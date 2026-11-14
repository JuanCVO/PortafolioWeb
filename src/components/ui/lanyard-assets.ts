import * as THREE from "three";

export interface CardInfo {
  photoUrl: string;
  /** Si lo pasas, se usa como frente del carnet en vez del diseño generado */
  fullCardUrl?: string;
  role: string;
  githubUsername: string;
  /** Hex de 6 dígitos, ej. "#58a6ff" (se le pegan sufijos de alfa) */
  accentColor: string;
}

export const CARD_WIDTH = 1.6;
export const CARD_HEIGHT = 2.25;

const CARD_DEPTH = 0.032;
const CORNER = 0.11;

// Tamaño del lienzo de las caras del carnet (misma proporción que el carnet)
const W = 1024;
const H = 1440;

// La fuente del carnet se carga en layout.tsx y llega como variable CSS
function fontFamily() {
  const family = getComputedStyle(document.body).getPropertyValue("--font-display").trim();
  return family || "system-ui, sans-serif";
}

// Un canvas no dispara la descarga de la fuente por su cuenta: hay que pedirla antes de dibujar
export async function loadCardFont() {
  const family = fontFamily();
  const loaded = Promise.all([600, 700].map((weight) => document.fonts.load(`${weight} 48px ${family}`)));
  const timeout = new Promise((resolve) => setTimeout(resolve, 2000));
  await Promise.race([loaded, timeout]).catch(() => {});
}

function newCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return { canvas, ctx: canvas.getContext("2d")! };
}

function toTexture(canvas: HTMLCanvasElement) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

export function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// Materiales por grupo: 0 = frente, 1 = reverso, 2 = canto
export function createCardGeometry() {
  const x = -CARD_WIDTH / 2;
  const y = -CARD_HEIGHT / 2;
  const w = CARD_WIDTH;
  const h = CARD_HEIGHT;
  const r = CORNER;

  const shape = new THREE.Shape();
  shape.moveTo(x, y + r);
  shape.lineTo(x, y + h - r);
  shape.quadraticCurveTo(x, y + h, x + r, y + h);
  shape.lineTo(x + w - r, y + h);
  shape.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
  shape.lineTo(x + w, y + r);
  shape.quadraticCurveTo(x + w, y, x + w - r, y);
  shape.lineTo(x + r, y);
  shape.quadraticCurveTo(x, y, x, y + r);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: CARD_DEPTH,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.008,
    bevelThickness: 0.008,
    curveSegments: 16,
  });
  geometry.center();
  geometry.computeVertexNormals();
  geometry.clearGroups();

  const { position, normal, uv } = geometry.attributes;

  // No está indexada: cada 3 vértices son un triángulo
  for (let tri = 0; tri < position.count; tri += 3) {
    const nz = (normal.getZ(tri) + normal.getZ(tri + 1) + normal.getZ(tri + 2)) / 3;
    const group = nz > 0.65 ? 0 : nz < -0.65 ? 1 : 2;
    geometry.addGroup(tri, 3, group);

    for (let i = tri; i < tri + 3; i++) {
      const u = THREE.MathUtils.clamp(position.getX(i) / w + 0.5, 0, 1);
      const v = THREE.MathUtils.clamp(position.getY(i) / h + 0.5, 0, 1);
      uv.setXY(i, group === 1 ? 1 - u : u, v); // en el reverso se invierte u para que el texto no salga en espejo
    }
  }
  uv.needsUpdate = true;

  return geometry;
}

export function createStrapTexture(text: string, accent: string) {
  const w = 1024;
  const h = 128; // 8:1, el mismo ratio que usa lanyard-strap.ts
  const { canvas, ctx } = newCanvas(w, h);

  ctx.fillStyle = "#0e0e13";
  ctx.fillRect(0, 0, w, h);

  // Trama cruzada, de tela tejida
  ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
  ctx.lineWidth = 3;
  for (let i = -h; i < w + h; i += 12) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + h, h);
    ctx.moveTo(i, h);
    ctx.lineTo(i + h, 0);
    ctx.stroke();
  }

  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, w, 12);
  ctx.fillRect(0, h - 12, w, 12);

  ctx.strokeStyle = `${accent}99`;
  ctx.setLineDash([14, 10]);
  for (const y of [24, h - 24]) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  ctx.fillStyle = accent;
  ctx.font = `700 56px ${fontFamily()}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${text}   ◆   ${text}   ◆`, w / 2, h / 2 + 2);

  const texture = toTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function paintBackground(ctx: CanvasRenderingContext2D, accent: string, glowY: number) {
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#121218");
  bg.addColorStop(0.55, "#0b0b0f");
  bg.addColorStop(1, "#14141d");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W / 2, glowY, 40, W / 2, glowY, 620);
  glow.addColorStop(0, `${accent}33`);
  glow.addColorStop(1, "rgba(10, 10, 10, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
}

// Deja en ctx.font el tamaño más grande (hasta maxSize) con el que el texto cabe en maxWidth
function fitFont(ctx: CanvasRenderingContext2D, text: string, weight: number, maxSize: number, maxWidth: number) {
  const family = fontFamily();
  let size = maxSize;
  ctx.font = `${weight} ${size}px ${family}`;
  while (ctx.measureText(text).width > maxWidth && size > 20) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${family}`;
  }
}

// Una línea por cada parte del cargo ("A · B"), todas del mismo tamaño
function drawRole(
  ctx: CanvasRenderingContext2D,
  role: string,
  x: number,
  y: number,
  maxWidth: number,
  size: number,
  lineHeight: number
) {
  const lines = role.split(" · ");
  const longest = lines.reduce((a, b) => (b.length > a.length ? b : a));
  fitFont(ctx, longest, 600, size, maxWidth);
  lines.forEach((line, i) => ctx.fillText(line, x, y + i * lineHeight));
}

export function createFrontTexture(info: CardInfo, photo: HTMLImageElement | null) {
  const { githubUsername, role, accentColor: accent } = info;
  const { canvas, ctx } = newCanvas(W, H);

  paintBackground(ctx, accent, 300);

  const box = { x: 56, y: 56, w: 912, h: 960 };
  ctx.save();
  roundRect(ctx, box.x, box.y, box.w, box.h, 40);
  ctx.clip();

  if (photo) {
    // Igual que object-fit: cover, pero recortando más por abajo que por arriba para no cortar la cara
    const scale = Math.max(box.w / photo.naturalWidth, box.h / photo.naturalHeight);
    const drawW = photo.naturalWidth * scale;
    const drawH = photo.naturalHeight * scale;
    ctx.drawImage(photo, box.x - (drawW - box.w) / 2, box.y - (drawH - box.h) * 0.1, drawW, drawH);
  } else {
    // Iniciales mientras carga la foto, o si no carga
    ctx.fillStyle = "#1a1a22";
    ctx.fillRect(box.x, box.y, box.w, box.h);
    ctx.fillStyle = accent;
    ctx.font = `700 220px ${fontFamily()}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("JC", box.x + box.w / 2, box.y + box.h / 2);
  }
  ctx.restore();

  ctx.strokeStyle = accent;
  ctx.lineWidth = 5;
  roundRect(ctx, box.x, box.y, box.w, box.h, 40);
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  const textX = box.x + 8;
  const maxWidth = W - 2 * box.x - 16;

  ctx.fillStyle = "#ffffff";
  fitFont(ctx, `@${githubUsername}`, 700, 124, maxWidth);
  ctx.fillText(`@${githubUsername}`, textX, 1136);

  ctx.fillStyle = accent;
  drawRole(ctx, role, textX, 1236, maxWidth, 76, 88);

  return toTexture(canvas);
}

export function createBackTexture(info: CardInfo) {
  const { githubUsername, role, accentColor: accent } = info;
  const { canvas, ctx } = newCanvas(W, H);

  paintBackground(ctx, accent, H / 2);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 3;
  roundRect(ctx, 34, 34, W - 68, H - 68, 48);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const maxWidth = W - 160;

  ctx.fillStyle = "#ffffff";
  fitFont(ctx, `@${githubUsername}`, 700, 114, maxWidth);
  ctx.fillText(`@${githubUsername}`, W / 2, H / 2 - 30);

  ctx.fillStyle = accent;
  drawRole(ctx, role, W / 2, H / 2 + 70, maxWidth, 66, 78);

  return toTexture(canvas);
}
