import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Copy, ExternalLink, Download, CheckCheck, Loader2 } from "lucide-react";
import { Navbar } from "./Navbar";
import { Breadcrumb } from "./Breadcrumb";

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

function QRCodeSVG() {
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
    <svg width={totalSize} height={totalSize} viewBox={`0 0 ${totalSize} ${totalSize}`} style={{ borderRadius: "12px" }}>
      <rect width={totalSize} height={totalSize} fill="#E5C5C1" rx="12" />
      {cells.map((row, rowIdx) =>
        row.map((cell, colIdx) =>
          cell ? (
            <rect key={`${rowIdx}-${colIdx}`} x={padding + colIdx * cellSize} y={padding + rowIdx * cellSize} width={cellSize - 1} height={cellSize - 1} fill="#0E1627" rx="1" />
          ) : null
        )
      )}
    </svg>
  );
}

/** Mini CV mockup shown inside the Print feature card */
function CvMockup({ qrSrc }: { qrSrc: string | null }) {
  return (
    <div style={{
      width: "100%",
      background: "#FFFFFF",
      borderRadius: "10px",
      padding: "18px 20px",
      boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      position: "relative",
      fontFamily: "sans-serif",
    }}>
      {/* header bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ width: "60%", height: "10px", background: "#1A1A2E", borderRadius: "3px", marginBottom: "5px" }} />
          <div style={{ width: "40%", height: "7px", background: "#BDB8B9", borderRadius: "3px" }} />
        </div>
        {/* QR code in corner */}
        <div style={{ flexShrink: 0, marginLeft: "12px" }}>
          {qrSrc ? (
            <img src={qrSrc} alt="QR" style={{ width: "44px", height: "44px", borderRadius: "4px" }} />
          ) : (
            <div style={{ width: "44px", height: "44px", borderRadius: "4px", overflow: "hidden" }}>
              <QRCodeSVG />
            </div>
          )}
        </div>
      </div>
      {/* divider */}
      <div style={{ height: "1px", background: "#E8E8E8" }} />
      {/* content lines */}
      {[["45%", "30%"], ["55%", "35%"], ["40%", "50%"]].map(([w1, w2], i) => (
        <div key={i} style={{ display: "flex", gap: "16px" }}>
          <div style={{ width: w1, height: "6px", background: "#D0D0D0", borderRadius: "2px" }} />
          <div style={{ width: w2, height: "6px", background: "#E8E8E8", borderRadius: "2px" }} />
        </div>
      ))}
    </div>
  );
}

/** Live email signature preview */
function SignaturePreview({ name, role, url }: { name: string; role: string; url: string }) {
  return (
    <div style={{
      background: "#1C1C1E",
      borderRadius: "10px",
      padding: "20px 22px",
      border: "1px solid rgba(255,255,255,0.08)",
      fontFamily: "Arial, sans-serif",
    }}>
      {/* fake email reply header */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "14px", opacity: 0.35 }}>
        {["60%","45%","30%"].map((w, i) => (
          <div key={i} style={{ width: w, height: "5px", background: "#888", borderRadius: "2px" }} />
        ))}
      </div>
      <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "14px" }} />
      {/* signature body */}
      <div>
        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>Best regards,</div>
        <div style={{ fontSize: "15px", fontWeight: 700, color: "#F4E1E0", marginBottom: "2px" }}>{name}</div>
        {role && <div style={{ fontSize: "12px", color: "#BDB8B9", marginBottom: "8px" }}>{role}</div>}
        <div style={{ height: "2px", width: "32px", background: "#7F6269", borderRadius: "1px", marginBottom: "8px" }} />
        <a href={url} style={{ fontSize: "12px", color: "#E5C5C1", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ fontSize: "10px" }}>🔗</span>
          {url}
        </a>
      </div>
    </div>
  );
}

