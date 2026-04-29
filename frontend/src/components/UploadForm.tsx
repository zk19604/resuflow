import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  UploadCloud,
  Globe,
  Lock,
  ChevronDown,
  ChevronUp,
  User,
  Quote,
  Zap,
  Briefcase,
  GraduationCap,
  FolderOpen,
  Sparkles,
  Camera,
  ArrowRight,
  X,
  Brain,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { Breadcrumb } from "./Breadcrumb";

type TabType = "upload" | "manual";

/* ─── UPLOAD TAB ─── */
function UploadTab({ onSuccess }: { onSuccess: (profile: any) => void }) {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "pdf" && ext !== "docx") {
      setError("Only PDF and DOCX files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be under 5MB");
      return;
    }
    setSelectedFile(file);
    setError(null);
  };

  const handleExtract = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("cv", selectedFile);
    try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cv/upload`, {
  method: "POST",
  body: formData,
});
      const data = await response.json();
      if (!data.profile) {
        throw new Error(data.message || "No profile returned from extraction");
      }
      onSuccess(data.profile);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
      />
      {/* Main Upload Card */}
      <div
        style={{
          backgroundColor: "rgba(189,184,185,0.05)",
          borderRadius: "24px",
          padding: "40px 48px",
          width: "100%",
          maxWidth: "640px",
          border: "1px solid rgba(189,184,185,0.3)",
          marginBottom: "24px",
        }}
      >
        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleFileSelect(file);
          }}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed rgba(189,184,185,${dragging ? "0.8" : "0.4"})`,
            borderRadius: "16px",
            backgroundColor: dragging ? "rgba(244,225,224,0.06)" : "rgba(244,225,224,0.03)",
            padding: "40px 24px",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s ease",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            <UploadCloud size={52} style={{ color: selectedFile ? "#4ade80" : "#7F6269" }} strokeWidth={1.5} />
          </div>
          {selectedFile ? (
            <>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", color: "#F4E1E0", marginBottom: "4px" }}>
                {selectedFile.name}
              </h3>
              <p style={{ color: "#BDB8B9", fontSize: "12px" }}>
                {(selectedFile.size / 1024).toFixed(0)} KB · Click to change file
              </p>
            </>
          ) : (
            <>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#F4E1E0", marginBottom: "8px" }}>
                Drop your CV here
              </h3>
              <p style={{ color: "#BDB8B9", fontSize: "13px", marginBottom: "20px" }}>
                PDF or DOCX · Max 5MB
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
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
                }}
                className="hover:opacity-80 transition-opacity"
              >
                Browse Files
              </button>
            </>
          )}
        </div>

        {/* OR divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(189,184,185,0.25)" }} />
          <span style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            or paste your LinkedIn URL
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(189,184,185,0.25)" }} />
        </div>

        {/* LinkedIn input */}
        <div style={{ position: "relative", marginBottom: "16px" }}>
          <Globe size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#BDB8B9" }} />
          <input
            type="url"
            placeholder="https://linkedin.com/in/your-profile"
            style={{
              width: "100%",
              backgroundColor: "rgba(244,225,224,0.08)",
              border: "1px solid #BDB8B9",
              borderRadius: "8px",
              padding: "12px 14px 12px 38px",
              color: "#F4E1E0",
              fontSize: "14px",
              fontFamily: "'DM Sans', sans-serif",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Privacy note */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Lock size={12} style={{ color: "#7F6269", flexShrink: 0 }} />
          <span style={{ color: "#BDB8B9", fontSize: "12px" }}>
            Your data is encrypted and never sold.
          </span>
        </div>
      </div>

      {/* What happens next */}
      <div style={{ width: "100%", maxWidth: "640px", display: "flex", alignItems: "stretch", gap: "0", marginBottom: "16px" }}>
        {[
          { icon: <Brain size={18} />, text: "AI reads your CV" },
          { icon: <Zap size={18} />, text: "Fills the form automatically" },
          { icon: <User size={18} />, text: "You review and confirm" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ flex: 1, backgroundColor: "rgba(189,184,185,0.05)", borderRadius: "12px", padding: "16px", border: "1px solid rgba(189,184,185,0.2)", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "#7F6269", flexShrink: 0 }}>{item.icon}</span>
              <span style={{ color: "#BDB8B9", fontSize: "13px", lineHeight: 1.4 }}>{item.text}</span>
            </div>
            {i < 2 && <ArrowRight size={14} style={{ color: "#BDB8B9", opacity: 0.5, flexShrink: 0, margin: "0 4px" }} />}
          </div>
        ))}
      </div>

      {/* Error message */}
      {error && (
        <div style={{ width: "100%", maxWidth: "640px", backgroundColor: "rgba(220,53,69,0.1)", border: "1px solid rgba(220,53,69,0.3)", borderRadius: "8px", padding: "12px 16px", color: "#f87171", fontSize: "14px", marginBottom: "12px" }}>
          {error}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={handleExtract}
        disabled={loading}
        style={{
          backgroundColor: loading ? "rgba(127,98,105,0.6)" : "#7F6269",
          color: "#F4E1E0",
          fontSize: "15px",
          fontWeight: 600,
          padding: "0",
          height: "52px",
          borderRadius: "999px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          width: "100%",
          maxWidth: "640px",
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: "inset 0 1px 0 rgba(244,225,224,0.12), 0 4px 20px rgba(127,98,105,0.35)",
        }}
        className="hover:opacity-90 transition-opacity"
      >
        {loading ? "Extracting your CV..." : "Extract & Continue →"}
      </button>
    </div>
  );
}

