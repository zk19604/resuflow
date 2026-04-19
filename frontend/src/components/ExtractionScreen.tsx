// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { CheckCircle2 } from "lucide-react";
// import { Breadcrumb } from "./Breadcrumb";
// import { Navbar } from "./Navbar";
// import glassmorphismThumb from "../assets/glassmorphism.png";
// import highendminimalistThumb from "../assets/highendminimalist.png";

// const templates = [
//   {
//     id: "glassmorphism" as const,
//     label: "Glassmorphism",
//     desc: "Dark, glassy, modern aesthetic with gradient orbs.",
//     thumb: glassmorphismThumb,
//   },
//   {
//     id: "highendminimalist" as const,
//     label: "High-End Minimalist",
//     desc: "Clean, editorial, elegant white-space layout.",
//     thumb: highendminimalistThumb,
//   },
//   {
//     id: "neon-vault" ,
//     label: "Neon Vault",
//     desc: "Modern purple neon style for full-stack developers.",
//     previewColor: "linear-gradient(135deg, #0f172a 0%, #581c87 50%, #7c3aed 100%)",
//     thumb: "neon-vaultthumb"
//   }
// ];

// const toneOptions = ["Professional", "Friendly", "Creative"];

// export function ExtractionScreen() {
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState<any>(null);
//   const [selectedTemplate, setSelectedTemplate] = useState<"glassmorphism" | "highendminimalist">("glassmorphism");
//   const [selectedTone, setSelectedTone] = useState(0);

//   useEffect(() => {
//     const stored = localStorage.getItem("resuflow_profile");
//     if (!stored) {
//       navigate("/upload");
//       return;
//     }
//     try {
//       setProfile(JSON.parse(stored));
//     } catch {
//       navigate("/upload");
//     }
//   }, [navigate]);

//   const name = profile?.personalInfo?.name || "Your Profile";
//   const initials = name
//     .split(" ")
//     .map((n: string) => n[0] || "")
//     .slice(0, 2)
//     .join("")
//     .toUpperCase() || "YP";
//   const title =
//     profile?.workExperience?.[0]?.role ||
//     profile?.personalInfo?.email ||
//     "Professional";

//   const allSkills: string[] = [
//     ...(profile?.skills?.technical || []),
//     ...(profile?.skills?.domain || []),
//     ...(profile?.skills?.soft || []),
//     ...(profile?.skills?.tools || []),
//   ].slice(0, 8);

//   const experienceList: any[] = (profile?.workExperience || []).slice(0, 3);
//   const education: any = (profile?.education || [])[0];
//   const achievementsList: any[] = (profile?.achievements || []).slice(0, 2);

//   const handleContinue = () => {
//     localStorage.setItem(
//       "resuflow_vibe",
//       JSON.stringify({
//         template: selectedTemplate,
//         tone: toneOptions[selectedTone],
//       })
//     );
//     navigate("/preview");
//   };

//   return (
//     <div
//       style={{ backgroundColor: "#0E1627", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}
//     >
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-6 py-16">
//         <div className="mb-12">
//           <Breadcrumb currentStep={2} />
//         </div>

//         <div className="mb-10">
//           <h2
//             style={{
//               fontFamily: "'DM Serif Display', serif",
//               fontSize: "32px",
//               color: "#F4E1E0",
//               marginBottom: "8px",
//             }}
//           >
//             Here's What We Found
//           </h2>
//           <p style={{ color: "#BDB8B9", fontSize: "15px" }}>
//             Review your extracted profile before choosing your style.
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* ── LEFT: Extracted Profile Card ── */}
//           <div style={{ width: "100%", maxWidth: "440px", flexShrink: 0 }}>
//             <div
//               style={{
//                 backgroundColor: "rgba(189,184,185,0.05)",
//                 borderRadius: "16px",
//                 padding: "32px",
//                 border: "1px solid rgba(189,184,185,0.2)",
//                 height: "100%",
//               }}
//             >
//               {/* Avatar + Name */}
//               <div className="flex items-center gap-4 mb-6">
//                 <div
//                   style={{
//                     width: "64px",
//                     height: "64px",
//                     borderRadius: "50%",
//                     backgroundColor: "#7F6269",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "#F4E1E0",
//                     fontSize: "20px",
//                     fontWeight: 700,
//                     flexShrink: 0,
//                   }}
//                 >
//                   {initials}
//                 </div>
//                 <div>
//                   <div style={{ color: "#F4E1E0", fontSize: "20px", fontWeight: 700 }}>
//                     {name}
//                   </div>
//                   <div style={{ color: "#BDB8B9", fontSize: "14px" }}>{title}</div>
//                 </div>
//               </div>

