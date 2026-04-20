'use client';
import { useState } from "react";

const CONCERT_IMAGE = "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1800&q=80";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: "128px 24px",
        overflow: "hidden",
        backgroundImage: `url(${CONCERT_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(8,11,20,0.96) 0%, rgba(8,11,20,0.70) 50%, rgba(8,11,20,0.50) 100%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1400, margin: "0 auto", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(40px,5vw,64px)",
            fontWeight: 700,
            fontStyle: "italic",
            color: "#F0EEF5",
            marginBottom: 16,
          }}
        >
          Never Miss a Beat
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "#9E9BB0", marginBottom: 48, maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>
          Tour dates, new music, exclusive content — delivered first.
        </p>

        {/* Email Form */}
        <form onSubmit={handleSubmit} style={{ maxWidth: 540, margin: "0 auto 24px" }}>
          <div style={{ display: "flex" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              style={{
                flex: 1,
                height: 52,
                padding: "0 24px",
                background: "rgba(240,238,245,0.06)",
                border: "1px solid rgba(194,24,91,0.20)",
                borderRight: "none",
                borderRadius: "2px 0 0 2px",
                color: "#F0EEF5",
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                outline: "none",
                transition: "border-color 0.3s ease",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#C2185B"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(194,24,91,0.20)"; }}
            />
            <button
              type="submit"
              style={{
                height: 52,
                padding: "0 32px",
                background: "linear-gradient(to right, #C2185B, #6A1B9A)",
                color: "#F0EEF5",
                fontFamily: "'Raleway', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                border: "none",
                borderRadius: "0 2px 2px 0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                transition: "filter 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1)"; }}
            >
              {submitted ? (
                <>Welcome to the Family <span style={{ color: "#1DB954" }}>✓</span></>
              ) : (
                "Join the Family"
              )}
            </button>
          </div>
        </form>

        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#4A4760", textTransform: "uppercase" }}>
          Join 48,293 fans already subscribed
        </p>
      </div>
    </section>
  );
}
