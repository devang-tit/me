'use client';

import { SITE } from '@/config/site';
import { useLang } from '@/lib/lang';
import { Icon, Mandala, SectionTitle } from './Decor';
import Photo from './Photo';

/** Scroll-driven vertical timeline. The 3D rise/flip of each card and the
 *  growing gold line are animated in app/page.js (GSAP ScrollTrigger). */
export default function Story() {
  const { t } = useLang();

  return (
    <section id="story" className="section light story">
      <Mandala className="bg-mandala" />
      <SectionTitle kicker={t(SITE.ui.storyKicker)} title={t(SITE.ui.storyTitle)} />

      <ol className="timeline">
        <span className="timeline-line" aria-hidden="true">
          <span className="timeline-fill" />
        </span>

        {SITE.story.map((item, i) => (
          <li className="tl-item" key={i}>
            <span className="tl-dot" aria-hidden="true">
              <Icon name={item.icon} />
            </span>
            <article className="story-card">
              <div className="framed">
                <Photo src={item.image} alt={t(item.title)} label={`Story photo ${i + 1}`} icon={item.icon} />
              </div>
              <div className="story-body">
                <p className="story-step">
                  {String(i + 1).padStart(2, '0')}
                  {item.date && <span> · {t(item.date)}</span>}
                </p>
                <h3>{t(item.title)}</h3>
                <p>{t(item.text)}</p>
              </div>
            </article>
          </li>
        ))}

        <li className="tl-item finale">
          <span className="tl-dot" aria-hidden="true">
            <Icon name="rings" />
          </span>
          <article className="story-card finale-card">
            <Mandala className="finale-mandala" />
            <h3 className="shimmer">{t(SITE.storyFinale.title)}</h3>
            <a href="#events" className="btn gold">
              {t(SITE.storyFinale.button)}
            </a>
          </article>
        </li>
      </ol>
    </section>
  );
}
