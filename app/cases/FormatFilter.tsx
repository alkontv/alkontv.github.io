"use client";

import { FORMAT_LABEL, type CaseFormat } from "@content";
import { tx, type Lang } from "@i18n";

interface Props {
  lang: Lang;
  allLabel: string;
  active: CaseFormat | null;
  available: CaseFormat[];
  onChange: (f: CaseFormat | null) => void;
}

const FormatFilter = ({ lang, allLabel, active, available, onChange }: Props) => {
  const base = "rounded-full border px-3 py-1 text-sm transition-opacity cursor-pointer";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        aria-pressed={active === null}
        onClick={() => onChange(null)}
        className={`${base} ${active === null ? "border-current" : "border-current/25 opacity-60"}`}
      >
        {allLabel}
      </button>
      {available.map((f) => (
        <button
          key={f}
          type="button"
          aria-pressed={active === f}
          onClick={() => onChange(active === f ? null : f)}
          className={`${base} ${active === f ? "border-current" : "border-current/25 opacity-60"}`}
        >
          {tx(FORMAT_LABEL[f], lang)}
        </button>
      ))}
    </div>
  );
};

export default FormatFilter;
