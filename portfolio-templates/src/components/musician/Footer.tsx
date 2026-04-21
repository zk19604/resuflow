'use client';

const quickLinks = ["Music", "Events", "Gallery", "Press", "Shop", "Contact"];
const platforms = [
  { name: "Spotify",       color: "#1DB954" },
  { name: "Apple Music",   color: "#FC3C44" },
  { name: "YouTube Music", color: "#FF0033" },
  { name: "SoundCloud",    color: "#FF5500" },
];

// Inline SVG icons — avoids lucide-react version dependency
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
    </svg>
  );
}

const socialIcons = [InstagramIcon, MusicIcon, YoutubeIcon];

export function Footer() {
  return (
    <footer style={{ position: "relative", background: "#05070F" }}>
      {/* Gradient border top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #C2185B, #6A1B9A, #00838F)" }} />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          {/* Left — Artist Info */}
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 700, fontStyle: "italic", color: "#F0EEF5", marginBottom: 16 }}>Luna Vega</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#9E9BB0", lineHeight: 1.7, marginBottom: 24, maxWidth: 320 }}>
              Crafting sonic landscapes that blur the line between concert hall and conscience.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {socialIcons.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid rgba(240,238,245,0.10)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#9E9BB0",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#C2185B";
                    (e.currentTarget as HTMLElement).style.color = "#F0EEF5";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(240,238,245,0.10)";
                    (e.currentTarget as HTMLElement).style.color = "#9E9BB0";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Center — Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#C2185B", marginBottom: 24 }}>Quick Links</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {quickLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  style={{
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#9E9BB0",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#C2185B"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#9E9BB0"; }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Streaming */}
          <div>
            <h4 style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#C2185B", marginBottom: 24 }}>Listen On</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {platforms.map((platform) => (
                <a
                  key={platform.name}
                  href="#"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: platform.color, textDecoration: "none", transition: "opacity 0.2s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  {platform.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div
          style={{
            paddingTop: 32,
            borderTop: "1px solid rgba(240,238,245,0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#4A4760" }}>
            © 2025 Luna Vega. All Rights Reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#4A4760" }}>
              Powered by <span style={{ color: "#C2185B" }}>ResuFlow</span>
            </span>
            {["Privacy Policy", "Terms"].map((link) => (
              <a
                key={link}
                href="#"
                style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#4A4760", textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#9E9BB0"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#4A4760"; }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}