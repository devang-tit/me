'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE } from '@/config/site';
import { useLang } from '@/lib/lang';
import { Mandala } from './Decor';
import HeroScene from './HeroScene';
import Photo from './Photo';

const pad = (n) => String(n).padStart(2, '0');

/** Live countdown; each number flips when it changes. */
function Countdown() {
  const { t } = useLang();
  const [now, setNow] = useState(null); // null until mounted (avoids server/client mismatch)

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const left = now === null ? null : Math.max(0, new Date(SITE.countdownTo).getTime() - now);
  const units = [
    ['days', left === null ? null : Math.floor(left / 86400000)],
    ['hours', left === null ? null : Math.floor(left / 3600000) % 24],
    ['minutes', left === null ? null : Math.floor(left / 60000) % 60],
    ['seconds', left === null ? null : Math.floor(left / 1000) % 60],
  ];

  return (
    <div className="countdown" role="timer" aria-live="off">
      {units.map(([key, value]) => (
        <div className="cd-unit" key={key}>
          <div className="cd-num">
            <span key={value} className="cd-flip">
              {value === null ? '--' : pad(value)}
            </span>
          </div>
          <div className="cd-label">{t(SITE.ui.countdown[key])}</div>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();
  const frame = useRef(null);

  // Parallax: the photo arch tilts toward the mouse, or with phone tilt.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = frame.current;
    let raf = 0;
    const tilt = (x, y) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--ry', `${x * 12}deg`);
        el.style.setProperty('--rx', `${-y * 9}deg`);
      });
    };
    const clamp = (v) => Math.max(-1, Math.min(1, v));
    const onMouse = (e) => {
      if (e.pointerType === 'mouse') tilt((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    const onTilt = (e) => {
      if (e.gamma == null) return;
      tilt(clamp(e.gamma / 30), clamp((e.beta - 45) / 30));
    };
    window.addEventListener('pointermove', onMouse, { passive: true });
    window.addEventListener('deviceorientation', onTilt);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMouse);
      window.removeEventListener('deviceorientation', onTilt);
    };
  }, []);

  const groom = t(SITE.couple.groom);
  const bride = t(SITE.couple.bride);

  return (
    <section id="home" className="hero">
      <HeroScene />
      <div className="garland" aria-hidden="true" />
      <div className="garland-strand left" aria-hidden="true" />
      <div className="garland-strand right" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-text">
          <p className="ganesh">
            <span className="om">ૐ</span>
            {t(SITE.ui.ganesh)}
          </p>
          <h1 className="names">
            <span className="script shimmer">{groom}</span>
            <span className="amp">&amp;</span>
            <span className="script shimmer">{bride}</span>
          </h1>
          <p className="tagline">{t(SITE.ui.tagline)}</p>
          <p className="hero-date">{t(SITE.datesText)}</p>
          <Countdown />
        </div>

        <div className="arch-stage">
          <div className="arch" ref={frame}>
            <Mandala className="arch-mandala" />
            <div className="arch-frame">
              <div className="arch-photo">
                <Photo src={SITE.images.hero} alt={`${groom} & ${bride}`} label="Hero photo" eager />
              </div>
            </div>
            <span className="arch-gem" />
          </div>
        </div>
      </div>

      <a href="#story" className="scroll-cue">
        <span className="mouse" />
        {t(SITE.ui.scroll)}
      </a>
    </section>
  );
}
