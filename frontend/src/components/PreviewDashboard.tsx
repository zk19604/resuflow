import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "./Navbar";
import { Breadcrumb } from "./Breadcrumb";


const paletteRows = [
  { name: "Rose Navy", colors: ["#0E1627", "#7F6269", "#F4E1E0", "#BDB8B9", "#E5C5C1"] },
  { name: "Ocean Mist", colors: ["#0D1B2A", "#1B4F72", "#A9CCE3", "#EBF5FB", "#2E86C1"] },
  { name: "Sage Ground", colors: ["#1A2417", "#3D5A3E", "#C8D5B9", "#FAF0CA", "#F0C808"] },
  { name: "Dusty Rose", colors: ["#2D1B1F", "#7B3F4A", "#D4A5A5", "#F2E0E0", "#C47C7C"] },
  { name: "Slate Modern", colors: ["#1A1A2E", "#16213E", "#0F3460", "#E94560", "#EAEAEA"] },
];

const sections = [
  "About",
  "Skills",
  "Experience",
  "Education",
  "Projects",
  "Achievements",
];

const fontOptions = ["Modern Sans", "Serif Editorial"];

const layoutOptions = [
  { name: "Minimal", gradient: "linear-gradient(135deg, #f5f0e8 0%, #c8b48a 100%)" },
  { name: "Bold", gradient: "linear-gradient(135deg, #000000 0%, #002222 100%)" },
  { name: "Creative", gradient: "linear-gradient(135deg, #0d0008 0%, #7a1e3f 100%)" },
  { name: "Corporate", gradient: "linear-gradient(135deg, #0a1828 0%, #2e5a8a 100%)" },
  { name: "Editorial", gradient: "linear-gradient(135deg, #070015 0%, #4a0e70 100%)" },
];

function MiniPortfolio({ gradient, name }: { gradient: string; name: string }) {
  return (
    <div
      style={{
        background: gradient,
        height: "100%",
        fontFamily: "'DM Sans', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "16px", fontWeight: 600, letterSpacing: "0.05em" }}>
        {name}
      </span>
    </div>
  );
}

export function PreviewDashboard() {
  const navigate = useNavigate();
  const [selectedPalette, setSelectedPalette] = useState(0);
  const [selectedLayout, setSelectedLayout] = useState(0);
  const [selectedTone, setSelectedTone] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);
  const [sectionVisibility, setSectionVisibility] = useState(
    Object.fromEntries(sections.map((s) => [s, true]))
  );
  const [deploying, setDeploying] = useState(false);
  const [deployError, setDeployError] = useState<string | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("resuflow_profile")) {
      navigate("/upload");
    }
  }, [navigate]);

  const templateMap: Record<string, string> = {
    "Minimal": "highendminimalist",
    "Editorial": "glassmorphism",
    "Bold": "glassmorphism",
    "Creative": "glassmorphism",
    "Corporate": "glassmorphism",
  };

  const handlePublish = async () => {
    setDeploying(true);
    setDeployError(null);
    try {
      const storedProfile = localStorage.getItem("resuflow_profile");
      if (!storedProfile) throw new Error("No profile found. Please upload your CV first.");
      const profile = JSON.parse(storedProfile);
      const rawName = profile?.personalInfo?.name || "user";
      const slug = rawName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const userId = `${slug}-${Math.random().toString(36).slice(2, 7)}`;
      const selectedLayoutName = layoutOptions[selectedLayout].name;
      const config = {
        template: templateMap[selectedLayoutName] || "glassmorphism",
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
          template: config.template,
          config,
          profile,
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

  const currentLayoutGradient = layoutOptions[selectedLayout].gradient;

  const toggleSection = (s: string) => {
    setSectionVisibility((prev) => ({ ...prev, [s]: !prev[s] }));
  };

  return (
    <div
      style={{ backgroundColor: "#0E1627", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}
    >
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb currentStep={3} />
        </div>

        {/* Split layout */}
        <div className="flex gap-5" style={{ height: "calc(100vh - 220px)", minHeight: "600px" }}>
          {/* ── LEFT PANEL: Live Preview ── */}
          <div style={{ flex: "0 0 65%", display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* Label */}
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
                Live Preview
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

            {/* Browser Chrome */}
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
                  resuflow.app/fatima-mazhar
                </div>
              </div>

              {/* Portfolio Content */}
              <div style={{ flex: 1, overflow: "hidden" }}>
                <MiniPortfolio gradient={currentLayoutGradient} name={layoutOptions[selectedLayout].name} />
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL: Customize ── */}
          <div
            style={{
              flex: "0 0 33%",
              backgroundColor: "#080f1a",
              borderRadius: "20px",
              padding: "0",
              border: "1px solid rgba(189,184,185,0.25)",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "0",
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
                  marginBottom: "6px",
                }}
              >
                Customize
              </h2>
              <p style={{ color: "#BDB8B9", fontSize: "13px", lineHeight: 1.5 }}>
                Fine-tune your portfolio appearance
              </p>
            </div>

            {/* Content Area */}
            <div style={{ padding: "24px", flex: 1 }}>
              {/* Template Selection */}
              <CustomSection title="Template" icon="📐">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                  {layoutOptions.map((opt, i) => (
                    <button
                      key={opt.name}
                      onClick={() => setSelectedLayout(i)}
                      style={{
                        backgroundColor:
                          selectedLayout === i ? "rgba(127,98,105,0.25)" : "rgba(244,225,224,0.04)",
                        border:
                          selectedLayout === i
                            ? "2px solid #7F6269"
                            : "1px solid rgba(189,184,185,0.2)",
                        borderRadius: "12px",
                        padding: "12px 8px",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.2s ease",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {/* Mini preview */}
                      <div
                        style={{
                          width: "100%",
                          height: "48px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          border: "1px solid rgba(189,184,185,0.15)",
                          background: opt.gradient,
                          opacity: selectedLayout === i ? 1 : 0.6,
                          transition: "opacity 0.2s ease",
                        }}
                      />
                      <div
                        style={{
                          color: selectedLayout === i ? "#F4E1E0" : "#BDB8B9",
                          fontSize: "11px",
                          fontWeight: selectedLayout === i ? 600 : 500,
                        }}
                      >
                        {opt.name}
                      </div>
                    </button>
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
                      <div
                        style={{
                          color: "#BDB8B9",
                          fontSize: "10px",
                          opacity: 0.5,
                        }}
                      >
                        {i === 0 ? "Clean & Modern" : "Classic & Elegant"}
                      </div>
                    </button>
                  ))}
                </div>
              </CustomSection>

              {/* About Tone */}
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
                <div style={{ backgroundColor: "rgba(220,53,69,0.1)", border: "1px solid rgba(220,53,69,0.3)", borderRadius: "8px", padding: "10px 14px", color: "#f87171", fontSize: "13px" }}>
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
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomSection({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            color: "#F4E1E0",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          {title}
        </span>
        <span
          style={{
            color: "#BDB8B9",
            fontSize: "16px",
          }}
        >
          {icon}
        </span>
      </div>
      {children}
    </div>
  );
}