"use client";

import { useState } from "react";
import { UploadPanel } from "./upload-panel";

export function UploadPopover() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className="size-10 border-2 border-neutral-100 bg-neutral-950 text-2xl font-black leading-none text-neutral-100 transition hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label="Open upload panel"
      >
        +
      </button>
      {open ? (
        <div className="absolute right-0 top-12 z-40 w-[min(92vw,420px)]">
          <UploadPanel onClose={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}
