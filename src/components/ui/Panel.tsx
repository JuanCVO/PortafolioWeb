"use client";

import { cn } from "@app/lib/utils"; // si no tienes esta función, cambia cn(...) por template strings

export default function Panel({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl bg-[#1e293b] p-6 sm:p-8 shadow-lg border border-white/5",
        className
      )}
    >
      {title ? (
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
