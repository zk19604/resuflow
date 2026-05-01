// import { Link, useLocation } from "react-router";

// interface NavbarProps {
//   currentStep?: number;
// }

// export function Navbar({ currentStep }: NavbarProps) {
//   const location = useLocation();
//   const isLanding = location.pathname === "/";

//   const handleAnchorClick = (href: string) => {
//     if (isLanding) {
//       const el = document.querySelector(href);
//       if (el) el.scrollIntoView({ behavior: "smooth" });
//     } else {
//       window.location.href = `/${href}`;
//     }
//   };

//   return (
//     <nav
//       style={{
//         backgroundColor: "#0E1627",
//         height: "68px",
//         borderBottom: "1px solid rgba(189,184,185,0.15)",
//         fontFamily: "'DM Sans', sans-serif",
//       }}
//       className="flex items-center justify-between px-8 sticky top-0 z-50"
//     >
//       {/* Logo */}
//       <Link to="/" className="flex items-center gap-2.5 no-underline">
//         <div
//           style={{
//             width: "28px",
//             height: "28px",
//             backgroundColor: "#7F6269",
//             borderRadius: "6px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//             <path
//               d="M3 2h7l3 3v9H3V2z"
//               stroke="#F4E1E0"
//               strokeWidth="1.5"
//               strokeLinejoin="round"
//             />
//             <path d="M10 2v3h3" stroke="#F4E1E0" strokeWidth="1.5" strokeLinejoin="round" />
//             <path d="M5 8h6M5 11h4" stroke="#F4E1E0" strokeWidth="1.5" strokeLinecap="round" />
//           </svg>
//         </div>
//         <span
//           style={{
//             fontFamily: "'DM Serif Display', serif",
//             fontSize: "22px",
//             color: "#F4E1E0",
//           }}
//         >
//           ResuFlow
//         </span>
//       </Link>

//       {/* Center Nav Links */}
//       <div className="hidden md:flex items-center gap-8">
//         {[
//           { label: "Home", href: "#home" },
//           { label: "How It Works", href: "#how-it-works" },
//           { label: "Features", href: "#features" },
//           { label: "Examples", href: "#examples" },
//         ].map(({ label, href }) => (
//           <button
//             key={label}
//             onClick={() => handleAnchorClick(href)}
//             style={{ color: "#BDB8B9", fontSize: "14px", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
//             className="hover:opacity-80 transition-opacity"
//           >
//             {label}
//           </button>
//         ))}
//       </div>

//       {/* Spacer to keep logo left-aligned when no CTA */}
//       <div style={{ width: "120px" }} />
//     </nav>
//   );
// }


// frontend/src/components/Navbar.tsx  — replace your entire Navbar.tsx
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
 
interface NavbarProps {
  currentStep?: number;
}
 
export function Navbar({ currentStep }: NavbarProps) {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { user, logout } = useAuth();
 
  const isLanding = location.pathname === '/';
 
  const handleAnchorClick = (href: string) => {
    if (isLanding) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/${href}`;
    }
  };
 
  const handleLogout = () => {
    logout();
    navigate('/');
  };
 
  return (
    <nav
      style={{
        backgroundColor: '#0E1627',
        height: '68px',
        borderBottom: '1px solid rgba(189,184,185,0.15)',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div
          style={{
            width: '28px', height: '28px',
            backgroundColor: '#7F6269',
            borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 2h7l3 3v9H3V2z" stroke="#F4E1E0" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M10 2v3h3" stroke="#F4E1E0" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M5 8h6M5 11h4" stroke="#F4E1E0" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '22px', color: '#F4E1E0' }}>
          ResuFlow
        </span>
      </Link>
 
      {/* Center links */}
      <div className="hidden md:flex items-center gap-8">
        {[
          { label: 'Home',         href: '#home' },
          { label: 'How It Works', href: '#how-it-works' },
          { label: 'Features',     href: '#features' },
          { label: 'Examples',     href: '#examples' },
        ].map(({ label, href }) => (
          <button
            key={label}
            onClick={() => handleAnchorClick(href)}
            style={{
              color: '#BDB8B9', fontSize: '14px',
              background: 'none', border: 'none',
              cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            }}
            className="hover:opacity-80 transition-opacity"
          >
            {label}
          </button>
        ))}
      </div>
 
      {/* Right side — auth */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {user ? (
          // ── Logged in ──
          <>
            {/* Avatar + name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '34px', height: '34px',
                  borderRadius: '50%',
                  backgroundColor: '#7F6269',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#F4E1E0', fontSize: '13px', fontWeight: 700,
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span style={{ color: '#F4E1E0', fontSize: '14px', fontWeight: 500 }}>
                {user.name.split(' ')[0]}
              </span>
            </div>
 
            {/* Logout */}
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'transparent',
                color: '#BDB8B9',
                fontSize: '13px',
                fontWeight: 500,
                padding: '7px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(189,184,185,0.3)',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
              }}
              className="hover:opacity-80 transition-opacity"
            >
              Log out
            </button>
          </>
        ) : (
          // ── Logged out ──
          <>
            <button
              onClick={() => navigate('/login')}
              style={{
                backgroundColor: 'transparent',
                color: '#BDB8B9',
                fontSize: '14px',
                fontWeight: 500,
                padding: '8px 18px',
                borderRadius: '999px',
                border: '1px solid rgba(189,184,185,0.3)',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
              }}
              className="hover:opacity-80 transition-opacity"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              style={{
                backgroundColor: '#7F6269',
                color: '#F4E1E0',
                fontSize: '14px',
                fontWeight: 600,
                padding: '8px 20px',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: 'inset 0 1px 0 rgba(244,225,224,0.12)',
              }}
              className="hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </nav>
  );
}