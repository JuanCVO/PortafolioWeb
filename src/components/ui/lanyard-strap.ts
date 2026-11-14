import * as THREE from "three";

const SAMPLES = 48; // cortes a lo largo de la cinta
const FACE_STEPS = 10; // vértices por cara
const WIDTH = 0.25;
const THICKNESS = 0.06;
const TILE_LENGTH = WIDTH * 8; // largo que ocupa una repetición de la textura (que es 8:1)

interface SectionPoint {
  x: number; // a lo ancho de la cinta
  y: number; // en el grosor
  nx: number;
  ny: number;
  v: number; // coordenada de textura a lo ancho
}

// La sección es un rectángulo muy redondeado (superelipse): los bordes quedan acolchados en vez de cortados.
// Cada cara (frente y dorso) lleva su propia v para que el texto se lea derecho por los dos lados.
function buildSection() {
  const a = WIDTH / 2;
  const b = THICKNESS / 2;
  const n = 4; // más alto = más cuadrado
  const points: SectionPoint[] = [];

  for (const side of [1, -1]) {
    for (let k = 0; k <= FACE_STEPS; k++) {
      const angle = (k / FACE_STEPS) * Math.PI;
      const theta = side === 1 ? Math.PI - angle : -angle;
      const c = Math.cos(theta);
      const s = Math.sin(theta);
      const x = a * Math.sign(c) * Math.abs(c) ** (2 / n);
      const y = b * Math.sign(s) * Math.abs(s) ** (2 / n);

      // La normal sale del gradiente de |x/a|^n + |y/b|^n
      let nx = (Math.sign(x) * Math.abs(x / a) ** (n - 1)) / a;
      let ny = (Math.sign(y) * Math.abs(y / b) ** (n - 1)) / b;
      const len = Math.hypot(nx, ny);
      nx /= len;
      ny /= len;

      const across = (x / a + 1) / 2;
      points.push({ x, y, nx, ny, v: side === 1 ? across : 1 - across });
    }
  }
  return points;
}

const vectors = (count: number) => Array.from({ length: count }, () => new THREE.Vector3());

// Cinta de tela que sigue una curva. Arriba mira siempre al frente, abajo gira con el carnet,
// y lo que hay en medio se va retorciendo como una cinta de verdad.
export class StrapRibbon {
  readonly geometry = new THREE.BufferGeometry();

  private section = buildSection();
  private positions: Float32Array;
  private normals: Float32Array;
  private uvs: Float32Array;

  private points = vectors(SAMPLES + 1);
  private tangents = vectors(SAMPLES + 1);
  private sides = vectors(SAMPLES + 1);
  private up = new THREE.Vector3();
  private cross = new THREE.Vector3();
  private target = new THREE.Vector3();
  private twist = 0;

  constructor() {
    const ring = this.section.length;
    const vertexCount = (SAMPLES + 1) * ring;

    this.positions = new Float32Array(vertexCount * 3);
    this.normals = new Float32Array(vertexCount * 3);
    this.uvs = new Float32Array(vertexCount * 2);

    const indices: number[] = [];
    for (let i = 0; i < SAMPLES; i++) {
      for (let face = 0; face < 2; face++) {
        for (let k = 0; k < FACE_STEPS; k++) {
          const a = i * ring + face * (FACE_STEPS + 1) + k;
          const b = a + 1;
          const c = a + ring;
          const d = c + 1;
          indices.push(a, b, c, b, d, c);
        }
      }
    }

    const dynamic = (array: Float32Array, size: number) =>
      new THREE.BufferAttribute(array, size).setUsage(THREE.DynamicDrawUsage);
    this.geometry.setAttribute("position", dynamic(this.positions, 3));
    this.geometry.setAttribute("normal", dynamic(this.normals, 3));
    this.geometry.setAttribute("uv", dynamic(this.uvs, 2));
    this.geometry.setIndex(indices);
  }

  // La curva tiene que ir del carnet (t = 0) al punto fijo de arriba (t = 1)
  update(curve: THREE.Curve<THREE.Vector3>, cardQuaternion: THREE.Quaternion) {
    const { points, tangents, sides, up, cross, target, section } = this;
    const last = SAMPLES;

    for (let i = 0; i <= last; i++) curve.getPoint(i / last, points[i]);
    for (let i = 0; i <= last; i++) {
      tangents[i].subVectors(points[Math.min(i + 1, last)], points[Math.max(i - 1, 0)]).normalize();
    }

    // Se arma el marco desde arriba hacia el carnet, sin giros bruscos entre un corte y el siguiente
    sides[last].set(1, 0, 0).addScaledVector(tangents[last], -tangents[last].x).normalize();
    for (let i = last - 1; i >= 0; i--) {
      sides[i].copy(sides[i + 1]);
      sides[i].addScaledVector(tangents[i], -sides[i].dot(tangents[i])).normalize();
    }

    // Cuánto hay que torcer la cinta para que su extremo quede alineado con el carnet
    target.set(1, 0, 0).applyQuaternion(cardQuaternion);
    target.addScaledVector(tangents[0], -target.dot(tangents[0]));
    if (target.lengthSq() > 1e-6) {
      target.normalize();
      cross.crossVectors(sides[0], target);
      const angle = Math.atan2(cross.dot(tangents[0]), sides[0].dot(target));
      // De todas las vueltas equivalentes, la más cercana a la del frame anterior (evita saltos)
      this.twist = angle + Math.round((this.twist - angle) / (2 * Math.PI)) * 2 * Math.PI;
    }

    const ring = section.length;
    let distance = 0;

    for (let i = 0; i <= last; i++) {
      if (i > 0) distance += points[i].distanceTo(points[i - 1]);

      const tangent = tangents[i];
      const side = sides[i];
      const turn = this.twist * (1 - i / last);
      cross.crossVectors(tangent, side);
      side.multiplyScalar(Math.cos(turn)).addScaledVector(cross, Math.sin(turn));
      up.crossVectors(side, tangent);

      const u = -distance / TILE_LENGTH; // negativo para que el texto se lea de arriba hacia abajo
      for (let r = 0; r < ring; r++) {
        const p = section[r];
        const vertex = i * ring + r;
        const at3 = vertex * 3;
        const at2 = vertex * 2;

        this.positions[at3] = points[i].x + side.x * p.x + up.x * p.y;
        this.positions[at3 + 1] = points[i].y + side.y * p.x + up.y * p.y;
        this.positions[at3 + 2] = points[i].z + side.z * p.x + up.z * p.y;
        this.normals[at3] = side.x * p.nx + up.x * p.ny;
        this.normals[at3 + 1] = side.y * p.nx + up.y * p.ny;
        this.normals[at3 + 2] = side.z * p.nx + up.z * p.ny;
        this.uvs[at2] = u;
        this.uvs[at2 + 1] = p.v;
      }
    }

    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.normal.needsUpdate = true;
    this.geometry.attributes.uv.needsUpdate = true;
  }
}
