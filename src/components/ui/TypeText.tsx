"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  speed?: number; // ms por carácter
  startDelay?: number;
};

// Escribe el texto letra por letra con cursor parpadeante. El texto completo ocupa su
// espacio desde el inicio (invisible) para que el layout no se mueva mientras se escribe.
export default function TypeText({ text, speed = 45, startDelay = 500 }: Props) {
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setShown(text.length);
      return;
    }
    setShown(0);
    let count = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        count += 1;
        setShown(count);
        if (count >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay, reduceMotion]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="relative block">
        <span className="invisible">{text}</span>
        <span className="absolute inset-0">
          {text.slice(0, shown)}
          <span className="blink ml-1 inline-block h-[0.9em] w-[0.5em] bg-[#3fb950] align-[-0.1em]" />
        </span>
      </span>
    </>
  );
}
