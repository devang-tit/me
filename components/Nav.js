'use client';

import { useEffect, useRef, useState } from 'react';
import { SITE } from '@/config/site';
import { asset, useLang } from '@/lib/lang';
import { Icon } from './Decor';

const SECTIONS = ['home', 'story', 'events', 'gallery', 'venue', 'blessings'];

export default function Nav() {
  const { lang, setLang, t } = useLang();
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [music, setMusic] = useState('off'); // off | on | missing
  const audio = useRef(null);

  // Highlight the section currently in the middle of the screen.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Music is never loaded or played until the guest taps the button.
  const toggleMusic = async () => {
    if (!audio.current) {
      audio.current = new Audio(asset(SITE.music));
      audio.current.loop = true;
      audio.current.volume = 0.5;
    }
    if (music === 'on') {
      audio.current.pause();
      setMusic('off');
      return;
    }
    try {
      await audio.current.play();
      setMusic('on');
    } catch {
      setMusic('missing');
      setTimeout(() => setMusic('off'), 4000);
    }
  };

  const initials = `${SITE.couple.groom.en[0]} & ${SITE.couple.bride.en[0]}`;

  return (
    <nav className={`nav ${scrolled || open ? 'scrolled' : ''}`}>
      <a href="#home" className="nav-brand" onClick={() => setOpen(false)}>
        {initials}
      </a>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {SECTIONS.map((id) => (
          <li key={id}>
            <a href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>
              {t(SITE.ui.nav[id])}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-tools">
        <button
          className="chip"
          onClick={() => setLang(lang === 'en' ? 'gu' : 'en')}
          aria-label="Switch language / ભાષા બદલો"
        >
          {lang === 'en' ? 'ગુજરાતી' : 'English'}
        </button>
        <button
          className={`round ${music === 'on' ? 'playing' : ''}`}
          onClick={toggleMusic}
          aria-label={t(music === 'on' ? SITE.ui.musicOff : SITE.ui.musicOn)}
          title={t(music === 'on' ? SITE.ui.musicOff : SITE.ui.musicOn)}
        >
          <Icon name={music === 'on' ? 'pause' : 'music'} />
        </button>
        <button className="round burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          <span />
          <span />
        </button>
      </div>

      {music === 'missing' && <div className="toast">{t(SITE.ui.musicMissing)}</div>}
    </nav>
  );
}
