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
}: {
  palette?: PaletteRow;
  profile: any;
}) {
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const summary = profile?.summary || "";
  const skills: string[] = [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
    ...(profile?.skills?.soft || []),
  ].slice(0, 5);

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

export function HighEndMinimalistPreview({ profile }: { profile: any }) {
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const company = profile?.workExperience?.[0]?.company || "";
  const location = profile?.personalInfo?.location || "";
  const summary = profile?.summary || "";

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

export function EditorialPreview({ profile }: { profile: any }) {
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
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
          <span style={{ fontSize: "7px", color: "#444", fontStyle: "italic" }}>{role}</span>
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

export function BentoPreview({ profile }: { profile: any }) {
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const location = profile?.personalInfo?.location || "";
  const summary = profile?.summary || "";
  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
  const topSkills: string[] = [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
  ].slice(0, 5);
  const projectCount = profile?.projects?.length || 0;
  const expCount = profile?.workExperience?.length || 0;

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
        <div style={{ width: "34px", height: "34px", borderRadius: "50%", border: "2px solid #E8E8E8", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F5F5" }}>
          <span style={{ fontSize: "9px", fontWeight: 700, color: "#333" }}>{initials}</span>
        </div>
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
          { val: `${projectCount || 3}+`, label: "Projects Shipped" },
          { val: `${expCount || 2}+`, label: "Years Experience" },
        ].map((s) => (
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

export function NeumorphismPreview({ profile }: { profile: any }) {
  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "Professional";
  const skills = [
    ...(profile?.skills?.technical || []),
    ...(profile?.skills?.tools || []),
  ].slice(0, 3);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#E4E9F2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "280px",
          background: "#E4E9F2",
          borderRadius: "20px",
          padding: "16px",
          boxShadow: `
            6px 6px 12px rgba(163, 177, 198, 0.3),
            -6px -6px 12px rgba(255, 255, 255, 0.7)
          `,
        }}
      >
        {/* Avatar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "#E4E9F2",
              boxShadow: `
                4px 4px 8px rgba(163, 177, 198, 0.3),
                -4px -4px 8px rgba(255, 255, 255, 0.8)
              `,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "18px", fontWeight: 600, color: "#6B7B8D" }}>
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#3A4151", textAlign: "center", margin: "0 0 4px" }}>
          {name.split(" ")[0]}
        </h3>
        <p style={{ fontSize: "10px", color: "#6B7B8D", textAlign: "center", margin: "0 0 12px" }}>
          {role}
        </p>
        
        {skills.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", justifyContent: "center" }}>
            {skills.slice(0, 2).map((skill) => (
              <span
                key={skill}
                style={{
                  padding: "4px 8px",
                  fontSize: "8px",
                  background: "#E4E9F2",
                  borderRadius: "12px",
                  color: "#5A6778",
                  boxShadow: `
                    2px 2px 4px rgba(163, 177, 198, 0.2),
                    -2px -2px 4px rgba(255, 255, 255, 0.6)
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

export function GlassDarkPreview({ profile }: { profile: any }) {
  const name = profile?.personalInfo?.name || "Your Name";
  const firstName = name.split(" ")[0];
  const role = profile?.workExperience?.[0]?.role || "UI/UX Designer";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0D0B1E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
        padding: "16px",
      }}
    >
      <div style={{ position: "absolute", top: "10%", right: "5%", width: "80px", height: "80px", borderRadius: "50%", background: "radial-gradient(circle, #C850C070 0%, transparent 70%)", filter: "blur(20px)" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "5%", width: "60px", height: "60px", borderRadius: "50%", background: "radial-gradient(circle, #4158D060 0%, transparent 70%)", filter: "blur(15px)" }} />

      <div
        style={{
          width: "100%",
          maxWidth: "260px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          borderRadius: "20px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg, #C850C0, #4158D0)", padding: "2px", marginBottom: "8px" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#1A1040", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "16px", fontWeight: 700, background: "linear-gradient(90deg, #C850C0, #FF6B9D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {firstName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <h3 style={{ fontSize: "12px", fontWeight: 700, color: "#fff", margin: "0 0 2px", textAlign: "center" }}>{firstName}</h3>
        <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.5)", margin: "0 0 10px", textAlign: "center" }}>{role}</p>

        <div style={{ display: "flex", gap: "12px", marginBottom: "10px" }}>
          {["24+", "18+", "3+"].map((v, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "14px", fontWeight: 800, background: "linear-gradient(90deg, #C850C0, #FF6B9D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{v}</div>
              <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.3)" }}>{["Projects", "Clients", "Years"][i]}</div>
            </div>
          ))}
        </div>

        <div style={{ width: "100%" }}>
          {[{ name: "Figma", pct: 92 }, { name: "UI Design", pct: 88 }].map((s) => (
            <div key={s.name} style={{ marginBottom: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                <span style={{ fontSize: "8px", color: "#fff" }}>{s.name}</span>
                <span style={{ fontSize: "7px", color: "rgba(255,255,255,0.4)" }}>{s.pct}%</span>
              </div>
              <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ width: `${s.pct}%`, height: "100%", background: "linear-gradient(135deg, #C850C0, #4158D0)", borderRadius: "2px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
