'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Prefix for files in /public (only non-empty on GitHub Pages project sites).
export const asset = (path) => (process.env.NEXT_PUBLIC_BASE_PATH || '') + path;

const LangContext = createContext({ lang: 'en', setLang: () => {}, t: (v) => v });

/** Provides the current language and `t()`, which picks the right text
 *  from an `{ en, gu }` object in config/site.js. */
export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');

  // Restore the guest's previous choice.
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'en' || saved === 'gu') setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {}
  }, [lang]);

  const t = useCallback(
    (value) => (value && typeof value === 'object' ? value[lang] ?? value.en : value),
    [lang]
  );

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
