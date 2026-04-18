import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { UploadCloud, Globe, Lock, FileText, X, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { Navbar } from "./Navbar";

export function UploadScreen() {
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    setUploaded(true);
  };

  const handleFileChange = () => {
    setUploaded(true);
  };

  return (
    <div
      style={{ backgroundColor: "#0E1627", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}
    >
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <div className="mb-12">
          <Breadcrumb currentStep={1} />
        </div>

        {/* Main Upload Card */}
        <div
          style={{
            backgroundColor: "rgba(189,184,185,0.05)",
            borderRadius: "24px",
            padding: "48px",
            boxShadow: "0 8px 48px rgba(0,0,0,0.35)",
          }}
        >
          {!uploaded ? (
            <>
              {/* Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                style={{
                  border: `2px dashed rgba(133,120,97,${dragging ? "0.9" : "0.5"})`,
                  borderRadius: "16px",
                  backgroundColor: dragging
                    ? "rgba(231,212,187,0.08)"
                    : "rgba(231,212,187,0.04)",
                  padding: "52px 32px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <div className="flex justify-center mb-5">
                  <UploadCloud
                    size={48}
                    style={{ color: "#48252F" }}
                    strokeWidth={1.5}
                  />
                </div>
                <h2
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "24px",
                    color: "#E7D4BB",
                    marginBottom: "10px",
                  }}
                >
                  Drop your CV here
                </h2>
                <p style={{ color: "#857861", fontSize: "13px", marginBottom: "24px" }}>
                  Supports PDF and DOCX up to 10MB
                </p>
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: "#E7D4BB",
                    fontSize: "15px",
                    fontWeight: 600,
                    padding: "11px 28px",
                    borderRadius: "999px",
                    border: "1.5px solid #857861",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  Browse Files
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(133,120,97,0.25)" }} />
                <span style={{ color: "#857861", fontSize: "13px" }}>or</span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(133,120,97,0.25)" }} />
              </div>

              {/* LinkedIn URL */}
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#857861",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  Paste LinkedIn URL instead
                </label>
                <div className="relative">
                  <Globe
                    size={16}
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#857861",
                    }}
                  />
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(231,212,187,0.1)",
                      border: "1px solid #857861",
                      borderRadius: "8px",
                      padding: "12px 14px 12px 38px",
                      color: "#E7D4BB",
                      fontSize: "14px",
                      fontFamily: "'DM Sans', sans-serif",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    className="placeholder-[#857861] focus:border-[#48252F]"
                  />
                </div>
              </div>
            </>
          ) : (
            /* Uploaded Success State */
            <>
              <div
                style={{
                  border: "2px solid #48252F",
                  borderRadius: "16px",
                  backgroundColor: "rgba(72,37,47,0.08)",
                  padding: "36px 32px",
                  textAlign: "center",
                }}
              >
                <div className="flex justify-center mb-4">
                  <FileText size={44} style={{ color: "#48252F" }} strokeWidth={1.5} />
                </div>
                <div
                  style={{
                    color: "#E7D4BB",
                    fontSize: "16px",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  Fatima_CV_2025.pdf
                </div>
                <div style={{ color: "#857861", fontSize: "13px", marginBottom: "16px" }}>
                  248 KB
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} style={{ color: "#48252F" }} />
                  <span style={{ color: "#48252F", fontSize: "13px", fontWeight: 500 }}>
                    File ready to process
                  </span>
                </div>
                <button
                  onClick={() => setUploaded(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#857861",
                    fontSize: "13px",
                    cursor: "pointer",
                    marginTop: "12px",
                    fontFamily: "'DM Sans', sans-serif",
                    textDecoration: "underline",
                  }}
                >
                  Remove
                </button>
              </div>
            </>
          )}
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-center gap-2.5 mt-6">
          <Lock size={13} style={{ color: "#857861" }} />
          <span style={{ color: "#857861", fontSize: "13px" }}>
            Your file is processed securely and never stored permanently.
          </span>
        </div>

        {/* Continue CTA */}
        {uploaded && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => navigate("/extraction")}
              style={{
                backgroundColor: "#48252F",
                color: "#E7D4BB",
                fontSize: "15px",
                fontWeight: 600,
                padding: "14px 40px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                boxShadow:
                  "inset 0 1px 0 rgba(231,212,187,0.12), 0 4px 20px rgba(72,37,47,0.4)",
                fontFamily: "'DM Sans', sans-serif",
              }}
              className="hover:opacity-90 transition-opacity"
            >
              Continue to AI Extraction →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}