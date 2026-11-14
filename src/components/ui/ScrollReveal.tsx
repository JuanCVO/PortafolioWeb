"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { stepped } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

const hidden = { opacity: 0, y: 24 };
const shown = { opacity: 1, y: 0 };
const ease = stepped(6);

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  once = true,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={isInView || reduceMotion ? shown : hidden}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
