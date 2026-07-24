"use client";

import React from "react";
import { Printer } from "lucide-react";

// Prints an actual black-and-white newspaper edition of the page via the
// @media print stylesheet in globals.css.
const PrintEditionButton: React.FC = () => {
  return (
    <button
      onClick={() => window.print()}
      className="no-print fixed bottom-5 left-5 z-40 group flex items-center gap-2 px-3.5 py-2 rounded-full glass-strong shadow-md text-(--text-secondary) hover:text-(--primary) transition-colors"
      aria-label="Print this edition"
      title="Print this edition"
    >
      <Printer size={15} />
      <span className="byline normal-case tracking-normal hidden sm:inline">Print edition</span>
    </button>
  );
};

export default PrintEditionButton;
