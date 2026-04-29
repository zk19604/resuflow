import { useState, useEffect, useRef } from "react";

const TEMPLATE_ROUTE_MAP: Record<string, string> = {
  glassmorphism: "glassmorphism",
  highendminimalist: "highendminimalist",
  editorial: "editorial",
  bento: "bento",
  neumorphism: "neumorphism",
  "neon-vault": "neon-vault",
  glassdark: "glassDark",
  skeuomorphism: "skeuomorphism",
  retro: "retro",
};

/** Renders the actual portfolio-templates page scaled to fit its container */
export function ScaledIframe({ templateId }: { templateId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const PORTFOLIO_BASE = import.meta.env.VITE_PORTFOLIO_BASE_URL || "https://portfolio-templates-delta.vercel.app";
  const route = TEMPLATE_ROUTE_MAP[templateId] || templateId;
  const scale = containerSize.width > 0 ? containerSize.width / 1440 : 0;
  const iframeHeight = scale > 0 ? containerSize.height / scale : 900;

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
      {scale > 0 && (
        <iframe
          src={`${PORTFOLIO_BASE}/${route}`}
          style={{
            width: "1440px",
            height: `${iframeHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            border: "none",
            pointerEvents: "none",
            display: "block",
            overflow: "hidden",
          }}
          title={`${templateId} preview`}
        />
      )}
    </div>
  );
}

export type PaletteRow = {
  name: string;
  colors: string[];
};

export const defaultPalette: PaletteRow = {
  name: "Rose Navy",
  colors: ["#0E1627", "#7F6269", "#F4E1E0", "#BDB8B9", "#E5C5C1"],
};

export function GlassmorphismPreview({
  palette = defaultPalette,
  profile,
  sectionVisibility,
}: {
  palette?: PaletteRow;
  profile: any;
  sectionVisibility?: Record<string, boolean>;
}) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const summary = vis("About") ? (profile?.summary || "") : "";
  const skills: string[] = vis("Skills") ? [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
    ...(profile?.skills?.soft || []),
  ].slice(0, 5) : [];

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
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "90%",
        }}
      >
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
          <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: `linear-gradient(135deg,${accent},${light})` }} />
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.8)", letterSpacing: "0.04em" }}>{role}</span>
        </div>
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
        <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "14px" }}>
          <div style={{ background: `linear-gradient(135deg, ${accent}, ${light})`, borderRadius: "100px", padding: "6px 16px", fontSize: "8px", color: "#fff", fontWeight: 600 }}>
            View My Work
          </div>
          <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "6px 16px", fontSize: "8px", color: "rgba(255,255,255,0.8)" }}>
            Get In Touch
          </div>
        </div>
        {skills.length > 0 && (
          <div style={{ display: "flex", gap: "5px", justifyContent: "center", flexWrap: "wrap", maxWidth: "280px", margin: "0 auto" }}>
            {skills.slice(0, 4).map((s) => (
              <div key={s} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "100px", padding: "3px 10px", fontSize: "7px", color: "rgba(255,255,255,0.5)" }}>
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", opacity: 0.35 }}>
        <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.4)" }} />
        <span style={{ fontSize: "6px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.5)" }}>Scroll</span>
      </div>
    </div>
  );
}

export function HighEndMinimalistPreview({ profile, sectionVisibility }: { profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = vis("Experience") ? (profile?.workExperience?.[0]?.role || "") : "";
  const company = vis("Experience") ? (profile?.workExperience?.[0]?.company || "") : "";
  const location = profile?.personalInfo?.location || "";
  const summary = vis("About") ? (profile?.summary || "") : "";

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
          <p style={{ fontSize: "11px", fontStyle: "italic", color: "#444444", fontFamily: "Georgia, serif" }}>{role}</p>
        )}
        {(company || location) && (
          <p style={{ fontSize: "9px", color: "#888888" }}>{[company, location].filter(Boolean).join(" · ")}</p>
        )}
        {summary && (
          <p style={{ fontSize: "8px", color: "#555555", lineHeight: 1.7, maxWidth: "240px", marginTop: "6px" }}>
            {summary.slice(0, 120)}{summary.length > 120 ? "…" : ""}
          </p>
        )}
        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <div style={{ background: "#1A2744", color: "#fff", fontSize: "7px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "6px 12px" }}>
            View Experience
          </div>
          <div style={{ border: "1px solid #1A2744", color: "#1A2744", fontSize: "7px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "6px 12px" }}>
            Contact Me
          </div>
        </div>
      </div>
      <div style={{ width: "45%", background: "#F5F4F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "1px", height: "60px", background: "#CCCCCC" }} />
      </div>
    </div>
  );
}

export function EditorialPreview({ profile, sectionVisibility }: { profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = vis("Experience") ? (profile?.workExperience?.[0]?.role || "") : "";
  const location = profile?.personalInfo?.location || "";
  const nameParts = name.toUpperCase().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#F2EDE4",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 18px",
          borderBottom: "1px solid #D8D0C4",
        }}
      >
        <span style={{ fontSize: "7px", letterSpacing: "0.15em", color: "#555", fontStyle: "italic" }}>PORTFOLIO № 01</span>
        <span style={{ fontSize: "8px", letterSpacing: "0.25em", color: "#222", fontWeight: 600 }}>{name.toUpperCase()}</span>
        <div style={{ display: "flex", gap: "10px" }}>
          {["WORK", "ABOUT", "CONTACT"].map((l) => (
            <span key={l} style={{ fontSize: "6px", letterSpacing: "0.15em", color: "#888" }}>{l}</span>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div
          style={{
            width: "52%",
            background: "#C8C0B4",
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            padding: "10px 12px",
          }}
        >
          {role && (
            <div
              style={{
                background: "rgba(242,237,228,0.9)",
                border: "1px solid rgba(0,0,0,0.12)",
                padding: "3px 8px",
                fontSize: "6px",
                letterSpacing: "0.15em",
                color: "#333",
              }}
            >
              {role.toUpperCase()}
            </div>
          )}
        </div>
        <div
          style={{
            width: "48%",
            padding: "16px 14px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "6px",
            position: "relative",
          }}
        >
          <div style={{ width: "24px", height: "1px", background: "#C8B89A", marginBottom: "4px" }} />
          <span style={{ fontSize: "6px", letterSpacing: "0.2em", color: "#C0392B", textTransform: "uppercase" }}>Featured Portfolio</span>
          <div style={{ lineHeight: 0.95 }}>
            <div style={{ fontSize: "clamp(18px, 3.5vw, 30px)", fontWeight: 900, color: "#1A1A1A", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
              {firstName}
            </div>
            {lastName && (
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span style={{ fontSize: "clamp(16px, 3vw, 26px)", fontWeight: 900, fontStyle: "italic", color: "#1A1A1A", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
                  {lastName.slice(0, -2)}–
                </span>
              </div>
            )}
            {lastName && (
              <div style={{ fontSize: "clamp(16px, 3vw, 26px)", fontWeight: 900, color: "#C0392B", fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
                {lastName.slice(-2).toUpperCase()}
              </div>
            )}
          </div>
          <div style={{ width: "24px", height: "1px", background: "#C8B89A", margin: "2px 0" }} />
          {role && <span style={{ fontSize: "7px", color: "#444", fontStyle: "italic" }}>{role}</span>}
          {location && <span style={{ fontSize: "6px", color: "#888" }}>{location} — Open to Opportunities</span>}
          <div
            style={{
              marginTop: "6px",
              background: "#1A1A1A",
              color: "#F2EDE4",
              fontSize: "6px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              padding: "5px 10px",
              display: "inline-block",
              width: "fit-content",
            }}
          >
            VIEW MY WORK →
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              right: "10px",
              fontSize: "36px",
              fontWeight: 900,
              color: "rgba(0,0,0,0.06)",
              fontFamily: "Georgia, serif",
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            01
          </div>
        </div>
      </div>
    </div>
  );
}

export function BentoPreview({ profile, sectionVisibility }: { profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const hasPhoto = !!profile?.personalInfo?.photo;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const location = profile?.personalInfo?.location || "";
  const summary = vis("About") ? (profile?.summary || "") : "";
  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
  const topSkills: string[] = vis("Skills") ? [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
  ].slice(0, 5) : [];
  const projectCount = vis("Projects") ? (profile?.projects?.length || 0) : null;
  const expCount = vis("Experience") ? (profile?.workExperience?.length || 0) : null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#F8F8F8",
        display: "grid",
        gridTemplateColumns: "2fr 1.2fr 1.2fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "6px",
        padding: "8px",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "#1A1A2E",
          borderRadius: "10px",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          gridRow: "1 / 2",
        }}
      >
        <div>
          <div style={{ fontSize: "6px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "4px" }}>{role}</div>
          <div style={{ fontSize: "clamp(14px, 2.5vw, 22px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 1, letterSpacing: "-0.02em" }}>
            {name.split(" ")[0].toUpperCase()}
          </div>
          <div style={{ fontSize: "clamp(14px, 2.5vw, 22px)", fontWeight: 900, color: "#F5C518", lineHeight: 1, letterSpacing: "-0.02em" }}>
            {name.split(" ").slice(1).join(" ").toUpperCase()}
          </div>
        </div>
        {summary && (
          <div style={{ fontSize: "6px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5, marginTop: "6px" }}>
            {summary.slice(0, 80)}{summary.length > 80 ? "…" : ""}
          </div>
        )}
        <div style={{ display: "flex", gap: "5px", marginTop: "6px" }}>
          {["GH", "LI"].map((s) => (
            <div key={s} style={{ width: "16px", height: "16px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "5px", color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          overflow: "hidden",
        }}
      >
        {hasPhoto && (
          <div style={{ width: "34px", height: "34px", borderRadius: "50%", border: "2px solid #E8E8E8", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F5F5" }}>
            <img src={profile.personalInfo.photo} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
          </div>
        )}
        <div style={{ fontSize: "7px", fontWeight: 700, color: "#1A1A2E", textAlign: "center" }}>{name.toUpperCase()}</div>
        <div style={{ fontSize: "6px", color: "#666", textAlign: "center" }}>{role}</div>
        <div style={{ background: "#E8F8EE", border: "1px solid #4ade80", borderRadius: "999px", padding: "2px 8px", fontSize: "5px", color: "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: "3px" }}>
          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
          Available for work
        </div>
        {location && <div style={{ fontSize: "5px", color: "#888", textAlign: "center" }}>📍 {location}</div>}
      </div>
      <div
        style={{
          background: "#F5C518",
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: "5px", letterSpacing: "0.15em", color: "rgba(0,0,0,0.5)", textTransform: "uppercase" }}>By The Numbers</div>
        {[
          projectCount !== null && { val: `${projectCount || 3}+`, label: "Projects Shipped" },
          expCount !== null && { val: `${expCount || 2}+`, label: "Years Experience" },
        ].filter(Boolean).map((s: any) => (
          <div key={s.label}>
            <div style={{ fontSize: "16px", fontWeight: 900, color: "#1A1A2E", lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: "5px", color: "rgba(0,0,0,0.5)" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: "#6C5CE7",
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "8px",
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: "9px", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.2 }}>Let's work together →</div>
        <div style={{ background: "#FFFFFF", borderRadius: "999px", padding: "4px 10px", fontSize: "6px", fontWeight: 700, color: "#6C5CE7" }}>Hire Me</div>
      </div>
      <div style={{ background: "#FFFFFF", borderRadius: "10px", padding: "10px", overflow: "hidden", gridColumn: "1 / 2" }}>
        <div style={{ fontSize: "5px", letterSpacing: "0.15em", color: "#888", textTransform: "uppercase", marginBottom: "4px" }}>About</div>
        <div style={{ fontSize: "9px", fontWeight: 700, color: "#1A1A2E", marginBottom: "4px" }}>A bit about me.</div>
        {summary && (
          <div style={{ fontSize: "5px", color: "#666", lineHeight: 1.5 }}>
            {summary.slice(0, 100)}{summary.length > 100 ? "…" : ""}
          </div>
        )}
      </div>
      <div style={{ background: "#1A1A2E", borderRadius: "10px", padding: "10px", overflow: "hidden", gridColumn: "2 / 5" }}>
        <div style={{ fontSize: "5px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "6px" }}>Tech Stack</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {topSkills.map((skill) => (
            <div key={skill} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "999px", padding: "2px 8px", fontSize: "5px", color: "rgba(255,255,255,0.7)" }}>
              {skill}
            </div>
          ))}
          {topSkills.length === 0 && (
            <div style={{ fontSize: "6px", color: "rgba(255,255,255,0.3)" }}>Skills will appear here</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function NeumorphismPreview({ palette, profile, sectionVisibility }: { palette?: any; profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const hasPhoto = !!profile?.personalInfo?.photo;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = vis("Experience") ? (profile?.workExperience?.[0]?.role || "") : "";
  const company = vis("Experience") ? (profile?.workExperience?.[0]?.company || "") : "";
  const skills = vis("Skills") ? [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
  ].slice(0, 3) : [];

  // Use the same colors as your Figma design
  const bgColor = "#E8E3DC";
  const accentColor = "#8B7355";
  const textColor = "#3D3830";
  const mutedColor = "#7A7268";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        padding: "12px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "260px",
          background: bgColor,
          borderRadius: "16px",
          padding: "16px",
          boxShadow: `
            -4px -4px 8px rgba(255, 252, 247, 0.8),
            4px 4px 8px rgba(163, 156, 146, 0.4)
          `,
        }}
      >
        {/* Avatar Circle */}
        {hasPhoto && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: bgColor,
                boxShadow: `
                  -3px -3px 6px rgba(255, 252, 247, 0.8),
                  3px 3px 6px rgba(163, 156, 146, 0.3)
                `,
                overflow: "hidden",
              }}
            >
              <img src={profile.personalInfo.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        )}
        
        {/* Name */}
        <h3 style={{ 
          fontSize: "16px", 
          fontWeight: 600, 
          color: textColor, 
          textAlign: "center", 
          margin: "0 0 4px",
          fontFamily: "'DM Sans', sans-serif"
        }}>
          {name.split(" ")[0]} {name.split(" ")[1]?.[0] || ""}.
        </h3>
        
        {/* Role */}
        {role && (
          <p style={{
            fontSize: "10px",
            color: accentColor,
            textAlign: "center",
            margin: "0 0 2px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontFamily: "'DM Sans', sans-serif"
          }}>
            {role}
          </p>
        )}

        {/* Company/Location */}
        {company && (
          <p style={{
            fontSize: "8px",
            color: mutedColor,
            textAlign: "center",
            margin: "0 0 10px",
            fontFamily: "'DM Sans', sans-serif"
          }}>
            {company}
          </p>
        )}
        
        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "4px", 
            justifyContent: "center",
            marginTop: "8px"
          }}>
            {skills.slice(0, 2).map((skill) => (
              <span
                key={skill}
                style={{
                  padding: "4px 8px",
                  fontSize: "8px",
                  background: bgColor,
                  borderRadius: "12px",
                  color: mutedColor,
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: `
                    -2px -2px 4px rgba(255, 252, 247, 0.6),
                    2px 2px 4px rgba(163, 156, 146, 0.2)
                  `,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function NeonVaultPreview({ profile, sectionVisibility }: { profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || "Your Name";
  const title =
    profile?.personalInfo?.title ||
    profile?.workExperience?.[0]?.role ||
    "Creative Developer";
  const location = profile?.personalInfo?.location || "Remote";
  const summary = vis("About")
    ? (profile?.personalInfo?.summary || profile?.summary || "")
    : "";
  const skills: string[] = vis("Skills") ? [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
  ].slice(0, 6) : [];
  const exp = vis("Experience") ? (profile?.workExperience || []) : [];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0f172a",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Syne', 'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── subtle grid ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />
 
      {/* ── ambient glows ── */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          left: "-15%",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(147,51,234,0.25) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
 
      {/* ── navbar ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px",
          borderBottom: "1px solid rgba(6,182,212,0.15)",
          background: "rgba(15,23,42,0.7)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span style={{ fontSize: "9px", fontWeight: 800, letterSpacing: "0.12em", color: "#fff" }}>
          NEON<span style={{ color: "#22d3ee" }}>VAULT</span>
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          {["HOME", "WORK", "SKILLS", "CONTACT"].map((l) => (
            <span key={l} style={{ fontSize: "5px", color: "rgba(148,163,184,0.7)", letterSpacing: "0.1em" }}>{l}</span>
          ))}
        </div>
        <div
          style={{
            fontSize: "5px",
            padding: "3px 8px",
            borderRadius: "999px",
            border: "1px solid rgba(6,182,212,0.5)",
            color: "#22d3ee",
            letterSpacing: "0.1em",
          }}
        >
          HIRE ME
        </div>
      </div>
 
      {/* ── hero ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 16px 4px",
          textAlign: "center",
        }}
      >
        {/* status badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "3px 10px",
            borderRadius: "999px",
            border: "1px solid rgba(6,182,212,0.3)",
            background: "rgba(6,182,212,0.08)",
            marginBottom: "10px",
          }}
        >
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#22d3ee" }} />
          <span style={{ fontSize: "6px", color: "#22d3ee", fontFamily: "monospace", letterSpacing: "0.06em" }}>
            Available for Work
          </span>
        </div>
 
        {/* big name */}
        <div
          style={{
            fontSize: "clamp(18px, 4vw, 28px)",
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: "4px",
            background: "linear-gradient(90deg, #fff 0%, #22d3ee 50%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.03em",
          }}
        >
          {name.split(" ")[0].toUpperCase()}
        </div>
        <div
          style={{
            fontSize: "clamp(16px, 3.5vw, 24px)",
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: "8px",
            color: "#a855f7",
            letterSpacing: "-0.02em",
          }}
        >
          {name.split(" ").slice(1).join(" ").toUpperCase() || "DEVELOPER"}
        </div>
 
        {/* role + location */}
        <div
          style={{
            display: "inline-block",
            padding: "3px 12px",
            borderRadius: "999px",
            border: "1px solid rgba(168,85,247,0.3)",
            background: "rgba(168,85,247,0.08)",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "6px", color: "#c084fc", fontFamily: "monospace" }}>
            {title} · {location}
          </span>
        </div>
 
        {/* summary */}
        {summary && (
          <p
            style={{
              fontSize: "6.5px",
              color: "rgba(148,163,184,0.85)",
              lineHeight: 1.6,
              maxWidth: "220px",
              marginBottom: "10px",
            }}
          >
            {summary.slice(0, 90)}{summary.length > 90 ? "…" : ""}
          </p>
        )}
 
        {/* stats */}
        {(vis("Experience") || vis("Projects")) && (
          <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
            {[
              vis("Experience") && { val: `${exp.length || 4}+`, label: "Yrs Exp" },
              vis("Projects") && { val: `${profile?.projects?.length || 12}+`, label: "Projects" },
            ].filter(Boolean).map((s: any) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "#22d3ee", lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: "5.5px", color: "rgba(148,163,184,0.6)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
 
        {/* CTA */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
          <div
            style={{
              padding: "5px 14px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #06b6d4, #9333ea)",
              fontSize: "6px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.04em",
            }}
          >
            View My Work
          </div>
          <div
            style={{
              padding: "5px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(6,182,212,0.5)",
              fontSize: "6px",
              fontWeight: 600,
              color: "#22d3ee",
            }}
          >
            Contact Me
          </div>
        </div>
 
        {/* skills pills */}
        {skills.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", justifyContent: "center", maxWidth: "240px" }}>
            {skills.slice(0, 5).map((sk: string) => (
              <div
                key={sk}
                style={{
                  padding: "2px 8px",
                  borderRadius: "999px",
                  background: "rgba(30,41,59,0.6)",
                  border: "1px solid rgba(168,85,247,0.3)",
                  fontSize: "5.5px",
                  color: "rgba(192,132,252,0.9)",
                }}
              >
                <span style={{ color: "#22d3ee", marginRight: "2px" }}>#</span>{sk}
              </div>
            ))}
          </div>
        )}
      </div>
 
      {/* ── experience strip ── */}
      {exp.length > 0 && (
        <div
          style={{
            position: "relative",
            zIndex: 2,
            margin: "0 10px 10px",
            padding: "8px 10px",
            borderRadius: "10px",
            background: "rgba(30,41,59,0.5)",
            border: "1px solid rgba(148,163,184,0.1)",
          }}
        >
          <div style={{ fontSize: "5px", color: "rgba(6,182,212,0.7)", letterSpacing: "0.12em", marginBottom: "6px", textTransform: "uppercase" }}>
            Mission History
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {exp.slice(0, 2).map((e: any, i: number) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "6.5px", fontWeight: 700, color: "#fff" }}>{e.role}</div>
                  <div style={{ fontSize: "5.5px", color: "#a855f7" }}>{e.company}</div>
                </div>
                <div
                  style={{
                    fontSize: "4.5px",
                    fontFamily: "monospace",
                    color: "#22d3ee",
                    padding: "1px 5px",
                    borderRadius: "999px",
                    border: "1px solid rgba(6,182,212,0.3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {e.endDate === "Present" || e.endYear === "Present" ? "ACTIVE" : "DONE"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
 
      {/* ── bottom scan line ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, #22d3ee, transparent)",
          opacity: 0.4,
        }}
      />
    </div>
  );
}

export function GlassDarkPreview({ profile }: { profile: any }) {
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || profile?.personalInfo?.title || "Professional";
  const summary = profile?.summary || profile?.personalInfo?.summary || "";
  const skills: string[] = [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
  ].slice(0, 3);
  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0d0015 0%, #1a0028 50%, #0a0018 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Blobs */}
      <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,80,192,0.35) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle, rgba(65,88,208,0.35) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

      {/* Nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(13,0,21,0.7)", backdropFilter: "blur(12px)", zIndex: 2, flexShrink: 0 }}>
        <span style={{ fontSize: "8px", fontWeight: 700, color: "#fff", letterSpacing: "0.1em" }}>{name.toUpperCase()}</span>
        <div style={{ display: "flex", gap: 8 }}>
          {["About", "Work", "Contact"].map((l) => (
            <span key={l} style={{ fontSize: "5px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>{l}</span>
          ))}
        </div>
      </div>

      {/* Hero card */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", zIndex: 2 }}>
        <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(18px)", border: "1px solid rgba(255,255,255,0.13)", borderRadius: 16, padding: "14px 16px", width: "100%", maxWidth: 220 }}>
          {/* Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #C850C0, #4158D0)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "10px", fontWeight: 700, color: "#fff" }}>{initials}</span>
            </div>
            <div>
              <div style={{ fontSize: "8px", fontWeight: 600, color: "#fff" }}>{name}</div>
              <div style={{ fontSize: "6px", color: "rgba(255,255,255,0.5)" }}>{role}</div>
            </div>
          </div>

          {summary && <p style={{ fontSize: "5.5px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 8 }}>{summary.slice(0, 70)}{summary.length > 70 ? "…" : ""}</p>}

          {skills.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {skills.map((s) => (
                <span key={s} style={{ background: "rgba(200,80,192,0.15)", border: "1px solid rgba(200,80,192,0.3)", borderRadius: 999, padding: "2px 7px", fontSize: "5px", color: "rgba(255,255,255,0.7)" }}>{s}</span>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
            <div style={{ flex: 1, textAlign: "center", padding: "5px 0", background: "linear-gradient(135deg, #C850C0, #4158D0)", borderRadius: 6, fontSize: "5.5px", fontWeight: 700, color: "#fff" }}>View Work</div>
            <div style={{ flex: 1, textAlign: "center", padding: "5px 0", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 6, fontSize: "5.5px", color: "rgba(255,255,255,0.6)" }}>Contact</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LuxuryHighEndPreview({ profile, sectionVisibility }: { profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const hasPhoto = !!profile?.personalInfo?.photo;
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Creative Professional";
  const summary = vis("About") ? (profile?.summary || "") : "";
  const skills: string[] = vis("Skills") ? (profile?.skills?.technical || []).slice(0, 3) : [];

  // Derive years of experience
  const yearsOfExperience = vis("Experience") ? (() => {
    const dates = (profile?.workExperience || [])
      .map((w: any) => parseInt(w.startDate?.slice(0, 4)))
      .filter((y: number) => !isNaN(y));
    if (!dates.length) return null;
    return new Date().getFullYear() - Math.min(...dates);
  })() : null;
 
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
 
  // Gold palette
  const gold = "#C9A96E";
  const bg = "#0C0C0E";
  const bgAlt = "#111114";
 
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: bg,
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "30%", left: "20%", width: "120px", height: "120px", borderRadius: "50%", background: `radial-gradient(circle, ${gold}18 0%, transparent 70%)`, filter: "blur(30px)", pointerEvents: "none" }} />
 
      {/* Nav bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", borderBottom: `1px solid ${gold}14`, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `1px solid ${gold}60`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "5px", color: gold, fontWeight: 300, letterSpacing: "0.02em" }}>{initials}</span>
          </div>
          <span style={{ fontSize: "6px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{name}</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {["Work", "About", "Contact"].map((l) => (
            <span key={l} style={{ fontSize: "5px", letterSpacing: "0.06em", color: "rgba(255,255,255,0.3)" }}>{l}</span>
          ))}
        </div>
      </div>
 
      {/* Hero area */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "10px 14px", gap: "10px", overflow: "hidden" }}>
        {/* Left — text */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
          {/* Availability badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", border: `1px solid ${gold}30`, background: `${gold}08`, borderRadius: "2px", padding: "2px 6px", width: "fit-content" }}>
            <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#6B9E6B" }} />
            <span style={{ fontSize: "5px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>Open for work</span>
          </div>
 
          {/* Role label */}
          <p style={{ fontSize: "5px", letterSpacing: "0.18em", textTransform: "uppercase", color: gold, margin: 0 }}>{role}</p>
 
          {/* Name — solid line */}
          <div style={{ fontSize: "clamp(16px, 3.5vw, 26px)", fontWeight: 300, color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 0.95, fontFamily: "Georgia, serif" }}>
            {name.split(" ")[0]}
          </div>
          {/* Outline second line */}
          <div style={{ fontSize: "clamp(14px, 3vw, 22px)", fontWeight: 300, color: "transparent", WebkitTextStroke: `1px ${gold}70`, letterSpacing: "-0.02em", lineHeight: 0.95, fontFamily: "Georgia, serif" }}>
            {name.split(" ").slice(1).join(" ") || role}
          </div>
 
          {/* Skill dots */}
          {skills.length > 0 && (
            <div style={{ display: "flex", gap: "4px", marginTop: "2px", flexWrap: "wrap" }}>
              {skills.map((s, i) => (
                <span key={i} style={{ fontSize: "5px", color: i === 0 ? gold : `${gold}80` }}>{s}{i < skills.length - 1 ? " ·" : ""}</span>
              ))}
            </div>
          )}
 
          {/* Summary snippet */}
          {summary && (
            <p style={{ fontSize: "5px", color: "rgba(255,255,255,0.35)", lineHeight: 1.6, maxWidth: "160px", margin: "2px 0 0" }}>
              {summary.slice(0, 80)}{summary.length > 80 ? "…" : ""}
            </p>
          )}
 
          {/* CTA row */}
          <div style={{ display: "flex", gap: "5px", marginTop: "4px" }}>
            <div style={{ background: gold, color: bg, fontSize: "5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 8px", borderRadius: "2px" }}>View Work</div>
            <div style={{ border: `1px solid ${gold}40`, color: "rgba(255,255,255,0.5)", fontSize: "5px", letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 8px", borderRadius: "2px" }}>Contact</div>
          </div>
        </div>
 
        {/* Right — portrait card (only when photo provided) */}
        {hasPhoto && (
          <div style={{ width: "38%", flexShrink: 0, alignSelf: "stretch", border: `1px solid ${gold}18`, borderRadius: "2px", background: bgAlt, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", position: "relative", overflow: "hidden" }}>
            <img src={profile.personalInfo.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            {yearsOfExperience !== null && (
              <div style={{ position: "absolute", top: "8px", left: "-8px", background: "rgba(12,12,14,0.9)", border: `1px solid ${gold}20`, borderRadius: "3px", padding: "4px 6px" }}>
                <div style={{ fontSize: "10px", fontWeight: 300, color: gold, fontFamily: "monospace" }}>{String(yearsOfExperience).padStart(2, "0")}</div>
                <div style={{ fontSize: "4px", color: "rgba(255,255,255,0.35)" }}>Yrs exp</div>
              </div>
            )}
          </div>
        )}
      </div>
 
      {/* Scroll indicator */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", paddingBottom: "6px", opacity: 0.3 }}>
        <div style={{ width: "1px", height: "12px", background: `${gold}60` }} />
        <span style={{ fontSize: "4px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Scroll</span>
      </div>
    </div>
  );
}

export function MusicianPreview({ profile }: { profile: any }) {
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || profile?.personalInfo?.title || "Artist & Performer";
  const summary = profile?.summary || profile?.personalInfo?.summary || "";
  const skills: string[] = [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.domain || []),
    ...(profile?.skills?.tools || []),
  ].slice(0, 3);
  const expCount = profile?.workExperience?.length || 0;
  const projectCount = profile?.projects?.length || 0;
  const tags = skills.length > 0 ? skills : ["Creative", "Performer", "Artist"];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #080B14 0%, #0A0D18 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ position: "absolute", top: "20%", right: "10%", width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(194,24,91,0.4) 0%, transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 100, height: 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(106,27,154,0.35) 0%, transparent 70%)", filter: "blur(25px)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", borderBottom: "1px solid rgba(194,24,91,0.12)", background: "rgba(8,11,20,0.85)" }}>
        <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          <span style={{ color: "#F0EEF5" }}>{name.split(" ")[0].toUpperCase()}</span>
          <span style={{ color: "#C2185B" }}> {name.split(" ").slice(1).join(" ").toUpperCase() || "PORTFOLIO"}</span>
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          {["Work", "About", "Contact"].map((l) => (
            <span key={l} style={{ fontSize: "5px", color: "rgba(158,155,176,0.7)", letterSpacing: "0.1em", fontFamily: "'Raleway', sans-serif", textTransform: "uppercase" }}>{l}</span>
          ))}
        </div>
        <div style={{ fontSize: "5px", padding: "3px 8px", border: "1px solid rgba(194,24,91,0.4)", color: "#F0EEF5", borderRadius: 2, fontFamily: "'Raleway', sans-serif", letterSpacing: "0.1em" }}>Hire Me</div>
      </div>
      <div style={{ padding: "14px 14px 10px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
          {tags.map((g) => (
            <span key={g} style={{ padding: "2px 8px", border: "1px solid rgba(194,24,91,0.30)", background: "rgba(194,24,91,0.06)", borderRadius: 2, fontSize: "5px", color: "#9E9BB0", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Raleway', sans-serif" }}>{g}</span>
          ))}
        </div>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(18px,4vw,28px)", fontWeight: 700, fontStyle: "italic", color: "#F0EEF5", lineHeight: 0.92, letterSpacing: "-0.02em", marginBottom: 6 }}>{name}</div>
        <div style={{ fontSize: "6px", color: "#C2185B", fontFamily: "'Raleway', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{role}</div>
        {summary && <p style={{ fontSize: "6px", color: "#9E9BB0", lineHeight: 1.6, maxWidth: 160, marginBottom: 8 }}>{summary.slice(0, 80)}{summary.length > 80 ? "…" : ""}</p>}
        <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
          {[
            { v: expCount > 0 ? `${expCount}+` : "5+", l: "Years" },
            { v: projectCount > 0 ? `${projectCount}+` : "12+", l: "Projects" },
          ].map((s, i) => (
            <div key={i} style={{ position: "relative" }}>
              {i > 0 && <div style={{ position: "absolute", left: -8, top: 0, bottom: 0, width: 1, background: "rgba(240,238,245,0.08)" }} />}
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#F0EEF5", lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 5, color: "#9E9BB0", textTransform: "uppercase", marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ padding: "5px 12px", borderRadius: 2, background: "linear-gradient(to right, #C2185B, #6A1B9A)", fontSize: "6px", fontWeight: 700, color: "#F0EEF5", fontFamily: "'Raleway', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em" }}>View Work</div>
          <div style={{ padding: "5px 12px", borderRadius: 2, border: "1px solid rgba(194,24,91,0.40)", fontSize: "6px", color: "#9E9BB0", fontFamily: "'Raleway', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em" }}>Contact</div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 24, background: "rgba(8,11,20,0.85)", borderTop: "1px solid rgba(194,24,91,0.12)", display: "flex", alignItems: "center", padding: "0 10px", gap: 8, zIndex: 3 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: 10 }}>
          {[6, 10, 8, 4, 9].map((h, i) => (<div key={i} style={{ width: 2, height: h, borderRadius: 1, background: "linear-gradient(to top, #C2185B, #6A1B9A)" }} />))}
        </div>
        <div style={{ width: 16, height: 16, borderRadius: 2, background: "linear-gradient(135deg, rgba(194,24,91,0.4), rgba(106,27,154,0.4))", flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: "6px", color: "#F0EEF5", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Featured Work</div>
          <div style={{ fontSize: "5px", color: "#9E9BB0", fontFamily: "'Inter', sans-serif" }}>{name}</div>
        </div>
        <div style={{ marginLeft: "auto", fontFamily: "'Space Mono', monospace", fontSize: "5px", color: "#9E9BB0" }}>Portfolio</div>
      </div>
    </div>
  );
}
export function RetroPreview({ profile, sectionVisibility }: { profile: any; sectionVisibility?: Record<string, boolean> }) {
  const vis = (s: string) => sectionVisibility?.[s] !== false;
  const name = profile?.personalInfo?.name || 'Your Name';
  const nameParts = name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  const role = vis('Experience') ? (profile?.workExperience?.[0]?.role || 'Professional') : 'Professional';
  const location = profile?.personalInfo?.location || '';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#F5EDD8',
        backgroundImage: 'radial-gradient(circle, rgba(80,40,0,0.08) 2px, transparent 2px)',
        backgroundSize: '10px 10px',
        display: 'flex',
        fontFamily: "'DM Sans', sans-serif",
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Left content area */}
      <div style={{ flex: '0 0 62%', display: 'flex', flexDirection: 'column', padding: '14px 18px', justifyContent: 'center', gap: '6px' }}>
        {/* Top banner */}
        <div style={{ backgroundColor: '#1A1208', height: '18px', borderBottom: '2px solid #C9340A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4px' }}>
          <span style={{ fontFamily: 'serif', fontSize: '6px', color: '#F5EDD8', letterSpacing: '0.3em' }}>RESUFLOW PRESENTS</span>
        </div>

        {/* Headline */}
        <div style={{ fontFamily: 'serif', fontSize: 'clamp(14px, 3vw, 22px)', color: '#1A1208', lineHeight: 0.85, fontWeight: 900, textTransform: 'uppercase' }}>
          THE ONE &
        </div>
        <div style={{ fontFamily: 'serif', fontSize: 'clamp(18px, 4vw, 30px)', color: '#C9340A', lineHeight: 0.85, fontWeight: 900, textTransform: 'uppercase' }}>
          ONLY
        </div>
        <div style={{ fontFamily: 'serif', fontSize: 'clamp(12px, 2.5vw, 18px)', color: '#1A1208', lineHeight: 0.9, fontWeight: 900, textTransform: 'uppercase' }}>
          {firstName.toUpperCase()}
        </div>
        {lastName && (
          <div style={{ fontFamily: 'serif', fontSize: 'clamp(12px, 2.5vw, 18px)', color: '#F5EDD8', backgroundColor: '#1A1208', lineHeight: 0.9, fontWeight: 900, display: 'inline-block', padding: '0 4px', textTransform: 'uppercase', alignSelf: 'flex-start' }}>
            {lastName.toUpperCase()}
          </div>
        )}

        {/* Ribbon */}
        <div style={{ backgroundColor: '#C9340A', height: '16px', borderTop: '1px solid #1A1208', borderBottom: '1px solid #1A1208', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px' }}>
          <span style={{ fontFamily: 'serif', fontSize: '5px', color: '#F5EDD8', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {[role, location].filter(Boolean).join(' · ').toUpperCase()}
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
          <div style={{ backgroundColor: '#C9340A', border: '1px solid #1A1208', boxShadow: '2px 2px 0 #1A1208', padding: '3px 8px', fontFamily: 'serif', fontSize: '5px', color: '#F5EDD8', textTransform: 'uppercase' }}>
            READ PROFILE
          </div>
          <div style={{ border: '1px solid #1A1208', boxShadow: '2px 2px 0 #1A1208', padding: '3px 8px', fontFamily: 'serif', fontSize: '5px', color: '#1A1208', textTransform: 'uppercase', backgroundColor: '#F5EDD8' }}>
            GET IN TOUCH
          </div>
        </div>
      </div>

      {/* Right dark panel */}
      <div style={{ flex: '0 0 38%', backgroundColor: '#1A1208', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px', gap: '10px' }}>
        {/* Seal */}
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#C9340A', border: '2px solid #F5EDD8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'serif', fontSize: '8px', color: '#F5EDD8', fontWeight: 900 }}>№001</span>
        </div>

        <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(245,237,216,0.2)' }} />

        {/* Stats */}
        {[
          { n: profile?.workExperience?.length ? `${profile.workExperience.length}+` : '5+', l: 'YEARS' },
          { n: profile?.projects?.length ? `${profile.projects.length}+` : '10+', l: 'PROJECTS' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center', width: '100%' }}>
            <div style={{ fontFamily: 'serif', fontSize: '22px', color: '#C9340A', fontWeight: 900, lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontFamily: 'sans-serif', fontSize: '5px', color: '#9A8060', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{s.l}</div>
            {i === 0 && <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(245,237,216,0.15)', marginTop: '6px' }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeuomorphismPreview({ profile }: { profile: any }) {
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
  const skills = [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
  ].slice(0, 3);
  const projectCount = profile?.projects?.length || 0;
  const expCount = profile?.workExperience?.length || 0;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0E0A04",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        padding: "12px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "280px",
          background: "linear-gradient(to bottom, #C9A96E, #7A4E1E, #C9A96E)",
          borderRadius: "16px",
          padding: "16px",
          boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid lines texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,0.04) 19px, rgba(0,0,0,0.04) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0,0,0,0.04) 19px, rgba(0,0,0,0.04) 20px)",
            pointerEvents: "none",
          }}
        />
        
        {/* Leather grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.05,
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(0,0,0,0.5) 1px, rgba(0,0,0,0.5) 2px)",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          {/* Monogram */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "#1A1004",
                border: "2px solid rgba(200, 160, 80, 0.4)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ 
                fontSize: "18px", 
                fontWeight: 700, 
                color: "#C9A96E",
                fontFamily: "'Playfair Display', serif"
              }}>
                {initials}
              </span>
            </div>
          </div>

          {/* Name */}
          <h3 style={{ 
            fontSize: "14px", 
            fontWeight: 700, 
            color: "#1A1004", 
            textAlign: "center", 
            margin: "0 0 2px",
            fontFamily: "'Playfair Display', serif"
          }}>
            {name}
          </h3>

          {/* Role */}
          <p style={{ 
            fontSize: "8px", 
            color: "#1A1004", 
            opacity: 0.65,
            textAlign: "center", 
            margin: "0 0 10px",
            fontFamily: "'DM Sans', sans-serif"
          }}>
            {role}
          </p>

          {/* Stats */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-around",
            borderTop: "1px solid rgba(0,0,0,0.15)",
            borderBottom: "1px solid rgba(0,0,0,0.15)",
            padding: "10px 0",
            marginBottom: "10px"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#1A1004", fontFamily: "'Playfair Display', serif" }}>
                {projectCount || 3}+
              </div>
              <div style={{ fontSize: "6px", color: "#1A1004", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Projects
              </div>
            </div>
            <div style={{ width: "1px", background: "rgba(0,0,0,0.15)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#1A1004", fontFamily: "'Playfair Display', serif" }}>
                {expCount || 2}+
              </div>
              <div style={{ fontSize: "6px", color: "#1A1004", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Years Exp
              </div>
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: "4px", 
              justifyContent: "center"
            }}>
              {skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  style={{
                    padding: "3px 8px",
                    fontSize: "7px",
                    background: "rgba(0,0,0,0.15)",
                    borderRadius: "12px",
                    color: "#1A1004",
                    fontFamily: "'DM Sans', sans-serif",
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}