import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { Upload, Wand2, Link2, Cpu, Palette, Globe, QrCode, ShieldCheck, Code2, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "./Navbar";

import bentoImg from "../assets/examples/bento.png";
import editorialImg from "../assets/editorial.png";
import glassDarkImg from "../assets/glassDark.png";
import glassmorphismImg from "../assets/examples/glassmorphism.png";
import highendMinimalistImg from "../assets/highendminimalist.png";
import neonVaultImg from "../assets/neon-vault-thumb.png";
import neumorphismImg from "../assets/neumorphism.png";
import skeumorphism from "../assets/examples/skeumorphism.png";
import retro from "../assets/examples/retro.png";

const PORTFOLIO_BASE = import.meta.env.VITE_PORTFOLIO_BASE_URL || "https://portfolio-templates-delta.vercel.app";

const templates = [
  { label: "Glassmorphism", img: glassmorphismImg, link: `${PORTFOLIO_BASE}/zainab-khalil-jhirc` },
  { label: "Bento Grid", img: bentoImg, link: `${PORTFOLIO_BASE}/zainab-khalil-oa6z7` },
  { label: "Editorial", img: editorialImg },
  { label: "Neon Vault", img: neonVaultImg },
  { label: "Neumorphism", img: neumorphismImg },
  { label: "High End Minimalist", img: highendMinimalistImg },
  { label: "Glass Dark", img: glassDarkImg },
  { label: "Skeuomorphism", img: skeumorphism, link: `${PORTFOLIO_BASE}/zainab-khalil-qdvcc` },
  { label: "Retro", img: retro, link: `${PORTFOLIO_BASE}/zainab-khalil-mn6td` },
];

const features = [
  {
    icon: <Cpu size={22} />,
    title: "AI CV Extraction",
    desc: "Intelligently parses your CV to extract skills, roles, and achievements with near-perfect accuracy.",
  },
  {
    icon: <Palette size={22} />,
    title: "Smart Theme Engine",
    desc: "Picks fonts, colors, and layouts that match your industry and personal style automatically.",
  },
  {
    icon: <Globe size={22} />,
    title: "Instant Cloud Hosting",
    desc: "Your portfolio is live at a custom URL the moment you hit publish. No servers, no setup.",
  },
  {
    icon: <QrCode size={22} />,
    title: "QR Code Bridge",
    desc: "Print a high-res QR code on your CV that links directly to your live portfolio.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Schema Validation",
    desc: "Structured data baked in for rich results in Google Search and LinkedIn previews.",
  },
  {
    icon: <Code2 size={22} />,
    title: "Zero-Code Setup",
    desc: "From upload to live in under 2 minutes. No developer, no designer required.",
  },
];

function HeroMockup() {
  return (
    <div
      style={{
        backgroundColor: "#0E1627",
        borderRadius: "24px",
        border: "1px solid rgba(189,184,185,0.2)",
        padding: "28px",
        width: "100%",
        maxWidth: "440px",
        boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
      }}
    >
      {/* Avatar + name */}
      <div className="flex items-center gap-3 mb-5">
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "#7F6269",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#F4E1E0",
            fontSize: "18px",
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          AM
        </div>
        <div>
          <div
            style={{
              color: "#F4E1E0",
              fontSize: "16px",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Alex Morgan
          </div>
          <div style={{ color: "#BDB8B9", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" }}>
            Senior Product Designer
          </div>
        </div>
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {["UX Research", "Product", "Figma", "Strategy"].map((tag) => (
          <span
            key={tag}
            style={{
              backgroundColor: "rgba(127,98,105,0.2)",
              color: "#F4E1E0",
              fontSize: "11px",
              fontWeight: 500,
              padding: "4px 12px",
              borderRadius: "999px",
              fontFamily: "'DM Sans', sans-serif",
              border: "1px solid rgba(127,98,105,0.4)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* About snippet */}
      <div
        style={{
          backgroundColor: "rgba(189,184,185,0.06)",
          borderRadius: "10px",
          padding: "14px",
          marginBottom: "16px",
          border: "1px solid rgba(189,184,185,0.12)",
        }}
      >
        <div
          style={{
            color: "#BDB8B9",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "8px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          About
        </div>
        {[90, 75, 60].map((w, i) => (
          <div
            key={i}
            style={{
              width: `${w}%`,
              height: "7px",
              backgroundColor: "#BDB8B9",
              borderRadius: "4px",
              opacity: 0.3,
              marginBottom: "5px",
            }}
          />
        ))}
      </div>

      {/* Bottom row: URL + QR */}
      <div className="flex items-center justify-between">
        <div
          style={{
            color: "#BDB8B9",
            fontSize: "11px",
            fontFamily: "monospace",
          }}
        >
          resuflow.app/alex-morgan
        </div>
        {/* QR code thumb */}
        <div
          style={{
            width: "48px",
            height: "48px",
            backgroundColor: "#E5C5C1",
            borderRadius: "8px",
            padding: "4px",
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: "2px",
          }}
        >
          {Array.from({ length: 25 }).map((_, i) => {
            const pattern = [1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1];
            return (
              <div
                key={i}
                style={{
                  backgroundColor: pattern[i] ? "#0E1627" : "transparent",
                  borderRadius: "1px",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VibeSection({
  templates,
  onSelect,
}: {
  templates: { label: string; img: string; link?: string }[];
  onSelect: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  return (
    <section style={{ backgroundColor: "#0E1627" }} className="py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "36px",
                color: "#F4E1E0",
                marginBottom: "8px",
              }}
            >
              Pick Your Vibe.
            </h2>
            <p style={{ color: "#BDB8B9", fontSize: "15px" }}>Same data. Totally different energy.</p>
          </div>

          {/* Arrow controls */}
          <div className="flex gap-2 flex-shrink-0">
            {(["left", "right"] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(189,184,185,0.3)",
                  backgroundColor: "rgba(189,184,185,0.07)",
                  color: "#BDB8B9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                className="hover:border-[#7F6269] hover:text-[#F4E1E0] transition-colors"
              >
                {dir === "left" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {templates.map((t) => (
            <button
              key={t.label}
              onClick={onSelect}
              style={{
                minWidth: "260px",
                flexShrink: 0,
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(189,184,185,0.2)",
                backgroundColor: "#080f1a",
                cursor: "pointer",
                padding: 0,
                textAlign: "left",
                transition: "border-color 0.2s",
              }}
              className="hover:border-[#7F6269]"
            >
              <div style={{ height: "200px", overflow: "hidden" }}>
                <img
                  src={t.img}
                  alt={t.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    transition: "transform 0.3s",
                  }}
                  className="group-hover:scale-105"
                />
              </div>
              <div
                style={{
                  padding: "14px 20px",
                  borderTop: "1px solid rgba(189,184,185,0.12)",
                  color: "#BDB8B9",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {t.label}
                <ChevronRight size={14} style={{ color: "#7F6269" }} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) return;

    const targetId = location.hash.slice(1);
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    window.requestAnimationFrame(() => {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash, location.pathname]);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      {/* ── HERO ── */}
      <section
        id="home"
        style={{ backgroundColor: "#0E1627", minHeight: "90vh" }}
        className="flex items-center"
      >
        <div className="w-full max-w-7xl mx-auto px-8 py-20 flex flex-col lg:flex-row items-center gap-16">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <h1
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(40px, 6vw, 64px)",
                color: "#F4E1E0",
                lineHeight: 1.12,
                marginBottom: "24px",
              }}
            >
              Your CV.
              <br />
              Reimagined. Live.
            </h1>
            <p
              style={{
                color: "#BDB8B9",
                fontSize: "17px",
                maxWidth: "480px",
                lineHeight: 1.65,
                marginBottom: "36px",
              }}
            >
              Upload your CV and get a fully hosted, AI-personalized portfolio in under 2 minutes.
              Zero code. Zero design skills needed.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/upload")}
                style={{
                  backgroundColor: "#7F6269",
                  color: "#F4E1E0",
                  fontSize: "15px",
                  fontWeight: 600,
                  padding: "14px 32px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "inset 0 1px 0 rgba(244,225,224,0.12), 0 4px 20px rgba(127,98,105,0.4)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                Upload Your CV →
              </button>
              <button
                onClick={() => navigate("/preview")}
                style={{
                  backgroundColor: "transparent",
                  color: "#F4E1E0",
                  fontSize: "15px",
                  fontWeight: 600,
                  padding: "14px 32px",
                  borderRadius: "999px",
                  border: "1.5px solid #BDB8B9",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                className="hover:opacity-80 transition-opacity"
              >
                See Example Portfolio
              </button>
            </div>
          </div>

          {/* Right — Mockup */}
          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
            <HeroMockup />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ backgroundColor: "#0E1627" }} className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "36px",
              color: "#F4E1E0",
              textAlign: "center",
              marginBottom: "60px",
            }}
          >
            From CV to Portfolio in 3 Steps
          </h2>

          <div className="relative flex flex-col md:flex-row gap-6">

            {[
              {
                num: "01",
                icon: <Upload size={28} />,
                title: "Upload Your CV",
                desc: "Drop your PDF or DOCX, or paste your LinkedIn URL. We support all standard formats.",
              },
              {
                num: "02",
                icon: <Wand2 size={28} />,
                title: "AI Does the Work",
                desc: "Our model extracts your experience, skills, and achievements and structures them beautifully.",
              },
              {
                num: "03",
                icon: <Link2 size={28} />,
                title: "Go Live Instantly",
                desc: "Choose your style, hit publish, and share your live URL or QR code in seconds.",
              },
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  flex: 1,
                  backgroundColor: "rgba(189,184,185,0.05)",
                  borderRadius: "16px",
                  padding: "32px",
                  border: "1px solid rgba(189,184,185,0.2)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "64px",
                    color: "#7F6269",
                    lineHeight: 1,
                    marginBottom: "12px",
                  }}
                >
                  {step.num}
                </div>
                <div style={{ color: "#7F6269", marginBottom: "16px" }}>{step.icon}</div>
                <div
                  style={{
                    color: "#F4E1E0",
                    fontSize: "18px",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  {step.title}
                </div>
                <div style={{ color: "#BDB8B9", fontSize: "14px", lineHeight: 1.6 }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section
        id="features"
        style={{
          backgroundColor: "#080f1a",
          borderTop: "1px solid rgba(189,184,185,0.1)",
          borderBottom: "1px solid rgba(189,184,185,0.1)",
        }}
        className="py-24"
      >
        <div className="max-w-7xl mx-auto px-8">
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "36px",
              color: "#F4E1E0",
              textAlign: "center",
              marginBottom: "12px",
            }}
          >
            Everything You Need, Nothing You Don't.
          </h2>
          <p
            style={{
              color: "#BDB8B9",
              textAlign: "center",
              fontSize: "15px",
              marginBottom: "52px",
            }}
          >
            Built for professionals who want results, not complexity.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  backgroundColor: "#0E1627",
                  borderRadius: "16px",
                  padding: "28px",
                  border: "1px solid rgba(189,184,185,0.2)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                }}
              >
                <div style={{ color: "#7F6269", marginBottom: "16px" }}>{f.icon}</div>
                <div
                  style={{
                    color: "#F4E1E0",
                    fontSize: "18px",
                    fontWeight: 600,
                    marginBottom: "10px",
                  }}
                >
                  {f.title}
                </div>
                <div style={{ color: "#BDB8B9", fontSize: "14px", lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PICK YOUR VIBE ── */}
      <VibeSection templates={templates} onSelect={() => navigate("/upload")} />

      {/* ── EXAMPLES ── */}
      <section
        id="examples"
        style={{
          backgroundColor: "#080f1a",
          borderTop: "1px solid rgba(189,184,185,0.1)",
        }}
        className="py-24"
      >
        <div className="max-w-7xl mx-auto px-8">
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "36px",
              color: "#F4E1E0",
              textAlign: "center",
              marginBottom: "12px",
            }}
          >
            Real Portfolios, Real Templates.
          </h2>
          <p
            style={{
              color: "#BDB8B9",
              textAlign: "center",
              fontSize: "15px",
              marginBottom: "52px",
            }}
          >
            Browse what's possible — then make it yours.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {templates.filter((t) => t.link).map((t) => (
              <a
                key={t.label}
                href={t.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block" }}
                className="group"
              >
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid rgba(189,184,185,0.2)",
                    backgroundColor: "#0E1627",
                    transition: "border-color 0.2s",
                  }}
                >
                  <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
                    <img
                      src={t.img}
                      alt={t.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top",
                        transition: "transform 0.3s",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(0,0,0,0)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      padding: "16px 20px",
                      borderTop: "1px solid rgba(189,184,185,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        color: "#F4E1E0",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {t.label}
                    </span>
                    <span style={{ color: "#7F6269", fontSize: "14px" }}>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          backgroundColor: "#0E1627",
          borderTop: "1px solid rgba(189,184,185,0.2)",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="flex flex-col md:flex-row gap-12 justify-between mb-12">
            {/* Logo + tagline */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#7F6269",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 2h7l3 3v9H3V2z"
                      stroke="#F4E1E0"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path d="M10 2v3h3" stroke="#F4E1E0" strokeWidth="1.5" strokeLinejoin="round" />
                    <path
                      d="M5 8h6M5 11h4"
                      stroke="#F4E1E0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "20px",
                    color: "#F4E1E0",
                  }}
                >
                  ResuFlow
                </span>
              </div>
              <p style={{ color: "#BDB8B9", fontSize: "14px", maxWidth: "220px", lineHeight: 1.6 }}>
                Turn your CV into a stunning portfolio in minutes.
              </p>
            </div>

          

            {/* CTA */}
            <div>
              <div
                style={{
                  color: "#F4E1E0",
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBottom: "12px",
                }}
              >
                Start Building Your Portfolio
              </div>
              <button
                onClick={() => navigate("/upload")}
                style={{
                  backgroundColor: "#7F6269",
                  color: "#F4E1E0",
                  fontSize: "15px",
                  fontWeight: 600,
                  padding: "14px 28px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "inset 0 1px 0 rgba(244,225,224,0.12)",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                Upload Your CV →
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid rgba(189,184,185,0.15)",
              paddingTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#BDB8B9", fontSize: "12px" }}>
              © 2026 ResuFlow. All rights reserved.
            </span>
            <div className="flex gap-6">
              {[
                { label: "Privacy", path: "/privacy" },
                { label: "Terms", path: "/terms" },
                { label: "Cookies", path: "/cookies" },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href={path}
                  style={{ color: "#BDB8B9", fontSize: "12px", textDecoration: "none" }}
                  className="hover:opacity-80 transition-opacity"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
