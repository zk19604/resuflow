'use client';
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1658046413536-6e5933dfd939?w=800&h=1000&fit=crop",  category: "Live"              },
  { url: "https://images.unsplash.com/photo-1571175502603-f9e082ff6ab3?w=800&h=600&fit=crop",   category: "Studio"            },
  { url: "https://images.unsplash.com/photo-1558258021-971dd2148be5?w=800&h=900&fit=crop",      category: "Press"             },
  { url: "https://images.unsplash.com/photo-1619482815143-4f3c5c04a370?w=800&h=700&fit=crop",  category: "Behind the Scenes" },
  { url: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=1100&fit=crop", category: "Live"              },
  { url: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",  category: "Studio"            },
  { url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop",  category: "Live"              },
  { url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=900&fit=crop",  category: "Behind the Scenes" },
];

const tabs = ["All", "Live", "Studio", "Behind the Scenes", "Press"];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All" ? galleryImages : galleryImages.filter(i => i.category === activeTab);

  const handlePrev = () => { if (selectedImage !== null && selectedImage > 0) setSelectedImage(selectedImage - 1); };
  const handleNext = () => { if (selectedImage !== null && selectedImage < filtered.length - 1) setSelectedImage(selectedImage + 1); };

  // Simple 3-column masonry using CSS columns
  return (
    <section id="gallery" style={{ position: "relative", padding: "128px 24px", overflow: "hidden", background: "#080B14" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(36px,4vw,52px)", fontWeight: 700, color: "#F0EEF5", marginBottom: 24 }}>
          Gallery
        </h2>

        {/* Filter Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, marginBottom: 32 }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                position: "relative",
                fontFamily: "'Raleway', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: activeTab === tab ? "#F0EEF5" : "#9E9BB0",
                background: "none",
                border: "none",
                cursor: "pointer",
                paddingBottom: 8,
                transition: "color 0.2s ease",
              }}
            >
              {tab}
              {activeTab === tab && (
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #C2185B, #6A1B9A)" }} />
              )}
            </button>
          ))}
        </div>

        {/* Masonry grid via CSS columns */}
        <div style={{ columns: "3", columnGap: "16px" }}>
          {filtered.map((image, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                marginBottom: 16,
                breakInside: "avoid",
              }}
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.url}
                alt={`Gallery ${index + 1}`}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                  transform: hoveredImage === index ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.5s ease",
                }}
              />
              {hoveredImage === index && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(8,11,20,0.55)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ position: "absolute", top: 16, left: 16, padding: "6px 12px", borderRadius: 999, border: "1px solid #C2185B", background: "rgba(194,24,91,0.10)", backdropFilter: "blur(4px)" }}>
                    <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, color: "#C2185B", textTransform: "uppercase", letterSpacing: "0.1em" }}>{image.category}</span>
                  </div>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.10)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 24, lineHeight: 1 }}>+</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Load More */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
          <button
            style={{
              padding: "12px 32px",
              borderRadius: 4,
              border: "1px solid #C2185B",
              background: "transparent",
              color: "#C2185B",
              fontFamily: "'Raleway', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(194,24,91,0.06)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            Load More Photos
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}
          onClick={() => setSelectedImage(null)}
        >
          {/* Close */}
          <button
            style={{ position: "absolute", top: 32, right: 32, width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.10)", backdropFilter: "blur(4px)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
            onClick={() => setSelectedImage(null)}
          >
            <X style={{ width: 24, height: 24 }} />
          </button>

          {selectedImage > 0 && (
            <button
              style={{ position: "absolute", left: 32, width: 48, height: 48, borderRadius: "50%", background: "rgba(194,24,91,0.80)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <ChevronLeft style={{ width: 24, height: 24 }} />
            </button>
          )}

          {selectedImage < filtered.length - 1 && (
            <button
              style={{ position: "absolute", right: 32, width: 48, height: 48, borderRadius: "50%", background: "rgba(194,24,91,0.80)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <ChevronRight style={{ width: 24, height: 24 }} />
            </button>
          )}

          <img
            src={filtered[selectedImage].url}
            alt=""
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            onClick={(e) => e.stopPropagation()}
          />

          <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", fontFamily: "'Space Mono', monospace", fontSize: 14, color: "#fff" }}>
            {String(selectedImage + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
          </div>
        </div>
      )}
    </section>
  );
}
