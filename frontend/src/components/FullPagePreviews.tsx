/**
 * FullPagePreviews.tsx
 * Complete scrollable full-page previews for all portfolio templates.
 * These match the actual portfolio-templates source exactly.
 */
import React, { useState, useEffect, useRef } from "react";

// ─── Shared helpers ────────────────────────────────────────────────────────────

function yearsExp(profile: any) {
  const dates = (profile?.workExperience || [])
    .map((w: any) => parseInt((w.startDate || "").slice(0, 4)))
    .filter((y: number) => !isNaN(y));
  return dates.length ? new Date().getFullYear() - Math.min(...dates) : 5;
}

// ═══════════════════════════════════════════════════════════════════════════════
// RETRO PRESS — full page
// ═══════════════════════════════════════════════════════════════════════════════
export function RetroFullPage({ palette, profile, sectionVisibility }: { palette?: any; profile: any; sectionVisibility?: Record<string, boolean> }) {
  const retroAccent = palette?.colors?.[1] || "var(--p-accent)";
  const retroDark   = palette?.colors?.[0] || "var(--p-dark)";
  const retroLight  = palette?.colors?.[2] || "var(--p-light)";
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Morgan Hayes";
  const [firstName, ...rest] = name.split(" ");
  const lastName = rest.join(" ");
  const initials = name.split(" ").map((p: string) => p[0]).join("").slice(0, 2).toUpperCase();
  const role = profile?.workExperience?.[0]?.role || "Chief Operations Officer";
  const location = profile?.personalInfo?.location || "London, UK";
  const summary = profile?.summary || "";
  const yrs = yearsExp(profile);
  const projCount = profile?.projects?.length ?? 3;
  const certCount = profile?.certifications?.length;
  const stats = [
    { number: `${yrs}+`, label: "YEARS" },
    { number: `${projCount}+`, label: "PROJECTS" },
    certCount != null ? { number: `${certCount}`, label: "CERTS" } : { number: "$1.2B", label: "DELIVERED" },
  ];

  // --- About section data
  const allSkills = [...(profile?.skills?.technical || []), ...(profile?.skills?.domain || []), ...(profile?.skills?.soft || [])].slice(0, 6);
  const displayTags = allSkills.length > 0 ? allSkills : ["Operations", "Supply Chain", "Process Design", "Cost Reduction", "Team Scaling", "Risk Mitigation"];

  // --- Experience
  const workExperience = profile?.workExperience || [];
  const experiences = workExperience.length > 0 ? workExperience.map((exp: any) => {
    const startYear = (exp.startDate || "").slice(0, 4);
    const endYear = exp.endDate === "Present" || !exp.endDate ? "PRESENT" : (exp.endDate || "").slice(0, 4);
    return { year: startYear ? `${startYear} —` : "—", present: endYear, title: exp.role?.toUpperCase() || "ROLE", company: exp.company || "", description: exp.description || "", badge: endYear === "PRESENT" ? "CURRENT ROLE" : `${startYear}–${endYear}` };
  }) : [
    { year: "2019 —", present: "PRESENT", title: "CHIEF OPERATIONS OFFICER", company: "Apex Logistics Group", description: "Leading global operations strategy for EMEA region, overseeing 40+ facilities and 2,000+ staff.", badge: "CURRENT ROLE" },
    { year: "2014 —", present: "2019", title: "VP OPERATIONS", company: "Sterling Manufacturing", description: "Managed manufacturing plants across North America and Europe.", badge: "5 YEARS" },
  ];

  // --- Skills
  const allTech = [...(profile?.skills?.technical || []), ...(profile?.skills?.tools || [])];
  const allSoft = [...(profile?.skills?.soft || []), ...(profile?.skills?.domain || [])];
  const mkSkills = (names: string[], base: number) => names.slice(0, 5).map((name: string, i: number) => ({
    name, percentage: Math.max(70, base - i * 3), proficiency: base - i * 3 >= 88 ? "Expert" : "Advanced", years: `${Math.max(1, 8 - i)} YRS`,
  }));
  const leftSkills = allTech.length > 0 ? mkSkills(allTech, 93) : [
    { name: "Operations Strategy", percentage: 95, proficiency: "Expert", years: "12 YRS" },
    { name: "Process Engineering", percentage: 90, proficiency: "Expert", years: "10 YRS" },
    { name: "Supply Chain", percentage: 88, proficiency: "Expert", years: "14 YRS" },
    { name: "Cost Reduction", percentage: 92, proficiency: "Expert", years: "11 YRS" },
    { name: "Lean Management", percentage: 85, proficiency: "Expert", years: "9 YRS" },
  ];
  const rightSkills = allSoft.length > 0 ? mkSkills(allSoft, 90) : [
    { name: "Team Leadership", percentage: 93, proficiency: "Expert", years: "15 YRS" },
    { name: "Risk Assessment", percentage: 87, proficiency: "Expert", years: "10 YRS" },
    { name: "Vendor Relations", percentage: 80, proficiency: "Advanced", years: "8 YRS" },
    { name: "P&L Oversight", percentage: 89, proficiency: "Expert", years: "12 YRS" },
    { name: "Change Management", percentage: 84, proficiency: "Expert", years: "9 YRS" },
  ];

  // --- Education
  const eduData = profile?.education || [];
  const education = eduData.length > 0 ? eduData.map((edu: any) => {
    const words = edu.institution.split(/\s+/);
    const inits = words.filter((w: string) => w.length > 2).slice(0, 3).map((w: string) => w[0].toUpperCase()).join("");
    const yr = [(edu.startDate || "").slice(0, 4), (edu.endDate || "").slice(0, 4)].filter(Boolean).join("–");
    return { initials: inits || edu.institution.slice(0, 3).toUpperCase(), institution: edu.institution, degree: [edu.degree, edu.field].filter(Boolean).join(" "), year: yr };
  }) : [
    { initials: "UCB", institution: "University of Chicago Booth", degree: "MBA Operations Management", year: "2006–2008" },
    { initials: "MSU", institution: "Michigan State University", degree: "BSc Industrial Engineering", year: "2002–2006" },
  ];

  // --- Achievements
  const profileAchievements = profile?.achievements || [];
  const achievements = profileAchievements.length > 0 ? profileAchievements.slice(0, 3).map((a: any) => ({
    stat: a.date ? a.date.slice(0, 4) : "★", label: a.title?.toUpperCase() || "ACHIEVEMENT", description: a.description || "",
  })) : [
    { stat: "3×", label: "TOP PERFORMER", description: "Recognized three consecutive years as a leading professional" },
    { stat: `${projCount}+`, label: "PROJECTS", description: "Significant projects delivered across diverse domains" },
    { stat: `${yrs}+`, label: "YEARS EXP", description: "Years of professional experience and continuous growth" },
  ];

  const email = profile?.personalInfo?.email || "morgan@hayesops.com";
  const linkedin = profile?.personalInfo?.linkedin || "";
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const year = new Date().getFullYear();
  const startYear = (() => {
    const dates = (profile?.workExperience || []).map((w: any) => parseInt((w.startDate || "").slice(0, 4))).filter((y: number) => !isNaN(y));
    return dates.length ? Math.min(...dates) : 2008;
  })();

  const fonts = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600&family=Bebas+Neue&display=swap');`;

  const retroVars = { "--p-accent": retroAccent, "--p-dark": retroDark, "--p-light": retroLight } as React.CSSProperties;
  return (
    <div style={{ ...retroVars, backgroundColor: retroLight, minHeight: "100%", fontFamily: "DM Sans, sans-serif" }}>
      <style>{fonts}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, height: 72, backgroundColor: "var(--p-light)", borderTop: "3px solid var(--p-dark)", borderBottom: "3px solid var(--p-dark)", backgroundImage: "radial-gradient(circle, rgba(80,40,0,0.07) 1.5px, transparent 1.5px)", backgroundSize: "8px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, backgroundColor: "var(--p-accent)", border: "2px solid var(--p-dark)", borderRadius: 4, boxShadow: "2px 2px 0 var(--p-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Bebas Neue, sans-serif", fontSize: 18, color: "var(--p-light)" }}>{initials}</div>
          <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 18, color: "var(--p-dark)" }}>{name}</div>
          <div style={{ width: 2, height: 24, backgroundColor: "var(--p-dark)" }} />
          <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10, color: "#8B4513", letterSpacing: "0.2em", textTransform: "uppercase" }}>EST. {startYear}</div>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          {["HOME", "ABOUT", "EXPERIENCE", "SKILLS", "CONTACT"].map(l => (
            <span key={l} style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 15, color: "var(--p-dark)", letterSpacing: "0.2em", cursor: "pointer" }}>{l}</span>
          ))}
        </div>
        <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 14, color: "var(--p-light)", backgroundColor: "var(--p-accent)", border: "2px solid var(--p-dark)", boxShadow: "3px 3px 0 var(--p-dark)", padding: "12px 20px", cursor: "pointer" }}>HIRE ME →</div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "90vh", backgroundColor: "var(--p-light)", backgroundImage: "radial-gradient(circle, rgba(80,40,0,0.08) 2px, transparent 2px)", backgroundSize: "10px 10px", display: "grid", gridTemplateColumns: "62% 38%", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 40px 80px 80px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--p-dark)", height: 48, borderBottom: "3px solid var(--p-accent)", fontFamily: "Bebas Neue, sans-serif", fontSize: 18, color: "var(--p-light)", letterSpacing: "0.4em" }}>RESUFLOW PRESENTS</div>
          <div style={{ marginTop: 32 }}>
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 100, color: "var(--p-dark)", lineHeight: 0.85, textTransform: "uppercase" }}>THE ONE &</div>
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 150, color: "var(--p-accent)", lineHeight: 0.85, textTransform: "uppercase" }}>ONLY</div>
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 80, color: "var(--p-dark)", lineHeight: 0.85, textTransform: "uppercase" }}>{firstName}</div>
            {lastName && <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 80, color: "var(--p-light)", backgroundColor: "var(--p-dark)", lineHeight: 0.85, display: "inline-block", padding: "0 12px", textTransform: "uppercase" }}>{lastName}</div>}
          </div>
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--p-accent)", height: 56, borderTop: "2px solid var(--p-dark)", borderBottom: "2px solid var(--p-dark)", fontFamily: "Bebas Neue, sans-serif", fontSize: 18, color: "var(--p-light)", letterSpacing: "0.25em" }}>
            {[role, location].filter(Boolean).join(" · ").toUpperCase()}
          </div>
          {summary && <div style={{ marginTop: 32, fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 20, color: "#5C2A0A", lineHeight: 1.65, maxWidth: 520 }}>"{summary.slice(0, 140)}{summary.length > 140 ? "…" : ""}"</div>}
          <div style={{ marginTop: 24, fontFamily: "DM Sans, sans-serif", fontSize: 10, color: "#8B6B4A", textTransform: "uppercase", letterSpacing: "0.2em" }}>RESUFLOW PORTFOLIO · EXECUTIVE SERIES · {year}</div>
          <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
            <button style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 15, color: "var(--p-light)", backgroundColor: "var(--p-accent)", border: "2px solid var(--p-dark)", boxShadow: "4px 4px 0 var(--p-dark)", height: 52, width: 200, cursor: "pointer" }}>READ FULL PROFILE</button>
            <button style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 15, color: "var(--p-dark)", backgroundColor: "var(--p-light)", border: "2px solid var(--p-dark)", boxShadow: "4px 4px 0 var(--p-dark)", height: 52, width: 200, cursor: "pointer" }}>GET IN TOUCH</button>
          </div>
        </div>
        <div style={{ backgroundColor: "var(--p-dark)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 }}>
          <div style={{ width: 120, height: 120, borderRadius: "50%", backgroundColor: "var(--p-accent)", border: "3px solid var(--p-light)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 36 }}>
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 28, color: "var(--p-light)" }}>№001</div>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 9, color: "var(--p-light)", textTransform: "uppercase" }}>PORTFOLIO</div>
          </div>
          <div style={{ width: "100%", height: 1, backgroundColor: "rgba(245,237,216,0.2)", marginBottom: 36 }} />
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: "center", width: "100%", marginBottom: 24 }}>
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 56, color: "var(--p-accent)", lineHeight: 1 }}>{stat.number}</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 9, color: "#9A8060", textTransform: "uppercase", letterSpacing: "0.2em", marginTop: 6 }}>{stat.label}</div>
              {i < 2 && <div style={{ width: "100%", height: 1, backgroundColor: "rgba(245,237,216,0.15)", marginTop: 14 }} />}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      {vis("about") && (
        <section style={{ backgroundColor: "#F0E8D0", backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, rgba(139,101,74,0.08) 24px)", maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ backgroundColor: "var(--p-dark)", height: 80, borderBottom: "3px solid var(--p-accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "var(--p-accent)", fontSize: 24, marginRight: 16 }}>★</span>
            <span style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 26, color: "var(--p-light)", letterSpacing: "0.3em" }}>THE {name.toUpperCase()} STORY</span>
            <span style={{ color: "var(--p-accent)", fontSize: 24, marginLeft: 16 }}>★</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "28% 44% 28%", gap: 40, padding: "64px 80px" }}>
            <div style={{ backgroundColor: "var(--p-dark)", border: "2px solid var(--p-dark)", boxShadow: "4px 4px 0 var(--p-accent)", borderRadius: 4, padding: 40 }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "var(--p-accent)", border: "3px solid var(--p-light)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 26, color: "var(--p-light)" }}>{initials}</div>
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 22, color: "var(--p-light)", textAlign: "center" }}>{name}</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#9A8060", textAlign: "center", marginTop: 4 }}>{role}</div>
              <div style={{ width: "100%", height: 1, backgroundColor: "rgba(245,237,216,0.15)", margin: "24px 0" }} />
              {[{ label: "PROJECTS", value: `${projCount}+` }, { label: "ROLES", value: `${(profile?.workExperience?.length ?? 2)}+` }, { label: "YEARS", value: `${yrs}+` }].map((s, i) => (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0" }}>
                    <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 9, color: "#6A5040", textTransform: "uppercase", letterSpacing: "0.15em" }}>{s.label}</div>
                    <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 40, color: "var(--p-accent)" }}>{s.value}</div>
                  </div>
                  {i < 2 && <div style={{ width: "100%", height: 1, backgroundColor: "rgba(245,237,216,0.1)" }} />}
                </div>
              ))}
            </div>
            <div style={{ padding: "0 20px" }}>
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 72, color: "var(--p-dark)", lineHeight: 0.9 }}>HELLO,</div>
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 44, color: "var(--p-accent)", lineHeight: 0.9 }}>I'M {name.toUpperCase()}</div>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 15, color: "#3D2B1A", lineHeight: 1.95, marginTop: 32 }}>{summary}</div>
            </div>
            <div style={{ backgroundColor: "var(--p-accent)", border: "2px solid var(--p-dark)", boxShadow: "4px 4px 0 var(--p-dark)", borderRadius: 4, padding: 32 }}>
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 13, color: "var(--p-light)", letterSpacing: "0.3em", textAlign: "center" }}>AREAS OF</div>
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 32, color: "var(--p-light)", textAlign: "center", marginBottom: 24 }}>EXPERTISE</div>
              <div style={{ width: "100%", height: 1, backgroundColor: "rgba(245,237,216,0.3)", marginBottom: 20 }} />
              {displayTags.map((skill: string) => (
                <div key={skill} style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(245,237,216,0.2)", padding: 12, fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "var(--p-light)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{skill}</div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {vis("experience") && (
        <section style={{ backgroundColor: "#EDE4C8", maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ backgroundColor: "var(--p-dark)", height: 90, display: "grid", gridTemplateColumns: "1fr 2fr 1fr", alignItems: "center", padding: "0 80px" }}>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10, color: "#9A8060", letterSpacing: "0.2em" }}>VOL. XII · NO. {experiences.length}</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 32, color: "var(--p-light)" }}>THE CAREER GAZETTE</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10, color: "#9A8060", textTransform: "uppercase", letterSpacing: "0.2em", marginTop: 4 }}>EXPERIENCE & CAREER TIMELINE</div>
            </div>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10, color: "#9A8060", letterSpacing: "0.2em", textAlign: "right" }}>{location.toUpperCase()} · {year}</div>
          </div>
          <div style={{ width: "100%", height: 3, backgroundColor: "var(--p-accent)" }} />
          <div style={{ padding: "40px 80px 80px" }}>
            {experiences.map((exp: any, i: number) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "10% 15% 2px 50% 23%", gap: 32, paddingTop: 60, paddingBottom: 60, borderBottom: i < experiences.length - 1 ? "2px solid var(--p-dark)" : "none", alignItems: "start" }}>
                <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 28, color: "rgba(26,18,8,0.15)" }}>№ {String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 18, color: "var(--p-accent)" }}>{exp.year}</div>
                  <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 18, color: "var(--p-accent)" }}>{exp.present}</div>
                </div>
                <div style={{ width: 2, height: 70, backgroundColor: "var(--p-dark)" }} />
                <div>
                  <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 36, color: "var(--p-dark)", lineHeight: 1.1 }}>{exp.title}</div>
                  <div style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 15, color: "#5C4030", marginTop: 8 }}>{exp.company}</div>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 13, color: "#3D2B1A", lineHeight: 1.85, marginTop: 14, maxWidth: 500 }}>{exp.description}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ display: "inline-block", backgroundColor: "var(--p-accent)", border: "2px solid var(--p-dark)", boxShadow: "3px 3px 0 var(--p-dark)", padding: "10px 16px", fontFamily: "Bebas Neue, sans-serif", fontSize: 12, color: "var(--p-light)", textTransform: "uppercase" }}>{exp.badge}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS */}
      {vis("skills") && (
        <section style={{ backgroundColor: "var(--p-light)", backgroundImage: "radial-gradient(circle, rgba(80,40,0,0.06) 2px, transparent 2px)", backgroundSize: "10px 10px", padding: "80px 0", maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 10 }}>
              <div style={{ width: 160, height: 3, backgroundColor: "var(--p-dark)" }} />
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 18, color: "var(--p-dark)", letterSpacing: "0.4em" }}>COMPETENCY CATALOGUE</div>
              <div style={{ width: 160, height: 3, backgroundColor: "var(--p-dark)" }} />
            </div>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10, color: "var(--p-accent)", textTransform: "uppercase", letterSpacing: "0.2em" }}>★ EST. {startYear} · {location.toUpperCase()} ★</div>
          </div>
          <div style={{ padding: "0 80px" }}>
            <div style={{ border: "3px solid var(--p-dark)", boxShadow: "6px 6px 0 rgba(26,18,8,0.2)", backgroundColor: "#FBF5E6", padding: 48 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2px 1fr", gap: 48 }}>
                <div>
                  {leftSkills.map((skill: any, i: number) => (
                    <div key={i} style={{ paddingTop: 20, paddingBottom: 20, borderBottom: "1px solid rgba(26,18,8,0.15)", display: "grid", gridTemplateColumns: "1fr 1fr 100px 60px", alignItems: "center", gap: 16 }}>
                      <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 16, color: "var(--p-dark)" }}>{skill.name}</div>
                      <div style={{ height: 8, backgroundColor: "rgba(26,18,8,0.1)", border: "1px solid rgba(26,18,8,0.2)", position: "relative", overflow: "hidden" }}>
                        <div style={{ height: "100%", backgroundColor: "var(--p-accent)", width: `${skill.percentage}%` }} />
                      </div>
                      <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#8B6B4A", textAlign: "right" }}>{skill.proficiency}</div>
                      <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 10, color: "var(--p-light)", backgroundColor: "var(--p-dark)", padding: "4px 8px", textAlign: "center" }}>{skill.years}</div>
                    </div>
                  ))}
                </div>
                <div style={{ width: 2, backgroundColor: "var(--p-dark)" }} />
                <div>
                  {rightSkills.map((skill: any, i: number) => (
                    <div key={i} style={{ paddingTop: 20, paddingBottom: 20, borderBottom: "1px solid rgba(26,18,8,0.15)", display: "grid", gridTemplateColumns: "1fr 1fr 100px 60px", alignItems: "center", gap: 16 }}>
                      <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 16, color: "var(--p-dark)" }}>{skill.name}</div>
                      <div style={{ height: 8, backgroundColor: "rgba(26,18,8,0.1)", border: "1px solid rgba(26,18,8,0.2)", position: "relative", overflow: "hidden" }}>
                        <div style={{ height: "100%", backgroundColor: "var(--p-accent)", width: `${skill.percentage}%` }} />
                      </div>
                      <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#8B6B4A", textAlign: "right" }}>{skill.proficiency}</div>
                      <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 10, color: "var(--p-light)", backgroundColor: "var(--p-dark)", padding: "4px 8px", textAlign: "center" }}>{skill.years}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {vis("education") && (
        <section style={{ backgroundColor: "var(--p-dark)", padding: "80px 0", maxWidth: 1440, margin: "0 auto", outline: "3px solid var(--p-accent)", outlineOffset: -20, position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10, color: "#9A8060", textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: 12 }}>THIS CERTIFIES THAT</div>
            <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontStyle: "italic", fontSize: 44, color: "var(--p-light)", marginBottom: 12 }}>{name}</div>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10, color: "#9A8060", textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: 20 }}>HAS COMPLETED THE FOLLOWING ACADEMIC DISTINCTIONS</div>
            <div style={{ width: 360, height: 3, backgroundColor: "var(--p-accent)", margin: "0 auto" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 60, padding: "0 80px", flexWrap: "wrap" }}>
            {education.map((edu: any, i: number) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "var(--p-accent)", border: "3px solid var(--p-light)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Bebas Neue, sans-serif", fontSize: 16, color: "var(--p-light)" }}>{edu.initials}</div>
                <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 20, color: "var(--p-light)", marginBottom: 8 }}>{edu.institution}</div>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#A09070", marginBottom: 8 }}>{edu.degree}</div>
                <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 18, color: "var(--p-accent)" }}>{edu.year}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ACHIEVEMENTS */}
      {vis("achievements") && (
        <section style={{ backgroundColor: "var(--p-accent)", backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 2px, transparent 2px)", backgroundSize: "8px 8px", padding: "80px 0", maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 18, color: "var(--p-light)", letterSpacing: "0.4em", marginBottom: 12 }}>★ HALL OF FAME ★</div>
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 64, color: "var(--p-light)", lineHeight: 0.9, marginBottom: 24 }}>NOTABLE ACHIEVEMENTS</div>
            <div style={{ width: 560, height: 3, backgroundColor: "var(--p-dark)", margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${achievements.length}, 1fr)`, gap: 24, padding: "0 80px", marginBottom: 48 }}>
            {achievements.map((a: any, i: number) => (
              <div key={i} style={{ backgroundColor: "var(--p-light)", border: "3px solid var(--p-dark)", boxShadow: "6px 6px 0 var(--p-dark)" }}>
                <div style={{ height: 4, backgroundColor: "var(--p-dark)" }} />
                <div style={{ padding: 40, textAlign: "center" }}>
                  <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 90, color: "var(--p-accent)", lineHeight: 1 }}>{a.stat}</div>
                  <div style={{ width: "80%", height: 2, backgroundColor: "var(--p-dark)", margin: "20px auto" }} />
                  <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 14, color: "var(--p-dark)", letterSpacing: "0.2em", marginBottom: 14 }}>{a.label}</div>
                  <div style={{ fontFamily: "Playfair Display, serif", fontSize: 13, color: "#5C4030", lineHeight: 1.75, maxWidth: 260, margin: "0 auto" }}>{a.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 48, backgroundColor: "var(--p-dark)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 14, color: "var(--p-accent)", letterSpacing: "0.3em" }}>★ {role.toUpperCase()} ★ POWERED BY RESUFLOW ★</div>
          </div>
        </section>
      )}

      {/* CONTACT */}
      <section style={{ backgroundColor: "var(--p-light)", backgroundImage: "radial-gradient(circle, rgba(80,40,0,0.06) 2px, transparent 2px)", backgroundSize: "10px 10px", padding: "80px 0 0", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 24, color: "var(--p-accent)", marginBottom: 8 }}>★</div>
          <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 72, color: "var(--p-dark)", lineHeight: 0.85 }}>LET'S</div>
          <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 72, color: "var(--p-accent)", lineHeight: 0.85, marginBottom: 8 }}>CONNECT</div>
          <div style={{ fontSize: 24, color: "var(--p-accent)" }}>★</div>
        </div>
        <div style={{ maxWidth: 840, margin: "0 auto 80px", backgroundColor: "var(--p-dark)", border: "3px solid var(--p-accent)", boxShadow: "8px 8px 0 rgba(26,18,8,0.3)", padding: 56 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2px 1fr", gap: 56 }}>
            <div>
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 13, color: "var(--p-accent)", letterSpacing: "0.3em", marginBottom: 24 }}>GET IN TOUCH</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span style={{ color: "var(--p-accent)", fontSize: 18 }}>→</span>
                <a href={`mailto:${email}`} style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: 16, color: "var(--p-light)", textDecoration: "none" }}>{email}</a>
              </div>
              {linkedin && <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span style={{ color: "var(--p-accent)", fontSize: 18 }}>→</span>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "#C9A96E" }}>{linkedin.replace(/^https?:\/\//, "")}</span>
              </div>}
              {location && <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "var(--p-accent)", fontSize: 18 }}>→</span>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "#9A8060" }}>{location}</span>
              </div>}
              <div style={{ width: "100%", height: 2, backgroundColor: "rgba(245,237,216,0.15)", margin: "36px 0 28px" }} />
              <button style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 15, color: "var(--p-light)", backgroundColor: "var(--p-accent)", border: "2px solid var(--p-light)", boxShadow: "4px 4px 0 rgba(245,237,216,0.3)", height: 52, width: "100%", cursor: "pointer", marginBottom: 12 }}>SEND MESSAGE</button>
            </div>
            <div style={{ width: 2, backgroundColor: "rgba(245,237,216,0.15)" }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 12, color: "var(--p-accent)", letterSpacing: "0.3em", marginBottom: 16 }}>SCAN TO VISIT</div>
              <div style={{ width: 120, height: 120, backgroundColor: "var(--p-light)", border: "3px solid var(--p-accent)", marginBottom: 14, backgroundImage: "linear-gradient(var(--p-dark) 1px, transparent 1px), linear-gradient(90deg, var(--p-dark) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "#9A8060", marginBottom: 6 }}>resuflow.app/{slug}</div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10, color: "#6A5040" }}>© {year} {name.toUpperCase()}</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "3px solid var(--p-dark)", backgroundColor: "var(--p-light)", padding: "36px 0", textAlign: "center" }}>
          <div style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: 12, color: "var(--p-accent)", letterSpacing: "0.25em" }}>★ RETRO THEME · POWERED BY RESUFLOW · EXECUTIVE PORTFOLIO · {year} ★</div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GLASSMORPHISM — full page
// ═══════════════════════════════════════════════════════════════════════════════
export function GlassmorphismFullPage({ palette, profile, sectionVisibility }: { palette?: any; profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const email = profile?.personalInfo?.email || "";
  const location = profile?.personalInfo?.location || "";
  const summary = profile?.summary || "";
  const skills = [...(profile?.skills?.technical || []), ...(profile?.skills?.tools || []), ...(profile?.skills?.soft || [])];
  const workExp = profile?.workExperience || [];
  const projects = profile?.projects || [];
  const bg = palette?.colors?.[0] || "#0E1627";
  const accent = palette?.colors?.[1] || "#7F6269";
  const light = palette?.colors?.[2] || "#F4E1E0";
  const yrs = yearsExp(profile);

  return (
    <div style={{ background: bg, minHeight: "100%", fontFamily: "Inter, sans-serif", position: "relative", overflowX: "hidden" }}>
      {/* Ambient orbs */}
      {[[{ top: "10%", left: "5%", width: 300, height: 300 }, accent], [{ bottom: "20%", right: "5%", width: 250, height: 250 }, light], [{ top: "50%", left: "40%", width: 200, height: 200 }, "#7B2FFF"]].map(([pos, color], i) => (
        <div key={i} style={{ position: "fixed", borderRadius: "50%", background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none", zIndex: 0, ...(pos as any) }} />
      ))}

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 60px", height: 64, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>{name.split(" ")[0]}<span style={{ color: accent }}>.</span></div>
        <div style={{ display: "flex", gap: 32 }}>
          {["About", "Skills", "Experience", "Contact"].map(l => <span key={l} style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>{l}</span>)}
        </div>
        <div style={{ background: `linear-gradient(135deg, ${accent}, ${light})`, borderRadius: 100, padding: "8px 20px", fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer" }}>Hire Me</div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, padding: "0 40px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100, padding: "8px 20px", marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, ${light})` }} />
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{role}</span>
        </div>
        <h1 style={{ fontSize: 72, fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 20 }}>{name}</h1>
        {summary && <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 600, marginBottom: 36 }}>{summary}</p>}
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ background: `linear-gradient(135deg, ${accent}, ${light})`, borderRadius: 100, padding: "14px 32px", fontSize: 14, fontWeight: 600, color: "#fff", cursor: "pointer" }}>View My Work</div>
          <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100, padding: "14px 32px", fontSize: 14, color: "rgba(255,255,255,0.8)", cursor: "pointer" }}>Get In Touch</div>
        </div>
        {skills.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 40, maxWidth: 600 }}>
            {skills.slice(0, 8).map(s => <div key={s} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "6px 16px", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{s}</div>)}
          </div>
        )}
      </section>

      {/* About */}
      {vis("about") && (
        <section style={{ padding: "120px 60px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(32px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 24, padding: 80 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 200, height: 200, borderRadius: "50%", background: `linear-gradient(135deg, ${accent}60, ${light}40)`, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 64, fontWeight: 700, color: "#fff" }}>{name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 24 }}>
                  {[{ value: `${yrs}+`, label: "Years" }, { value: `${projects.length || 3}+`, label: "Projects" }, { value: location.split(",")[0] || "—", label: "Location" }].map((s, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "16px 8px", textAlign: "center" }}>
                      <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, marginBottom: 16 }}>About Me</div>
                <h2 style={{ fontSize: 44, fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 24 }}>Crafting Digital Experiences That Matter</h2>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>{summary || "A passionate professional dedicated to creating meaningful work and driving impactful results."}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {vis("skills") && skills.length > 0 && (
        <section style={{ padding: "80px 60px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, marginBottom: 12 }}>Capabilities</div>
              <h2 style={{ fontSize: 44, fontWeight: 700, color: "#fff" }}>Skills & Expertise</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[{ title: "Technical", items: profile?.skills?.technical || [] }, { title: "Tools", items: profile?.skills?.tools || [] }, { title: "Domain", items: [...(profile?.skills?.soft || []), ...(profile?.skills?.domain || [])] }].map((group, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: 32 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 20 }}>{group.title}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.items.slice(0, 8).map((s: string) => <div key={s} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "6px 12px", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{s}</div>)}
                    {group.items.length === 0 && <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>—</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {vis("experience") && workExp.length > 0 && (
        <section style={{ padding: "80px 60px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, marginBottom: 12 }}>Career</div>
              <h2 style={{ fontSize: 44, fontWeight: 700, color: "#fff" }}>Work Experience</h2>
            </div>
            {workExp.map((exp: any, i: number) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 40, marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{exp.role}</h3>
                    <div style={{ fontSize: 15, color: accent }}>{exp.company}</div>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "6px 14px", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{exp.startDate?.slice(0, 7)} – {exp.endDate === "Present" ? "Present" : exp.endDate?.slice(0, 7)}</div>
                </div>
                {exp.description && <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section style={{ padding: "120px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: accent, marginBottom: 16 }}>Let's Talk</div>
          <h2 style={{ fontSize: 56, fontWeight: 800, color: "#fff", marginBottom: 20 }}>Get In Touch</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 48 }}>Have a project in mind? I'd love to hear from you. Send me a message and let's create something great together.</p>
          <div style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(32px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 24, padding: 48 }}>
            {email && <a href={`mailto:${email}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontSize: 18, color: "#fff", textDecoration: "none", marginBottom: 24 }}><span>✉</span>{email}</a>}
            {location && <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 32 }}>📍 {location}</div>}
            <div style={{ background: `linear-gradient(135deg, ${accent}, ${light})`, borderRadius: 100, padding: "16px 40px", fontSize: 15, fontWeight: 600, color: "#fff", cursor: "pointer", display: "inline-block" }}>Send Message →</div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NEON VAULT — full page
// ═══════════════════════════════════════════════════════════════════════════════
export function NeonVaultFullPage({ palette, profile, sectionVisibility }: { palette?: any; profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Creative Developer";
  const email = profile?.personalInfo?.email || "";
  const location = profile?.personalInfo?.location || "Remote";
  const summary = profile?.summary || "";
  const skills = [...(profile?.skills?.technical || []), ...(profile?.skills?.tools || [])];
  const workExp = profile?.workExperience || [];
  const projects = profile?.projects || [];
  const yrs = yearsExp(profile);

  return (
    <div style={{ background: "#0f172a", minHeight: "100%", fontFamily: "'Syne', 'DM Sans', sans-serif", position: "relative" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');`}</style>
      {/* Grid background */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "-20%", left: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(147,51,234,0.2) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-10%", right: "-5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: 64, background: "rgba(15,23,42,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(6,182,212,0.15)" }}>
        <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.1em", color: "#fff" }}>NEON<span style={{ color: "#22d3ee" }}>VAULT</span></span>
        <div style={{ display: "flex", gap: 32 }}>{["HOME", "WORK", "SKILLS", "CONTACT"].map(l => <span key={l} style={{ fontSize: 12, color: "rgba(148,163,184,0.7)", letterSpacing: "0.1em", cursor: "pointer" }}>{l}</span>)}</div>
        <div style={{ border: "1px solid rgba(6,182,212,0.5)", color: "#22d3ee", fontSize: 12, padding: "8px 20px", borderRadius: 999, letterSpacing: "0.1em", cursor: "pointer" }}>HIRE ME</div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, textAlign: "center", padding: "0 40px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 20px", border: "1px solid rgba(6,182,212,0.3)", background: "rgba(6,182,212,0.08)", borderRadius: 999, marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22d3ee" }} />
          <span style={{ fontSize: 12, color: "#22d3ee", fontFamily: "monospace", letterSpacing: "0.06em" }}>Available for Work</span>
        </div>
        <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1, marginBottom: 8, background: "linear-gradient(90deg, #fff 0%, #22d3ee 50%, #a855f7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.03em" }}>{name.split(" ")[0].toUpperCase()}</div>
        <div style={{ fontSize: 60, fontWeight: 800, color: "#a855f7", marginBottom: 20, letterSpacing: "-0.02em" }}>{name.split(" ").slice(1).join(" ").toUpperCase() || "DEVELOPER"}</div>
        <div style={{ display: "inline-block", padding: "8px 24px", border: "1px solid rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.08)", borderRadius: 999, marginBottom: 24 }}>
          <span style={{ fontSize: 13, color: "#c084fc", fontFamily: "monospace" }}>{role} · {location}</span>
        </div>
        {summary && <p style={{ fontSize: 16, color: "rgba(148,163,184,0.85)", lineHeight: 1.7, maxWidth: 560, marginBottom: 32 }}>{summary}</p>}
        <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
          {[{ v: `${yrs}+`, l: "Yrs Exp" }, { v: `${projects.length || 12}+`, l: "Projects" }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: "#22d3ee" }}>{s.v}</div>
              <div style={{ fontSize: 11, color: "rgba(148,163,184,0.6)" }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
          <div style={{ padding: "14px 32px", borderRadius: 999, background: "linear-gradient(90deg, #06b6d4, #9333ea)", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer" }}>View My Work</div>
          <div style={{ padding: "14px 32px", borderRadius: 999, border: "1px solid rgba(6,182,212,0.5)", fontSize: 13, color: "#22d3ee", cursor: "pointer" }}>Contact Me</div>
        </div>
        {skills.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 560 }}>
          {skills.slice(0, 8).map(s => <div key={s} style={{ padding: "6px 16px", borderRadius: 999, background: "rgba(30,41,59,0.6)", border: "1px solid rgba(168,85,247,0.3)", fontSize: 12, color: "rgba(192,132,252,0.9)" }}><span style={{ color: "#22d3ee", marginRight: 4 }}>#</span>{s}</div>)}
        </div>}
      </section>

      {/* Skills */}
      {vis("skills") && skills.length > 0 && (
        <section style={{ padding: "100px 60px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#22d3ee", marginBottom: 12 }}>Arsenal</div>
            <h2 style={{ fontSize: 48, fontWeight: 800, color: "#fff", marginBottom: 48 }}>Skills & Tools</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[{ title: "Technical", items: profile?.skills?.technical || [] }, { title: "Tools", items: profile?.skills?.tools || [] }, { title: "Domain", items: [...(profile?.skills?.domain || []), ...(profile?.skills?.soft || [])] }].map((group, i) => (
                <div key={i} style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.1)", borderRadius: 16, padding: 32 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: "#22d3ee", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>{group.title}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.items.slice(0, 8).map((s: string) => <div key={s} style={{ padding: "4px 12px", borderRadius: 999, background: "rgba(30,41,59,0.6)", border: "1px solid rgba(168,85,247,0.3)", fontSize: 12, color: "rgba(192,132,252,0.9)" }}>{s}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {vis("experience") && workExp.length > 0 && (
        <section style={{ padding: "100px 60px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#22d3ee", marginBottom: 12 }}>Mission History</div>
            <h2 style={{ fontSize: 48, fontWeight: 800, color: "#fff", marginBottom: 48 }}>Experience</h2>
            {workExp.map((exp: any, i: number) => (
              <div key={i} style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(148,163,184,0.1)", borderRadius: 16, padding: 40, marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{exp.role}</h3>
                    <div style={{ fontSize: 14, color: "#a855f7" }}>{exp.company}</div>
                  </div>
                  <div style={{ border: "1px solid rgba(6,182,212,0.3)", color: "#22d3ee", fontSize: 11, fontFamily: "monospace", padding: "4px 12px", borderRadius: 999 }}>{exp.endDate === "Present" || !exp.endDate ? "ACTIVE" : "COMPLETED"}</div>
                </div>
                {exp.description && <p style={{ fontSize: 14, color: "rgba(148,163,184,0.75)", lineHeight: 1.7 }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section style={{ padding: "120px 60px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#22d3ee", marginBottom: 16 }}>Contact</div>
          <h2 style={{ fontSize: 56, fontWeight: 800, color: "#fff", marginBottom: 20 }}>Let's Connect</h2>
          <div style={{ background: "rgba(30,41,59,0.5)", border: "1px solid rgba(6,182,212,0.15)", borderRadius: 20, padding: 48 }}>
            {email && <a href={`mailto:${email}`} style={{ display: "block", fontSize: 18, color: "#22d3ee", textDecoration: "none", marginBottom: 20 }}>{email}</a>}
            {location && <div style={{ fontSize: 14, color: "rgba(148,163,184,0.6)", marginBottom: 32 }}>📍 {location}</div>}
            <div style={{ padding: "14px 40px", borderRadius: 999, background: "linear-gradient(90deg, #06b6d4, #9333ea)", fontSize: 14, fontWeight: 700, color: "#fff", cursor: "pointer", display: "inline-block" }}>Get In Touch →</div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HIGH-END MINIMALIST — full page  
// ═══════════════════════════════════════════════════════════════════════════════
export function HighEndMinimalistFullPage({ palette, profile, sectionVisibility }: { palette?: any; profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "";
  const company = profile?.workExperience?.[0]?.company || "";
  const location = profile?.personalInfo?.location || "";
  const email = profile?.personalInfo?.email || "";
  const summary = profile?.summary || "";
  const skills = profile?.skills || {};
  const workExp = profile?.workExperience || [];
  const yrs = yearsExp(profile);

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100%", fontFamily: "'DM Sans', sans-serif", color: "#111" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, background: "#fff", borderBottom: "1px solid #E5E5E5", padding: "0 64px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 50 }}>
        <div style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: "#111" }}>{name}</div>
        <div style={{ display: "flex", gap: 36 }}>{["About", "Experience", "Skills", "Contact"].map(l => <span key={l} style={{ fontSize: 13, color: "#888", cursor: "pointer", letterSpacing: "0.05em" }}>{l}</span>)}</div>
        <div style={{ border: "1.5px solid #1A2744", color: "#1A2744", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "10px 24px", cursor: "pointer" }}>Contact Me</div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "90vh", display: "flex", alignItems: "center", padding: "80px 64px", maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 80, width: "100%" }}>
          <div style={{ flex: "0 0 55%" }}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: 20 }}>Portfolio · {new Date().getFullYear()}</p>
            <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 72, fontWeight: 400, color: "#111", lineHeight: 1.05, marginBottom: 24 }}>{name}</h1>
            {role && <p style={{ fontSize: 18, fontStyle: "italic", color: "#444", fontFamily: "Playfair Display, serif", marginBottom: 12 }}>{role}</p>}
            {(company || location) && <p style={{ fontSize: 14, color: "#888", marginBottom: 24 }}>{[company, location].filter(Boolean).join(" · ")}</p>}
            {summary && <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, maxWidth: 480, marginBottom: 40 }}>{summary}</p>}
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ background: "#1A2744", color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 28px", cursor: "pointer" }}>View Experience</div>
              <div style={{ border: "1.5px solid #1A2744", color: "#1A2744", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "14px 28px", cursor: "pointer" }}>Contact Me</div>
            </div>
          </div>
          <div style={{ flex: 1, background: "#F5F4F0", minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 120, height: 120, background: "#1A2744", borderRadius: "50%", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 36, fontWeight: 700, color: "#fff", fontFamily: "Playfair Display, serif" }}>{name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[{ v: `${yrs}+`, l: "Years" }, { v: `${(profile?.projects?.length || 3)}+`, l: "Projects" }].map((s, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #E5E5E5", padding: 20, textAlign: "center" }}>
                    <div style={{ fontFamily: "Playfair Display, serif", fontSize: 32, fontWeight: 700, color: "#111" }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      {vis("experience") && workExp.length > 0 && (
        <section style={{ padding: "100px 64px", background: "#F9F8F6", maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginBottom: 60 }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 44, fontWeight: 400, color: "#111" }}>Experience</h2>
            <div style={{ width: 60, height: 1, background: "#ccc" }} />
          </div>
          {workExp.map((exp: any, i: number) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 48, marginBottom: 60, paddingBottom: 60, borderBottom: "1px solid #E5E5E5" }}>
              <div>
                <div style={{ fontSize: 12, color: "#999", marginBottom: 8 }}>{exp.startDate?.slice(0, 7)} — {exp.endDate === "Present" ? "Present" : exp.endDate?.slice(0, 7)}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#888" }}>{exp.company}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 700, color: "#111", marginBottom: 12 }}>{exp.role}</h3>
                {exp.description && <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>{exp.description}</p>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {vis("skills") && (
        <section style={{ padding: "100px 64px", maxWidth: 1300, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginBottom: 60 }}>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 44, fontWeight: 400, color: "#111" }}>Expertise</h2>
            <div style={{ width: 60, height: 1, background: "#ccc" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {[{ title: "Technical", items: skills.technical || [] }, { title: "Tools", items: skills.tools || [] }, { title: "Domain", items: [...(skills.soft || []), ...(skills.domain || [])] }].map((group, i) => (
              <div key={i}>
                <h3 style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "#888", marginBottom: 20 }}>{group.title}</h3>
                {group.items.slice(0, 8).map((s: string) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #F0EEEB" }}>
                    <span style={{ fontSize: 14, color: "#333" }}>{s}</span>
                    <div style={{ width: 60, height: 2, background: "#E5E5E5", position: "relative" }}><div style={{ width: "75%", height: "100%", background: "#1A2744", position: "absolute", top: 0, left: 0 }} /></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section style={{ padding: "100px 64px", background: "#1A2744", maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 52, fontWeight: 400, color: "#fff", lineHeight: 1.1, marginBottom: 24 }}>Let's Work Together</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>Open to new opportunities and interesting projects.</p>
          </div>
          <div>
            {email && <a href={`mailto:${email}`} style={{ display: "block", fontSize: 18, color: "#fff", textDecoration: "none", marginBottom: 16 }}>{email}</a>}
            {location && <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 36 }}>📍 {location}</div>}
            <div style={{ background: "#fff", color: "#1A2744", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "16px 32px", display: "inline-block", cursor: "pointer" }}>Send Message →</div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LUXURY HIGH-END — full page
// ═══════════════════════════════════════════════════════════════════════════════
export function LuxuryHighEndFullPage({ profile, sectionVisibility }: { profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Creative Professional";
  const email = profile?.personalInfo?.email || "";
  const location = profile?.personalInfo?.location || "";
  const summary = profile?.summary || "";
  const skills = profile?.skills || {};
  const workExp = profile?.workExperience || [];
  const yrs = yearsExp(profile);
  const gold = "#C9A96E";
  const bg = "#0C0C0E";
  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={{ background: bg, minHeight: "100%", fontFamily: "'DM Sans', sans-serif", color: "#fff" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');`}</style>
      <div style={{ position: "fixed", top: "30%", left: "25%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${gold}12 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 64px", height: 64, borderBottom: `1px solid ${gold}18`, background: "rgba(12,12,14,0.9)", backdropFilter: "blur(16px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", border: `1px solid ${gold}60`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 11, color: gold, fontWeight: 300 }}>{initials}</span>
          </div>
          <span style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{name}</span>
        </div>
        <div style={{ display: "flex", gap: 36 }}>{["Work", "About", "Skills", "Contact"].map(l => <span key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", cursor: "pointer", letterSpacing: "0.06em" }}>{l}</span>)}</div>
        <div style={{ border: `1px solid ${gold}40`, color: "rgba(255,255,255,0.5)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", padding: "10px 20px", cursor: "pointer" }}>Get In Touch</div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px 64px", maxWidth: 1300, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${gold}30`, background: `${gold}08`, padding: "4px 14px", marginBottom: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6B9E6B" }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>Open for work</span>
          </div>
          <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, marginBottom: 16 }}>{role}</p>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 80, fontWeight: 300, color: "#fff", letterSpacing: "-0.02em", lineHeight: 0.95, marginBottom: 8 }}>{name.split(" ")[0]}</h1>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 64, fontWeight: 300, color: "transparent", WebkitTextStroke: `1px ${gold}70`, letterSpacing: "-0.02em", lineHeight: 0.95, marginBottom: 32 }}>{name.split(" ").slice(1).join(" ") || role}</h1>
          {summary && <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 500, marginBottom: 40 }}>{summary}</p>}
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ background: gold, color: bg, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "14px 28px", cursor: "pointer" }}>View Work</div>
            <div style={{ border: `1px solid ${gold}40`, color: "rgba(255,255,255,0.6)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", padding: "14px 28px", cursor: "pointer" }}>Contact</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginLeft: 80 }}>
          {[{ v: `${yrs}+`, l: "Years Exp" }, { v: `${profile?.projects?.length || 3}+`, l: "Projects" }, { v: location.split(",")[0] || "Global", l: "Based In" }, { v: "Open", l: "For Work" }].map((s, i) => (
            <div key={i} style={{ border: `1px solid ${gold}14`, padding: "24px 20px", minWidth: 100 }}>
              <div style={{ fontFamily: "Playfair Display, serif", fontSize: 32, fontWeight: 300, color: gold }}>{s.v}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: 8 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      {vis("skills") && (
        <section style={{ padding: "100px 64px", maxWidth: 1300, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 60 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: gold }}>Expertise</p>
            <div style={{ flex: 1, height: 1, background: `${gold}20` }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {[{ title: "Technical", items: skills.technical || [] }, { title: "Tools", items: skills.tools || [] }, { title: "Domain", items: [...(skills.soft || []), ...(skills.domain || [])] }].map((group, i) => (
              <div key={i}>
                <h3 style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, marginBottom: 24 }}>{group.title}</h3>
                {group.items.slice(0, 8).map((s: string) => (
                  <div key={s} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${gold}10` }}>
                    <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>{s}</span>
                    <div style={{ width: 40, height: 1, background: `${gold}40` }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {vis("experience") && workExp.length > 0 && (
        <section style={{ padding: "100px 64px", maxWidth: 1300, margin: "0 auto", position: "relative", zIndex: 1, borderTop: `1px solid ${gold}14` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 60 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: gold }}>Journey</p>
            <div style={{ flex: 1, height: 1, background: `${gold}20` }} />
          </div>
          {workExp.map((exp: any, i: number) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 48, marginBottom: 56, paddingBottom: 56, borderBottom: `1px solid ${gold}10` }}>
              <div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>{exp.startDate?.slice(0, 4)} — {exp.endDate === "Present" ? "Now" : exp.endDate?.slice(0, 4)}</div>
                <div style={{ fontSize: 13, color: `${gold}80` }}>{exp.company}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 26, fontWeight: 300, color: "#fff", marginBottom: 12 }}>{exp.role}</h3>
                {exp.description && <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, fontWeight: 300 }}>{exp.description}</p>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Contact */}
      <section style={{ padding: "120px 64px", position: "relative", zIndex: 1, borderTop: `1px solid ${gold}14` }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 60, fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 24 }}>Start a Conversation</h2>
          {email && <a href={`mailto:${email}`} style={{ display: "block", fontSize: 20, color: gold, textDecoration: "none", marginBottom: 48, fontWeight: 300 }}>{email}</a>}
          <div style={{ background: gold, color: bg, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "18px 48px", display: "inline-block", cursor: "pointer" }}>Get In Touch →</div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NEUMORPHISM — full page
// ═══════════════════════════════════════════════════════════════════════════════
export function NeumorphismFullPage({ palette, profile, sectionVisibility }: { palette?: any; profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const email = profile?.personalInfo?.email || "";
  const location = profile?.personalInfo?.location || "";
  const summary = profile?.summary || "";
  const skills = profile?.skills || {};
  const workExp = profile?.workExperience || [];
  const yrs = yearsExp(profile);
  const bg = "#E8E3DC";
  const accent = "#8B7355";
  const text = "#3D3830";
  const muted = "#7A7268";
  const shadow = (inset = false) => inset
    ? "inset -3px -3px 8px rgba(255,252,247,0.8), inset 3px 3px 8px rgba(163,156,146,0.4)"
    : "-6px -6px 12px rgba(255,252,247,0.8), 6px 6px 12px rgba(163,156,146,0.4)";
  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={{ background: bg, minHeight: "100%", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <nav style={{ background: bg, boxShadow: shadow(), padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: 18, color: text }}>{name.split(" ")[0]}.</div>
        <div style={{ display: "flex", gap: 28 }}>{["About", "Skills", "Experience", "Contact"].map(l => <span key={l} style={{ fontSize: 13, color: muted, cursor: "pointer" }}>{l}</span>)}</div>
        <div style={{ background: bg, boxShadow: shadow(), borderRadius: 24, padding: "10px 24px", fontSize: 13, fontWeight: 600, color: accent, cursor: "pointer" }}>Hire Me</div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "100px 64px", maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 80 }}>
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div style={{ width: 160, height: 160, borderRadius: "50%", background: bg, boxShadow: shadow(), margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 48, fontWeight: 600, color: text }}>{initials}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[{ v: `${yrs}+`, l: "Years" }, { v: `${profile?.projects?.length || 3}+`, l: "Projects" }].map((s, i) => (
              <div key={i} style={{ background: bg, boxShadow: shadow(), borderRadius: 16, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: accent }}>{s.v}</div>
                <div style={{ fontSize: 11, color: muted, marginTop: 4, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: accent, marginBottom: 16 }}>Portfolio</p>
          <h1 style={{ fontSize: 56, fontWeight: 700, color: text, lineHeight: 1.1, marginBottom: 16 }}>{name}</h1>
          {role && <p style={{ fontSize: 18, color: accent, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>{role}</p>}
          {summary && <p style={{ fontSize: 15, color: muted, lineHeight: 1.8, maxWidth: 500, marginBottom: 36 }}>{summary}</p>}
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ background: accent, color: "#fff", fontSize: 13, fontWeight: 600, padding: "14px 32px", borderRadius: 40, cursor: "pointer" }}>View Work</div>
            <div style={{ background: bg, boxShadow: shadow(), color: text, fontSize: 13, fontWeight: 600, padding: "14px 32px", borderRadius: 40, cursor: "pointer" }}>Contact</div>
          </div>
        </div>
      </section>

      {/* Skills */}
      {vis("skills") && (
        <section style={{ padding: "80px 64px", background: bg, maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: text, marginBottom: 48 }}>Skills</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[{ title: "Technical", items: skills.technical || [] }, { title: "Tools", items: skills.tools || [] }, { title: "Soft", items: [...(skills.soft || []), ...(skills.domain || [])] }].map((group, i) => (
              <div key={i} style={{ background: bg, boxShadow: shadow(), borderRadius: 20, padding: 28 }}>
                <h3 style={{ fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: accent, marginBottom: 20 }}>{group.title}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {group.items.slice(0, 8).map((s: string) => <div key={s} style={{ background: bg, boxShadow: shadow(true), borderRadius: 20, padding: "6px 14px", fontSize: 12, color: muted }}>{s}</div>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {vis("experience") && workExp.length > 0 && (
        <section style={{ padding: "80px 64px", maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, color: text, marginBottom: 48 }}>Experience</h2>
          {workExp.map((exp: any, i: number) => (
            <div key={i} style={{ background: bg, boxShadow: shadow(), borderRadius: 20, padding: 36, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: text, marginBottom: 4 }}>{exp.role}</h3>
                  <div style={{ fontSize: 14, color: accent }}>{exp.company}</div>
                </div>
                <div style={{ background: bg, boxShadow: shadow(true), borderRadius: 20, padding: "8px 16px", fontSize: 12, color: muted, alignSelf: "flex-start" }}>{exp.startDate?.slice(0, 4)} — {exp.endDate === "Present" ? "Now" : exp.endDate?.slice(0, 4)}</div>
              </div>
              {exp.description && <p style={{ fontSize: 14, color: muted, lineHeight: 1.7 }}>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Contact */}
      <section style={{ padding: "80px 64px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: bg, boxShadow: shadow(), borderRadius: 28, padding: 60, textAlign: "center" }}>
          <h2 style={{ fontSize: 44, fontWeight: 700, color: text, marginBottom: 16 }}>Let's Connect</h2>
          {email && <a href={`mailto:${email}`} style={{ display: "block", fontSize: 18, color: accent, textDecoration: "none", marginBottom: 12 }}>{email}</a>}
          {location && <div style={{ fontSize: 14, color: muted, marginBottom: 36 }}>📍 {location}</div>}
          <div style={{ display: "inline-block", background: accent, color: "#fff", fontSize: 14, fontWeight: 600, padding: "16px 40px", borderRadius: 40, cursor: "pointer" }}>Send a Message</div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SKEUOMORPHISM — full page
// ═══════════════════════════════════════════════════════════════════════════════
export function SkeuomorphismFullPage({ palette, profile, sectionVisibility }: { palette?: any; profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const email = profile?.personalInfo?.email || "";
  const location = profile?.personalInfo?.location || "";
  const summary = profile?.summary || "";
  const skills = profile?.skills || {};
  const workExp = profile?.workExperience || [];
  const education = profile?.education || [];
  const achievements = profile?.achievements || [];
  const yrs = yearsExp(profile);
  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
  const gold = "#C9A96E";
  const darkBrown = "#1A1004";

  return (
    <div style={{ background: "#0E0A04", minHeight: "100%", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* Nav */}
      <nav style={{ background: "linear-gradient(to bottom, #2A1E08, #1A1004)", padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(201,169,110,0.2)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ fontFamily: "Playfair Display, serif", fontSize: 18, fontWeight: 700, color: gold }}>{name}</div>
        <div style={{ display: "flex", gap: 28 }}>{["About", "Experience", "Skills", "Contact"].map(l => <span key={l} style={{ fontSize: 13, color: "rgba(201,169,110,0.6)", cursor: "pointer" }}>{l}</span>)}</div>
        <div style={{ background: `linear-gradient(to bottom, ${gold}, #A07840)`, color: darkBrown, fontSize: 12, fontWeight: 700, padding: "10px 24px", borderRadius: 6, cursor: "pointer", border: "1px solid rgba(255,255,255,0.2)" }}>Hire Me</div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 64px", maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 80 }}>
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div style={{ width: 160, height: 160, borderRadius: "50%", background: darkBrown, border: "3px solid rgba(201,169,110,0.4)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 48, fontWeight: 700, color: gold, fontFamily: "Playfair Display, serif" }}>{initials}</span>
          </div>
          <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
            {[{ v: `${yrs}+`, l: "Years" }, { v: `${profile?.projects?.length || 3}+`, l: "Projects" }].map((s, i) => (
              <div key={i} style={{ background: `linear-gradient(to bottom, ${gold}, #A07840)`, borderRadius: 12, padding: "16px 24px", textAlign: "center", border: "1px solid rgba(255,255,255,0.15)" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: darkBrown, fontFamily: "Playfair Display, serif" }}>{s.v}</div>
                <div style={{ fontSize: 10, color: darkBrown, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: 56, fontWeight: 700, color: gold, lineHeight: 1.1, marginBottom: 16 }}>{name}</h1>
          {role && <p style={{ fontSize: 16, color: "rgba(201,169,110,0.6)", marginBottom: 20 }}>{role}</p>}
          {summary && <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 500, marginBottom: 36 }}>{summary}</p>}
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ background: `linear-gradient(to bottom, ${gold}, #A07840)`, color: darkBrown, fontSize: 13, fontWeight: 700, padding: "14px 32px", borderRadius: 8, cursor: "pointer", border: "1px solid rgba(255,255,255,0.2)" }}>View Portfolio</div>
            <div style={{ border: `1px solid ${gold}40`, color: "rgba(201,169,110,0.7)", fontSize: 13, padding: "14px 32px", borderRadius: 8, cursor: "pointer" }}>Contact Me</div>
          </div>
        </div>
      </section>

      {/* Skills */}
      {vis("skills") && (
        <section style={{ padding: "80px 64px", maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 36, color: gold, marginBottom: 48 }}>Expertise</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {[{ title: "Technical", items: skills.technical || [] }, { title: "Tools", items: skills.tools || [] }, { title: "Domain", items: [...(skills.soft || []), ...(skills.domain || [])] }].map((group, i) => (
              <div key={i} style={{ background: `linear-gradient(to bottom, ${gold}, #A07840)`, borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(0,0,0,0.5) 1px, rgba(0,0,0,0.5) 2px)", pointerEvents: "none" }} />
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 16, fontWeight: 700, color: darkBrown, marginBottom: 20, position: "relative" }}>{group.title}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, position: "relative" }}>
                  {group.items.slice(0, 8).map((s: string) => <div key={s} style={{ background: "rgba(0,0,0,0.15)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 16, padding: "6px 14px", fontSize: 12, color: darkBrown }}>{s}</div>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {vis("experience") && workExp.length > 0 && (
        <section style={{ padding: "80px 64px", maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 36, color: gold, marginBottom: 48 }}>Career</h2>
          {workExp.map((exp: any, i: number) => (
            <div key={i} style={{ background: "linear-gradient(to right, rgba(26,16,4,0.8), rgba(26,16,4,0.4))", border: `1px solid ${gold}20`, borderLeft: `3px solid ${gold}`, borderRadius: 12, padding: 36, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, color: gold, marginBottom: 4 }}>{exp.role}</h3>
                  <div style={{ fontSize: 14, color: "rgba(201,169,110,0.6)" }}>{exp.company}</div>
                </div>
                <div style={{ fontSize: 12, color: "rgba(201,169,110,0.4)" }}>{exp.startDate?.slice(0, 4)} — {exp.endDate === "Present" ? "Present" : exp.endDate?.slice(0, 4)}</div>
              </div>
              {exp.description && <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Contact */}
      <section style={{ padding: "80px 64px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ background: `linear-gradient(135deg, ${gold}, #A07840)`, borderRadius: 24, padding: 60, textAlign: "center", border: "1px solid rgba(255,255,255,0.2)", boxShadow: "0 16px 48px rgba(0,0,0,0.5)" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 44, fontWeight: 700, color: darkBrown, marginBottom: 16 }}>Get In Touch</h2>
          {email && <a href={`mailto:${email}`} style={{ display: "block", fontSize: 18, color: darkBrown, textDecoration: "none", marginBottom: 12, opacity: 0.8 }}>{email}</a>}
          {location && <div style={{ fontSize: 14, color: "rgba(26,16,4,0.6)", marginBottom: 36 }}>📍 {location}</div>}
          <div style={{ background: darkBrown, color: gold, fontSize: 14, fontWeight: 700, padding: "16px 40px", borderRadius: 8, display: "inline-block", cursor: "pointer" }}>Send Message →</div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MUSICIAN — full page
// ═══════════════════════════════════════════════════════════════════════════════
export function MusicianFullPage({ profile, sectionVisibility }: { profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Artist & Performer";
  const email = profile?.personalInfo?.email || "";
  const location = profile?.personalInfo?.location || "";
  const summary = profile?.summary || "";
  const skills = [...(profile?.skills?.technical || []), ...(profile?.skills?.domain || []), ...(profile?.skills?.tools || [])];
  const workExp = profile?.workExperience || [];
  const projects = profile?.projects || [];
  const yrs = yearsExp(profile);

  return (
    <div style={{ background: "linear-gradient(135deg, #080B14 0%, #0A0D18 100%)", minHeight: "100%", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: "fixed", top: "15%", right: "8%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(194,24,91,0.35) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "15%", left: "5%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(106,27,154,0.3) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: 64, background: "rgba(8,11,20,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(194,24,91,0.12)" }}>
        <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "0.1em", color: "#F0EEF5" }}>{name.split(" ")[0].toUpperCase()}<span style={{ color: "#C2185B" }}> {name.split(" ").slice(1).join(" ").toUpperCase()}</span></span>
        <div style={{ display: "flex", gap: 28 }}>{["Work", "About", "Skills", "Contact"].map(l => <span key={l} style={{ fontSize: 13, color: "rgba(158,155,176,0.7)", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.1em" }}>{l}</span>)}</div>
        <div style={{ fontSize: 12, padding: "8px 20px", border: "1px solid rgba(194,24,91,0.4)", color: "#F0EEF5", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>Hire Me</div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 64px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {(skills.length > 0 ? skills : ["Creative", "Performer", "Artist"]).slice(0, 3).map((g: string) => <span key={g} style={{ padding: "6px 16px", border: "1px solid rgba(194,24,91,0.3)", background: "rgba(194,24,91,0.06)", borderRadius: 4, fontSize: 11, color: "#9E9BB0", textTransform: "uppercase", letterSpacing: "0.1em" }}>{g}</span>)}
        </div>
        <h1 style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: 96, fontWeight: 700, fontStyle: "italic", color: "#F0EEF5", lineHeight: 0.92, letterSpacing: "-0.02em", marginBottom: 16 }}>{name}</h1>
        <div style={{ fontSize: 16, color: "#C2185B", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 24 }}>{role}</div>
        {summary && <p style={{ fontSize: 16, color: "#9E9BB0", lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>{summary}</p>}
        <div style={{ display: "flex", gap: 24, marginBottom: 40 }}>
          {[{ v: `${yrs}+`, l: "Years" }, { v: `${projects.length || 12}+`, l: "Projects" }].map((s, i) => (
            <div key={i} style={{ position: "relative" }}>
              {i > 0 && <div style={{ position: "absolute", left: -12, top: 0, bottom: 0, width: 1, background: "rgba(240,238,245,0.08)" }} />}
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: 40, color: "#F0EEF5", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: 11, color: "#9E9BB0", textTransform: "uppercase", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ padding: "14px 32px", background: "linear-gradient(to right, #C2185B, #6A1B9A)", fontSize: 13, fontWeight: 700, color: "#F0EEF5", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer" }}>View Work</div>
          <div style={{ padding: "14px 32px", border: "1px solid rgba(194,24,91,0.4)", fontSize: 13, color: "#9E9BB0", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer" }}>Contact</div>
        </div>
      </section>

      {/* Experience / Projects */}
      {vis("experience") && workExp.length > 0 && (
        <section style={{ padding: "100px 64px", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 48, fontStyle: "italic", color: "#F0EEF5", marginBottom: 48 }}>Experience</h2>
          {workExp.map((exp: any, i: number) => (
            <div key={i} style={{ background: "rgba(240,238,245,0.03)", border: "1px solid rgba(194,24,91,0.12)", padding: 36, marginBottom: 20, borderLeft: "3px solid #C2185B" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontStyle: "italic", color: "#F0EEF5", marginBottom: 6 }}>{exp.role}</h3>
                  <div style={{ fontSize: 14, color: "#C2185B" }}>{exp.company}</div>
                </div>
                <div style={{ fontSize: 12, color: "rgba(158,155,176,0.5)", fontFamily: "Space Mono, monospace" }}>{exp.startDate?.slice(0, 4)} — {exp.endDate === "Present" ? "NOW" : exp.endDate?.slice(0, 4)}</div>
              </div>
              {exp.description && <p style={{ fontSize: 14, color: "#9E9BB0", lineHeight: 1.7 }}>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Contact */}
      <section style={{ padding: "120px 64px", position: "relative", zIndex: 1, borderTop: "1px solid rgba(194,24,91,0.12)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: 56, fontStyle: "italic", color: "#F0EEF5", marginBottom: 20 }}>Let's Create Together</h2>
          {email && <a href={`mailto:${email}`} style={{ display: "block", fontSize: 18, color: "#C2185B", textDecoration: "none", marginBottom: 40 }}>{email}</a>}
          <div style={{ background: "linear-gradient(to right, #C2185B, #6A1B9A)", padding: "16px 48px", fontSize: 14, fontWeight: 700, color: "#F0EEF5", textTransform: "uppercase", letterSpacing: "0.1em", display: "inline-block", cursor: "pointer" }}>Get In Touch →</div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EDITORIAL — full page
// ═══════════════════════════════════════════════════════════════════════════════
export function EditorialFullPage({ palette, profile, sectionVisibility }: { palette?: any; profile: any; sectionVisibility?: Record<string, boolean> }) {
  const editAccent = palette?.colors?.[1] || "var(--p-accent)";
  const editDark   = palette?.colors?.[0] || "#1A1A1A";
  const editLight  = palette?.colors?.[2] || "#F2EDE4";
  const editVars   = { "--p-accent": editAccent, "--p-dark": editDark, "--p-light": editLight } as React.CSSProperties;
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const email = profile?.personalInfo?.email || "";
  const location = profile?.personalInfo?.location || "";
  const summary = profile?.summary || "";
  const skills = profile?.skills || {};
  const workExp = profile?.workExperience || [];
  const yrs = yearsExp(profile);
  const [firstName, ...lastParts] = name.toUpperCase().split(" ");
  const lastName = lastParts.join(" ");

  return (
    <div style={{ ...editVars, background: editLight, minHeight: "100%", fontFamily: "Georgia, 'Playfair Display', serif" }}>
      {/* Newspaper header nav */}
      <nav style={{ borderBottom: "3px solid #1A1A1A", position: "sticky", top: 0, background: "#F2EDE4", zIndex: 50 }}>
        <div style={{ borderBottom: "1px solid #D8D0C4", padding: "8px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.15em", fontStyle: "italic", color: "#888", fontFamily: "DM Sans, sans-serif" }}>PORTFOLIO № 01 · {new Date().getFullYear()}</span>
          <span style={{ fontSize: 11, color: "var(--p-accent)", fontFamily: "DM Sans, sans-serif", textTransform: "uppercase", letterSpacing: "0.2em" }}>ESTABLISHED {new Date().getFullYear()}</span>
          <span style={{ fontSize: 11, letterSpacing: "0.1em", color: "#888", fontFamily: "DM Sans, sans-serif" }}>{location}</span>
        </div>
        <div style={{ padding: "16px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 32 }}>{["WORK", "ABOUT", "SKILLS"].map(l => <span key={l} style={{ fontSize: 11, letterSpacing: "0.15em", color: "#888", cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>{l}</span>)}</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: "#1A1A1A", letterSpacing: "-0.02em" }}>{name.toUpperCase()}</h1>
          <div style={{ background: "#1A1A1A", color: "#F2EDE4", fontSize: 11, fontFamily: "DM Sans, sans-serif", fontWeight: 700, letterSpacing: "0.15em", padding: "10px 20px", cursor: "pointer" }}>CONTACT →</div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ display: "grid", gridTemplateColumns: "52% 48%", minHeight: "85vh" }}>
        <div style={{ background: "#C8C0B4", position: "relative", display: "flex", alignItems: "flex-end", padding: 40 }}>
          <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
            <div style={{ fontSize: 120, fontWeight: 900, color: "rgba(26,26,26,0.08)", letterSpacing: "-0.05em", lineHeight: 1, fontFamily: "Georgia, serif" }}>№</div>
          </div>
          {role && <div style={{ background: "rgba(242,237,228,0.9)", border: "1px solid rgba(0,0,0,0.12)", padding: "8px 20px", fontSize: 11, letterSpacing: "0.15em", color: "#333", fontFamily: "DM Sans, sans-serif", textTransform: "uppercase" }}>{role}</div>}
        </div>
        <div style={{ padding: "60px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ width: 48, height: 2, background: "#C8B89A", marginBottom: 20 }} />
          <span style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--p-accent)", textTransform: "uppercase", fontFamily: "DM Sans, sans-serif", marginBottom: 16 }}>Featured Portfolio</span>
          <div style={{ lineHeight: 0.92, marginBottom: 20 }}>
            <div style={{ fontSize: 80, fontWeight: 900, color: "#1A1A1A", letterSpacing: "-0.02em" }}>{firstName}</div>
            {lastName && <div style={{ fontSize: 60, fontWeight: 900, color: "var(--p-accent)", letterSpacing: "-0.02em" }}>{lastName}</div>}
          </div>
          {role && <div style={{ width: 48, height: 2, background: "#C8B89A", marginBottom: 16 }} />}
          {role && <p style={{ fontSize: 15, color: "#444", fontStyle: "italic", marginBottom: 12 }}>{role}</p>}
          {location && <p style={{ fontSize: 12, color: "#888", fontFamily: "DM Sans, sans-serif", marginBottom: 28 }}>{location} — Open to Opportunities</p>}
          {summary && <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8, maxWidth: 400, marginBottom: 36, fontFamily: "DM Sans, sans-serif" }}>{summary}</p>}
          <div style={{ background: "#1A1A1A", color: "#F2EDE4", fontSize: 12, fontFamily: "DM Sans, sans-serif", fontWeight: 700, letterSpacing: "0.12em", padding: "14px 24px", display: "inline-block", cursor: "pointer" }}>VIEW MY WORK →</div>
        </div>
      </section>

      {/* About / Skills */}
      {vis("skills") && (
        <section style={{ padding: "100px 64px", borderTop: "3px solid #1A1A1A" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 60 }}>
            {[{ title: "Technical", items: skills.technical || [] }, { title: "Tools", items: skills.tools || [] }, { title: "Domain", items: [...(skills.soft || []), ...(skills.domain || [])] }].map((group, i) => (
              <div key={i}>
                <div style={{ borderBottom: "2px solid #1A1A1A", paddingBottom: 12, marginBottom: 24 }}>
                  <h3 style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--p-accent)", fontFamily: "DM Sans, sans-serif" }}>{group.title}</h3>
                </div>
                {group.items.slice(0, 8).map((s: string) => (
                  <div key={s} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #D8D0C4", fontFamily: "DM Sans, sans-serif" }}>
                    <span style={{ fontSize: 14, color: "#333" }}>{s}</span>
                    <span style={{ fontSize: 11, color: "var(--p-accent)" }}>●</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {vis("experience") && workExp.length > 0 && (
        <section style={{ padding: "80px 64px", borderTop: "3px solid #1A1A1A", background: "#EDE7DC" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginBottom: 60 }}>
            <h2 style={{ fontSize: 48, fontWeight: 900, color: "#1A1A1A", letterSpacing: "-0.02em" }}>CAREER</h2>
            <div style={{ flex: 1, height: 2, background: "#C8B89A" }} />
          </div>
          {workExp.map((exp: any, i: number) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 48, marginBottom: 60, paddingBottom: 60, borderBottom: "1px solid #D8D0C4" }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--p-accent)", fontFamily: "DM Sans, sans-serif", marginBottom: 4 }}>{exp.startDate?.slice(0, 4)} — {exp.endDate === "Present" ? "NOW" : exp.endDate?.slice(0, 4)}</div>
                <div style={{ fontSize: 12, color: "#666", fontFamily: "DM Sans, sans-serif" }}>{exp.company}</div>
              </div>
              <div>
                <h3 style={{ fontSize: 28, fontWeight: 900, color: "#1A1A1A", letterSpacing: "-0.01em", marginBottom: 12 }}>{exp.role}</h3>
                {exp.description && <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8, fontFamily: "DM Sans, sans-serif" }}>{exp.description}</p>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Contact */}
      <section style={{ padding: "100px 64px", borderTop: "3px solid #1A1A1A", background: "#1A1A1A" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--p-accent)", fontFamily: "DM Sans, sans-serif", marginBottom: 16 }}>GET IN TOUCH</p>
            <h2 style={{ fontSize: 64, fontWeight: 900, color: "#F2EDE4", letterSpacing: "-0.02em", lineHeight: 0.95, marginBottom: 32 }}>LET'S WORK.</h2>
          </div>
          <div>
            {email && <a href={`mailto:${email}`} style={{ display: "block", fontSize: 18, fontStyle: "italic", color: "#F2EDE4", textDecoration: "none", marginBottom: 20 }}>{email}</a>}
            {location && <div style={{ fontSize: 14, color: "rgba(242,237,228,0.5)", fontFamily: "DM Sans, sans-serif", marginBottom: 40 }}>📍 {location}</div>}
            <div style={{ background: "var(--p-accent)", color: "#F2EDE4", fontSize: 13, fontFamily: "DM Sans, sans-serif", fontWeight: 700, letterSpacing: "0.15em", padding: "16px 32px", display: "inline-block", cursor: "pointer" }}>SEND MESSAGE →</div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BENTO — full page
// ═══════════════════════════════════════════════════════════════════════════════
export function BentoFullPage({ palette, profile, sectionVisibility }: { palette?: any; profile: any; sectionVisibility?: Record<string, boolean> }) {
  const bentoAccent    = palette?.colors?.[1] || "var(--p-accent)";
  const bentoSecondary = palette?.colors?.[4] || "var(--p-secondary)";
  const bentoDark      = palette?.colors?.[0] || "var(--p-dark)";
  const bentoVars      = { "--p-accent": bentoAccent, "--p-secondary": bentoSecondary, "--p-dark": bentoDark } as React.CSSProperties;
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const email = profile?.personalInfo?.email || "";
  const location = profile?.personalInfo?.location || "";
  const summary = profile?.summary || "";
  const skills = [...(profile?.skills?.technical || []), ...(profile?.skills?.tools || [])];
  const workExp = profile?.workExperience || [];
  const projects = profile?.projects || [];
  const yrs = yearsExp(profile);
  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={{ ...bentoVars, background: "#F0F0F0", minHeight: "100%", fontFamily: "'DM Sans', sans-serif", padding: 16, boxSizing: "border-box" }}>
      {/* Top bento grid — hero */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "auto", gap: 12, marginBottom: 12 }}>
        {/* Main card */}
        <div style={{ background: "var(--p-dark)", borderRadius: 20, padding: 40, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 280 }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 8 }}>{role}</div>
            <div style={{ fontSize: 60, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.02em" }}>{name.split(" ")[0].toUpperCase()}</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: "var(--p-accent)", lineHeight: 1, letterSpacing: "-0.02em" }}>{name.split(" ").slice(1).join(" ").toUpperCase()}</div>
          </div>
          {summary && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginTop: 16 }}>{summary.slice(0, 120)}…</p>}
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            {["GH", "LI", "TW"].map(s => <div key={s} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>{s}</div>)}
          </div>
        </div>
        {/* Profile card */}
        <div style={{ background: "#fff", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#F0F0F0", border: "3px solid #E8E8E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "var(--p-dark)" }}>{initials}</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--p-dark)", textAlign: "center" }}>{name}</div>
          <div style={{ fontSize: 12, color: "#666", textAlign: "center" }}>{role}</div>
          <div style={{ background: "#E8F8EE", border: "1px solid #4ade80", borderRadius: 999, padding: "4px 14px", fontSize: 11, color: "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />Available
          </div>
          {location && <div style={{ fontSize: 12, color: "#888", textAlign: "center" }}>📍 {location}</div>}
        </div>
        {/* Stats card */}
        <div style={{ background: "var(--p-accent)", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(0,0,0,0.5)", textTransform: "uppercase" }}>By The Numbers</div>
          <div>
            <div style={{ fontSize: 48, fontWeight: 900, color: "var(--p-dark)", lineHeight: 1 }}>{projects.length || 3}+</div>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}>Projects</div>
          </div>
          <div>
            <div style={{ fontSize: 48, fontWeight: 900, color: "var(--p-dark)", lineHeight: 1 }}>{yrs}+</div>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}>Years Exp</div>
          </div>
        </div>
      </div>

      {/* Skills row */}
      {vis("skills") && skills.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12, marginBottom: 12 }}>
          <div style={{ background: "var(--p-secondary)", borderRadius: 20, padding: 32, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.3, marginBottom: 16 }}>Let's work together →</div>
            <div style={{ background: "#fff", borderRadius: 999, padding: "10px 24px", fontSize: 13, fontWeight: 700, color: "var(--p-secondary)", display: "inline-block", cursor: "pointer" }}>Hire Me</div>
          </div>
          <div style={{ background: "var(--p-dark)", borderRadius: 20, padding: 28 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 16 }}>Tech Stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {skills.map((s: string) => <div key={s} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "6px 16px", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{s}</div>)}
            </div>
          </div>
        </div>
      )}

      {/* About + Experience */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 12, marginBottom: 12 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 28 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#888", textTransform: "uppercase", marginBottom: 12 }}>About</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--p-dark)", marginBottom: 12 }}>A bit about me.</div>
          {summary && <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{summary}</p>}
        </div>
        {vis("experience") && workExp.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 20, padding: 28 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#888", textTransform: "uppercase", marginBottom: 20 }}>Experience</div>
            {workExp.slice(0, 3).map((exp: any, i: number) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, paddingBottom: 20, borderBottom: i < workExp.length - 1 && i < 2 ? "1px solid #F0F0F0" : "none" }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--p-dark)", marginBottom: 4 }}>{exp.role}</h3>
                  <div style={{ fontSize: 13, color: "var(--p-secondary)" }}>{exp.company}</div>
                </div>
                <div style={{ fontSize: 11, color: "#888", flexShrink: 0, marginLeft: 16 }}>{exp.startDate?.slice(0, 4)}–{exp.endDate === "Present" ? "Now" : exp.endDate?.slice(0, 4)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact */}
      <div style={{ background: "var(--p-dark)", borderRadius: 20, padding: 48, textAlign: "center" }}>
        <div style={{ fontSize: 12, letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: 12 }}>Contact</div>
        <h2 style={{ fontSize: 48, fontWeight: 900, color: "#fff", marginBottom: 16 }}>Let's Connect.</h2>
        {email && <a href={`mailto:${email}`} style={{ display: "block", fontSize: 18, color: "var(--p-accent)", textDecoration: "none", marginBottom: 32 }}>{email}</a>}
        <div style={{ background: "var(--p-accent)", color: "var(--p-dark)", fontSize: 14, fontWeight: 700, padding: "16px 40px", borderRadius: 999, display: "inline-block", cursor: "pointer" }}>Get In Touch →</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// GLASS DARK — full page
// ═══════════════════════════════════════════════════════════════════════════════
export function GlassDarkFullPage({ palette, profile, sectionVisibility }: { palette?: any; profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const email = profile?.personalInfo?.email || "";
  const location = profile?.personalInfo?.location || "";
  const summary = profile?.summary || "";
  const skills = [...(profile?.skills?.technical || []), ...(profile?.skills?.tools || [])];
  const workExp = profile?.workExperience || [];
  const yrs = yearsExp(profile);
  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div style={{ background: "linear-gradient(135deg, #0d0015 0%, #1a0028 50%, #0a0018 100%)", minHeight: "100%", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: "fixed", top: "-15%", left: "-5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,80,192,0.3) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-10%", right: "-5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(65,88,208,0.3) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", height: 64, background: "rgba(13,0,21,0.8)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: "0.08em" }}>{name.toUpperCase()}</span>
        <div style={{ display: "flex", gap: 28 }}>{["About", "Work", "Skills", "Contact"].map(l => <span key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>{l}</span>)}</div>
        <div style={{ border: "1px solid rgba(200,80,192,0.4)", color: "#C850C0", fontSize: 12, padding: "8px 20px", borderRadius: 8, cursor: "pointer" }}>Hire Me</div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "90vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, padding: "80px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(200,80,192,0.1)", border: "1px solid rgba(200,80,192,0.25)", borderRadius: 100, padding: "8px 24px", marginBottom: 40 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C850C0" }} />
          <span style={{ fontSize: 13, color: "#C850C0" }}>Available for Work</span>
        </div>
        <div style={{ width: 100, height: 100, borderRadius: "50%", background: "linear-gradient(135deg, #C850C0, #4158D0)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
          <span style={{ fontSize: 32, fontWeight: 700, color: "#fff" }}>{initials}</span>
        </div>
        <h1 style={{ fontSize: 72, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 16 }}>{name}</h1>
        {role && <p style={{ fontSize: 18, background: "linear-gradient(90deg, #C850C0, #4158D0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 20 }}>{role}</p>}
        {summary && <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>{summary}</p>}
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ background: "linear-gradient(135deg, #C850C0, #4158D0)", color: "#fff", fontSize: 14, fontWeight: 600, padding: "14px 32px", borderRadius: 10, cursor: "pointer" }}>View Work</div>
          <div style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", fontSize: 14, padding: "14px 32px", borderRadius: 10, cursor: "pointer" }}>Contact</div>
        </div>
      </section>

      {/* Skills */}
      {vis("skills") && skills.length > 0 && (
        <section style={{ padding: "100px 64px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <h2 style={{ fontSize: 44, fontWeight: 600, color: "#fff", marginBottom: 48 }}>Skills</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[{ title: "Technical", items: profile?.skills?.technical || [] }, { title: "Tools", items: profile?.skills?.tools || [] }, { title: "Domain", items: [...(profile?.skills?.domain || []), ...(profile?.skills?.soft || [])] }].map((group, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 16, padding: 28 }}>
                  <h3 style={{ fontSize: 13, color: "rgba(200,80,192,0.9)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>{group.title}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.items.slice(0, 8).map((s: string) => <div key={s} style={{ background: "rgba(200,80,192,0.1)", border: "1px solid rgba(200,80,192,0.2)", borderRadius: 999, padding: "4px 14px", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{s}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {vis("experience") && workExp.length > 0 && (
        <section style={{ padding: "100px 64px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: 44, fontWeight: 600, color: "#fff", marginBottom: 48 }}>Experience</h2>
            {workExp.map((exp: any, i: number) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 16, padding: 36, marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 22, fontWeight: 600, color: "#fff", marginBottom: 6 }}>{exp.role}</h3>
                    <div style={{ fontSize: 14, background: "linear-gradient(90deg, #C850C0, #4158D0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{exp.company}</div>
                  </div>
                  <div style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "6px 14px", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{exp.startDate?.slice(0, 4)} – {exp.endDate === "Present" ? "Now" : exp.endDate?.slice(0, 4)}</div>
                </div>
                {exp.description && <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section style={{ padding: "120px 64px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 56, fontWeight: 600, color: "#fff", marginBottom: 20 }}>Let's Connect</h2>
          <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 24, padding: 48 }}>
            {email && <a href={`mailto:${email}`} style={{ display: "block", fontSize: 18, background: "linear-gradient(90deg, #C850C0, #4158D0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none", marginBottom: 32 }}>{email}</a>}
            <div style={{ background: "linear-gradient(135deg, #C850C0, #4158D0)", color: "#fff", fontSize: 14, fontWeight: 600, padding: "16px 40px", borderRadius: 10, display: "inline-block", cursor: "pointer" }}>Get In Touch →</div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROUTER — picks the right full-page component
// ═══════════════════════════════════════════════════════════════════════════════
export function FullPageLivePreview({ templateId, palette, profile, sectionVisibility }: {
  templateId: string;
  palette?: any;
  profile: any;
  sectionVisibility?: Record<string, boolean>;
}) {
  switch (templateId) {
    case "retro": return <RetroFullPage profile={profile} sectionVisibility={sectionVisibility} />;
    case "glassmorphism": return <GlassmorphismFullPage palette={palette} profile={profile} sectionVisibility={sectionVisibility} />;
    case "neon-vault": return <NeonVaultFullPage profile={profile} sectionVisibility={sectionVisibility} />;
    case "highendminimalist": return <HighEndMinimalistFullPage profile={profile} sectionVisibility={sectionVisibility} />;
    case "luxuryhighend": return <LuxuryHighEndFullPage profile={profile} sectionVisibility={sectionVisibility} />;
    case "neumorphism": return <NeumorphismFullPage profile={profile} sectionVisibility={sectionVisibility} />;
    case "skeuomorphism": return <SkeuomorphismFullPage profile={profile} sectionVisibility={sectionVisibility} />;
    case "musician": return <MusicianFullPage profile={profile} sectionVisibility={sectionVisibility} />;
    case "editorial": return <EditorialFullPage profile={profile} sectionVisibility={sectionVisibility} />;
    case "bento": return <BentoFullPage profile={profile} sectionVisibility={sectionVisibility} />;
    case "glassdark": return <GlassDarkFullPage profile={profile} sectionVisibility={sectionVisibility} />;
    default: return <GlassmorphismFullPage palette={palette} profile={profile} sectionVisibility={sectionVisibility} />;
  }
}
