import { useState } from "react";
import { useNavigate } from "react-router";
import { Copy, ExternalLink, Download, CheckCheck, Printer, Mail, Share2 } from "lucide-react";

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
import { Navbar } from "./Navbar";
import { Breadcrumb } from "./Breadcrumb";


function QRCodeSVG() {
  // Hand-crafted QR-code-like pattern (decorative)
  const cells = [
    [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,0,0,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,0,1],
    [0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,1,0],
    [1,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,1],
    [0,0,1,0,1,0,0,1,1,1,0,0,1,0,1,0,1,0,1,0,0],
    [1,0,0,1,1,0,1,0,0,0,1,0,0,1,0,0,1,1,0,1,1],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,1,0,0,0,0,0],
    [1,1,1,1,1,1,1,0,0,1,0,0,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,0,0,0,1,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,1,0,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,0,0,0,1,1,0,0,1,0,1,0],
    [1,0,0,0,0,0,1,0,1,0,1,1,0,0,0,1,0,0,1,0,1],
    [1,1,1,1,1,1,1,0,0,1,0,0,1,0,1,0,1,0,0,1,0],
  ];

  const size = 21;
  const cellSize = 8;
  const padding = 12;
  const totalSize = size * cellSize + padding * 2;

  return (
    <svg
      width={totalSize}
      height={totalSize}
      viewBox={`0 0 ${totalSize} ${totalSize}`}
      style={{ borderRadius: "12px" }}
    >
      <rect width={totalSize} height={totalSize} fill="#E5C5C1" rx="12" />
      {cells.map((row, rowIdx) =>
        row.map((cell, colIdx) =>
          cell ? (
            <rect
              key={`${rowIdx}-${colIdx}`}
              x={padding + colIdx * cellSize}
              y={padding + rowIdx * cellSize}
              width={cellSize - 1}
              height={cellSize - 1}
              fill="#0E1627"
              rx="1"
            />
          ) : null
        )
      )}
    </svg>
  );
}

export function DeploymentScreen() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const portfolioUrl =
    localStorage.getItem("resuflow_portfolio_url") || "resuflow.app/your-portfolio";

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        backgroundColor: "#0E1627",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="mb-12">
          <Breadcrumb currentStep={4} />
        </div>

        {/* Celebration Heading */}
        <div className="text-center mb-12">
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(32px, 5vw, 48px)",
              color: "#F4E1E0",
              marginBottom: "12px",
              lineHeight: 1.2,
            }}
          >
            Your Portfolio is Live 🎉
          </h1>
          <p style={{ color: "#BDB8B9", fontSize: "16px" }}>
            Share it, print it, or embed the QR code directly on your CV.
          </p>
        </div>

        {/* Main Card */}
        <div
          style={{
            backgroundColor: "rgba(189,184,185,0.05)",
            borderRadius: "24px",
            padding: "clamp(28px, 5vw, 48px)",
            border: "1px solid rgba(189,184,185,0.2)",
            boxShadow: "0 8px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div className="flex flex-col md:flex-row gap-10 md:gap-0">
            {/* ── Left Column ── */}
            <div className="flex-1 pr-0 md:pr-10">
              <div
                style={{
                  color: "#BDB8B9",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                Your Portfolio URL
              </div>

              {/* URL box */}
              <div
                style={{
                  backgroundColor: "#0E1627",
                  borderRadius: "8px",
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  marginBottom: "16px",
                  border: "1px solid rgba(189,184,185,0.2)",
                }}
              >
                <span
                  style={{
                    color: "#F4E1E0",
                    fontSize: "14px",
                    fontFamily: "monospace",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {portfolioUrl}
                </span>
                <button
                  onClick={handleCopy}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: copied ? "#4ade80" : "#7F6269",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "color 0.2s ease",
                  }}
                >
                  {copied ? (
                    <CheckCheck size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Open button */}
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "#F4E1E0",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "11px 24px",
                  borderRadius: "999px",
                  border: "1.5px solid #BDB8B9",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "24px",
                }}
                className="hover:opacity-80 transition-opacity"
              >
                <ExternalLink size={14} />
                Open Portfolio
              </button>

              {/* Share row */}
              <div>
                <div
                  style={{
                    color: "#BDB8B9",
                    fontSize: "12px",
                    fontWeight: 500,
                    marginBottom: "10px",
                  }}
                >
                  Share to
                </div>
                <div className="flex gap-3">
                  {[
                    { icon: <LinkedinIcon size={16} />, label: "LinkedIn" },
                    { icon: <TwitterIcon size={16} />, label: "Twitter" },
                    {
                      icon: (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      ),
                      label: "WhatsApp",
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      title={item.label}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(189,184,185,0.08)",
                        border: "1px solid rgba(189,184,185,0.2)",
                        cursor: "pointer",
                        color: "#BDB8B9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "color 0.2s ease, background-color 0.2s ease",
                      }}
                      className="hover:text-[#F4E1E0] hover:bg-[#7F6269]"
                    >
                      {item.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div
              className="hidden md:block"
              style={{
                width: "1px",
                backgroundColor: "rgba(189,184,185,0.2)",
                alignSelf: "stretch",
              }}
            />

            {/* ── Right Column ── */}
            <div className="flex-1 pl-0 md:pl-10">
              <div
                style={{
                  color: "#BDB8B9",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Your QR Code
              </div>

              {/* QR Code */}
              <div className="flex justify-center mb-4">
                <QRCodeSVG />
              </div>

              <p
                style={{
                  color: "#BDB8B9",
                  fontSize: "12px",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                High-res, print-ready, Level H error correction.
              </p>

              {/* Download buttons */}
              <div className="flex gap-3">
                <button
                  style={{
                    flex: 1,
                    backgroundColor: "#7F6269",
                    color: "#F4E1E0",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "12px 0",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    boxShadow: "inset 0 1px 0 rgba(244,225,224,0.12)",
                  }}
                  className="hover:opacity-90 transition-opacity"
                >
                  <Download size={14} />
                  Download PNG
                </button>
              
              </div>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div style={{ marginTop: "48px" }}>
          <h3
            style={{
              color: "#F4E1E0",
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            What's Next?
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              {
                icon: <Printer size={20} style={{ color: "#7F6269" }} />,
                title: "Print on your CV",
                desc: "Add the QR code to your CV header or footer for instant digital extension.",
              },
              {
                icon: <Mail size={20} style={{ color: "#7F6269" }} />,
                title: "Add to Email Signature",
                desc: "Drop your portfolio link into your email signature for passive discoverability.",
              },
              {
                icon: <LinkedinIcon size={20} />,
                title: "Share on LinkedIn",
                desc: "Post your portfolio launch — recruiters and peers will notice.",
              },
            ].map((tip) => (
              <div
                key={tip.title}
                style={{
                  backgroundColor: "rgba(189,184,185,0.05)",
                  borderRadius: "12px",
                  padding: "24px",
                  border: "1px solid rgba(189,184,185,0.18)",
                }}
              >
                <div style={{ marginBottom: "10px" }}>{tip.icon}</div>
                <div
                  style={{
                    color: "#F4E1E0",
                    fontSize: "15px",
                    fontWeight: 600,
                    marginBottom: "6px",
                  }}
                >
                  {tip.title}
                </div>
                <div style={{ color: "#BDB8B9", fontSize: "13px", lineHeight: 1.6 }}>{tip.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit link */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/preview")}
            style={{
              background: "none",
              border: "none",
              color: "#BDB8B9",
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              textDecoration: "underline",
            }}
            className="hover:opacity-80 transition-opacity"
          >
            Edit Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
