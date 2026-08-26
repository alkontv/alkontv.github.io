"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { dict, useLangStore } from "@i18n";

import { useResolvedLang } from "./useResolvedLang";

export const TELEGRAM_URL = "https://t.me/jdm_as_fuck";
const GITHUB_URL = "https://github.com/alkontv";

const SiteChrome = ({ children }: { children: ReactNode }) => {
  const { lang } = useResolvedLang();
  const toggleLang = useLangStore((s) => s.toggleLang);
  const t = dict[lang].cases;
  const path = usePathname();

  const nav = [
    { href: "/", label: t.navCases },
    { href: "/resume", label: t.navResume },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/8 bg-[#06070a]/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-4 sm:px-8">
          <Link href="/" className="display text-lg font-semibold tracking-[0.22em]">
            ALAN
          </Link>

          <nav className="flex items-center gap-5 text-sm">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  // Для корня нужно точное совпадение: startsWith("/") верен всегда.
                  (item.href === "/" ? path === "/" : path.startsWith(item.href))
                    ? "text-ink"
                    : "text-ink-faint transition-colors hover:text-ink"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLang}
              aria-label="Language"
              className="rounded-full border border-white/12 px-3 py-1 text-xs uppercase tracking-widest text-ink-dim transition-colors hover:border-white/30 hover:text-ink"
            >
              {lang === "ru" ? "EN" : "RU"}
            </button>
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-white/16 px-4 py-1.5 text-sm text-ink-dim transition-colors hover:border-white/34 hover:text-ink sm:block"
            >
              {t.navContact}
            </a>
          </div>
        </div>
      </header>

      {children}

      <footer className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <div className="hairline mb-8" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="display mb-2 text-sm tracking-[0.22em]">ALAN</div>
            <p className="max-w-md text-xs leading-relaxed text-ink-faint">{t.anonNote}</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-ink-dim">
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-ink">
              Telegram
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-ink">
              GitHub
            </a>
            <Link href="/resume" className="hover:text-ink">
              {t.navResume}
            </Link>
            <Link href="/3d" className="hover:text-ink">
              3D
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default SiteChrome;
