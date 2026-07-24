import React from "react";

// Fixed "printer" furniture that frames the whole page as a continuous printout.
// Purely decorative, non-interactive, and hidden when the page is actually printed.
const CROP = "rgba(36,28,20,0.5)";

const CropMark: React.FC<{ pos: string }> = ({ pos }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    className={`fixed ${pos} z-40 pointer-events-none`}
    style={{ mixBlendMode: "multiply", opacity: 0.55 }}
    aria-hidden
  >
    <line x1="0" y1="13" x2="18" y2="13" stroke={CROP} strokeWidth="1" />
    <line x1="13" y1="0" x2="13" y2="18" stroke={CROP} strokeWidth="1" />
  </svg>
);

const PrintChrome: React.FC = () => {
  return (
    <div className="no-print hidden lg:block" aria-hidden>
      {/* Printer exit slot the page appears to feed out from */}
      <div className="printer-slot" />

      {/* Continuous-feed perforations down both margins */}
      <div className="tractor-feed left" />
      <div className="tractor-feed right" />

      {/* Corner crop marks */}
      <CropMark pos="top-3 left-3" />
      <CropMark pos="top-3 right-3" />
      <CropMark pos="bottom-3 left-3" />
      <CropMark pos="bottom-3 right-3" />

      {/* Registration target */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        className="fixed top-3 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        style={{ mixBlendMode: "multiply", opacity: 0.4 }}
      >
        <circle cx="11" cy="11" r="7" fill="none" stroke={CROP} strokeWidth="1" />
        <line x1="11" y1="0" x2="11" y2="22" stroke={CROP} strokeWidth="0.8" />
        <line x1="0" y1="11" x2="22" y2="11" stroke={CROP} strokeWidth="0.8" />
      </svg>

      {/* CMYK-style spot-colour bar, using the warm gazette inks */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex"
        style={{ mixBlendMode: "multiply", opacity: 0.75 }}
      >
        {["#c05a3d", "#b8862b", "#5f8a5e", "#241c14"].map((c) => (
          <span key={c} style={{ background: c, width: 14, height: 6, display: "block" }} />
        ))}
      </div>
    </div>
  );
};

export default PrintChrome;
