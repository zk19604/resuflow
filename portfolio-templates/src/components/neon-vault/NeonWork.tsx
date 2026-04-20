// 1. Define the structure of a single experience item
interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
}

// 2. Define the props for the component
interface NeonWorkProps {
  experience: ExperienceItem[];
}

export default function NeonWork({ experience }: NeonWorkProps) {
  return (
    <section className="py-12">
      <h2 className="font-syne text-2xl font-bold uppercase tracking-widest text-slate-400 mb-8">
        Mission History
      </h2>
      <div className="grid gap-6">
        {/* 3. Explicitly type 'exp' and 'index' in the map function */}
        {experience.map((exp: ExperienceItem, index: number) => (
          <div 
            key={index}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-xl transition-all hover:border-cyan-500/50"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {exp.role}
                </h3>
                <p className="text-purple-400 font-medium">{exp.company}</p>
              </div>
              <span className="text-xs font-mono text-slate-500">{exp.duration}</span>
            </div>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}