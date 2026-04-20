'use client';
import { Play, Heart } from "lucide-react";
import { useState } from "react";
import { Equalizer } from "./Equalizer";

const tracks = [
  { number: 1, title: "Midnight Echoes", duration: "4:17", streams: "2.4M" },
  { number: 2, title: "Neon Dreams",     duration: "3:52", streams: "1.8M" },
  { number: 3, title: "Silent Thunder",  duration: "5:03", streams: "3.1M" },
  { number: 4, title: "Velvet Skies",    duration: "4:28", streams: "2.2M" },
  { number: 5, title: "Crystal Rain",    duration: "3:41", streams: "1.5M" },
];

export function FeaturedRelease() {
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);
  const [playingTrack, setPlayingTrack] = useState(1);

  return (
    <section
      id="music"
      style={{
        position: "relative",
        padding: "128px 24px",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 100% 50%, rgba(139,27,80,0.18) 0%, transparent 55%), #0A0D18",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(36px,4vw,52px)",
            fontWeight: 700,
            color: "#F0EEF5",
            marginBottom: 64,
          }}
        >
          Latest Release
        </h2>

        {/* Two Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          {/* LEFT — Content */}
          <div>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid #C2185B",
                background: "rgba(194,24,91,0.06)",
                marginBottom: 24,
              }}
            >
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, color: "#C2185B", textTransform: "uppercase", letterSpacing: "0.25em" }}>
                New Album · Out Now
              </span>
            </div>

            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px,3.5vw,48px)", fontWeight: 700, fontStyle: "italic", color: "#F0EEF5", marginBottom: 8 }}>
              Dreamscapes
            </h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: "#9E9BB0", marginBottom: 16 }}>Luna Vega</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#9E9BB0", lineHeight: 1.75, maxWidth: 440, marginBottom: 32 }}>
              A journey through sound and emotion, blending ethereal vocals with pulsing electronic beats. Each track tells a story of modern life under city lights.
            </p>

            {/* Track Listing */}
            <div style={{ marginBottom: 32 }}>
              {tracks.map((track) => {
                const isPlaying = playingTrack === track.number;
                const isHovered = hoveredTrack === track.number;
                return (
                  <div
                    key={track.number}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      height: 56,
                      padding: "0 16px",
                      borderRadius: 4,
                      background: isHovered || isPlaying ? "rgba(194,24,91,0.06)" : "transparent",
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={() => setHoveredTrack(track.number)}
                    onMouseLeave={() => setHoveredTrack(null)}
                    onClick={() => setPlayingTrack(track.number)}
                  >
                    {/* Number / Play */}
                    <div style={{ width: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {isPlaying ? (
                        <Equalizer className="h-4" />
                      ) : isHovered ? (
                        <Play style={{ width: 12, height: 12, fill: "#C2185B", color: "#C2185B" }} />
                      ) : (
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#4A4760" }}>{track.number}</span>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: isPlaying ? "#C2185B" : "#F0EEF5" }}>
                        {track.title}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#9E9BB0" }}>Luna Vega</div>
                    </div>

                    {/* Duration */}
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#9E9BB0", flexShrink: 0 }}>
                      {track.duration}
                    </div>

                    {/* Heart */}
                    <button
                      style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.2s ease", background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}
                    >
                      <Heart style={{ width: 16, height: 16, color: "#9E9BB0" }} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Stream Count */}
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#4A4760", textTransform: "uppercase", marginBottom: 24 }}>
              4,213,847 streams
            </div>

            {/* Platform Buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <button
                style={{ padding: "12px 24px", borderRadius: 4, background: "#1DB954", color: "#000", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1)"; }}
              >
                Listen on Spotify
              </button>
              {["Apple Music", "YouTube Music"].map((p) => (
                <button
                  key={p}
                  style={{ padding: "12px 24px", borderRadius: 4, border: "1px solid rgba(240,238,245,0.10)", background: "transparent", color: "#9E9BB0", fontFamily: "'Inter', sans-serif", fontSize: 13, cursor: "pointer", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,238,245,0.30)"; (e.currentTarget as HTMLElement).style.color = "#F0EEF5"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,238,245,0.10)"; (e.currentTarget as HTMLElement).style.color = "#9E9BB0"; }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Album Art */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              {/* Vinyl */}
              <div
                style={{
                  position: "absolute",
                  right: -16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 400,
                  height: 400,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1a1a1a, #0a0a0a)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                }}
              />
              {/* Album Cover */}
              <div
                style={{
                  position: "relative",
                  width: 480,
                  height: 480,
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "linear-gradient(135deg, rgba(139,27,80,1) 0%, rgba(72,30,130,1) 50%, rgba(20,10,60,1) 100%)",
                  boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(194,24,91,0.10), 0 60px 200px rgba(139,27,80,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 64, fontWeight: 700, fontStyle: "italic", color: "rgba(255,255,255,0.15)", userSelect: "none" }}>Dreamscapes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
