'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SITE } from '@/config/site';
import { useLang } from '@/lib/lang';
import { Icon, SectionTitle } from './Decor';
import Photo from './Photo';

const photos = SITE.images.gallery;
const wrap = (i) => (i + photos.length) % photos.length;

/** Calls onLeft / onRight after a horizontal swipe; returns pointer handlers. */
function useSwipe(onLeft, onRight) {
  const start = useRef(null);
  const swiped = useRef(false);
  return {
    swiped,
    handlers: {
      onPointerDown: (e) => {
        start.current = e.clientX;
        swiped.current = false;
      },
      onPointerUp: (e) => {
        if (start.current === null) return;
        const dx = e.clientX - start.current;
        start.current = null;
        if (Math.abs(dx) > 40) {
          swiped.current = true;
          (dx < 0 ? onLeft : onRight)();
        }
      },
      onPointerCancel: () => (start.current = null),
    },
  };
}

export default function Gallery() {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => wrap(i + 1)), []);
  const prev = useCallback(() => setIndex((i) => wrap(i - 1)), []);
  const swipe = useSwipe(next, prev);
  const boxSwipe = useSwipe(next, prev);

  // Slow auto-rotation; stops on interaction and for reduced-motion users.
  useEffect(() => {
    if (paused || lightbox) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, lightbox, next]);

  // Lightbox: keyboard control + lock page scroll.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, next, prev]);

  return (
    <section id="gallery" className="section light gallery">
      <SectionTitle kicker={t(SITE.ui.galleryKicker)} title={t(SITE.ui.galleryTitle)} />

      <div
        className="coverflow reveal"
        {...swipe.handlers}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        {photos.map((src, i) => {
          // Shortest distance around the ring, so the carousel loops forever.
          let offset = i - index;
          if (offset > photos.length / 2) offset -= photos.length;
          if (offset < -photos.length / 2) offset += photos.length;
          const far = Math.abs(offset) > 2;
          return (
            <button
              key={src}
              className={`cf-item framed ${offset === 0 ? 'current' : ''}`}
              style={{
                transform: `translateX(${offset * 62}%) translateZ(${-Math.abs(offset) * 170}px) rotateY(${offset * -32}deg)`,
                zIndex: 10 - Math.abs(offset),
                opacity: far ? 0 : 1,
                pointerEvents: far ? 'none' : 'auto',
              }}
              tabIndex={far ? -1 : 0}
              aria-label={`${t(SITE.ui.photo)} ${i + 1}`}
              onClick={() => {
                if (swipe.swiped.current) return;
                setPaused(true);
                if (offset === 0) setLightbox(true);
                else setIndex(i);
              }}
            >
              <Photo src={src} alt={`${t(SITE.ui.photo)} ${i + 1}`} label={`Gallery photo ${i + 1}`} />
            </button>
          );
        })}
      </div>

      <div className="cf-controls">
        <button className="round" onClick={() => { setPaused(true); prev(); }} aria-label="Previous">
          <Icon name="left" />
        </button>
        <span>{index + 1} / {photos.length}</span>
        <button className="round" onClick={() => { setPaused(true); next(); }} aria-label="Next">
          <Icon name="right" />
        </button>
      </div>
      <p className="hint">{t(SITE.ui.galleryHint)}</p>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(false)}>
          <button className="round lb-close" aria-label="Close">
            <Icon name="close" />
          </button>
          <button className="round lb-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
            <Icon name="left" />
          </button>
          <div className="lb-photo" key={index} onClick={(e) => e.stopPropagation()} {...boxSwipe.handlers}>
            <Photo src={photos[index]} alt={`${t(SITE.ui.photo)} ${index + 1}`} label={`Gallery photo ${index + 1}`} eager />
          </div>
          <button className="round lb-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
            <Icon name="right" />
          </button>
          <span className="lb-count">{index + 1} / {photos.length}</span>
        </div>
      )}
    </section>
  );
}
