'use client';
import { MapPin, Mic } from "lucide-react";
import { useState, useEffect } from "react";

const tourDates = [
  { day: "15", month: "MAR", year: "2026", event: "Dreamscapes World Tour",  city: "Los Angeles",  country: "USA", venue: "The Wiltern",               status: "on-sale"  },
  { day: "22", month: "MAR", year: "2026", event: "Dreamscapes World Tour",  city: "San Francisco", country: "USA", venue: "The Fillmore",              status: "few-left" },
  { day: "05", month: "APR", year: "2026", event: "Electric Dreams Festival", city: "Austin",       country: "USA", venue: "Moody Amphitheater",        status: "on-sale"  },
  { day: "12", month: "APR", year: "2026", event: "Dreamscapes World Tour",  city: "New York",     country: "USA", venue: "Terminal 5",                status: "sold-out" },
  { day: "20", month: "APR", year: "2026", event: "Neon Nights Live",        city: "Miami",        country: "USA", venue: "The Fillmore Miami Beach",  status: "on-sale"  },
  { day: "28", month: "APR", year: "2026", event: "Dreamscapes World Tour",  city: "Chicago",      country: "USA", venue: "Riviera Theatre",           status: "few-left" },
];

function statusBadge(status: string) {
  if (status === "on-sale")  return { bg: "rgba(29,185,84,0.15)",  color: "#1DB954", label: "On Sale"  };
  if (status === "few-left") return { bg: "rgba(255,143,0,0.15)",  color: "#FF8F00", label: "Few Left" };
  return                             { bg: "rgba(158,155,176,0.15)", color: "#9E9BB0", label: "Sold Out" };
}

export function TourDates() {
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);
  const [countdown, setCountdown] = useState({ days: 10, hours: 15, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)   return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)    return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="events"
      style={{
        position: "relative",
        padding: "128px 24px",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 0% 50%, rgba(100,20,80,0.25) 0%, transparent 60%), radial-gradient(ellipse at 100% 50%, rgba(40,20,100,0.20) 0%, transparent 60%), #0A0D18",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(36px,4vw,52px)", fontWeight: 700, color: "#F0EEF5", marginBottom: 8 }}>Tour Dates</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "#9E9BB0" }}>Catch the show live — worldwide.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 48 }}>
          {/* Left — Event List */}
          <div>
            {tourDates.map((date, index) => {
              const badge = statusBadge(date.status);
              const isHovered = hoveredDate === index;
              return (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    height: 80,
                    padding: "0 24px",
                    borderRadius: 4,
                    borderBottom: "1px solid rgba(240,238,245,0.05)",
                    background: isHovered ? "rgba(194,24,91,0.04)" : "transparent",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                  }}
                  onMouseEnter={() => setHoveredDate(index)}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  {/* Hover line */}
                  {isHovered && (
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, #C2185B, transparent)" }} />
                  )}

                  {/* Date Block */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      paddingRight: 24,
                      marginRight: 24,
                      borderRight: "1px solid #C2185B",
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 28, color: "#C2185B", fontWeight: 700, lineHeight: 1 }}>{date.day}</div>
                    <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, color: "#9E9BB0", textTransform: "uppercase", marginTop: 4 }}>{date.month} {date.year}</div>
                  </div>

                  {/* Event Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: "#F0EEF5", fontWeight: 700, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{date.event}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 13 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#9E9BB0", flexShrink: 0 }}>
                        <MapPin style={{ width: 14, height: 14 }} />
                        {date.city}, {date.country}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#4A4760", flexShrink: 0 }}>
                        <Mic style={{ width: 14, height: 14 }} />
                        {date.venue}
                      </div>
                    </div>
                  </div>

                  {/* Status & CTA */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                    <span style={{ padding: "4px 12px", borderRadius: 999, background: badge.bg, color: badge.color, fontFamily: "'Raleway', sans-serif", fontSize: 10, fontWeight: 600, textTransform: "uppercase" }}>
                      {badge.label}
                    </span>
                    {date.status !== "sold-out" && (
                      <button
                        style={{
                          padding: "8px 20px",
                          borderRadius: 2,
                          border: "1px solid #C2185B",
                          background: "transparent",
                          color: "#C2185B",
                          fontFamily: "'Raleway', sans-serif",
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#C2185B"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#C2185B"; }}
                      >
                        Buy Ticket
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right — Countdown */}
          <div style={{ position: "sticky", top: 96 }}>
            <div
              style={{
                position: "relative",
                borderRadius: 8,
                overflow: "hidden",
                height: 500,
                backgroundImage: "url(https://images.unsplash.com/photo-1658046413536-6e5933dfd939?w=600&h=800&fit=crop)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,11,20,0.95) 0%, transparent 60%)" }} />

              {/* Content */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 32 }}>
                <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, color: "#C2185B", textTransform: "uppercase", letterSpacing: "0.20em", marginBottom: 8 }}>Next Show</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: "#F0EEF5", fontWeight: 600, marginBottom: 24 }}>
                  {tourDates[0].venue} · {tourDates[0].city}
                </div>

                {/* Countdown */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
                  {[
                    { value: countdown.days,    label: "DAYS" },
                    { value: countdown.hours,   label: "HRS"  },
                    { value: countdown.minutes, label: "MIN"  },
                    { value: countdown.seconds, label: "SEC"  },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(240,238,245,0.04)",
                        backdropFilter: "blur(4px)",
                        borderRadius: 4,
                        padding: 12,
                        border: "1px solid rgba(240,238,245,0.05)",
                      }}
                    >
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(28px,3vw,48px)", color: "#F0EEF5", fontWeight: 300, lineHeight: 1 }}>
                        {String(item.value).padStart(2, "0")}
                      </div>
                      <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, color: "#9E9BB0", textTransform: "uppercase", marginTop: 4 }}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
