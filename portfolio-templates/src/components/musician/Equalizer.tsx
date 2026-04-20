'use client';

export function Equalizer({ className = "" }: { className?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: "3px",
        height: className.includes("h-6") ? "24px" : className.includes("h-4") ? "16px" : className.includes("h-2") ? "8px" : "24px",
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            width: "3px",
            borderRadius: "9999px",
            background: "linear-gradient(to top, #C2185B, #6A1B9A)",
            animation: `equalizer ${0.5 + i * 0.2}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.1}s`,
            height: "100%",
          }}
        />
      ))}
      <style>{`
        @keyframes equalizer {
          0%  { transform: scaleY(0.2); }
          100% { transform: scaleY(1.0); }
        }
      `}</style>
    </div>
  );
}
