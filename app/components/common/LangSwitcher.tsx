'use client';

import { useGSAP } from "@gsap/react";
import { useLangStore, usePortalStore } from "@stores";
import gsap from "gsap";
import { useRef } from "react";
import { isMobile } from "react-device-detect";

const LangSwitcher = () => {
  const ref = useRef<HTMLDivElement>(null);
  const lang = useLangStore((state) => state.lang);
  const toggleLang = useLangStore((state) => state.toggleLang);
  const isActive = usePortalStore((state) => state.activePortalId);
  const positionClass = isMobile ? 'top-2 right-12' : 'top-6 right-16';

  useGSAP(() => {
    gsap.to(ref.current, {
      opacity: isActive ? 0 : 1,
      duration: 1,
      delay: isActive ? 0 : 1,
    });
  }, [isActive]);

  return (
    <div className={`fixed ${positionClass}`} ref={ref} style={{ opacity: 0, zIndex: 2 }}>
      <a
        className="hover:cursor-pointer text-white text-sm tracking-wide"
        onClick={() => toggleLang()}
      >
        {lang === 'en' ? 'RU' : 'EN'}
      </a>
    </div>
  );
};

export default LangSwitcher;