/* ─── FORM INPUT HELPERS ─── */
function FormInput({
  label,
  placeholder,
  type = "text",
  fullSpan = false,
  name,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  fullSpan?: boolean;
  name?: string;
}) {
  return (
    <div style={{ gridColumn: fullSpan ? "1 / -1" : "auto" }}>
      <label
        style={{
          display: "block",
          color: "#BDB8B9",
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.04em",
          marginBottom: "6px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        style={{
          width: "100%",
          backgroundColor: "rgba(244,225,224,0.08)",
          border: "1px solid #BDB8B9",
          borderRadius: "8px",
          padding: "11px 14px",
          color: "#F4E1E0",
          fontSize: "14px",
          fontFamily: "'DM Sans', sans-serif",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function FormTextarea({
  label,
  placeholder,
  height = 100,
  charCount,
  fullSpan = true,
  name,
}: {
  label?: string;
  placeholder?: string;
  height?: number;
  charCount?: string;
  fullSpan?: boolean;
  name?: string;
}) {
  return (
    <div style={{ gridColumn: fullSpan ? "1 / -1" : "auto", position: "relative" }}>
      {label && (
        <label
          style={{
            display: "block",
            color: "#BDB8B9",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.04em",
            marginBottom: "6px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        name={name}
        style={{
          width: "100%",
          backgroundColor: "rgba(244,225,224,0.08)",
          border: "1px solid #BDB8B9",
          borderRadius: "8px",
          padding: "11px 14px",
          color: "#F4E1E0",
          fontSize: "14px",
          fontFamily: "'DM Sans', sans-serif",
          outline: "none",
          resize: "none",
          height: height,
          boxSizing: "border-box",
        }}
      />
      {charCount && (
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            right: "12px",
            color: "#BDB8B9",
            fontSize: "11px",
          }}
        >
          {charCount}
        </div>
      )}
    </div>
  );
}

function FormSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          color: "#BDB8B9",
          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.04em",
          marginBottom: "6px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <select
          style={{
            width: "100%",
            backgroundColor: "rgba(244,225,224,0.08)",
            border: "1px solid #BDB8B9",
            borderRadius: "8px",
            padding: "11px 36px 11px 14px",
            color: "#F4E1E0",
            fontSize: "14px",
            fontFamily: "'DM Sans', sans-serif",
            outline: "none",
            appearance: "none",
            cursor: "pointer",
          }}
        >
          {options.map((o) => (
            <option key={o} value={o} style={{ backgroundColor: "#0E1627", color: "#F4E1E0" }}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#BDB8B9",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

/* ─── SECTION WRAPPER ─── */
function FormSection({
  title,
  icon,
  children,
  defaultOpen = true,
  subtitle,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  defaultOpen?: boolean;
  subtitle?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div style={{ marginBottom: "4px" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "16px 0",
          borderBottom: "1px solid rgba(189,184,185,0.2)",
          marginBottom: open ? "20px" : "0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#7F6269" }}>{icon}</span>
          <span
            style={{
              color: "#F4E1E0",
              fontSize: "16px",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {title}
          </span>
        </div>
        {open ? (
          <ChevronUp size={16} style={{ color: "#BDB8B9" }} />
        ) : (
          <ChevronDown size={16} style={{ color: "#BDB8B9" }} />
        )}
      </button>
      {subtitle && open && (
        <p
          style={{
            color: "#BDB8B9",
            fontSize: "13px",
            fontStyle: "italic",
            marginBottom: "16px",
            marginTop: "-12px",
          }}
        >
          {subtitle}
        </p>
      )}
      {open && children}
    </div>
  );
}

/* ─── TYPES ─── */
type Experience = {
  jobTitle: string; company: string; startDate: string; endDate: string;
  workLocation: string; responsibilities: string; achievements: string; currentlyHere: boolean;
};
type Education = {
  degree: string; field: string; institution: string;
  startDate: string; endDate: string; grade: string;
};
type Project = { name: string; description: string; link: string; tools: string };

const emptyExp = (): Experience => ({
  jobTitle: "", company: "", startDate: "", endDate: "",
  workLocation: "", responsibilities: "", achievements: "", currentlyHere: false,
});
const emptyEdu = (): Education => ({
  degree: "", field: "", institution: "", startDate: "", endDate: "", grade: "",
});
const emptyProject = (): Project => ({ name: "", description: "", link: "", tools: "" });

/* ─── MANUAL FORM TAB ─── */
function ManualFormTab({ onContinue }: { onContinue: (profile: any) => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [activeTone, setActiveTone] = useState(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([emptyExp()]);
  const [educations, setEducations] = useState<Education[]>([emptyEdu()]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [checkedIndustries, setCheckedIndustries] = useState<string[]>(["Technology", "Design"]);
  const [checkedOpportunities, setCheckedOpportunities] = useState<string[]>(["Full-time", "Remote Only"]);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [sectionToggles, setSectionToggles] = useState({
    Education: false, Hobbies: true, References: true, Photo: false, "Contact Info": false,
  });
  const [wantsTestimonial, setWantsTestimonial] = useState<boolean | null>(true);
  const [savedDraft, setSavedDraft] = useState(false);

  const tones = ["professional", "friendly", "creative"] as const;

  /* ── Experience helpers ── */
  const updateExp = (idx: number, field: keyof Experience, val: any) =>
    setExperiences((prev) => prev.map((e, i) => i === idx ? { ...e, [field]: val } : e));
  const addExp = () => setExperiences((prev) => [...prev, emptyExp()]);
  const removeExp = (idx: number) =>
    setExperiences((prev) => prev.length > 1 ? prev.filter((_, i) => i !== idx) : [emptyExp()]);

  /* ── Education helpers ── */
  const updateEdu = (idx: number, field: keyof Education, val: string) =>
    setEducations((prev) => prev.map((e, i) => i === idx ? { ...e, [field]: val } : e));
  const addEdu = () => setEducations((prev) => [...prev, emptyEdu()]);
  const removeEdu = (idx: number) =>
    setEducations((prev) => prev.length > 1 ? prev.filter((_, i) => i !== idx) : [emptyEdu()]);

  /* ── Project helpers ── */
  const updateProject = (idx: number, field: keyof Project, val: string) =>
    setProjects((prev) => prev.map((p, i) => i === idx ? { ...p, [field]: val } : p));
  const addProject = () => setProjects((prev) => [...prev, emptyProject()]);
  const removeProject = (idx: number) =>
    setProjects((prev) => prev.filter((_, i) => i !== idx));

  /* ── Photo ── */
  const handlePhotoSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  /* ── Build profile ── */
  const buildProfile = () => {
    const fd = formRef.current ? new FormData(formRef.current) : new FormData();
    const g = (k: string) => (fd.get(k) as string) || "";
    return {
      personalInfo: {
        name: g("name"), title: g("title"), email: g("email"), phone: g("phone"),
        location: [g("city"), g("country")].filter(Boolean).join(", "),
        website: g("website"), linkedin: g("linkedin"),
        summary: aboutText,
        photo: photoPreview || undefined,
      },
      summary: aboutText,
      skills: { technical: skills, domain: [], soft: [], tools: [] },
      workExperience: experiences
        .filter((e) => e.jobTitle || e.company)
        .map((e) => ({
          role: e.jobTitle, company: e.company,
          startDate: e.startDate,
          endDate: e.currentlyHere ? "Present" : e.endDate,
          location: e.workLocation,
          description: e.responsibilities,
          achievements: e.achievements ? [e.achievements] : [],
        })),
      education: educations
        .filter((e) => e.institution || e.degree)
        .map((e) => ({
          degree: e.degree, field: e.field, institution: e.institution,
          startDate: e.startDate, endDate: e.endDate, grade: e.grade,
        })),
      projects: projects
        .filter((p) => p.name)
        .map((p) => ({
          name: p.name, description: p.description, link: p.link,
          tools: p.tools.split(",").map((t) => t.trim()).filter(Boolean),
        })),
      achievements: [],
      tone: tones[activeTone],
      industries: checkedIndustries,
      opportunities: checkedOpportunities,
    };
  };

  const handleContinue = () => onContinue(buildProfile());

  const saveDraft = () => {
    try {
      localStorage.setItem("resuflow_draft", JSON.stringify(buildProfile()));
      setSavedDraft(true);
      setTimeout(() => setSavedDraft(false), 2000);
    } catch {
      // ignore
    }
  };

  /* ── Progress ── */
  const fd = formRef.current ? new FormData(formRef.current) : null;
  const completedSections = [
    !!fd?.get("name"),
    aboutText.length > 0,
    skills.length > 0,
    experiences.some((e) => e.jobTitle || e.company),
    educations.some((e) => e.institution),
    projects.length > 0,
    photoPreview !== null,
  ].filter(Boolean).length;
  const totalSections = 7;

  const industries = [
    "Technology", "Finance", "Healthcare", "Education", "Marketing",
    "Design", "Consulting", "Legal", "NGO / Non-profit", "Other",
  ];
  const opportunities = ["Full-time", "Part-time", "Freelance", "Contract", "Remote Only", "Open to Relocation"];
  const professionalStyles = [
    { label: "The Strategist 🧠", desc: "Data-driven, analytical, and always thinking three steps ahead." },
    { label: "The Creator 🎨", desc: "Visionary storyteller who brings ideas to life through craft." },
    { label: "The Executor ⚡", desc: "Gets things done. Reliable, precise, and relentlessly effective." },
    { label: "The Connector 🤝", desc: "Builds bridges between people, ideas, and opportunities." },
  ];

  const removeSkill = (s: string) => setSkills(skills.filter((sk) => sk !== s));
  const addSkill = (s: string) => {
    if (s.trim() && !skills.includes(s.trim())) setSkills([...skills, s.trim()]);
    setSkillInput("");
  };

  const toggleIndustry = (v: string) =>
    setCheckedIndustries((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);
  const toggleOpportunity = (v: string) =>
    setCheckedOpportunities((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);
  const toggleSectionVisibility = (key: string) =>
    setSectionToggles((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <form ref={formRef} onSubmit={(e) => e.preventDefault()} style={{ width: "100%" }}>
      <div
        style={{
          backgroundColor: "rgba(189,184,185,0.05)",
          borderRadius: "24px",
          padding: "40px 48px",
          width: "100%",
          maxWidth: "760px",
          border: "1px solid rgba(189,184,185,0.3)",
          marginBottom: "0px",
        }}
      >
        {/* ── Section 1: Personal Info ── */}
        <FormSection title="Personal Information" icon={<User size={18} />}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              marginBottom: "20px",
            }}
          >
            {/* Profile photo */}
            <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "flex-start", gap: "20px" }}>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhotoSelect(f); }}
              />
              <div
                onClick={() => photoInputRef.current?.click()}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "12px",
                  border: photoPreview ? "2px solid #7F6269" : "2px dashed rgba(189,184,185,0.5)",
                  backgroundColor: "rgba(244,225,224,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  cursor: "pointer",
                  flexShrink: 0,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <>
                    <Camera size={20} style={{ color: "#7F6269" }} />
                    <span style={{ color: "#BDB8B9", fontSize: "11px" }}>Upload Photo</span>
                  </>
                )}
              </div>
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <FormInput label="Full Name" placeholder="Fatima Mazhar" fullSpan={true} name="name" />
              </div>
            </div>

            <FormInput label="Professional Title / Role" placeholder="Senior UX Strategist" name="title" />
            <FormInput label="Email Address" type="email" placeholder="fatima@example.com" name="email" />
            <div>
              <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>
                Phone Number
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ position: "relative", width: "80px", flexShrink: 0 }}>
                  <select style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 8px", color: "#F4E1E0", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", outline: "none", appearance: "none" }}>
                    <option style={{ backgroundColor: "#0E1627" }}>+44</option>
                    <option style={{ backgroundColor: "#0E1627" }}>+1</option>
                    <option style={{ backgroundColor: "#0E1627" }}>+92</option>
                  </select>
                  <ChevronDown size={10} style={{ position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)", color: "#BDB8B9", pointerEvents: "none" }} />
                </div>
                <input name="phone" placeholder="7700 900 000" style={{ flex: 1, backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
              </div>
            </div>
            <FormInput label="City" placeholder="London" name="city" />
            <FormInput label="Country" placeholder="United Kingdom" name="country" />
            <FormInput label="Personal Website or Portfolio URL" placeholder="https://yoursite.com" fullSpan={true} name="website" />
            <FormInput label="LinkedIn URL" placeholder="https://linkedin.com/in/..." name="linkedin" />
            <FormInput label="Relevant Profile Link" placeholder="Dribbble / Behance / GitHub" name="profileLink" />
          </div>
        </FormSection>

        {/* ── Section 2: About Me ── */}
        <FormSection title="About Me" icon={<Quote size={18} />}>
          <div style={{ display: "grid", gap: "14px" }}>
            <div style={{ position: "relative" }}>
              <textarea
                placeholder="Write a short professional summary about yourself... (2-4 sentences recommended)"
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value.slice(0, 400))}
                maxLength={400}
                style={{
                  width: "100%",
                  backgroundColor: "rgba(244,225,224,0.08)",
                  border: "1px solid #BDB8B9",
                  borderRadius: "8px",
                  padding: "11px 14px",
                  color: "#F4E1E0",
                  fontSize: "14px",
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                  resize: "none",
                  height: 120,
                  boxSizing: "border-box",
                }}
              />
              <div style={{ position: "absolute", bottom: "8px", right: "12px", color: aboutText.length >= 380 ? "#f87171" : "#BDB8B9", fontSize: "11px" }}>
                {aboutText.length} / 400
              </div>
            </div>
            <div>
              <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, letterSpacing: "0.04em", marginBottom: "8px", fontFamily: "'DM Sans', sans-serif" }}>
                Tone Preference
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                {["Professional", "Friendly", "Creative"].map((tone, i) => (
                  <button
                    key={tone}
                    onClick={() => setActiveTone(i)}
                    style={{
                      backgroundColor: activeTone === i ? "#7F6269" : "transparent",
                      color: "#F4E1E0",
                      fontSize: "13px",
                      fontWeight: activeTone === i ? 600 : 400,
                      padding: "7px 18px",
                      borderRadius: "999px",
                      border: activeTone === i ? "none" : "1px solid rgba(189,184,185,0.4)",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FormSection>

        {/* ── Section 3: Skills ── */}
        <FormSection title="Skills & Expertise" icon={<Zap size={18} />}>
          <div style={{ marginBottom: "20px" }}>
            {/* Tag input */}
            <div
              style={{
                backgroundColor: "rgba(244,225,224,0.08)",
                border: "1px solid #BDB8B9",
                borderRadius: "8px",
                padding: "8px 12px",
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                alignItems: "center",
                marginBottom: "12px",
                minHeight: "46px",
              }}
            >
              {skills.map((s) => (
                <div
                  key={s}
                  style={{
                    backgroundColor: "rgba(127,98,105,0.2)",
                    color: "#F4E1E0",
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: "4px 10px 4px 10px",
                    borderRadius: "999px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  {s}
                  <button onClick={() => removeSkill(s)} style={{ background: "none", border: "none", cursor: "pointer", color: "#BDB8B9", display: "flex", alignItems: "center", padding: 0 }}>
                    <X size={10} />
                  </button>
                </div>
              ))}
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill(skillInput)}
                placeholder="Type a skill and press Enter"
                style={{
                  flex: 1,
                  minWidth: "150px",
                  background: "none",
                  border: "none",
                  color: "#F4E1E0",
                  fontSize: "14px",
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                }}
              />
            </div>
            {/* Suggested pills */}
            <div>
              <span style={{ color: "#BDB8B9", fontSize: "12px", marginRight: "8px" }}>Suggested:</span>
              {["Project Management", "Data Analysis", "Communication", "Excel", "Leadership"].map((s) => (
                <button
                  key={s}
                  onClick={() => addSkill(s)}
                  style={{
                    backgroundColor: "transparent",
                    color: "#BDB8B9",
                    fontSize: "12px",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    border: "1px solid #BDB8B9",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    marginRight: "6px",
                    marginBottom: "6px",
                  }}
                >
                  + {s}
                </button>
              ))}
            </div>
            {/* Skill level example */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "10px",
                padding: "10px 14px",
                backgroundColor: "rgba(244,225,224,0.04)",
                borderRadius: "8px",
                border: "1px solid rgba(189,184,185,0.15)",
              }}
            >
              <span style={{ color: "#F4E1E0", fontSize: "13px", fontWeight: 500 }}>Excel</span>
              <div style={{ display: "flex", gap: "4px" }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: i <= 3 ? "#7F6269" : "rgba(189,184,185,0.2)" }} />
                ))}
              </div>
              <span style={{ color: "#BDB8B9", fontSize: "11px" }}>Intermediate</span>
            </div>
          </div>
        </FormSection>

        {/* ── Section 4: Work Experience ── */}
        <FormSection title="Work Experience" icon={<Briefcase size={18} />}>
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "rgba(14,22,39,0.8)",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid rgba(189,184,185,0.2)",
                marginBottom: "12px",
              }}
            >
              {experiences.length > 1 && (
                <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Experience {idx + 1}
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <div>
                  <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Job Title</label>
                  <input value={exp.jobTitle} onChange={(e) => updateExp(idx, "jobTitle", e.target.value)} placeholder="Senior UX Strategist" style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Company Name</label>
                  <input value={exp.company} onChange={(e) => updateExp(idx, "company", e.target.value)} placeholder="Horizon Digital" style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: "12px", marginBottom: "12px", alignItems: "end" }}>
                <div>
                  <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Start Date</label>
                  <input value={exp.startDate} onChange={(e) => updateExp(idx, "startDate", e.target.value)} placeholder="Jan 2021" style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>End Date</label>
                  <input value={exp.currentlyHere ? "Present" : exp.endDate} onChange={(e) => updateExp(idx, "endDate", e.target.value)} placeholder="Present" disabled={exp.currentlyHere} style={{ width: "100%", backgroundColor: exp.currentlyHere ? "rgba(244,225,224,0.03)" : "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ paddingBottom: "2px", display: "flex", alignItems: "center", gap: "7px", cursor: "pointer" }} onClick={() => updateExp(idx, "currentlyHere", !exp.currentlyHere)}>
                  <div style={{ width: "16px", height: "16px", borderRadius: "4px", border: "1.5px solid #BDB8B9", backgroundColor: exp.currentlyHere ? "#7F6269" : "rgba(127,98,105,0.2)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {exp.currentlyHere && <div style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: "#F4E1E0" }} />}
                  </div>
                  <span style={{ color: "#BDB8B9", fontSize: "12px", whiteSpace: "nowrap" }}>Currently here</span>
                </div>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Location</label>
                <input value={exp.workLocation} onChange={(e) => updateExp(idx, "workLocation", e.target.value)} placeholder="London, UK" style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Key Responsibilities</label>
                <textarea value={exp.responsibilities} onChange={(e) => updateExp(idx, "responsibilities", e.target.value)} placeholder="Describe your main responsibilities and impact..." style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "none", height: 90, boxSizing: "border-box" }} />
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Achievements</label>
                <textarea value={exp.achievements} onChange={(e) => updateExp(idx, "achievements", e.target.value)} placeholder="List 2-3 measurable achievements (e.g. Increased sales by 30%)" style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "none", height: 80, boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button onClick={() => removeExp(idx)} style={{ background: "none", border: "none", color: "rgba(212,60,60,0.7)", fontSize: "13px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                  Remove Entry
                </button>
                {idx === experiences.length - 1 && (
                  <button onClick={addExp} style={{ background: "none", border: "none", color: "#BDB8B9", fontSize: "13px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                    + Add Another Experience
                  </button>
                )}
              </div>
            </div>
          ))}
        </FormSection>

        {/* ── Section 5: Education ── */}
        <FormSection title="Education" icon={<GraduationCap size={18} />} defaultOpen={false}>
          {educations.map((edu, idx) => (
            <div key={idx} style={{ backgroundColor: "rgba(14,22,39,0.8)", borderRadius: "12px", padding: "20px", border: "1px solid rgba(189,184,185,0.2)", marginBottom: "12px" }}>
              {educations.length > 1 && (
                <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>Education {idx + 1}</div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <div>
                  <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Degree</label>
                  <input value={edu.degree} onChange={(e) => updateEdu(idx, "degree", e.target.value)} placeholder="BSc / MSc / PhD" style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Field of Study</label>
                  <input value={edu.field} onChange={(e) => updateEdu(idx, "field", e.target.value)} placeholder="Computer Science" style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Institution</label>
                <input value={edu.institution} onChange={(e) => updateEdu(idx, "institution", e.target.value)} placeholder="University of Manchester" style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Start Year</label>
                  <input value={edu.startDate} onChange={(e) => updateEdu(idx, "startDate", e.target.value)} placeholder="2018" style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>End Year</label>
                  <input value={edu.endDate} onChange={(e) => updateEdu(idx, "endDate", e.target.value)} placeholder="2021" style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Grade / GPA</label>
                  <input value={edu.grade} onChange={(e) => updateEdu(idx, "grade", e.target.value)} placeholder="First Class / 3.8" style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button onClick={() => removeEdu(idx)} style={{ background: "none", border: "none", color: "rgba(212,60,60,0.7)", fontSize: "13px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Remove Entry</button>
                {idx === educations.length - 1 && (
                  <button onClick={addEdu} style={{ background: "none", border: "none", color: "#BDB8B9", fontSize: "13px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>+ Add Another Education</button>
                )}
              </div>
            </div>
          ))}
        </FormSection>

        {/* ── Section 6: Projects ── */}
        <FormSection title="Projects & Portfolio" icon={<FolderOpen size={18} />} defaultOpen={false}>
          {projects.length === 0 && (
            <p style={{ color: "#BDB8B9", fontSize: "13px", marginBottom: "12px" }}>No projects added yet.</p>
          )}
          {projects.map((proj, idx) => (
            <div key={idx} style={{ backgroundColor: "rgba(14,22,39,0.8)", borderRadius: "12px", padding: "20px", border: "1px solid rgba(189,184,185,0.2)", marginBottom: "12px" }}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Project Name</label>
                <input value={proj.name} onChange={(e) => updateProject(idx, "name", e.target.value)} placeholder="ResuFlow Portfolio Builder" style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Description</label>
                <textarea value={proj.description} onChange={(e) => updateProject(idx, "description", e.target.value)} placeholder="What did you build and what impact did it have?" style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "none", height: 80, boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Project URL</label>
                  <input value={proj.link} onChange={(e) => updateProject(idx, "link", e.target.value)} placeholder="https://github.com/..." style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "6px", fontFamily: "'DM Sans', sans-serif" }}>Tools Used (comma separated)</label>
                  <input value={proj.tools} onChange={(e) => updateProject(idx, "tools", e.target.value)} placeholder="React, Node.js, MongoDB" style={{ width: "100%", backgroundColor: "rgba(244,225,224,0.08)", border: "1px solid #BDB8B9", borderRadius: "8px", padding: "11px 14px", color: "#F4E1E0", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <button onClick={() => removeProject(idx)} style={{ background: "none", border: "none", color: "rgba(212,60,60,0.7)", fontSize: "13px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Remove Project</button>
              </div>
            </div>
          ))}
          <button onClick={addProject} style={{ background: "none", border: "1px dashed rgba(189,184,185,0.4)", color: "#BDB8B9", fontSize: "13px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", width: "100%", padding: "12px", borderRadius: "8px" }}>+ Add a Project</button>
        </FormSection>

        {/* ── Section 7: Additional Questions ── */}
        <FormSection
          title="A Few More Things..."
          icon={<Sparkles size={18} />}
          subtitle="These help us personalize your portfolio's story."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {/* Q1 */}
            <div>
              <label style={{ display: "block", color: "#F4E1E0", fontSize: "14px", fontWeight: 500, marginBottom: "8px", fontFamily: "'DM Sans', sans-serif" }}>
                What is the ONE thing you want recruiters to immediately know about you?
              </label>
              <input
                placeholder="E.g. I turn complex user problems into elegant, measurable solutions."
                style={{
                  width: "100%",
                  backgroundColor: "rgba(244,225,224,0.08)",
                  border: "1px solid #BDB8B9",
                  borderRadius: "8px",
                  padding: "11px 14px",
                  color: "#F4E1E0",
                  fontSize: "14px",
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Q2 */}
            <div>
              <label style={{ display: "block", color: "#F4E1E0", fontSize: "14px", fontWeight: 500, marginBottom: "10px", fontFamily: "'DM Sans', sans-serif" }}>
                Which industries are you targeting?
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {industries.map((ind) => {
                  const active = checkedIndustries.includes(ind);
                  return (
                    <button
                      key={ind}
                      onClick={() => toggleIndustry(ind)}
                      style={{
                        backgroundColor: active ? "#7F6269" : "transparent",
                        color: active ? "#F4E1E0" : "#BDB8B9",
                        fontSize: "13px",
                        fontWeight: active ? 600 : 400,
                        padding: "7px 16px",
                        borderRadius: "999px",
                        border: active ? "none" : "1px solid rgba(189,184,185,0.5)",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {ind}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Q3 */}
            <div>
              <label style={{ display: "block", color: "#F4E1E0", fontSize: "14px", fontWeight: 500, marginBottom: "10px", fontFamily: "'DM Sans', sans-serif" }}>
                What type of opportunities are you open to?
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {opportunities.map((opp) => {
                  const active = checkedOpportunities.includes(opp);
                  return (
                    <button
                      key={opp}
                      onClick={() => toggleOpportunity(opp)}
                      style={{
                        backgroundColor: active ? "#7F6269" : "transparent",
                        color: active ? "#F4E1E0" : "#BDB8B9",
                        fontSize: "13px",
                        fontWeight: active ? 600 : 400,
                        padding: "7px 16px",
                        borderRadius: "999px",
                        border: active ? "none" : "1px solid rgba(189,184,185,0.5)",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {opp}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Q4 */}
            <div>
              <label style={{ display: "block", color: "#F4E1E0", fontSize: "14px", fontWeight: 500, marginBottom: "10px", fontFamily: "'DM Sans', sans-serif" }}>
                How would you describe your professional style?
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {professionalStyles.map((s, i) => (
                  <div
                    key={s.label}
                    onClick={() => setSelectedStyle(i)}
                    style={{
                      backgroundColor: selectedStyle === i ? "rgba(127,98,105,0.1)" : "rgba(14,22,39,0.8)",
                      borderRadius: "12px",
                      padding: "16px",
                      border: selectedStyle === i ? "2px solid #7F6269" : "1px solid rgba(189,184,185,0.2)",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ color: "#F4E1E0", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>
                      {s.label}
                    </div>
                    <div style={{ color: "#BDB8B9", fontSize: "12px", lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Q5 */}
            <div>
              <label style={{ display: "block", color: "#F4E1E0", fontSize: "14px", fontWeight: 500, marginBottom: "8px", fontFamily: "'DM Sans', sans-serif" }}>
                What makes you different from others in your field?
              </label>
              <FormTextarea
                placeholder="Be honest and specific — this becomes your portfolio's unique value statement."
                height={80}
              />
            </div>

            {/* Q6 */}
            <div>
              <label style={{ display: "block", color: "#F4E1E0", fontSize: "14px", fontWeight: 500, marginBottom: "12px", fontFamily: "'DM Sans', sans-serif" }}>
                Are there any sections you do NOT want shown on your portfolio?
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {Object.entries(sectionToggles).map(([key, val]) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ color: "#BDB8B9", fontSize: "14px" }}>{key}</span>
                    <button
                      onClick={() => toggleSectionVisibility(key)}
                      style={{
                        width: "40px",
                        height: "22px",
                        borderRadius: "999px",
                        backgroundColor: val ? "#7F6269" : "#BDB8B9",
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
                          left: val ? "21px" : "3px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          backgroundColor: "#F4E1E0",
                          transition: "left 0.2s ease",
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Q7 */}
            <div>
              <label style={{ display: "block", color: "#F4E1E0", fontSize: "14px", fontWeight: 500, marginBottom: "10px", fontFamily: "'DM Sans', sans-serif" }}>
                Would you like a testimonials section?
              </label>
              <div style={{ display: "flex", gap: "10px", marginBottom: wantsTestimonial ? "14px" : "0" }}>
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    onClick={() => setWantsTestimonial(v)}
                    style={{
                      backgroundColor: wantsTestimonial === v ? "#7F6269" : "transparent",
                      color: wantsTestimonial === v ? "#F4E1E0" : "#BDB8B9",
                      fontSize: "13px",
                      fontWeight: wantsTestimonial === v ? 600 : 400,
                      padding: "8px 24px",
                      borderRadius: "999px",
                      border: wantsTestimonial === v ? "none" : "1px solid rgba(189,184,185,0.4)",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {v ? "Yes" : "No"}
                  </button>
                ))}
              </div>
              {wantsTestimonial && (
                <FormTextarea
                  placeholder="Paste a recommendation or testimonial quote."
                  height={80}
                />
              )}
            </div>
          </div>
        </FormSection>

        {/* ── Sticky Footer (inside card) ── */}
        <div
          style={{
            borderTop: "1px solid rgba(189,184,185,0.2)",
            marginTop: "24px",
            paddingTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* Progress */}
          <div style={{ flex: 1 }}>
            <div style={{ color: "#BDB8B9", fontSize: "12px", marginBottom: "6px" }}>
              {completedSections} of {totalSections} sections complete
            </div>
            <div style={{ height: "4px", backgroundColor: "rgba(189,184,185,0.2)", borderRadius: "999px", overflow: "hidden" }}>
              <div style={{ width: `${Math.round((completedSections / totalSections) * 100)}%`, height: "100%", backgroundColor: "#7F6269", borderRadius: "999px", transition: "width 0.3s ease" }} />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
            <button
              onClick={saveDraft}
              style={{
                backgroundColor: savedDraft ? "rgba(74,222,128,0.15)" : "transparent",
                color: savedDraft ? "#4ade80" : "#F4E1E0",
                fontSize: "14px",
                fontWeight: 500,
                padding: "11px 22px",
                borderRadius: "999px",
                border: savedDraft ? "1.5px solid #4ade80" : "1.5px solid rgba(189,184,185,0.5)",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.2s ease",
              }}
              className="hover:opacity-80 transition-opacity"
            >
              {savedDraft ? "Saved!" : "Save Draft"}
            </button>
            <button
              onClick={handleContinue}
              style={{
                backgroundColor: "#7F6269",
                color: "#F4E1E0",
                fontSize: "14px",
                fontWeight: 600,
                padding: "11px 24px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "inset 0 1px 0 rgba(244,225,224,0.12)",
              }}
              className="hover:opacity-90 transition-opacity"
            >
              Preview & Continue →
            </button>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}

/* ─── MAIN SCREEN ─── */
export function UploadForm() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("upload");

  const handleUploadSuccess = (profile: any) => {
    localStorage.setItem("resuflow_profile", JSON.stringify(profile));
    navigate("/extraction");
  };

  const handleManualContinue = (profile: any) => {
    localStorage.setItem("resuflow_profile", JSON.stringify(profile));
    navigate("/templates");
  };

  return (
    <div
      style={{
        backgroundColor: "#0E1627",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        paddingBottom: "60px",
      }}
    >
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Breadcrumb currentStep={1} />
        </div>

        {/* Page Title */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "40px",
              color: "#F4E1E0",
              marginBottom: "12px",
              lineHeight: 1.2,
            }}
          >
            Tell Us About Yourself
          </h1>
          <p style={{ color: "#BDB8B9", fontSize: "15px", maxWidth: "520px", margin: "0 auto", lineHeight: 1.65 }}>
            Upload your CV for AI-assisted filling, or complete the form manually. You can do both.
          </p>
        </div>

        {/* Tab Toggle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "36px" }}>
          <div
            style={{
              backgroundColor: "rgba(189,184,185,0.08)",
              borderRadius: "999px",
              padding: "6px",
              display: "flex",
              gap: "0",
            }}
          >
            {(["upload", "manual"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  backgroundColor: activeTab === tab ? "#7F6269" : "transparent",
                  color: activeTab === tab ? "#F4E1E0" : "#BDB8B9",
                  fontSize: "14px",
                  fontWeight: activeTab === tab ? 600 : 400,
                  padding: "10px 28px",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s ease",
                }}
              >
                {tab === "upload" ? "Upload CV" : "Fill Manually"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "upload" ? (
          <UploadTab onSuccess={handleUploadSuccess} />
        ) : (
          <ManualFormTab onContinue={handleManualContinue} />
        )}
      </div>
    </div>
  );
}
