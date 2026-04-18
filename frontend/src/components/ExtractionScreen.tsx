import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { Navbar } from "./Navbar";

const vibes = [
  {
    name: "Minimal",
    desc: "Clean, whitespace-forward, content first.",
    layout: [
      { w: "70%", h: 10, top: 16, left: 16 },
      { w: "40%", h: 7, top: 32, left: 16 },
      { w: "80%", h: 5, top: 52, left: 16 },
      { w: "60%", h: 5, top: 63, left: 16 },
    ],
  },
  {
    name: "Editorial",
    desc: "Magazine-style with bold headers and contrast.",
    layout: [
      { w: "100%", h: 18, top: 0, left: 0, color: "#0E1627" },
      { w: "55%", h: 8, top: 24, left: 16 },
      { w: "80%", h: 5, top: 38, left: 16 },
      { w: "65%", h: 5, top: 49, left: 16 },
    ],
  },
  {
    name: "Bold",
    desc: "High contrast, expressive, personal brand.",
    layout: [
      { w: "40%", h: 80, top: 0, left: 0, color: "#7F6269" },
      { w: "50%", h: 8, top: 16, left: "44%" },
      { w: "45%", h: 5, top: 30, left: "44%" },
      { w: "50%", h: 5, top: 42, left: "44%" },
    ],
  },
  {
    name: "Classic",
    desc: "Traditional, ATS-friendly, professional tone.",
    layout: [
      { w: "50%", h: 9, top: 16, left: "25%" },
      { w: "70%", h: 1, top: 30, left: "15%", color: "#BDB8B9" },
      { w: "80%", h: 5, top: 38, left: 10 },
      { w: "65%", h: 5, top: 49, left: 10 },
    ],
  },
];

const toneOptions = ["Professional", "Friendly", "Creative"];
const paletteSwatches = ["#7F6269", "#0E1627", "#F4E1E0", "#BDB8B9", "#E5C5C1"];

function VibeLayoutThumb({ layout }: { layout: typeof vibes[0]["layout"] }) {
  return (
    <div
      style={{
        width: "100%",
        height: "80px",
        backgroundColor: "rgba(189,184,185,0.06)",
        borderRadius: "6px",
        position: "relative",
        overflow: "hidden",
        marginBottom: "10px",
      }}
    >
      {layout.map((block, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: block.w,
            height: block.h,
            top: block.top,
            left: block.left,
            backgroundColor: (block as any).color || "rgba(189,184,185,0.4)",
            borderRadius: "3px",
          }}
        />
      ))}
    </div>
  );
}

