'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LangProvider, useLang } from '@/lib/lang';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Story from '@/components/Story';
import Events from '@/components/Events';
import Gallery from '@/components/Gallery';
import Venue from '@/components/Venue';
import { Blessings, Footer } from '@/components/Blessings';

/** All scroll animations in one place (GSAP + ScrollTrigger).
 *  Skipped entirely when the guest prefers reduced motion. */
function useScrollAnimations() {
  const { lang } = useLang();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Generic reveal: fade, rise and a slight 3D rotation.
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 50, rotateX: -10, transformPerspective: 900,
          duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
      });

      // Story cards swing in from alternating sides.
      gsap.utils.toArray('.story-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 70, rotateY: i % 2 ? -32 : 32, rotateX: 8, transformPerspective: 1000,
          duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
        });
      });
      gsap.utils.toArray('.tl-dot').forEach((el) => {
        gsap.from(el, {
          scale: 0, duration: 0.6, ease: 'back.out(2)',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        });
      });

      // The gold timeline line grows with the scroll.
      gsap.fromTo('.timeline-fill', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.timeline', start: 'top 65%', end: 'bottom 65%', scrub: 0.4 },
      });

      // Hero drifts back gently as the page scrolls away.
      gsap.to('.hero-inner', {
        yPercent: -10, opacity: 0.25, ease: 'none',
        scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true },
      });

      // Background mandalas rotate slowly with the scroll.
      gsap.utils.toArray('.bg-mandala').forEach((el) => {
        gsap.to(el, {
          rotate: 90, ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  // Text length changes with the language, so re-measure trigger positions.
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(id);
  }, [lang]);
}

function Site() {
  useScrollAnimations();
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Story />
        <Events />
        <Gallery />
        <Venue />
        <Blessings />
      </main>
      <Footer />
    </>
  );
}

export default function Page() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  );
}
