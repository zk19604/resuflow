interface SkillGroups {
  technical?: string[];
  tools?: string[];
  soft?: string[];
  domain?: string[];
  languages?: string[];
}

interface NeonSkillsProps {
  skills?: string[] | SkillGroups;
}

export default function NeonSkills({ skills }: NeonSkillsProps) {
  const skillList = Array.isArray(skills)
    ? skills
    : [
        ...(skills?.technical || []),
        ...(skills?.tools || []),
        ...(skills?.soft || []),
        ...(skills?.domain || []),
        ...(skills?.languages || []),
      ];

  return (
    <section className="py-12">
      <h2 className="font-syne text-2xl font-bold uppercase tracking-widest text-slate-400 mb-8">
        Technical Arsenal
      </h2>
      <div className="flex flex-wrap gap-4">
        {skillList.map((skill: string, index: number) => (
          <div 
            key={index}
            className="neon-border-purple bg-slate-900 border border-purple-500/30 px-6 py-2 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-purple-900/20"
          >
            <span className="mr-2 text-cyan-400">#</span>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}