//               <div style={{ height: "1px", backgroundColor: "rgba(189,184,185,0.2)", marginBottom: "20px" }} />

//               {/* Skills */}
//               {allSkills.length > 0 && (
//                 <div style={{ marginBottom: "20px" }}>
//                   <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
//                     Skills
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {allSkills.map((s) => (
//                       <span
//                         key={s}
//                         style={{
//                           backgroundColor: "rgba(127,98,105,0.2)",
//                           color: "#F4E1E0",
//                           fontSize: "12px",
//                           fontWeight: 500,
//                           padding: "4px 12px",
//                           borderRadius: "999px",
//                         }}
//                       >
//                         {s}
//                       </span>
//                     ))}
//                   </div>
//                   <div style={{ height: "1px", backgroundColor: "rgba(189,184,185,0.2)", marginTop: "20px", marginBottom: "20px" }} />
//                 </div>
//               )}

//               {/* Experience */}
//               {experienceList.length > 0 && (
//                 <div style={{ marginBottom: "20px" }}>
//                   <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
//                     Experience
//                   </div>
//                   {experienceList.map((e: any, idx: number) => (
//                     <div key={idx} style={{ marginBottom: "12px" }}>
//                       <div style={{ color: "#F4E1E0", fontSize: "14px", fontWeight: 600 }}>
//                         {e.role}
//                       </div>
//                       <div style={{ color: "#BDB8B9", fontSize: "13px" }}>
//                         {e.company}
//                         {e.startDate ? ` · ${e.startDate}` : ""}
//                         {e.endDate ? ` – ${e.endDate}` : ""}
//                       </div>
//                     </div>
//                   ))}
//                   <div style={{ height: "1px", backgroundColor: "rgba(189,184,185,0.2)", marginBottom: "20px" }} />
//                 </div>
//               )}

//               {/* Education */}
//               {education && (
//                 <div style={{ marginBottom: "20px" }}>
//                   <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
//                     Education
//                   </div>
//                   <div style={{ color: "#F4E1E0", fontSize: "14px", fontWeight: 600 }}>
//                     {education.degree}{education.field ? ` in ${education.field}` : ""}
//                   </div>
//                   <div style={{ color: "#BDB8B9", fontSize: "13px" }}>
//                     {education.institution}
//                     {education.startDate ? ` · ${education.startDate}` : ""}
//                     {education.endDate ? ` – ${education.endDate}` : ""}
//                   </div>
//                   {achievementsList.length > 0 && (
//                     <div style={{ height: "1px", backgroundColor: "rgba(189,184,185,0.2)", marginTop: "20px", marginBottom: "20px" }} />
//                   )}
//                 </div>
//               )}

//               {/* Achievements */}
//               {achievementsList.length > 0 && (
//                 <div style={{ marginBottom: "24px" }}>
//                   <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
//                     Achievements
//                   </div>
//                   {achievementsList.map((a: any, i: number) => (
//                     <div key={i} className="flex items-start gap-2 mb-2">
//                       <CheckCircle2 size={14} style={{ color: "#7F6269", marginTop: "2px", flexShrink: 0 }} />
//                       <span style={{ color: "#BDB8B9", fontSize: "13px", lineHeight: 1.5 }}>
//                         {a.title || a.description || String(a)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               <button
//                 onClick={() => navigate("/upload")}
//                 style={{
//                   backgroundColor: "transparent",
//                   color: "#F4E1E0",
//                   fontSize: "14px",
//                   fontWeight: 600,
//                   padding: "10px 24px",
//                   borderRadius: "999px",
//                   border: "1.5px solid #BDB8B9",
//                   cursor: "pointer",
//                   fontFamily: "'DM Sans', sans-serif",
//                   width: "100%",
//                 }}
//                 className="hover:opacity-80 transition-opacity"
//               >
//                 Edit Details
//               </button>
//             </div>
//           </div>

//           {/* ── RIGHT: Vibe & Theme Selection ── */}
//           <div style={{ flex: 1, minWidth: 0 }}>
//             <div
//               style={{
//                 backgroundColor: "rgba(189,184,185,0.05)",
//                 borderRadius: "16px",
//                 padding: "32px",
//                 border: "1px solid rgba(189,184,185,0.2)",
//               }}
//             >
//               <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
//                 Choose Your Template
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "28px" }}>
//                 {templates.map((t) => (
//                   <div
//                     key={t.id}
//                     onClick={() => setSelectedTemplate(t.id)}
//                     style={{
//                       backgroundColor: "rgba(189,184,185,0.04)",
//                       borderRadius: "12px",
//                       overflow: "hidden",
//                       border: selectedTemplate === t.id ? "2px solid #7F6269" : "1px solid rgba(189,184,185,0.2)",
//                       cursor: "pointer",
//                       position: "relative",
//                       transition: "border 0.15s ease",
//                     }}
                    
//                   >
//                     {selectedTemplate === t.id && (
//                       <div
//                         style={{
//                           position: "absolute",
//                           top: "8px",
//                           right: "8px",
//                           width: "18px",
//                           height: "18px",
//                           backgroundColor: "#7F6269",
//                           borderRadius: "50%",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           zIndex: 1,
//                         }}
//                       >
//                         <CheckCircle2 size={12} style={{ color: "#F4E1E0" }} />
//                       </div>
//                     )}
//                     <img
//                       src={t.thumb}
//                       alt={t.label}
//                       style={{ width: "100%", height: "100px", objectFit: "cover", display: "block" }}
//                     />
//                     <div style={{ padding: "12px" }}>
//                       <div style={{ color: "#F4E1E0", fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>{t.label}</div>
//                       <div style={{ color: "#BDB8B9", fontSize: "11px" }}>{t.desc}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>
//                 Tone of Voice
//               </div>
//               <div className="flex gap-3 mb-8">
//                 {toneOptions.map((tone, i) => (
//                   <button
//                     key={tone}
//                     onClick={() => setSelectedTone(i)}
//                     style={{
//                       backgroundColor: selectedTone === i ? "#7F6269" : "transparent",
//                       color: "#F4E1E0",
//                       fontSize: "13px",
//                       fontWeight: selectedTone === i ? 600 : 400,
//                       padding: "8px 20px",
//                       borderRadius: "999px",
//                       border: selectedTone === i ? "none" : "1.5px solid rgba(189,184,185,0.5)",
//                       cursor: "pointer",
//                       fontFamily: "'DM Sans', sans-serif",
//                       transition: "all 0.15s ease",
//                     }}
//                   >
//                     {tone}
//                   </button>
//                 ))}
//               </div>

//               <button
//                 onClick={handleContinue}
//                 style={{
//                   backgroundColor: "#7F6269",
//                   color: "#F4E1E0",
//                   fontSize: "15px",
//                   fontWeight: 600,
//                   padding: "16px 0",
//                   borderRadius: "999px",
//                   border: "none",
//                   cursor: "pointer",
//                   width: "100%",
//                   fontFamily: "'DM Sans', sans-serif",
//                   boxShadow: "inset 0 1px 0 rgba(244,225,224,0.12), 0 4px 20px rgba(127,98,105,0.35)",
//                 }}
//                 className="hover:opacity-90 transition-opacity"
//               >
//                 Continue to Preview →
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { Navbar } from "./Navbar";
import glassmorphismThumb from "../assets/glassmorphism.png";
import highendminimalistThumb from "../assets/highendminimalist.png";
import neonVaultThumb from "../assets/neon-vault-thumb.png";
 
// ─── Neon Vault inline thumbnail (SVG data URL fallback if asset missing) ───
const NEON_VAULT_SVG = `data:image/svg+xml,%3Csvg width='400' height='200' viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%230f172a'/%3E%3Cstop offset='50%25' style='stop-color:%232d1b69'/%3E%3Cstop offset='100%25' style='stop-color:%234c1d95'/%3E%3C/linearGradient%3E%3CradialGradient id='orb1' cx='30%25' cy='40%25' r='40%25'%3E%3Cstop offset='0%25' style='stop-color:%237c3aed%3Bstop-opacity:0.8'/%3E%3Cstop offset='100%25' style='stop-color:%237c3aed%3Bstop-opacity:0'/%3E%3C/radialGradient%3E%3CradialGradient id='orb2' cx='80%25' cy='70%25' r='35%25'%3E%3Cstop offset='0%25' style='stop-color:%23a855f7%3Bstop-opacity:0.6'/%3E%3Cstop offset='100%25' style='stop-color:%23a855f7%3Bstop-opacity:0'/%3E%3C/radialGradient%3E%3Cfilter id='glow'%3E%3CfeGaussianBlur stdDeviation='3' result='coloredBlur'/%3E%3CfeMerge%3E%3CfeMergeNode in='coloredBlur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Crect width='400' height='200' fill='url(%23bg)'/%3E%3Cellipse cx='120' cy='80' rx='100' ry='80' fill='url(%23orb1)'/%3E%3Cellipse cx='320' cy='140' rx='80' ry='70' fill='url(%23orb2)'/%3E%3Cline x1='0' y1='50' x2='400' y2='50' stroke='%237c3aed' stroke-width='0.3' stroke-opacity='0.3'/%3E%3Cline x1='0' y1='100' x2='400' y2='100' stroke='%237c3aed' stroke-width='0.3' stroke-opacity='0.3'/%3E%3Cline x1='0' y1='150' x2='400' y2='150' stroke='%237c3aed' stroke-width='0.3' stroke-opacity='0.3'/%3E%3Cline x1='100' y1='0' x2='100' y2='200' stroke='%237c3aed' stroke-width='0.3' stroke-opacity='0.3'/%3E%3Cline x1='200' y1='0' x2='200' y2='200' stroke='%237c3aed' stroke-width='0.3' stroke-opacity='0.3'/%3E%3Cline x1='300' y1='0' x2='300' y2='200' stroke='%237c3aed' stroke-width='0.3' stroke-opacity='0.3'/%3E%3Crect x='140' y='55' width='120' height='18' rx='9' fill='rgba(124%2C58%2C237%2C0.2)' stroke='%237c3aed' stroke-width='0.8'/%3E%3Ccircle cx='152' cy='64' r='3' fill='%23a855f7'/%3E%3Ctext x='162' y='68' font-family='monospace' font-size='7' fill='rgba(255%2C255%2C255%2C0.8)' letter-spacing='0.5'%3EFull-Stack Developer%3C/text%3E%3Ctext x='200' y='100' font-family='monospace' font-size='22' font-weight='900' fill='%23ffffff' text-anchor='middle'%3EALEX MORGAN%3C/text%3E%3Ctext x='200' y='124' font-family='monospace' font-size='7' fill='rgba(168%2C85%2C247%2C0.8)' text-anchor='middle' letter-spacing='2'%3EBUILDING THE FUTURE%3C/text%3E%3Crect x='130' y='135' width='60' height='16' rx='8' fill='rgba(124%2C58%2C237%2C0.5)' stroke='%237c3aed' stroke-width='0.8'/%3E%3Ctext x='160' y='146' font-family='monospace' font-size='6' fill='%23fff' text-anchor='middle'%3EView My Work%3C/text%3E%3Crect x='200' y='135' width='60' height='16' rx='8' fill='rgba(255%2C255%2C255%2C0.05)' stroke='rgba(168%2C85%2C247%2C0.4)' stroke-width='0.8'/%3E%3Ctext x='230' y='146' font-family='monospace' font-size='6' fill='rgba(255%2C255%2C255%2C0.7)' text-anchor='middle'%3EGet In Touch%3C/text%3E%3C/svg%3E`;
 
type TemplateId = "glassmorphism" | "highendminimalist" | "neon-vault";
 
const templates: { id: TemplateId; label: string; desc: string; thumb: string }[] = [
  {
    id: "glassmorphism",
    label: "Glassmorphism",
    desc: "Dark, glassy, modern aesthetic with gradient orbs.",
    thumb: glassmorphismThumb,
  },
  {
    id: "highendminimalist",
    label: "High-End Minimalist",
    desc: "Clean, editorial, elegant white-space layout.",
    thumb: highendminimalistThumb,
  },
  {
    id: "neon-vault",
    label: "Neon Vault",
    desc: "Modern purple neon style for full-stack developers.",
    thumb: neonVaultThumb,
  },
];
 
const toneOptions = ["Professional", "Friendly", "Creative"];
 
export function ExtractionScreen() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("glassmorphism");
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
 
              {/* ── 3-column grid for all 3 templates ── */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}>
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
                    <img
                      src={t.thumb}
                      alt={t.label}
                      style={{ width: "100%", height: "100px", objectFit: "cover", display: "block" }}
                    />
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