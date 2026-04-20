'use client';
import { Instagram, Music, Youtube } from "lucide-react";
import { useState, useEffect } from "react";
import { Equalizer } from "./Equalizer";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "Music", "Events", "Gallery", "Press", "Contact"];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "68px",
        background: scrolled ? "rgba(8,11,20,0.90)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(194,24,91,0.15)" : "none",
        transition: "all 0.3s ease",
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
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#F0EEF5" }}>NOVA</span>
          <span style={{ color: "#C2185B" }}> SOUNDS</span>
        </div>

        {/* Center Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {navLinks.map((link) => (
            <div key={link} style={{ position: "relative" }}>
              <a
                href={`#${link.toLowerCase()}`}
                style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: hoveredLink === link ? "#F0EEF5" : "#9E9BB0",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link}
              </a>
              {hoveredLink === link && (
                <div style={{ position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)" }}>
                  <Equalizer className="h-2" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right - Social Icons + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {[Instagram, Music, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "1px solid rgba(240,238,245,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9E9BB0",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#C2185B";
                (e.currentTarget as HTMLElement).style.color = "#F0EEF5";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,238,245,0.10)";
                (e.currentTarget as HTMLElement).style.color = "#9E9BB0";
              }}
            >
              <Icon style={{ width: 14, height: 14 }} />
            </a>
          ))}
          <button
            style={{
              padding: "8px 24px",
              borderRadius: 2,
              border: "1px solid rgba(194,24,91,0.40)",
              background: "transparent",
              color: "#F0EEF5",
              fontFamily: "'Raleway', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "linear-gradient(to right, #C2185B, #6A1B9A)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
}
