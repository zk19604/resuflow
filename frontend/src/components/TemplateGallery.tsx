import { useState } from "react";
import { useNavigate } from "react-router";
import { Check, Star } from "lucide-react";
import { Navbar } from "./Navbar";
import { Breadcrumb } from "./Breadcrumb";

// Template preview gradients (replacing Figma assets)
const templateGradients: Record<number, string> = {
  1: "linear-gradient(135deg, #1a0810 0%, #3d1424 50%, #6b2040 100%)",
  2: "linear-gradient(135deg, #0d0008 0%, #4a1527 50%, #7a1e3f 100%)",
  3: "linear-gradient(135deg, #001433 0%, #0052a3 50%, #00a8e8 100%)",
  4: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #5e3ba8 100%)",
  5: "linear-gradient(135deg, #001f5c 0%, #1565c0 50%, #4fc3f7 100%)",
  6: "linear-gradient(135deg, #120020 0%, #5a0080 50%, #9c27b0 100%)",
  7: "linear-gradient(135deg, #f5f0e8 0%, #e8dcc8 50%, #c8b48a 100%)",
  8: "linear-gradient(135deg, #070015 0%, #1c0535 50%, #4a0e70 100%)",
  9: "linear-gradient(135deg, #0a1828 0%, #1b3a5c 50%, #2e5a8a 100%)",
  10: "linear-gradient(135deg, #000000 0%, #111111 50%, #002222 100%)",
  11: "linear-gradient(135deg, #0f172a 0%, #581c87 50%, #7c3aed 100%)", // Purple and Slate Neon
};

const categories = ["All", "Minimal", "Bold", "Creative", "Corporate", "Academic"];

const templates = [
  { id: 1, name: "Morgan Hayes", category: "Bold", desc: "Dramatic book-themed design with rich typography and editorial flair.", rating: 5 },
  { id: 2, name: "Luxe Portfolio", category: "Creative", desc: "Dark luxury design with burgundy and gold accents for premium brands.", rating: 5 },
  { id: 3, name: "Code Builder", category: "Bold", desc: "Vibrant primary colors and geometric shapes for modern developers.", rating: 4 },
  { id: 4, name: "Ahmed Raza", category: "Corporate", desc: "Card-based layout with yellow and purple accents for software engineers.", rating: 5 },
  { id: 5, name: "Clean Developer", category: "Minimal", desc: "Professional blue design with clean sections and modern aesthetics.", rating: 4 },
  { id: 6, name: "Fatima Designer", category: "Creative", desc: "Dark purple gradient with neon accents for creative professionals.", rating: 5 },
  { id: 7, name: "Fatima Mazhar", category: "Minimal", desc: "Elegant beige editorial layout with sophisticated typography.", rating: 4 },
  { id: 8, name: "Alex Moracain", category: "Creative", desc: "Space-themed dark design with purple gradients and modern cards.", rating: 5 },
  { id: 9, name: "Alexandra Whitmore", category: "Academic", desc: "Traditional clean layout with navy accents for corporate professionals.", rating: 4 },
  { id: 10, name: "Taylor Sheeran", category: "Bold", desc: "High-contrast black design with cyan and orange accent colors.", rating: 5 },
  { 
    id: 11, 
    name: "neon-vault", // Keep this lowercase/hyphenated to match your switcher
    category: "Creative", 
    desc: "Cyberpunk aesthetic with glowing purple accents and slate backgrounds.", 
    rating: 5 
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          style={{
            color: i <= count ? "#7F6269" : "rgba(189,184,185,0.3)",
            fill: i <= count ? "#7F6269" : "none",
          }}
        />
      ))}
    </div>
  );
}

