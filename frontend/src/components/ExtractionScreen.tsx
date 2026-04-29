import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2, X, Plus } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { Navbar } from "./Navbar";

const toneOptions = ["Professional", "Friendly", "Creative"];

const inputStyle: React.CSSProperties = {
  backgroundColor: "rgba(189,184,185,0.08)",
  border: "1px solid rgba(189,184,185,0.2)",
  borderRadius: "8px",
  padding: "8px 12px",
  color: "#F4E1E0",
  fontSize: "13px",
  fontFamily: "'DM Sans', sans-serif",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

const sectionLabelStyle: React.CSSProperties = {
  color: "#BDB8B9",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  marginBottom: "12px",
};

const dividerStyle: React.CSSProperties = {
  height: "1px",
  backgroundColor: "rgba(189,184,185,0.15)",
  marginBottom: "24px",
};

export function ExtractionScreen() {
  const navigate = useNavigate();
  const [editedProfile, setEditedProfile] = useState<any>(null);
  const [selectedTone, setSelectedTone] = useState(0);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("resuflow_profile");
    if (!stored) { navigate("/upload"); return; }
    try {
      setEditedProfile(JSON.parse(stored));
    } catch {
      navigate("/upload");
    }
  }, [navigate]);

  if (!editedProfile) return null;

  // ── Derived preview values (left panel) ──
  const previewName = editedProfile?.personalInfo?.name || "Your Profile";
  const previewInitials = previewName
    .split(" ")
    .map((n: string) => n[0] || "")
    .slice(0, 2)
    .join("")
    .toUpperCase() || "YP";
  const previewTitle =
    editedProfile?.workExperience?.[0]?.role ||
    editedProfile?.personalInfo?.email ||
    "Professional";
  const previewSkills = [
    ...(editedProfile?.skills?.technical || []),
    ...(editedProfile?.skills?.domain || []),
    ...(editedProfile?.skills?.soft || []),
    ...(editedProfile?.skills?.tools || []),
  ].slice(0, 8);
  const previewExp = (editedProfile?.workExperience || []).slice(0, 3);
  const previewEdu = (editedProfile?.education || [])[0];
  const previewAch = (editedProfile?.achievements || []).slice(0, 2);

  // ── All skills flat list ──
  const getAllSkills = () => [
    ...(editedProfile?.skills?.technical || []),
    ...(editedProfile?.skills?.domain || []),
    ...(editedProfile?.skills?.soft || []),
    ...(editedProfile?.skills?.tools || []),
  ];

  // ── Update helpers ──
  const updatePersonalInfo = (field: string, value: string) =>
    setEditedProfile((prev: any) => ({
      ...prev,
      personalInfo: { ...(prev.personalInfo || {}), [field]: value },
    }));

  const removeSkill = (skill: string) =>
    setEditedProfile((prev: any) => ({
      ...prev,
      skills: {
        technical: (prev.skills?.technical || []).filter((s: string) => s !== skill),
        domain: (prev.skills?.domain || []).filter((s: string) => s !== skill),
        soft: (prev.skills?.soft || []).filter((s: string) => s !== skill),
        tools: (prev.skills?.tools || []).filter((s: string) => s !== skill),
      },
    }));

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    setEditedProfile((prev: any) => ({
      ...prev,
      skills: {
        ...(prev.skills || {}),
        technical: [...(prev.skills?.technical || []), trimmed],
      },
    }));
    setNewSkill("");
  };

  const updateExperience = (idx: number, field: string, value: string) =>
    setEditedProfile((prev: any) => {
      const exp = [...(prev.workExperience || [])];
      exp[idx] = { ...exp[idx], [field]: value };
      return { ...prev, workExperience: exp };
    });

  const removeExperience = (idx: number) =>
    setEditedProfile((prev: any) => ({
      ...prev,
      workExperience: (prev.workExperience || []).filter((_: any, i: number) => i !== idx),
    }));

  const addExperience = () =>
    setEditedProfile((prev: any) => ({
      ...prev,
      workExperience: [...(prev.workExperience || []), { role: "", company: "", startDate: "", endDate: "" }],
    }));

  const updateEducation = (idx: number, field: string, value: string) =>
    setEditedProfile((prev: any) => {
      const edu = [...(prev.education || [])];
      edu[idx] = { ...edu[idx], [field]: value };
      return { ...prev, education: edu };
    });

  const removeEducation = (idx: number) =>
    setEditedProfile((prev: any) => ({
      ...prev,
      education: (prev.education || []).filter((_: any, i: number) => i !== idx),
    }));

  const addEducation = () =>
    setEditedProfile((prev: any) => ({
      ...prev,
      education: [...(prev.education || []), { degree: "", field: "", institution: "", startDate: "", endDate: "" }],
    }));

  const updateAchievement = (idx: number, value: string) =>
    setEditedProfile((prev: any) => {
      const ach = [...(prev.achievements || [])];
      ach[idx] = typeof ach[idx] === "string" ? value : { ...ach[idx], title: value };
      return { ...prev, achievements: ach };
    });

  const removeAchievement = (idx: number) =>
    setEditedProfile((prev: any) => ({
      ...prev,
      achievements: (prev.achievements || []).filter((_: any, i: number) => i !== idx),
    }));

  const addAchievement = () =>
    setEditedProfile((prev: any) => ({
      ...prev,
      achievements: [...(prev.achievements || []), ""],
    }));

  const handleContinue = () => {
    localStorage.setItem("resuflow_profile", JSON.stringify(editedProfile));
    const existingVibe = localStorage.getItem("resuflow_vibe");
    const existingTemplate = existingVibe ? JSON.parse(existingVibe).template : "glassmorphism";
    localStorage.setItem("resuflow_vibe", JSON.stringify({
      template: existingTemplate,
      tone: toneOptions[selectedTone],
    }));
    navigate("/preview");
  };

  return (
    <div style={{ backgroundColor: "#0E1627", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <Breadcrumb currentStep={2} />
        </div>

        <div className="mb-10">
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "32px", color: "#F4E1E0", marginBottom: "8px" }}>
            Here's What We Found
          </h2>
          <p style={{ color: "#BDB8B9", fontSize: "15px" }}>
            Review and edit your extracted profile before continuing.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── LEFT: Live Preview Card ── */}
          <div style={{ width: "100%", maxWidth: "320px", flexShrink: 0, position: "sticky", top: "24px" }}>
            <div style={{ backgroundColor: "rgba(189,184,185,0.05)", borderRadius: "16px", padding: "28px", border: "1px solid rgba(189,184,185,0.2)" }}>

              <div style={{ color: "#BDB8B9", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "16px" }}>
                Preview
              </div>

              {/* Avatar + Name */}
              <div className="flex items-center gap-3 mb-5">
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#7F6269", display: "flex", alignItems: "center", justifyContent: "center", color: "#F4E1E0", fontSize: "17px", fontWeight: 700, flexShrink: 0 }}>
                  {previewInitials}
                </div>
                <div>
                  <div style={{ color: "#F4E1E0", fontSize: "16px", fontWeight: 700, lineHeight: 1.2 }}>{previewName}</div>
                  <div style={{ color: "#BDB8B9", fontSize: "12px", marginTop: "2px" }}>{previewTitle}</div>
                </div>
              </div>

              <div style={{ height: "1px", backgroundColor: "rgba(189,184,185,0.2)", marginBottom: "14px" }} />

              {previewSkills.length > 0 && (
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ ...sectionLabelStyle, marginBottom: "8px" }}>Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {previewSkills.map((s) => (
                      <span key={s} style={{ backgroundColor: "rgba(127,98,105,0.2)", color: "#F4E1E0", fontSize: "11px", padding: "2px 8px", borderRadius: "999px" }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ height: "1px", backgroundColor: "rgba(189,184,185,0.2)", marginTop: "14px" }} />
                </div>
              )}

              {previewExp.length > 0 && (
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ ...sectionLabelStyle, marginBottom: "8px" }}>Experience</div>
                  {previewExp.map((e: any, idx: number) => (
                    <div key={idx} style={{ marginBottom: "8px" }}>
                      <div style={{ color: "#F4E1E0", fontSize: "12px", fontWeight: 600 }}>{e.role || "—"}</div>
                      <div style={{ color: "#BDB8B9", fontSize: "11px" }}>
                        {e.company}{e.startDate ? ` · ${e.startDate}` : ""}{e.endDate ? ` – ${e.endDate}` : ""}
                      </div>
                    </div>
                  ))}
                  <div style={{ height: "1px", backgroundColor: "rgba(189,184,185,0.2)", marginTop: "10px" }} />
                </div>
              )}

              {previewEdu && (
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ ...sectionLabelStyle, marginBottom: "8px" }}>Education</div>
                  <div style={{ color: "#F4E1E0", fontSize: "12px", fontWeight: 600 }}>
                    {previewEdu.degree}{previewEdu.field ? ` in ${previewEdu.field}` : ""}
                  </div>
                  <div style={{ color: "#BDB8B9", fontSize: "11px" }}>
                    {previewEdu.institution}{previewEdu.startDate ? ` · ${previewEdu.startDate}` : ""}{previewEdu.endDate ? ` – ${previewEdu.endDate}` : ""}
                  </div>
                  {previewAch.length > 0 && <div style={{ height: "1px", backgroundColor: "rgba(189,184,185,0.2)", marginTop: "10px" }} />}
                </div>
              )}

              {previewAch.length > 0 && (
                <div>
                  <div style={{ ...sectionLabelStyle, marginBottom: "8px" }}>Achievements</div>
                  {previewAch.map((a: any, i: number) => (
                    <div key={i} className="flex items-start gap-2 mb-2">
                      <CheckCircle2 size={12} style={{ color: "#7F6269", marginTop: "2px", flexShrink: 0 }} />
                      <span style={{ color: "#BDB8B9", fontSize: "11px", lineHeight: 1.4 }}>
                        {a.title || a.description || String(a)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: Editable Form ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ backgroundColor: "rgba(189,184,185,0.05)", borderRadius: "16px", padding: "32px", border: "1px solid rgba(189,184,185,0.2)" }}>

              {/* Personal Info */}
              <div style={{ marginBottom: "28px" }}>
                <div style={sectionLabelStyle}>Personal Info</div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    style={inputStyle}
                    value={editedProfile?.personalInfo?.name || ""}
                    onChange={e => updatePersonalInfo("name", e.target.value)}
                    placeholder="Full Name"
                  />
                  <input
                    style={inputStyle}
                    value={editedProfile?.personalInfo?.email || ""}
                    onChange={e => updatePersonalInfo("email", e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    style={inputStyle}
                    value={editedProfile?.personalInfo?.phone || ""}
                    onChange={e => updatePersonalInfo("phone", e.target.value)}
                    placeholder="Phone"
                  />
                  <input
                    style={inputStyle}
                    value={editedProfile?.personalInfo?.location || ""}
                    onChange={e => updatePersonalInfo("location", e.target.value)}
                    placeholder="Location"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    style={inputStyle}
                    value={editedProfile?.personalInfo?.linkedin || ""}
                    onChange={e => updatePersonalInfo("linkedin", e.target.value)}
                    placeholder="LinkedIn URL"
                  />
                  <input
                    style={inputStyle}
                    value={editedProfile?.personalInfo?.website || ""}
                    onChange={e => updatePersonalInfo("website", e.target.value)}
                    placeholder="Website"
                  />
                </div>
              </div>

              <div style={dividerStyle} />

              {/* Skills */}
              <div style={{ marginBottom: "28px" }}>
                <div style={sectionLabelStyle}>Skills</div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {getAllSkills().map((s, i) => (
                    <span
                      key={i}
                      style={{ backgroundColor: "rgba(127,98,105,0.2)", color: "#F4E1E0", fontSize: "12px", padding: "4px 10px", borderRadius: "999px", display: "flex", alignItems: "center", gap: "6px" }}
                    >
                      {s}
                      <button
                        onClick={() => removeSkill(s)}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#BDB8B9", display: "flex", alignItems: "center" }}
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    style={{ ...inputStyle, flex: 1, width: "auto" }}
                    value={newSkill}
                    onChange={e => setNewSkill(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addSkill()}
                    placeholder="Add a skill…"
                  />
                  <button
                    onClick={addSkill}
                    style={{ backgroundColor: "rgba(127,98,105,0.3)", border: "1px solid rgba(127,98,105,0.4)", borderRadius: "8px", padding: "8px 16px", color: "#F4E1E0", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", gap: "4px", fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
              </div>

              <div style={dividerStyle} />

              {/* Experience */}
              <div style={{ marginBottom: "28px" }}>
                <div style={sectionLabelStyle}>Experience</div>
                {(editedProfile?.workExperience || []).map((exp: any, idx: number) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: "rgba(189,184,185,0.04)", borderRadius: "10px", padding: "16px", border: "1px solid rgba(189,184,185,0.1)", marginBottom: "10px", position: "relative" }}
                  >
                    <button
                      onClick={() => removeExperience(idx)}
                      style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", cursor: "pointer", color: "#BDB8B9", padding: 0 }}
                    >
                      <X size={14} />
                    </button>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input style={inputStyle} value={exp.role || ""} onChange={e => updateExperience(idx, "role", e.target.value)} placeholder="Role / Title" />
                      <input style={inputStyle} value={exp.company || ""} onChange={e => updateExperience(idx, "company", e.target.value)} placeholder="Company" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input style={inputStyle} value={exp.startDate || ""} onChange={e => updateExperience(idx, "startDate", e.target.value)} placeholder="Start Date" />
                      <input style={inputStyle} value={exp.endDate || ""} onChange={e => updateExperience(idx, "endDate", e.target.value)} placeholder="End Date / Present" />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addExperience}
                  style={{ backgroundColor: "transparent", border: "1.5px dashed rgba(189,184,185,0.3)", borderRadius: "10px", padding: "10px", color: "#BDB8B9", cursor: "pointer", fontSize: "13px", width: "100%", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                >
                  <Plus size={14} /> Add Experience
                </button>
              </div>

              <div style={dividerStyle} />

              {/* Education */}
              <div style={{ marginBottom: "28px" }}>
                <div style={sectionLabelStyle}>Education</div>
                {(editedProfile?.education || []).map((edu: any, idx: number) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: "rgba(189,184,185,0.04)", borderRadius: "10px", padding: "16px", border: "1px solid rgba(189,184,185,0.1)", marginBottom: "10px", position: "relative" }}
                  >
                    <button
                      onClick={() => removeEducation(idx)}
                      style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", cursor: "pointer", color: "#BDB8B9", padding: 0 }}
                    >
                      <X size={14} />
                    </button>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input style={inputStyle} value={edu.degree || ""} onChange={e => updateEducation(idx, "degree", e.target.value)} placeholder="Degree" />
                      <input style={inputStyle} value={edu.field || ""} onChange={e => updateEducation(idx, "field", e.target.value)} placeholder="Field of Study" />
                    </div>
                    <div className="mb-2">
                      <input style={inputStyle} value={edu.institution || ""} onChange={e => updateEducation(idx, "institution", e.target.value)} placeholder="Institution" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input style={inputStyle} value={edu.startDate || ""} onChange={e => updateEducation(idx, "startDate", e.target.value)} placeholder="Start Date" />
                      <input style={inputStyle} value={edu.endDate || ""} onChange={e => updateEducation(idx, "endDate", e.target.value)} placeholder="End Date" />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addEducation}
                  style={{ backgroundColor: "transparent", border: "1.5px dashed rgba(189,184,185,0.3)", borderRadius: "10px", padding: "10px", color: "#BDB8B9", cursor: "pointer", fontSize: "13px", width: "100%", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                >
                  <Plus size={14} /> Add Education
                </button>
              </div>

              <div style={dividerStyle} />

              {/* Achievements */}
              <div style={{ marginBottom: "28px" }}>
                <div style={sectionLabelStyle}>Achievements</div>
                {(editedProfile?.achievements || []).map((a: any, idx: number) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      style={{ ...inputStyle, flex: 1, width: "auto" }}
                      value={a.title || a.description || (typeof a === "string" ? a : "")}
                      onChange={e => updateAchievement(idx, e.target.value)}
                      placeholder="Achievement or award…"
                    />
                    <button
                      onClick={() => removeAchievement(idx)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#BDB8B9", padding: "0 4px", flexShrink: 0 }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addAchievement}
                  style={{ backgroundColor: "transparent", border: "1.5px dashed rgba(189,184,185,0.3)", borderRadius: "10px", padding: "10px", color: "#BDB8B9", cursor: "pointer", fontSize: "13px", width: "100%", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
                >
                  <Plus size={14} /> Add Achievement
                </button>
              </div>

              <div style={dividerStyle} />


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
