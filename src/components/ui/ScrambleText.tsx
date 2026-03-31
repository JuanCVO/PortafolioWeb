"use client";

import { useState, useEffect, useCallback} from "react";
import { motion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  repeatInterval?: number; 
};

const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,./<>?";

export default function ScrambleText({ 
  text, 
  className, 
  delay = 2000, 
  repeatInterval = 4500 
}: Props) {
  const [scrambledChars, setScrambledChars] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const doScramble = useCallback(() => {
    setIsAnimating(true);
    let iterations = 0;
    const maxIterations = 35;

    const interval = setInterval(() => {
      setScrambledChars((prev) =>
        prev.map((char, i) => {
          if (iterations < 20 || Math.random() < 0.6) {
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
          return text[i];
        })
      );
      
      iterations++;
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setScrambledChars(text.split(""));
        setTimeout(() => setIsAnimating(false), 300);
      }
    }, 30);
  }, [text]);


  useEffect(() => {
    const timeout = setTimeout(() => doScramble(), delay);
    return () => clearTimeout(timeout);
  }, [delay]); // Solo 'delay'

 
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isAnimating) {
      interval = setInterval(doScramble, repeatInterval);
    }
    return () => clearInterval(interval);
  }, [isAnimating, repeatInterval, doScramble]);

  useEffect(() => {
    setScrambledChars(text.split(""));
  }, [text]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {scrambledChars.map((char, i) => (
        <motion.span
          key={`char-${i}-${char}-${isAnimating}`}
          style={{ display: "inline-block" }}
          animate={{
            scale: isAnimating ? [1, 1.25, 0.85, 1] : 1,
            color: isAnimating 
              ? ["#8b949e", "#58a6ff", "#3fb950", "#e6edf3"] 
              : "#e6edf3",
          }}
          transition={{
            duration: 0.4,
            delay: isAnimating ? i * 0.03 : 0,
            ease: "easeInOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}