import { Link } from "react-router";

interface NavbarProps {
  currentStep?: number;
}

export function Navbar({ currentStep }: NavbarProps) {
  return (
    <nav
      style={{
        backgroundColor: "#0E1627",
        height: "68px",
        borderBottom: "1px solid rgba(189,184,185,0.15)",
        fontFamily: "'DM Sans', sans-serif",
      }}
      className="flex items-center justify-between px-8 sticky top-0 z-50"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 no-underline">
        <div
          style={{
            width: "28px",
            height: "28px",
            backgroundColor: "#7F6269",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 2h7l3 3v9H3V2z"
              stroke="#F4E1E0"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M10 2v3h3" stroke="#F4E1E0" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M5 8h6M5 11h4" stroke="#F4E1E0" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "22px",
            color: "#F4E1E0",
          }}
        >
          ResuFlow
        </span>
      </Link>

      {/* Center Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {[
          { label: "Home", href: "#home" },
          { label: "How It Works", href: "#how-it-works" },
          { label: "Features", href: "#features" },
          { label: "Examples", href: "#examples" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{ color: "#BDB8B9", fontSize: "14px", textDecoration: "none" }}
            className="hover:opacity-80 transition-opacity"
          >
            {label}
          </a>
        ))}
      </div>

      {/* Spacer to keep logo left-aligned when no CTA */}
      <div style={{ width: "120px" }} />
    </nav>
  );
}
