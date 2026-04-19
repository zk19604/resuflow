import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "./Navbar";
import { Breadcrumb } from "./Breadcrumb";
import glassmorphismThumb from "../assets/glassmorphism.png";
import highendminimalistThumb from "../assets/highendminimalist.png";
import neumorphismThumb from "../assets/neumorphism.png";
import handcraftedThumb from "../assets/handcrafted.png";
import editorialThumb from "../assets/editorial.png";
import bentoThumb from "../assets/bento.png";

const paletteRows = [
  { name: "Rose Navy", colors: ["#0E1627", "#7F6269", "#F4E1E0", "#BDB8B9", "#E5C5C1"] },
  { name: "Ocean Mist", colors: ["#0D1B2A", "#1B4F72", "#A9CCE3", "#EBF5FB", "#2E86C1"] },
  { name: "Sage Ground", colors: ["#1A2417", "#3D5A3E", "#C8D5B9", "#FAF0CA", "#F0C808"] },
  { name: "Dusty Rose", colors: ["#2D1B1F", "#7B3F4A", "#D4A5A5", "#F2E0E0", "#C47C7C"] },
  { name: "Slate Modern", colors: ["#1A1A2E", "#16213E", "#0F3460", "#E94560", "#EAEAEA"] },
];

const sections = ["About", "Skills", "Experience", "Education", "Projects", "Achievements"];
const fontOptions = ["Modern Sans", "Serif Editorial"];

type TemplateType = "glassmorphism" | "highendminimalist" | "neumorphism" | "handcrafted" | "editorial" | "bento";

