export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

// Easing por pasos (como un sprite): avanza a saltos en vez de deslizarse
export const stepped = (steps: number) => (t: number) => Math.floor(t * steps) / steps;
