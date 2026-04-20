// This tells TypeScript exactly what to expect
interface HeroProps {
  name: string;
  title: string;
}

export default function NeonHero({ name, title }: HeroProps) {
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-6xl font-bold tracking-tighter text-white sm:text-7xl font-syne">
        <span className="bg-gradient-to-b from-white to-purple-400 bg-clip-text text-transparent">
          {name}
        </span>
      </h1>
      <div className="mt-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
        {title}
      </div>
    </section>
  );
}