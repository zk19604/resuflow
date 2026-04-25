import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { Navbar } from "./Navbar";

import {
  GlassmorphismPreview,
  HighEndMinimalistPreview,
  EditorialPreview,
  BentoPreview,
  NeumorphismPreview,
  NeonVaultPreview,
  defaultPalette,
  LuxuryHighEndPreview,
  MusicianPreview,
} from "./TemplatePreviews";

const templates = [
  { id: "glassmorphism", label: "Glassmorphism", desc: "Dark, glassy, modern aesthetic with gradient orbs." },
  { id: "highendminimalist", label: "High-End Minimalist", desc: "Clean, editorial, elegant white-space layout." },
  { id: "editorial", label: "Editorial", desc: "Bold serif typography with a magazine-style layout." },
  { id: "bento", label: "Bento", desc: "Modern card grid layout with colorful bento boxes." },
  { id: "neumorphism", label: "Neumorphism", desc: "Soft UI with subtle shadows and tactile feel." },
  { id: "neon-vault", label: "Neon Vault", desc: "Modern purple neon style for full-stack developers."},
  { id: "luxury-high-end", label: "Luxury High-End", desc: "Dark gold editorial — cinematic & premium." },
  { id: "musician", label: "Musician", desc: "Creative, bold layout with music-inspired design." },
  { id: "retro", label: "Retro Press", desc: "Vintage newspaper-inspired layout with bold editorial typography." },
];

const toneOptions = ["Professional", "Friendly", "Creative"];

export function ExtractionScreen() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("glassmorphism");
  const [selectedTone, setSelectedTone] = useState(0);

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
        template: selectedTemplate,
        tone: toneOptions[selectedTone],
      })
    );
    navigate("/preview");
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
                Choose Your Template
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "28px" }}>
                {templates.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    style={{
                      backgroundColor: "rgba(189,184,185,0.04)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      border: selectedTemplate === t.id ? "2px solid #7F6269" : "1px solid rgba(189,184,185,0.2)",
                      cursor: "pointer",
                      position: "relative",
                      transition: "border 0.15s ease",
                    }}
                  >
                    {selectedTemplate === t.id && (
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
                          zIndex: 1,
                        }}
                      >
                        <CheckCircle2 size={12} style={{ color: "#F4E1E0" }} />
                      </div>
                    )}
                    <div style={{ width: "100%", height: "100px", overflow: "hidden", pointerEvents: "none" }}>
                      {t.id === "glassmorphism" && <GlassmorphismPreview palette={defaultPalette} profile={profile} />}
                      {t.id === "highendminimalist" && <HighEndMinimalistPreview profile={profile} />}
                      {t.id === "editorial" && <EditorialPreview profile={profile} />}
                      {t.id === "bento" && <BentoPreview profile={profile} />}
                      {t.id === "neumorphism" && <NeumorphismPreview profile={profile} />} 
                      {t.id === "neon-vault" && <NeonVaultPreview profile={profile} />} 
                      {t.id === "luxury-high-end" && <LuxuryHighEndPreview profile={profile} />} 
                      {t.id === "musician" && <MusicianPreview profile={profile} />}
                    </div>
                    <div style={{ padding: "12px" }}>
                      <div style={{ color: "#F4E1E0", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>{t.label}</div>
                      <div style={{ color: "#BDB8B9", fontSize: "11px" }}>{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                Tone of Voice
              </div>
              <div className="flex gap-3 mb-8">
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
                Continue to Preview →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