export function DeploymentScreen() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [sigTab, setSigTab] = useState<"html" | "text">("html");
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [qrLoading, setQrLoading] = useState(true);
  const [qrError, setQrError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const portfolioUrl =
    localStorage.getItem("resuflow_portfolio_url") || "resuflow.app/your-portfolio";
  const username = localStorage.getItem("resuflow_username") || "";

  useEffect(() => {
    const stored = localStorage.getItem("resuflow_profile");
    if (stored) {
      try { setProfile(JSON.parse(stored)); } catch {}
    }
    if (!username) { setQrLoading(false); return; }
    (async () => {
      try {
        const res = await fetch(`/api/qrcode/${username}`);
        const data = await res.json();
        if (res.ok && data.qrCode) setQrCodeUrl(data.qrCode);
        else setQrError("QR code unavailable");
      } catch { setQrError("Failed to load QR code"); }
      finally { setQrLoading(false); }
    })();
  }, [username]);

  const name = profile?.personalInfo?.name || "Your Name";
  const role = profile?.workExperience?.[0]?.role || "";

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `resuflow-qr-${username}.png`;
    link.click();
  };

  const handlePrintCard = () => {
    const qrImg = qrCodeUrl ? `<img src="${qrCodeUrl}" style="width:160px;height:160px;border-radius:10px;" />` : "";
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>Portfolio QR Card</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #f5f5f5; font-family: 'Georgia', serif; }
    .card {
      background: white;
      border-radius: 16px;
      padding: 40px 48px;
      text-align: center;
      box-shadow: 0 4px 40px rgba(0,0,0,0.12);
      max-width: 340px;
      width: 100%;
    }
    .qr { margin-bottom: 20px; }
    .label { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #999; margin-bottom: 8px; }
    .name { font-size: 20px; font-weight: 700; color: #111; margin-bottom: 6px; }
    .url { font-size: 13px; color: #7F6269; font-family: monospace; margin-bottom: 4px; }
    .hint { font-size: 11px; color: #bbb; margin-top: 12px; }
    .divider { width: 32px; height: 2px; background: #7F6269; margin: 14px auto; border-radius: 1px; }
    @media print {
      body { background: white; }
      .card { box-shadow: none; }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="label">Scan to view portfolio</div>
    <div class="qr">${qrImg}</div>
    <div class="divider"></div>
    <div class="name">${name}</div>
    ${role ? `<div style="font-size:12px;color:#888;margin-bottom:8px;">${role}</div>` : ""}
    <div class="url">${portfolioUrl}</div>
    <div class="hint">Print · Cut · Attach to your CV</div>
  </div>
  <script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`);
    win.document.close();
  };

  const signatureHtml = `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,sans-serif;font-size:14px;color:#333333;">
  <tr><td style="padding-bottom:10px;border-bottom:2px solid #7F6269;">
    <strong style="font-size:15px;color:#111111;display:block;margin-bottom:2px;">${name}</strong>
    ${role ? `<span style="color:#666666;font-size:12px;">${role}</span>` : ""}
  </td></tr>
  <tr><td style="padding-top:10px;">
    <a href="https://${portfolioUrl}" style="color:#7F6269;text-decoration:none;font-size:13px;">🔗 ${portfolioUrl}</a>
  </td></tr>
</table>`;

  const signatureText = `--\n${name}${role ? `\n${role}` : ""}\nPortfolio: https://${portfolioUrl}`;

  const handleCopyHtml = async () => {
    try {
      // Copy as rendered HTML so Gmail/Outlook paste it styled, not as raw markup
      const blob = new Blob([signatureHtml], { type: "text/html" });
      await navigator.clipboard.write([new ClipboardItem({ "text/html": blob })]);
    } catch {
      navigator.clipboard.writeText(signatureHtml).catch(() => {});
    }
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(signatureText);
    } catch {}
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div style={{ backgroundColor: "#0E1627", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12"><Breadcrumb currentStep={4} /></div>

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(32px, 5vw, 48px)", color: "#F4E1E0", marginBottom: "12px", lineHeight: 1.2 }}>
            Your Portfolio is Live 🎉
          </h1>
          <p style={{ color: "#BDB8B9", fontSize: "16px" }}>
            Share it, print it, or embed the QR code directly on your CV.
          </p>
        </div>

        {/* Main URL + QR card */}
        <div style={{ backgroundColor: "rgba(189,184,185,0.05)", borderRadius: "24px", padding: "clamp(28px, 5vw, 48px)", border: "1px solid rgba(189,184,185,0.2)", boxShadow: "0 8px 60px rgba(0,0,0,0.4)", marginBottom: "32px" }}>
          <div className="flex flex-col md:flex-row gap-10 md:gap-0">
            {/* Left */}
            <div className="flex-1 pr-0 md:pr-10">
              <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "12px" }}>Your Portfolio URL</div>
              <div style={{ backgroundColor: "#0E1627", borderRadius: "8px", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "16px", border: "1px solid rgba(189,184,185,0.2)" }}>
                <span style={{ color: "#F4E1E0", fontSize: "14px", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{portfolioUrl}</span>
                <button onClick={handleCopy} style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#4ade80" : "#7F6269", flexShrink: 0, display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s ease" }}>
                  {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <button onClick={() => window.open(portfolioUrl, "_blank")} style={{ backgroundColor: "transparent", color: "#F4E1E0", fontSize: "14px", fontWeight: 600, padding: "11px 24px", borderRadius: "999px", border: "1.5px solid #BDB8B9", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }} className="hover:opacity-80 transition-opacity">
                <ExternalLink size={14} />Open Portfolio
              </button>
              <div>
                <div style={{ color: "#BDB8B9", fontSize: "12px", fontWeight: 500, marginBottom: "10px" }}>Share to</div>
                <div className="flex gap-3">
                  {[
                    { icon: <LinkedinIcon size={16} />, label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(portfolioUrl)}` },
                    { icon: <TwitterIcon size={16} />, label: "Twitter", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(portfolioUrl)}&text=Check+out+my+portfolio!` },
                    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>, label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent("Check out my portfolio: " + portfolioUrl)}` },
                  ].map((item) => (
                    <button key={item.label} title={item.label} onClick={() => window.open(item.href, "_blank")} style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(189,184,185,0.08)", border: "1px solid rgba(189,184,185,0.2)", cursor: "pointer", color: "#BDB8B9", display: "flex", alignItems: "center", justifyContent: "center", transition: "color 0.2s ease, background-color 0.2s ease" }} className="hover:text-[#F4E1E0] hover:bg-[#7F6269]">
                      {item.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="hidden md:block" style={{ width: "1px", backgroundColor: "rgba(189,184,185,0.2)", alignSelf: "stretch" }} />
            {/* Right — QR */}
            <div className="flex-1 pl-0 md:pl-10">
              <div style={{ color: "#BDB8B9", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>Your QR Code</div>
              <div className="flex justify-center mb-4">
                {qrLoading ? (
                  <div style={{ width: 180, height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Loader2 size={32} style={{ color: "#7F6269" }} className="animate-spin" />
                  </div>
                ) : qrError || !qrCodeUrl ? (
                  <QRCodeSVG />
                ) : (
                  <img src={qrCodeUrl} alt="QR Code" style={{ width: 180, height: 180, borderRadius: 12 }} />
                )}
              </div>
              <p style={{ color: "#BDB8B9", fontSize: "12px", textAlign: "center", marginBottom: "20px" }}>High-res, print-ready, Level H error correction.</p>
              <button onClick={handleDownloadQr} disabled={!qrCodeUrl || qrLoading} style={{ width: "100%", backgroundColor: !qrCodeUrl || qrLoading ? "rgba(127,98,105,0.5)" : "#7F6269", color: "#F4E1E0", fontSize: "13px", fontWeight: 600, padding: "12px 0", borderRadius: "999px", border: "none", cursor: qrCodeUrl && !qrLoading ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", boxShadow: "inset 0 1px 0 rgba(244,225,224,0.12)" }} className="hover:opacity-90 transition-opacity">
                <Download size={14} />Download PNG
              </button>
            </div>
          </div>
        </div>

        {/* ── Feature 1: Print on your CV ── */}
        <div style={{
          background: "linear-gradient(135deg, rgba(127,98,105,0.12) 0%, rgba(14,22,39,0.6) 60%)",
          borderRadius: "24px",
          border: "1px solid rgba(127,98,105,0.35)",
          padding: "clamp(28px, 4vw, 44px)",
          marginBottom: "20px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* background glow */}
          <div style={{ position: "absolute", top: "-40%", right: "-10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(127,98,105,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* Left: text + buttons */}
            <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(127,98,105,0.2)", border: "1px solid rgba(127,98,105,0.4)", borderRadius: "999px", padding: "4px 12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "14px" }}>🖨️</span>
                <span style={{ fontSize: "11px", color: "#E5C5C1", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Print Feature</span>
              </div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(22px, 3.5vw, 30px)", color: "#F4E1E0", lineHeight: 1.2, marginBottom: "12px" }}>
                Print it on your CV
              </h2>
              <p style={{ color: "#BDB8B9", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px", maxWidth: "360px" }}>
                Paste your QR code into your CV header or footer. Recruiters scan it instantly — your live portfolio opens in seconds, no typing required.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <button
                  onClick={handlePrintCard}
                  style={{ backgroundColor: "#7F6269", color: "#F4E1E0", fontSize: "14px", fontWeight: 600, padding: "13px 28px", borderRadius: "999px", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 20px rgba(127,98,105,0.4), inset 0 1px 0 rgba(244,225,224,0.15)" }}
                  className="hover:opacity-90 transition-opacity"
                >
                  <span style={{ fontSize: "16px" }}>🖨️</span>
                  Print QR Card
                </button>
                <button
                  onClick={handleDownloadQr}
                  disabled={!qrCodeUrl || qrLoading}
                  style={{ backgroundColor: "transparent", color: "#F4E1E0", fontSize: "14px", fontWeight: 600, padding: "13px 28px", borderRadius: "999px", border: "1.5px solid rgba(189,184,185,0.35)", cursor: qrCodeUrl && !qrLoading ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "8px", opacity: !qrCodeUrl || qrLoading ? 0.5 : 1 }}
                  className="hover:border-[rgba(189,184,185,0.6)] transition-colors"
                >
                  <Download size={16} />
                  Download PNG
                </button>
              </div>
              <p style={{ marginTop: "14px", fontSize: "11px", color: "rgba(189,184,185,0.5)" }}>
                Opens a print-ready card — press <kbd style={{ background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: "3px", fontFamily: "monospace" }}>Ctrl+P</kbd> / <kbd style={{ background: "rgba(255,255,255,0.08)", padding: "1px 5px", borderRadius: "3px", fontFamily: "monospace" }}>⌘P</kbd> to print
              </p>
            </div>

            {/* Right: CV mockup */}
            <div style={{ width: "260px", flexShrink: 0, position: "relative", zIndex: 1 }}>
              <CvMockup qrSrc={qrCodeUrl} />
              <div style={{ position: "absolute", bottom: "-10px", right: "-10px", background: "#7F6269", borderRadius: "8px", padding: "6px 12px", fontSize: "10px", fontWeight: 700, color: "#F4E1E0", letterSpacing: "0.06em", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
                SCAN ME
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature 2: Email Signature ── */}
        <div style={{
          background: "linear-gradient(135deg, rgba(14,22,39,0.8) 0%, rgba(229,197,193,0.06) 100%)",
          borderRadius: "24px",
          border: "1px solid rgba(229,197,193,0.2)",
          padding: "clamp(28px, 4vw, 44px)",
          marginBottom: "32px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", bottom: "-30%", left: "-5%", width: "280px", height: "280px", borderRadius: "50%", background: "radial-gradient(circle, rgba(229,197,193,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Left: text + copy buttons */}
            <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(229,197,193,0.1)", border: "1px solid rgba(229,197,193,0.25)", borderRadius: "999px", padding: "4px 12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "14px" }}>✉️</span>
                <span style={{ fontSize: "11px", color: "#E5C5C1", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Signature Feature</span>
              </div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(22px, 3.5vw, 30px)", color: "#F4E1E0", lineHeight: 1.2, marginBottom: "12px" }}>
                Add to Email Signature
              </h2>
              <p style={{ color: "#BDB8B9", fontSize: "14px", lineHeight: 1.7, marginBottom: "24px", maxWidth: "360px" }}>
                Every email you send becomes a passive portfolio drop. Copy the snippet below and paste it into Gmail, Outlook, or Apple Mail settings.
              </p>

              {/* Tabs */}
              <div style={{ display: "flex", gap: "4px", background: "rgba(255,255,255,0.04)", borderRadius: "10px", padding: "4px", width: "fit-content", marginBottom: "14px" }}>
                {(["html", "text"] as const).map((t) => (
                  <button key={t} onClick={() => setSigTab(t)} style={{ padding: "7px 18px", borderRadius: "7px", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, transition: "all 0.15s ease", backgroundColor: sigTab === t ? "#7F6269" : "transparent", color: sigTab === t ? "#F4E1E0" : "#BDB8B9" }}>
                    {t === "html" ? "HTML" : "Plain Text"}
                  </button>
                ))}
              </div>

              {/* Code block */}
              <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.07)", padding: "14px 16px", marginBottom: "14px", position: "relative", maxHeight: "120px", overflow: "hidden" }}>
                <pre style={{ fontSize: "10px", color: "rgba(229,197,193,0.7)", lineHeight: 1.6, margin: 0, fontFamily: "monospace", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                  {sigTab === "html" ? signatureHtml : signatureText}
                </pre>
                {/* fade bottom */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "32px", background: "linear-gradient(transparent, rgba(0,0,0,0.4))", borderRadius: "0 0 10px 10px" }} />
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                <button
                  onClick={sigTab === "html" ? handleCopyHtml : handleCopyText}
                  style={{ backgroundColor: (sigTab === "html" ? copiedHtml : copiedText) ? "#4ade80" : "#7F6269", color: "#F4E1E0", fontSize: "14px", fontWeight: 600, padding: "13px 28px", borderRadius: "999px", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "8px", transition: "background-color 0.2s ease", boxShadow: "0 4px 20px rgba(127,98,105,0.4), inset 0 1px 0 rgba(244,225,224,0.15)" }}
                >
                  {(sigTab === "html" ? copiedHtml : copiedText) ? <CheckCheck size={16} /> : <Copy size={16} />}
                  {(sigTab === "html" ? copiedHtml : copiedText) ? "Copied!" : `Copy ${sigTab === "html" ? "HTML" : "Plain Text"}`}
                </button>
              </div>

              <p style={{ marginTop: "14px", fontSize: "11px", color: "rgba(189,184,185,0.5)", lineHeight: 1.6, maxWidth: "340px" }}>
                <strong style={{ color: "rgba(189,184,185,0.7)" }}>Gmail:</strong> Settings → See all settings → General → Signature → paste directly into the editor.
                <br />
                <strong style={{ color: "rgba(189,184,185,0.7)" }}>Outlook:</strong> File → Options → Mail → Signatures → paste into the signature box.
              </p>
              <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
                {["Gmail", "Outlook", "Apple Mail"].map((client) => (
                  <span key={client} style={{ fontSize: "11px", color: "rgba(189,184,185,0.45)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ color: "#4ade80", fontSize: "9px" }}>✓</span> {client}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: signature preview */}
            <div style={{ width: "280px", flexShrink: 0, position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: "10px", color: "rgba(189,184,185,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>Preview</div>
              <SignaturePreview name={name} role={role} url={portfolioUrl} />
            </div>
          </div>
        </div>

        {/* Edit link */}
        <div className="text-center mt-4">
          <button onClick={() => navigate("/preview")} style={{ background: "none", border: "none", color: "#BDB8B9", fontSize: "14px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textDecoration: "underline" }} className="hover:opacity-80 transition-opacity">
            Edit Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
