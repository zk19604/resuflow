import { Link, useNavigate } from "react-router";

interface NavbarProps {
  currentStep?: number;
}

export function Navbar({ currentStep }: NavbarProps) {
  const navigate = useNavigate();

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
        {["Home", "How It Works", "Features", "Examples"].map((link) => (
          <a
            key={link}
            href="#"
            style={{ color: "#BDB8B9", fontSize: "14px", textDecoration: "none" }}
            className="hover:opacity-80 transition-opacity"
          >
            {link}
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={() => navigate("/upload")}
        style={{
          backgroundColor: "#7F6269",
          color: "#F4E1E0",
          fontSize: "15px",
          fontWeight: 600,
          padding: "10px 24px",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          boxShadow: "inset 0 1px 0 rgba(244,225,224,0.12)",
          fontFamily: "'DM Sans', sans-serif",
        }}
        className="hover:opacity-90 transition-opacity"
      >
        Get Started Free
      </button>
    </nav>
  );
}
