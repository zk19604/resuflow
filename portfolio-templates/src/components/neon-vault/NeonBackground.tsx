export default function NeonBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950">
      {/* Top Left Glow */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-900/20 blur-[120px]" />
      {/* Bottom Right Glow */}
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-900/20 blur-[120px]" />
      {/* Subtle Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
}