export function TemplateGallery() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(2);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredTemplates =
    activeFilter === "All"
      ? templates
      : templates.filter((t) => t.category === activeFilter);

  const selectedTemplate = templates.find((t) => t.id === selectedId);

  return (
    <div
      style={{
        backgroundColor: "#0E1627",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        paddingBottom: "96px",
      }}
    >
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 md:px-20 py-12">
        {/* Breadcrumb */}
        <div className="mb-10">
          <Breadcrumb currentStep={2} />
        </div>

        {/* Page Title */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h1
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "44px",
              color: "#F4E1E0",
              marginBottom: "14px",
              lineHeight: 1.2,
            }}
          >
            Choose Your Template
          </h1>
          <p
            style={{
              color: "#BDB8B9",
              fontSize: "16px",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Pick a ready-made layout that matches your professional style. You can customize colors
            and content after.
          </p>
        </div>

        {/* Filter Pills */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                backgroundColor: activeFilter === cat ? "#7F6269" : "transparent",
                color: activeFilter === cat ? "#F4E1E0" : "#BDB8B9",
                fontSize: "14px",
                fontWeight: activeFilter === cat ? 600 : 400,
                padding: "8px 20px",
                borderRadius: "999px",
                border: activeFilter === cat ? "none" : "1px solid #BDB8B9",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "28px",
          }}
        >
          {filteredTemplates.map((tmpl) => {
            const isSelected = selectedId === tmpl.id;
            const isHovered = hoveredId === tmpl.id;

            return (
              <div
                key={tmpl.id}
                onClick={() => setSelectedId(tmpl.id)}
                onMouseEnter={() => setHoveredId(tmpl.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  backgroundColor: "#0E1627",
                  borderRadius: "20px",
                  border: isSelected
                    ? "2px solid #7F6269"
                    : isHovered
                    ? "1px solid rgba(229,197,193,0.5)"
                    : "1px solid rgba(189,184,185,0.25)",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: isHovered
                    ? "0 12px 40px rgba(0,0,0,0.4)"
                    : isSelected
                    ? "0 8px 32px rgba(127,98,105,0.3)"
                    : "0 2px 12px rgba(0,0,0,0.2)",
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
              >
                {/* Top accent bar */}
                <div
                  style={{
                    height: "6px",
                    backgroundColor: isSelected ? "#7F6269" : "#BDB8B9",
                    opacity: isSelected ? 1 : 0.4,
                    transition: "all 0.2s ease",
                  }}
                />

                {/* Preview area */}
                <div
                  style={{
                    height: "280px",
                    background: templateGradients[tmpl.id] || "#111",
                    overflow: "hidden",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    <div style={{ color: "rgba(255,255,255,0.15)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
                      {tmpl.category}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "14px", fontWeight: 600 }}>
                      {tmpl.name === 'neon-vault' ? 'Neon Vault' : tmpl.name}
                    </div>
                  </div>
                  {/* Watermark */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "12px",
                      color: "rgba(189,184,185,0.2)",
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {tmpl.name}
                  </div>
                </div>

                {/* Bottom info */}
                <div
                  style={{
                    backgroundColor: "#080f1a",
                    padding: "18px 22px",
                    position: "relative",
                  }}
                >
                  {/* Selected checkmark */}
                  {isSelected && (
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "18px",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "#7F6269",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Check size={13} color="#F4E1E0" strokeWidth={2.5} />
                    </div>
                  )}

                  <div
                    style={{
                      color: "#F4E1E0",
                      fontSize: "17px",
                      fontWeight: 600,
                      marginBottom: "6px",
                      paddingRight: isSelected ? "32px" : "0",
                    }}
                  >
                    {tmpl.name}
                  </div>

                  {/* Category tag */}
                  <div style={{ marginBottom: "8px" }}>
                    <span
                      style={{
                        backgroundColor: "rgba(127,98,105,0.2)",
                        color: "#E5C5C1",
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "999px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {tmpl.category}
                    </span>
                  </div>

                  <p
                    style={{
                      color: "#BDB8B9",
                      fontSize: "13px",
                      lineHeight: 1.5,
                      marginBottom: "14px",
                    }}
                  >
                    {tmpl.desc}
                  </p>

                  {/* Bottom row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <StarRating count={tmpl.rating} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(tmpl.id);
                      }}
                      style={{
                        backgroundColor: isSelected ? "#7F6269" : "transparent",
                        color: isSelected ? "#F4E1E0" : "#BDB8B9",
                        fontSize: "12px",
                        fontWeight: 600,
                        padding: "5px 14px",
                        borderRadius: "999px",
                        border: isSelected ? "none" : "1px solid rgba(189,184,185,0.5)",
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {isSelected ? "Selected ✓" : "Preview"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#0E1627",
          borderTop: "1px solid rgba(189,184,185,0.2)",
          padding: "16px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 50,
        }}
      >
        {/* Selected info */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#BDB8B9", fontSize: "14px" }}>Template selected:</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "3px",
                backgroundColor: "#7F6269",
              }}
            />
            <span style={{ color: "#F4E1E0", fontSize: "14px", fontWeight: 600 }}>
              {selectedTemplate?.name}
            </span>
            <span
              style={{
                backgroundColor: "rgba(127,98,105,0.2)",
                color: "#E5C5C1",
                fontSize: "10px",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "999px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {selectedTemplate?.category}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => navigate("/upload")}
            style={{
              backgroundColor: "transparent",
              color: "#F4E1E0",
              fontSize: "15px",
              fontWeight: 500,
              padding: "12px 24px",
              borderRadius: "999px",
              border: "1.5px solid rgba(189,184,185,0.5)",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
            }}
            className="hover:opacity-80 transition-opacity"
          >
            Back
          </button>
          <button
            onClick={() => {
              const tmpl = templates.find((t) => t.id === selectedId);
              if (tmpl) {
                localStorage.setItem("resuflow_template", JSON.stringify({ id: tmpl.id, name: tmpl.name, category: tmpl.category }));
              }
              navigate("/preview");
            }}
            style={{
              backgroundColor: "#7F6269",
              color: "#F4E1E0",
              fontSize: "15px",
              fontWeight: 600,
              padding: "12px 32px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "inset 0 1px 0 rgba(244,225,224,0.12), 0 4px 20px rgba(127,98,105,0.35)",
            }}
            className="hover:opacity-90 transition-opacity"
          >
            Continue with this Template →
          </button>
        </div>
      </div>
    </div>
  );
}