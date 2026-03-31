import { Star, GitFork } from "lucide-react";

type Props = { name: string; desc: string; lang: string; stars: number; forks: number };

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
};

export default function RepoCard({ name, desc, lang, stars, forks }: Props) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-[#30363d] bg-[#0d1117] p-4 transition hover:border-[#58a6ff]">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-[#58a6ff]">{name}</span>
        <span className="rounded-full border border-[#30363d] px-2 py-0.5 text-[10px] text-[#8b949e]">Public</span>
      </div>
      <p className="text-xs leading-relaxed text-[#8b949e]">{desc}</p>
      <div className="mt-auto flex items-center gap-4 text-xs text-[#8b949e]">
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: langColors[lang] ?? "#aaa" }} />
          {lang}
        </span>
        <span className="flex items-center gap-1"><Star className="h-3 w-3" />{stars}</span>
        <span className="flex items-center gap-1"><GitFork className="h-3 w-3" />{forks}</span>
      </div>
    </div>
  );
}