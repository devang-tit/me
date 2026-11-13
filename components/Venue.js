'use client';

import { SITE } from '@/config/site';
import { useLang } from '@/lib/lang';
import { Icon, SectionTitle } from './Decor';

export default function Venue() {
  const { t } = useLang();
  const q = encodeURIComponent(SITE.venue.mapQuery);

  return (
    <section id="venue" className="section cream venue">
      <SectionTitle kicker={t(SITE.ui.venueKicker)} title={t(SITE.ui.venueTitle)} />

      <div className="venue-grid">
        <div className="venue-info reveal">
          <h3>{t(SITE.venue.name)}</h3>
          <p className="venue-address">
            <Icon name="pin" /> {t(SITE.venue.address)}
          </p>
          <a
            className="btn maroon"
            href={`https://www.google.com/maps/dir/?api=1&destination=${q}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(SITE.ui.directions)}
          </a>

          <ul className="travel">
            {SITE.venue.travel.map((item, i) => (
              <li key={i}>
                <span className="travel-icon"><Icon name={item.icon} /></span>
                <div>
                  <strong>{t(item.title)}</strong>
                  <p>{t(item.text)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="map framed reveal">
          <iframe
            title="Google Map"
            src={`https://www.google.com/maps?q=${q}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
