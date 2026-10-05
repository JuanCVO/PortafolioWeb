import { Star, GitFork, Play } from "lucide-react";

type Props = {
  name: string;
  desc: string;
  lang: string;
  stars: number;
  forks: number;
  onClick?: () => void;
  href?: string;
  hasDemo?: boolean;
};

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
};

export default function RepoCard({ name, desc, lang, stars, forks, onClick, href, hasDemo }: Props) {
  const className = `pixel-card group flex flex-col gap-2 border border-[#30363d] bg-[#0d1117] p-4 hover:border-[#58a6ff] ${
    onClick || href ? "cursor-pointer" : ""
  }`;

  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="font-pixel break-all text-[0.75rem] leading-snug text-[#58a6ff]">{name}</span>
          <span className="border border-[#30363d] px-1.5 py-0.5 text-[0.8125rem] text-[#8b949e]">Public</span>
        </div>
        {hasDemo && (
          <span className="flex shrink-0 items-center gap-1 border border-[#1f6feb] bg-[#1f6feb1a] px-2 py-0.5 text-[0.8125rem] text-[#58a6ff] group-hover:bg-[#1f6feb35]">
            <Play className="h-2.5 w-2.5 fill-[#58a6ff]" />
            demo
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-[#8b949e]">{desc}</p>
      <div className="mt-auto flex items-center gap-4 text-xs text-[#8b949e]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5" style={{ backgroundColor: langColors[lang] ?? "#aaa" }} />
          {lang}
        </span>
        <span className="flex items-center gap-1"><Star className="h-3 w-3" />{stars}</span>
        <span className="flex items-center gap-1"><GitFork className="h-3 w-3" />{forks}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {body}
      </a>
    );
  }

  return (
    <div
      className={className}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {body}
    </div>
  );
}