const templateLabels: Record<TemplateType, string> = {
  glassmorphism: "Glassmorphism",
  highendminimalist: "High-End Minimalist",
  neumorphism: "Neumorphism",
  handcrafted: "Handcrafted",
  editorial: "Editorial",
  bento: "Bento",
};
function HandcraftedPreview({
  palette,
  profile,
}: {
  palette: (typeof paletteRows)[0];
  profile: any;
}) {
  const name = profile?.personalInfo?.name || "Emma Richardson";
  const role = profile?.workExperience?.[0]?.role || "Architect & Interior Designer";
  const company = profile?.workExperience?.[0]?.company || "Richardson Studio";
  const location = profile?.personalInfo?.location || "New York, NY";
  const email = profile?.personalInfo?.email || "emma@richardson.studio";
  const phone = profile?.personalInfo?.phone || "+1 (212) 555-0182";
  const summary = profile?.summary || "Creating spaces that inspire and transform. Specializing in sustainable residential and commercial design with a focus on natural materials and biophilic principles.";
  
  const skills: string[] = [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
    ...(profile?.skills?.soft || []),
  ].slice(0, 6);

  // Handcrafted aesthetic uses warm, organic colors
  const bgColor = "#F9F6F0";
  const accentColor = palette.colors[1] || "#C4724B";
  const secondaryColor = palette.colors[2] || "#D4956B";
  const textColor = "#3E3A36";
  const mutedColor = "#8B7E74";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        padding: "30px",
        overflow: "auto",
        position: "relative",
      }}
    >
      {/* Decorative hand-drawn elements */}
      <svg
        style={{
          position: "absolute",
          top: "15px",
          right: "20px",
          width: "60px",
          height: "60px",
          opacity: 0.15,
        }}
        viewBox="0 0 60 60"
      >
        <circle cx="30" cy="30" r="25" fill="none" stroke={accentColor} strokeWidth="1.5" />
        <circle cx="30" cy="30" r="18" fill="none" stroke={accentColor} strokeWidth="0.8" strokeDasharray="4 3" />
      </svg>

      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#FFFFFF",
          borderRadius: "0px",
          padding: "32px 28px",
          boxShadow: `
            0 4px 20px rgba(0, 0, 0, 0.06),
            0 1px 3px rgba(0, 0, 0, 0.03)
          `,
          border: `1px solid ${accentColor}20`,
          position: "relative",
        }}
      >
        {/* Decorative border accent */}
        <div
          style={{
            position: "absolute",
            top: "-3px",
            left: "30px",
            right: "30px",
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${accentColor}60, ${accentColor}, ${accentColor}60, transparent)`,
          }}
        />

        {/* Header with name and role */}
        <div style={{ marginBottom: "24px", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: textColor,
              margin: "0 0 4px 0",
              letterSpacing: "0.5px",
              fontFamily: "'Cormorant Garamond', serif",
              textTransform: "uppercase",
            }}
          >
            {name}
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "6px",
            }}
          >
            <span
              style={{
                width: "30px",
                height: "1px",
                background: accentColor,
                opacity: 0.5,
              }}
            />
            <span
              style={{
                fontSize: "13px",
                color: accentColor,
                fontWeight: 400,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              {role}
            </span>
            <span
              style={{
                width: "30px",
                height: "1px",
                background: accentColor,
                opacity: 0.5,
              }}
            />
          </div>
          <p
            style={{
              fontSize: "11px",
              color: mutedColor,
              margin: "4px 0 0 0",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.3px",
            }}
          >
            {company} · {location}
          </p>
        </div>

        {/* Summary - Handcrafted style with italic */}
        <div
          style={{
            marginBottom: "24px",
            padding: "0 8px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: textColor,
              lineHeight: 1.7,
              margin: 0,
              textAlign: "center",
              fontStyle: "italic",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            "{summary.slice(0, 130)}{summary.length > 130 ? "…" : ""}"
          </p>
        </div>

        {/* Contact Info - Minimal, elegant */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            marginBottom: "24px",
            padding: "12px 0",
            borderTop: `1px solid ${mutedColor}20`,
            borderBottom: `1px solid ${mutedColor}20`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span style={{ fontSize: "12px", opacity: 0.6 }}>✉</span>
            <span style={{ fontSize: "10px", color: mutedColor }}>
              {email.split("@")[0].slice(0, 12)}@...
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <span style={{ fontSize: "12px", opacity: 0.6 }}>📞</span>
            <span style={{ fontSize: "10px", color: mutedColor }}>{phone}</span>
          </div>
        </div>

        {/* Skills - Crafted as organic tags */}
        {skills.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <p
              style={{
                fontSize: "10px",
                color: mutedColor,
                textTransform: "uppercase",
                letterSpacing: "2px",
                margin: "0 0 12px 0",
                textAlign: "center",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              — Expertise —
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px 6px",
                justifyContent: "center",
              }}
            >
              {(skills.length > 0 ? skills : ["Sustainable Design", "Space Planning", "3D Modeling", "Material Selection", "Client Relations"]).slice(0, 5).map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "5px 14px",
                    fontSize: "10px",
                    fontWeight: 400,
                    color: textColor,
                    background: bgColor,
                    border: `1px solid ${accentColor}30`,
                    borderRadius: "0px",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.3px",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Digital Business Card / Portfolio Link */}
        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "10px 28px",
              background: "transparent",
              border: `1.5px solid ${accentColor}`,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: accentColor,
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              CardConnect — Digital Business Card
            </span>
          </div>
        </div>

        {/* Footer accent */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          <span style={{ color: accentColor, fontSize: "16px", opacity: 0.4 }}>◆</span>
          <span style={{ color: accentColor, fontSize: "10px", opacity: 0.3 }}>◆</span>
          <span style={{ color: accentColor, fontSize: "16px", opacity: 0.4 }}>◆</span>
        </div>
      </div>
    </div>
  );
}
function GlassmorphismPreview({
  palette,
  profile,
}: {
  palette: (typeof paletteRows)[0];
  profile: any;
}) {
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const summary = profile?.summary || "";
  const skills: string[] = [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
    ...(profile?.skills?.soft || []),
  ].slice(0, 5);

  const bg = palette.colors[0];
  const accent = palette.colors[1];
  const light = palette.colors[2];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bg,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Animated orbs */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "15%",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}70 0%, transparent 70%)`,
          filter: "blur(50px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${light}50 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "20%",
          width: "130px",
          height: "130px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${palette.colors[4] || accent}40 0%, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />

      {/* Floating decorative cards */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "4%",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px",
          padding: "8px 12px",
          transform: "rotate(-7deg)",
          opacity: 0.7,
        }}
      >
        <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          {skills[0] || "Design"}
        </div>
        <div style={{ width: "50px", height: "2px", borderRadius: "2px", background: `linear-gradient(90deg,${accent},${light})`, marginTop: "5px" }} />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "4%",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px",
          padding: "8px 12px",
          transform: "rotate(5deg)",
          opacity: 0.65,
        }}
      >
        <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          {skills[1] || "Strategy"}
        </div>
        <div style={{ width: "40px", height: "2px", borderRadius: "2px", background: `linear-gradient(90deg,${light},${accent})`, marginTop: "5px" }} />
      </div>

      {/* Main hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "90%",
        }}
      >
        {/* Role pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "100px",
            padding: "5px 14px",
            marginBottom: "14px",
          }}
        >
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: `linear-gradient(135deg,${accent},${light})`,
            }}
          />
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.8)", letterSpacing: "0.04em" }}>
            {role}
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "clamp(20px, 4vw, 36px)",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: "10px",
          }}
        >
          {name}
        </div>

        {/* Summary */}
        {summary && (
          <div
            style={{
              fontSize: "9px",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.6,
              maxWidth: "260px",
              margin: "0 auto 14px",
            }}
          >
            {summary.slice(0, 100)}{summary.length > 100 ? "…" : ""}
          </div>
        )}

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "14px" }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${accent}, ${light})`,
              borderRadius: "100px",
              padding: "6px 16px",
              fontSize: "8px",
              color: "#fff",
              fontWeight: 600,
            }}
          >
            View My Work
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "100px",
              padding: "6px 16px",
              fontSize: "8px",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Get In Touch
          </div>
        </div>

        {/* Skill tags */}
        {skills.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "5px",
              justifyContent: "center",
              flexWrap: "wrap",
              maxWidth: "280px",
              margin: "0 auto",
            }}
          >
            {skills.slice(0, 4).map((s) => (
              <div
                key={s}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "100px",
                  padding: "3px 10px",
                  fontSize: "7px",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          opacity: 0.35,
        }}
      >
        <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.4)" }} />
        <span style={{ fontSize: "6px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)" }}>
          Scroll
        </span>
      </div>
    </div>
  );
}

function HighEndMinimalistPreview({ profile }: { profile: any }) {
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const company = profile?.workExperience?.[0]?.company || "";
  const location = profile?.personalInfo?.location || "";
  const summary = profile?.summary || "";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#FFFFFF",
        display: "flex",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Left column */}
      <div
        style={{
          width: "55%",
          padding: "40px 32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <p style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999999" }}>
          Portfolio · {new Date().getFullYear()}
        </p>
        <div
          style={{
            fontSize: "clamp(18px, 3.5vw, 36px)",
            fontWeight: 800,
            color: "#111111",
            lineHeight: 1.05,
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {name}
        </div>
        {role && (
          <p style={{ fontSize: "11px", fontStyle: "italic", color: "#444444", fontFamily: "Georgia, serif" }}>
            {role}
          </p>
        )}
        {(company || location) && (
          <p style={{ fontSize: "9px", color: "#888888" }}>
            {[company, location].filter(Boolean).join(" · ")}
          </p>
        )}
        {summary && (
          <p style={{ fontSize: "8px", color: "#555555", lineHeight: 1.7, maxWidth: "240px", marginTop: "6px" }}>
            {summary.slice(0, 120)}{summary.length > 120 ? "…" : ""}
          </p>
        )}
        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <div
            style={{
              background: "#1A2744",
              color: "#fff",
              fontSize: "7px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "6px 12px",
            }}
          >
            View Experience
          </div>
          <div
            style={{
              border: "1px solid #1A2744",
              color: "#1A2744",
              fontSize: "7px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "6px 12px",
            }}
          >
            Contact Me
          </div>
        </div>
      </div>
      {/* Right column */}
      <div
        style={{
          width: "45%",
          background: "#F5F4F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "1px", height: "60px", background: "#CCCCCC" }} />
      </div>
    </div>
  );
}

function NeumorphismPreview({
  palette,
  profile,
}: {
  palette: (typeof paletteRows)[0];
  profile: any;
}) {
  const name = profile?.personalInfo?.name || "Alex Morgan";
  const role = profile?.workExperience?.[0]?.role || "Product Designer";
  const company = profile?.workExperience?.[0]?.company || "Design Studio";
  const location = profile?.personalInfo?.location || "San Francisco, CA";
  const summary = profile?.summary || "Designing meaningful digital experiences with a focus on user-centered design and clean aesthetics.";
  const skills: string[] = [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
    ...(profile?.skills?.soft || []),
  ].slice(0, 3);

  // Neumorphism typically uses soft, muted backgrounds
  const bgColor = "#E4E9F2";
  const primaryColor = palette.colors[1] || "#7B6D8D";
  const accentColor = palette.colors[2] || "#9B8DA8";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', -apple-system, sans-serif",
        padding: "24px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Header Card - Profile Info */}
        <div
          style={{
            background: bgColor,
            borderRadius: "24px",
            padding: "28px 24px",
            boxShadow: `
              8px 8px 16px rgba(166, 180, 200, 0.4),
              -8px -8px 16px rgba(255, 255, 255, 0.7),
              inset 1px 1px 2px rgba(255, 255, 255, 0.8),
              inset -1px -1px 2px rgba(166, 180, 200, 0.2)
            `,
          }}
        >
          {/* Avatar + Name Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            {/* Neumorphic Avatar */}
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: bgColor,
                boxShadow: `
                  6px 6px 12px rgba(166, 180, 200, 0.4),
                  -6px -6px 12px rgba(255, 255, 255, 0.8),
                  inset 2px 2px 4px rgba(166, 180, 200, 0.2),
                  inset -2px -2px 4px rgba(255, 255, 255, 0.9)
                `,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: 600,
                  color: primaryColor,
                  textShadow: "1px 1px 2px rgba(255,255,255,0.5)",
                }}
              >
                {name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div>
              <h1
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#3A4151",
                  margin: "0 0 4px 0",
                  letterSpacing: "-0.02em",
                }}
              >
                {name}
              </h1>
              <p
                style={{
                  fontSize: "13px",
                  color: "#6B7A8F",
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {role}
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: "#8895A9",
                  margin: "4px 0 0 0",
                }}
              >
                {company} · {location}
              </p>
            </div>
          </div>

          {/* Summary */}
          <p
            style={{
              fontSize: "11px",
              color: "#5A6778",
              lineHeight: 1.6,
              margin: "0 0 20px 0",
            }}
          >
            {summary.slice(0, 140)}{summary.length > 140 ? "…" : ""}
          </p>

          {/* Stats Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "20px",
            }}
          >
            {[
              { label: "Projects", value: "24+" },
              { label: "Experience", value: "5 yrs" },
              { label: "Clients", value: "12" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: primaryColor,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    color: "#8895A9",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <button
              style={{
                flex: 1,
                padding: "12px 0",
                fontSize: "12px",
                fontWeight: 600,
                color: "#FFFFFF",
                background: `linear-gradient(145deg, ${primaryColor}, ${accentColor})`,
                border: "none",
                borderRadius: "40px",
                cursor: "pointer",
                boxShadow: `
                  4px 4px 8px rgba(166, 180, 200, 0.4),
                  -4px -4px 8px rgba(255, 255, 255, 0.6)
                `,
              }}
            >
              View Portfolio
            </button>
            <button
              style={{
                flex: 1,
                padding: "12px 0",
                fontSize: "12px",
                fontWeight: 600,
                color: "#5A6778",
                background: bgColor,
                border: "none",
                borderRadius: "40px",
                cursor: "pointer",
                boxShadow: `
                  4px 4px 8px rgba(166, 180, 200, 0.3),
                  -4px -4px 8px rgba(255, 255, 255, 0.7)
                `,
              }}
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Skills Section */}
        <div
          style={{
            background: bgColor,
            borderRadius: "20px",
            padding: "18px 20px",
            boxShadow: `
              6px 6px 12px rgba(166, 180, 200, 0.3),
              -6px -6px 12px rgba(255, 255, 255, 0.7)
            `,
          }}
        >
          <h3
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#3A4151",
              margin: "0 0 12px 0",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Core Skills
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {skills.length > 0 ? (
              skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "8px 16px",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "#5A6778",
                    background: bgColor,
                    borderRadius: "30px",
                    boxShadow: `
                      3px 3px 6px rgba(166, 180, 200, 0.2),
                      -3px -3px 6px rgba(255, 255, 255, 0.8),
                      inset 1px 1px 2px rgba(255, 255, 255, 0.9),
                      inset -1px -1px 2px rgba(166, 180, 200, 0.1)
                    `,
                  }}
                >
                  {skill}
                </span>
              ))
            ) : (
              <>
                <span
                  style={{
                    padding: "8px 16px",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "#5A6778",
                    background: bgColor,
                    borderRadius: "30px",
                    boxShadow: `
                      3px 3px 6px rgba(166, 180, 200, 0.2),
                      -3px -3px 6px rgba(255, 255, 255, 0.8),
                      inset 1px 1px 2px rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  UI Design
                </span>
                <span
                  style={{
                    padding: "8px 16px",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "#5A6778",
                    background: bgColor,
                    borderRadius: "30px",
                    boxShadow: `
                      3px 3px 6px rgba(166, 180, 200, 0.2),
                      -3px -3px 6px rgba(255, 255, 255, 0.8)
                    `,
                  }}
                >
                  Figma
                </span>
                <span
                  style={{
                    padding: "8px 16px",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "#5A6778",
                    background: bgColor,
                    borderRadius: "30px",
                    boxShadow: `
                      3px 3px 6px rgba(166, 180, 200, 0.2),
                      -3px -3px 6px rgba(255, 255, 255, 0.8)
                    `,
                  }}
                >
                  Prototyping
                </span>
              </>
            )}
          </div>
        </div>

        {/* Featured Work Preview */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {[1, 2].map((i) => (
            <div
              key={i}
              style={{
                background: bgColor,
                borderRadius: "16px",
                padding: "14px",
                boxShadow: `
                  4px 4px 8px rgba(166, 180, 200, 0.25),
                  -4px -4px 8px rgba(255, 255, 255, 0.7)
                `,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "60px",
                  borderRadius: "10px",
                  background: `linear-gradient(145deg, ${primaryColor}20, ${accentColor}30)`,
                  marginBottom: "10px",
                  boxShadow: `
                    inset 2px 2px 4px rgba(166, 180, 200, 0.2),
                    inset -2px -2px 4px rgba(255, 255, 255, 0.7)
                  `,
                }}
              />
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#3A4151",
                  marginBottom: "4px",
                }}
              >
                Project {i}
              </div>
              <div
                style={{
                  fontSize: "9px",
                  color: "#8895A9",
                }}
              >
                {i === 1 ? "Mobile App Design" : "Brand Identity"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export function PreviewDashboard() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("glassmorphism");
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [selectedTone, setSelectedTone] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);
  const [sectionVisibility, setSectionVisibility] = useState(
    Object.fromEntries(sections.map((s) => [s, true]))
  );
  const [deploying, setDeploying] = useState(false);
  const [deployError, setDeployError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("resuflow_profile");
    if (!stored) {
      navigate("/upload");
      return;
    }
    try {
      setProfile(JSON.parse(stored));
    } catch {
      // ignore
    }

    const vibe = localStorage.getItem("resuflow_vibe");
    if (vibe) {
      try {
        const { template, tone } = JSON.parse(vibe);
        if (["glassmorphism", "highendminimalist", "neumorphism", "handcrafted", "editorial", "bento"].includes(template)) {
          setSelectedTemplate(template);
        }
        const toneIdx = ["Professional", "Friendly", "Creative"].indexOf(tone);
        if (toneIdx >= 0) setSelectedTone(toneIdx);
      } catch {
        // ignore
      }
    }
  }, [navigate]);

  const handlePublish = async () => {
    setDeploying(true);
    setDeployError(null);
    try {
      const storedProfile = localStorage.getItem("resuflow_profile");
      if (!storedProfile) throw new Error("No profile found. Please upload your CV first.");
      const profileData = JSON.parse(storedProfile);
      const rawName = profileData?.personalInfo?.name || "user";
      const slug = rawName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const userId = `${slug}-${Math.random().toString(36).slice(2, 7)}`;
      const config = {
        template: selectedTemplate,
        palette: paletteRows[selectedPalette],
        font: fontOptions[selectedFont] === "Serif Editorial" ? "serif" : "sans",
        sectionsVisible: Object.fromEntries(
          Object.entries(sectionVisibility).map(([k, v]) => [k.toLowerCase(), v])
        ),
        tone: (["professional", "friendly", "creative"] as const)[selectedTone],
      };
      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          template: selectedTemplate,
          config,
          profile: profileData,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        const detail = data.errors?.map((e: any) => `${e.field}: ${e.message}`).join(", ");
        throw new Error(detail || data.message || "Deployment failed");
      }
      localStorage.setItem("resuflow_portfolio_url", data.portfolioUrl || "");
      localStorage.setItem("resuflow_username", data.username || userId);
      navigate("/deploy");
    } catch (err: any) {
      setDeployError(err.message || "Something went wrong.");
    } finally {
      setDeploying(false);
    }
  };

  const toggleSection = (s: string) => {
    setSectionVisibility((prev) => ({ ...prev, [s]: !prev[s] }));
  };

  const portfolioUrlPreview = (() => {
    const name = profile?.personalInfo?.name || "";
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return slug ? `resuflow.app/${slug}` : "resuflow.app/your-portfolio";
  })();

  const templateOptions: { id: TemplateType; label: string; thumb: string }[] = [
    { id: "glassmorphism", label: "Glassmorphism", thumb: glassmorphismThumb },
    { id: "highendminimalist", label: "High-End Minimalist", thumb: highendminimalistThumb },
    { id: "neumorphism", label: "Neumorphism", thumb: neumorphismThumb },
    { id: "handcrafted", label: "Handcrafted", thumb: handcraftedThumb },
    { id: "editorial", label: "Editorial", thumb: editorialThumb },
    { id: "bento", label: "Bento", thumb: bentoThumb },
  ];

  return (
    <div
      style={{ backgroundColor: "#0E1627", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}
    >
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="mb-8">
          <Breadcrumb currentStep={3} />
        </div>

        <div className="flex gap-5" style={{ height: "calc(100vh - 220px)", minHeight: "600px" }}>
          {/* ── LEFT PANEL: Live Preview ── */}
          <div style={{ flex: "0 0 65%", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div className="flex items-center gap-2">
              <span
                style={{
                  color: "#BDB8B9",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Live Preview — {templateLabels[selectedTemplate]}
              </span>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#4ade80",
                  display: "inline-block",
                  boxShadow: "0 0 0 3px rgba(74,222,128,0.2)",
                }}
                className="animate-pulse"
              />
              <span style={{ color: "#4ade80", fontSize: "11px" }}>Live</span>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(189,184,185,0.05)",
                borderRadius: "16px",
                border: "1px solid rgba(189,184,185,0.25)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Fake browser bar */}
              <div
                style={{
                  backgroundColor: "#080f1a",
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  borderBottom: "1px solid rgba(189,184,185,0.15)",
                  flexShrink: 0,
                }}
              >
                <div className="flex gap-1.5">
                  {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                    <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: c }} />
                  ))}
                </div>
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(255,255,255,0.06)",
                    borderRadius: "6px",
                    padding: "5px 12px",
                    color: "#BDB8B9",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    maxWidth: "320px",
                    margin: "0 auto",
                  }}
                >
                  {portfolioUrlPreview}
                </div>
              </div>

              {/* Template Preview */}
              <div style={{ flex: 1, overflow: "hidden" }}>
                {selectedTemplate === "glassmorphism" && (
                  <GlassmorphismPreview palette={paletteRows[selectedPalette]} profile={profile} />
                )}
                {selectedTemplate === "highendminimalist" && (
                  <HighEndMinimalistPreview profile={profile} />
                )}
                {selectedTemplate === "neumorphism" && (
                  <NeumorphismPreview palette={paletteRows[selectedPalette]} profile={profile} />
                )}
                {selectedTemplate === "handcrafted" && (
                  <HandcraftedPreview palette={paletteRows[selectedPalette]} profile={profile} />
                )}

              </div>
              {/* Editorial and Bento render in the deployed portfolio; the preview falls back to HighEndMinimalist */}
            </div>
          </div>

          {/* ── RIGHT PANEL: Customize ── */}
          <div
            style={{
              flex: "0 0 33%",
              backgroundColor: "#080f1a",
              borderRadius: "20px",
              border: "1px solid rgba(189,184,185,0.25)",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "24px 24px 20px",
                borderBottom: "1px solid rgba(189,184,185,0.15)",
                background: "linear-gradient(180deg, rgba(127,98,105,0.08) 0%, transparent 100%)",
              }}
            >
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  color: "#F4E1E0",
                  fontSize: "24px",
                  marginBottom: "4px",
                }}
              >
                Customize
              </h2>
              <p style={{ color: "#BDB8B9", fontSize: "13px" }}>
                Choose a template and fine-tune your portfolio
              </p>
            </div>

            {/* Content Area */}
            <div style={{ padding: "24px", flex: 1 }}>
              {/* Template Selection */}
              <CustomSection title="Template" icon="🖼️">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {templateOptions.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      style={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        cursor: "pointer",
                        border: selectedTemplate === t.id ? "2px solid #7F6269" : "1px solid rgba(189,184,185,0.2)",
                        transition: "border 0.15s ease",
                        backgroundColor: "rgba(189,184,185,0.04)",
                      }}
                    >
                      <img
                        src={t.thumb}
                        alt={t.label}
                        style={{ width: "100%", height: "80px", objectFit: "cover", display: "block" }}
                      />
                      <div
                        style={{
                          padding: "8px 10px",
                          fontSize: "11px",
                          fontWeight: selectedTemplate === t.id ? 600 : 500,
                          color: selectedTemplate === t.id ? "#F4E1E0" : "#BDB8B9",
                          textAlign: "center",
                        }}
                      >
                        {t.label}
                      </div>
                    </div>
                  ))}
                </div>
              </CustomSection>

              {/* Color Palette */}
              <CustomSection title="Color Scheme" icon="🎨">
                <div className="flex flex-col gap-3">
                  {paletteRows.map((row, i) => (
                    <div
                      key={row.name}
                      onClick={() => setSelectedPalette(i)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 14px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        backgroundColor:
                          selectedPalette === i ? "rgba(127,98,105,0.15)" : "rgba(244,225,224,0.03)",
                        border:
                          selectedPalette === i
                            ? "2px solid #7F6269"
                            : "1px solid rgba(189,184,185,0.1)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span
                        style={{
                          color: selectedPalette === i ? "#F4E1E0" : "#BDB8B9",
                          fontSize: "13px",
                          fontWeight: selectedPalette === i ? 600 : 500,
                        }}
                      >
                        {row.name}
                      </span>
                      <div className="flex gap-1.5">
                        {row.colors.map((c) => (
                          <div
                            key={c}
                            style={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              backgroundColor: c,
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CustomSection>

              {/* Typography */}
              <CustomSection title="Typography" icon="✍️">
                <div className="flex gap-3">
                  {fontOptions.map((f, i) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFont(i)}
                      style={{
                        flex: 1,
                        backgroundColor:
                          selectedFont === i ? "rgba(127,98,105,0.2)" : "rgba(244,225,224,0.04)",
                        border:
                          selectedFont === i ? "2px solid #7F6269" : "1px solid rgba(189,184,185,0.2)",
                        borderRadius: "12px",
                        padding: "16px 12px",
                        cursor: "pointer",
                        fontFamily: i === 1 ? "'DM Serif Display', serif" : "'DM Sans', sans-serif",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          color: selectedFont === i ? "#F4E1E0" : "#BDB8B9",
                          fontSize: "14px",
                          fontWeight: selectedFont === i ? 600 : 500,
                          marginBottom: "4px",
                        }}
                      >
                        {f}
                      </div>
                      <div style={{ color: "#BDB8B9", fontSize: "10px", opacity: 0.5 }}>
                        {i === 0 ? "Clean & Modern" : "Classic & Elegant"}
                      </div>
                    </button>
                  ))}
                </div>
              </CustomSection>

              {/* Voice & Tone */}
              <CustomSection title="Voice & Tone" icon="💬">
                <div className="flex gap-2">
                  {[
                    { label: "Professional", desc: "Formal" },
                    { label: "Friendly", desc: "Casual" },
                    { label: "Creative", desc: "Bold" },
                  ].map((t, i) => (
                    <button
                      key={t.label}
                      onClick={() => setSelectedTone(i)}
                      style={{
                        flex: 1,
                        backgroundColor: selectedTone === i ? "#7F6269" : "rgba(244,225,224,0.04)",
                        color: selectedTone === i ? "#F4E1E0" : "#BDB8B9",
                        fontSize: "12px",
                        fontWeight: selectedTone === i ? 600 : 500,
                        padding: "10px 8px",
                        borderRadius: "999px",
                        border:
                          selectedTone === i ? "none" : "1px solid rgba(189,184,185,0.25)",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.2s ease",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      <span>{t.label}</span>
                      <span style={{ fontSize: "9px", opacity: 0.6 }}>{t.desc}</span>
                    </button>
                  ))}
                </div>
              </CustomSection>

              {/* Sections Toggle */}
              <CustomSection title="Visible Sections" icon="👁️">
                <div className="flex flex-col gap-2">
                  {sections.map((s) => (
                    <label
                      key={s}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        backgroundColor: sectionVisibility[s]
                          ? "rgba(127,98,105,0.08)"
                          : "transparent",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <span
                        style={{
                          color: sectionVisibility[s] ? "#F4E1E0" : "#BDB8B9",
                          fontSize: "13px",
                          fontWeight: sectionVisibility[s] ? 600 : 500,
                        }}
                      >
                        {s}
                      </span>
                      <button
                        onClick={() => toggleSection(s)}
                        style={{
                          width: "42px",
                          height: "24px",
                          borderRadius: "999px",
                          backgroundColor: sectionVisibility[s]
                            ? "#7F6269"
                            : "rgba(189,184,185,0.3)",
                          border: "none",
                          cursor: "pointer",
                          position: "relative",
                          transition: "background-color 0.2s ease",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "3px",
                            left: sectionVisibility[s] ? "21px" : "3px",
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            backgroundColor: "#F4E1E0",
                            transition: "left 0.2s ease",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                          }}
                        />
                      </button>
                    </label>
                  ))}
                </div>
              </CustomSection>
            </div>

            {/* Footer Actions */}
            <div
              style={{
                padding: "20px 24px 24px",
                borderTop: "1px solid rgba(189,184,185,0.15)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {deployError && (
                <div
                  style={{
                    backgroundColor: "rgba(220,53,69,0.1)",
                    border: "1px solid rgba(220,53,69,0.3)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    color: "#f87171",
                    fontSize: "13px",
                  }}
                >
                  {deployError}
                </div>
              )}
              <button
                onClick={handlePublish}
                disabled={deploying}
                style={{
                  backgroundColor: deploying ? "rgba(127,98,105,0.6)" : "#7F6269",
                  color: "#F4E1E0",
                  fontSize: "15px",
                  fontWeight: 600,
                  padding: "14px 0",
                  borderRadius: "999px",
                  border: "none",
                  cursor: deploying ? "not-allowed" : "pointer",
                  width: "100%",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "inset 0 1px 0 rgba(244,225,224,0.15), 0 4px 24px rgba(127,98,105,0.4)",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                {deploying ? "Publishing..." : "Publish Portfolio →"}
              </button>
              <button
                onClick={() => navigate("/extraction")}
                style={{
                  backgroundColor: "transparent",
                  color: "#BDB8B9",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "12px 0",
                  borderRadius: "999px",
                  border: "1.5px solid rgba(189,184,185,0.3)",
                  cursor: "pointer",
                  width: "100%",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                className="hover:border-[rgba(189,184,185,0.5)] transition-colors"
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px",
        }}
      >
        <span style={{ color: "#F4E1E0", fontSize: "16px", fontWeight: 600 }}>{title}</span>
        <span style={{ color: "#BDB8B9", fontSize: "16px" }}>{icon}</span>
      </div>
      {children}
    </div>
  );
}