export function ExtractionScreen() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [selectedVibe, setSelectedVibe] = useState(0);
  const [selectedTone, setSelectedTone] = useState(0);
  const [selectedPalette, setSelectedPalette] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("resuflow_profile");
    if (!stored) {
      navigate("/upload");
      return;
    }
    try {
      setProfile(JSON.parse(stored));
    } catch {
      navigate("/upload");
    }
  }, [navigate]);

  const name = profile?.personalInfo?.name || "Your Profile";
  const initials = name
    .split(" ")
    .map((n: string) => n[0] || "")
    .slice(0, 2)
    .join("")
    .toUpperCase() || "YP";
  const title =
    profile?.workExperience?.[0]?.role ||
    profile?.personalInfo?.email ||
    "Professional";

  const allSkills: string[] = [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.domain || []),
    ...(profile?.skills?.soft || []),
    ...(profile?.skills?.tools || []),
  ].slice(0, 8);

  const experienceList: any[] = (profile?.workExperience || []).slice(0, 3);
  const education: any = (profile?.education || [])[0];
  const achievementsList: any[] = (profile?.achievements || []).slice(0, 2);

  const handleContinue = () => {
    localStorage.setItem(
      "resuflow_vibe",
      JSON.stringify({
        vibe: vibes[selectedVibe].name,
        tone: toneOptions[selectedTone],
        palette: paletteSwatches[selectedPalette],
      })
    );
    navigate("/templates");
  };

  return (
    <div
      style={{ backgroundColor: "#0E1627", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}
    >
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <Breadcrumb currentStep={2} />
        </div>

        <div className="mb-10">
          <h2
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "32px",
              color: "#F4E1E0",
              marginBottom: "8px",
            }}
          >
            Here's What We Found
          </h2>
          <p style={{ color: "#BDB8B9", fontSize: "15px" }}>
            Review your extracted profile before choosing your style.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── LEFT: Extracted Profile Card ── */}
          <div style={{ width: "100%", maxWidth: "440px", flexShrink: 0 }}>
            <div
              style={{
                backgroundColor: "rgba(189,184,185,0.05)",
                borderRadius: "16px",
                padding: "32px",
                border: "1px solid rgba(189,184,185,0.2)",
                height: "100%",
              }}
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: "#7F6269",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#F4E1E0",
                    fontSize: "20px",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>
                <div>
                  <div style={{ color: "#F4E1E0", fontSize: "20px", fontWeight: 700 }}>
                    {name}
                  </div>
                  <div style={{ color: "#BDB8B9", fontSize: "14px" }}>{title}</div>
                </div>
              </div>

              <div style={{ height: "1px", backgroundColor: "rgba(189,184,185,0.2)", marginBottom: "20px" }} />

              {/* Skills */}
              {allSkills.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                    Skills
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allSkills.map((s) => (
                      <span
                        key={s}
                        style={{
                          backgroundColor: "rgba(127,98,105,0.2)",
                          color: "#F4E1E0",
                          fontSize: "12px",
                          fontWeight: 500,
                          padding: "4px 12px",
                          borderRadius: "999px",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div style={{ height: "1px", backgroundColor: "rgba(189,184,185,0.2)", marginTop: "20px", marginBottom: "20px" }} />
                </div>
              )}

              {/* Experience */}
              {experienceList.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                    Experience
                  </div>
                  {experienceList.map((e: any, idx: number) => (
                    <div key={idx} style={{ marginBottom: "12px" }}>
                      <div style={{ color: "#F4E1E0", fontSize: "14px", fontWeight: 600 }}>
                        {e.role}
                      </div>
                      <div style={{ color: "#BDB8B9", fontSize: "13px" }}>
                        {e.company}
                        {e.startDate ? ` · ${e.startDate}` : ""}
                        {e.endDate ? ` – ${e.endDate}` : ""}
                      </div>
                    </div>
                  ))}
                  <div style={{ height: "1px", backgroundColor: "rgba(189,184,185,0.2)", marginBottom: "20px" }} />
                </div>
              )}

              {/* Education */}
              {education && (
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                    Education
                  </div>
                  <div style={{ color: "#F4E1E0", fontSize: "14px", fontWeight: 600 }}>
                    {education.degree}{education.field ? ` in ${education.field}` : ""}
                  </div>
                  <div style={{ color: "#BDB8B9", fontSize: "13px" }}>
                    {education.institution}
                    {education.startDate ? ` · ${education.startDate}` : ""}
                    {education.endDate ? ` – ${education.endDate}` : ""}
                  </div>
                  {achievementsList.length > 0 && (
                    <div style={{ height: "1px", backgroundColor: "rgba(189,184,185,0.2)", marginTop: "20px", marginBottom: "20px" }} />
                  )}
                </div>
              )}

              {/* Achievements */}
              {achievementsList.length > 0 && (
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                    Achievements
                  </div>
                  {achievementsList.map((a: any, i: number) => (
                    <div key={i} className="flex items-start gap-2 mb-2">
                      <CheckCircle2 size={14} style={{ color: "#7F6269", marginTop: "2px", flexShrink: 0 }} />
                      <span style={{ color: "#BDB8B9", fontSize: "13px", lineHeight: 1.5 }}>
                        {a.title || a.description || String(a)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => navigate("/upload")}
                style={{
                  backgroundColor: "transparent",
                  color: "#F4E1E0",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "10px 24px",
                  borderRadius: "999px",
                  border: "1.5px solid #BDB8B9",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  width: "100%",
                }}
                className="hover:opacity-80 transition-opacity"
              >
                Edit Details
              </button>
            </div>
          </div>

          {/* ── RIGHT: Vibe & Theme Selection ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                backgroundColor: "rgba(189,184,185,0.05)",
                borderRadius: "16px",
                padding: "32px",
                border: "1px solid rgba(189,184,185,0.2)",
              }}
            >
              <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
                Choose Your Vibe
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "28px" }}>
                {vibes.map((vibe, i) => (
                  <div
                    key={vibe.name}
                    onClick={() => setSelectedVibe(i)}
                    style={{
                      backgroundColor: "rgba(189,184,185,0.04)",
                      borderRadius: "12px",
                      padding: "16px",
                      border: selectedVibe === i ? "2px solid #7F6269" : "1px solid rgba(189,184,185,0.2)",
                      cursor: "pointer",
                      position: "relative",
                      transition: "border 0.15s ease",
                    }}
                  >
                    {selectedVibe === i && (
                      <div
                        style={{
                          position: "absolute",
                          top: "8px",
                          right: "8px",
                          width: "18px",
                          height: "18px",
                          backgroundColor: "#7F6269",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CheckCircle2 size={12} style={{ color: "#F4E1E0" }} />
                      </div>
                    )}
                    <VibeLayoutThumb layout={vibe.layout} />
                    <div style={{ color: "#F4E1E0", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>{vibe.name}</div>
                    <div style={{ color: "#BDB8B9", fontSize: "12px" }}>{vibe.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                Tone of Voice
              </div>
              <div className="flex gap-3 mb-7">
                {toneOptions.map((tone, i) => (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(i)}
                    style={{
                      backgroundColor: selectedTone === i ? "#7F6269" : "transparent",
                      color: "#F4E1E0",
                      fontSize: "13px",
                      fontWeight: selectedTone === i ? 600 : 400,
                      padding: "8px 20px",
                      borderRadius: "999px",
                      border: selectedTone === i ? "none" : "1.5px solid rgba(189,184,185,0.5)",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {tone}
                  </button>
                ))}
              </div>

              <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                Color Palette
              </div>
              <div className="flex gap-3 mb-8">
                {paletteSwatches.map((color, i) => (
                  <button
                    key={color}
                    onClick={() => setSelectedPalette(i)}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: color,
                      border: selectedPalette === i ? "2.5px solid #F4E1E0" : "2px solid transparent",
                      cursor: "pointer",
                      outline: selectedPalette === i ? "2px solid rgba(244,225,224,0.3)" : "none",
                      transition: "all 0.15s ease",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleContinue}
                style={{
                  backgroundColor: "#7F6269",
                  color: "#F4E1E0",
                  fontSize: "15px",
                  fontWeight: 600,
                  padding: "16px 0",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "inset 0 1px 0 rgba(244,225,224,0.12), 0 4px 20px rgba(127,98,105,0.35)",
                }}
                className="hover:opacity-90 transition-opacity"
              >
                Choose Template →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
