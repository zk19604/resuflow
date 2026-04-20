import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "./Navbar";
import { Breadcrumb } from "./Breadcrumb";
import {
  GlassmorphismPreview,
  HighEndMinimalistPreview,
  EditorialPreview,
  BentoPreview,
  NeumorphismPreview,  // ADD THIS IMPORT
} from "./TemplatePreviews";

const paletteRows = [
  { name: "Rose Navy", colors: ["#0E1627", "#7F6269", "#F4E1E0", "#BDB8B9", "#E5C5C1"] },
  { name: "Ocean Mist", colors: ["#0D1B2A", "#1B4F72", "#A9CCE3", "#EBF5FB", "#2E86C1"] },
  { name: "Sage Ground", colors: ["#1A2417", "#3D5A3E", "#C8D5B9", "#FAF0CA", "#F0C808"] },
  { name: "Dusty Rose", colors: ["#2D1B1F", "#7B3F4A", "#D4A5A5", "#F2E0E0", "#C47C7C"] },
  { name: "Slate Modern", colors: ["#1A1A2E", "#16213E", "#0F3460", "#E94560", "#EAEAEA"] },
];

const sections = ["About", "Skills", "Experience", "Education", "Projects", "Achievements"];
const fontOptions = ["Modern Sans", "Serif Editorial"];

// UPDATE TYPE
type TemplateType = "glassmorphism" | "highendminimalist" | "editorial" | "bento" | "neumorphism";

// UPDATE LABELS
const templateLabels: Record<TemplateType, string> = {
  glassmorphism: "Glassmorphism",
  highendminimalist: "High-End Minimalist",
  editorial: "Editorial",
  bento: "Bento",
  neumorphism: "Neumorphism",
};

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
        // UPDATE INCLUDES CHECK
        if (["glassmorphism", "highendminimalist", "editorial", "bento", "neumorphism"].includes(template)) {
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

  // UPDATE TEMPLATE OPTIONS
  const templateOptions: { id: TemplateType; label: string }[] = [
    { id: "glassmorphism", label: "Glassmorphism" },
    { id: "highendminimalist", label: "High-End Minimalist" },
    { id: "editorial", label: "Editorial" },
    { id: "bento", label: "Bento" },
    { id: "neumorphism", label: "Neumorphism" },
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
          {/* LEFT PANEL: Live Preview */}
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
                {selectedTemplate === "editorial" && (
                  <EditorialPreview profile={profile} />
                )}
                {selectedTemplate === "bento" && (
                  <BentoPreview profile={profile} />
                )}
                {selectedTemplate === "neumorphism" && (
                  <NeumorphismPreview profile={profile} />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Customize */}
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
              {/* Template Selection - Changed to 3 columns */}
              <CustomSection title="Template" icon="🖼️">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
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
                      <div style={{ width: "100%", height: "80px", overflow: "hidden", pointerEvents: "none" }}>
                        {t.id === "glassmorphism" && <GlassmorphismPreview palette={paletteRows[selectedPalette]} profile={profile} />}
                        {t.id === "highendminimalist" && <HighEndMinimalistPreview profile={profile} />}
                        {t.id === "editorial" && <EditorialPreview profile={profile} />}
                        {t.id === "bento" && <BentoPreview profile={profile} />}
                        {t.id === "neumorphism" && <NeumorphismPreview profile={profile} />}
                      </div>
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