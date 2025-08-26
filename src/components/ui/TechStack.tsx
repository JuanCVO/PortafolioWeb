import {
  SiNodedotjs,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiPhp,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiJira,
} from "react-icons/si";

const technologies = [
  { name: "Node.js", icon: <SiNodedotjs className="text-green-500 w-16 h-16" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 w-16 h-16" /> },
  { name: "HTML5", icon: <SiHtml5 className="text-orange-500 w-16 h-16" /> },
  { name: "CSS3", icon: <SiCss3 className="text-blue-500 w-16 h-16" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400 w-16 h-16" /> },
  { name: "React.js", icon: <SiReact className="text-cyan-300 w-16 h-16" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white w-16 h-16" /> },
  { name: "PHP", icon: <SiPhp className="text-indigo-400 w-16 h-16" /> },
  { name: "MySQL", icon: <SiMysql className="text-blue-600 w-16 h-16" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-sky-700 w-16 h-16" /> },
  { name: "Git", icon: <SiGit className="text-orange-600 w-16 h-16" /> },
  { name: "GitHub", icon: <SiGithub className="text-gray-300 w-16 h-16" /> },
  { name: "Jira", icon: <SiJira className="text-blue-500 w-16 h-16" /> },
];

export default function TechStack() {
  return (
    <section className="py-16 bg-[#1e293b] text-center">
      <h2 className="text-3xl font-bold mb-10">Mis tecnologías</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="flex flex-col items-center justify-center bg-[#0f172a] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            {tech.icon}
            <span className="mt-2 text-sm">{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
