'use client';
import { Play, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Equalizer } from "./Equalizer";

const HERO_IMAGE = "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=1800&q=80";

export function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const stats = [
    { value: "4.2M", label: "Monthly Listeners" },
    { value: "89",   label: "Shows This Year" },
    { value: "6",    label: "Studio Albums" },
  ];

  return (
    <section id="home" style={{ position: "relative", height: "100vh", width: "100%", overflow: "hidden" }}>
      {/* Base bg */}
      <div style={{ position: "absolute", inset: 0, background: "#080B14" }} />

      {/* Hero image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlays */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,11,20,0.92) 0%, rgba(8,11,20,0.60) 50%, rgba(8,11,20,0.20) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,11,20,1) 0%, transparent 60%)" }} />

      {/* Ambient orbs */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(139,27,80,0.55) 0%, transparent 55%)",
          top: "40%",
          left: "70%",
          transform: "translate(-50%,-50%)",
          animation: "orbA 25s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(72,30,130,0.45) 0%, transparent 50%)",
          top: "60%",
          left: "20%",
          transform: "translate(-50%,-50%)",
          animation: "orbB 22s ease-in-out infinite",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 24px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          paddingBottom: 96,
          paddingTop: 80,
        }}
      >
        <div style={{ width: "45%" }}>
          {/* Artist Name */}
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(60px,8vw,110px)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#F0EEF5",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              marginBottom: 32,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(60px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            Luna Vega
          </h1>

          {/* Genre Tags */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 24,
              opacity: visible ? 1 : 0,
              transition: "opacity 0.4s ease 0.4s",
            }}
          >
            {["Alternative", "Electronic", "Indie Rock"].map((genre) => (
              <span
                key={genre}
                style={{
                  padding: "8px 16px",
                  border: "1px solid rgba(194,24,91,0.30)",
                  background: "rgba(194,24,91,0.06)",
                  borderRadius: 2,
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: 10,
                  color: "#9E9BB0",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                }}
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: "#9E9BB0",
              fontWeight: 300,
              lineHeight: 1.70,
              maxWidth: 460,
              marginBottom: 32,
            }}
          >
            Crafting sonic landscapes that blur the line between concert hall and conscience.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", alignItems: "center", gap: 32, marginBottom: 40 }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ position: "relative" }}>
                {i > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      left: -16,
                      top: 0,
                      bottom: 0,
                      width: 1,
                      background: "rgba(240,238,245,0.08)",
                    }}
                  />
                )}
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 24, color: "#F0EEF5" }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#9E9BB0", textTransform: "uppercase", marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: 16 }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 32px",
                borderRadius: 2,
                background: "linear-gradient(to right, #C2185B, #6A1B9A)",
                color: "#F0EEF5",
                fontFamily: "'Raleway', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)"; (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1)"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              <Play style={{ width: 12, height: 12, fill: "currentColor" }} />
              Listen Now
            </button>
            <button
              style={{
                padding: "12px 32px",
                borderRadius: 2,
                border: "1px solid rgba(194,24,91,0.40)",
                background: "transparent",
                color: "#9E9BB0",
                fontFamily: "'Raleway', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(194,24,91,0.80)"; (e.currentTarget as HTMLElement).style.color = "#F0EEF5"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(194,24,91,0.40)"; (e.currentTarget as HTMLElement).style.color = "#9E9BB0"; }}
            >
              View Tour Dates
            </button>
          </div>
        </div>
      </div>

      {/* Scroll nudge */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 10,
        }}
      >
        <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, color: "#4A4760", textTransform: "uppercase", letterSpacing: "0.20em" }}>
          Scroll
        </span>
        <Equalizer className="h-4" />
        <ChevronDown style={{ width: 16, height: 16, color: "#4A4760", animation: "bounce 1s ease-in-out infinite" }} />
      </div>

      {/* Bottom Mini Player */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 56,
          background: "rgba(8,11,20,0.85)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(194,24,91,0.12)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 24px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <Equalizer className="h-6" />
          <img
            src="https://images.unsplash.com/photo-1619482815143-4f3c5c04a370?w=80&h=80&fit=crop"
            alt="Album"
            style={{ width: 40, height: 40, borderRadius: 4, objectFit: "cover" }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#F0EEF5", fontWeight: 600 }}>Midnight Echoes</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#9E9BB0" }}>Luna Vega</div>
          </div>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#9E9BB0" }}>2:34 / 4:17</div>
        </div>
      </div>

      <style>{`
        @keyframes orbA { 0%,100% { transform: translate(-50%,-50%) translate(0,0); } 33% { transform: translate(-50%,-50%) translate(50px,-40px); } 66% { transform: translate(-50%,-50%) translate(-30px,30px); } }
        @keyframes orbB { 0%,100% { transform: translate(-50%,-50%) translate(0,0); } 33% { transform: translate(-50%,-50%) translate(-40px,30px); } 66% { transform: translate(-50%,-50%) translate(50px,-50px); } }
        @keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      `}</style>
    </section>
  );
}
