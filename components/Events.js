'use client';

import { SITE } from '@/config/site';
import { useLang } from '@/lib/lang';
import { Icon, Paisley, SectionTitle } from './Decor';

// 2027-01-28T09:00:00+05:30 -> 20270128T033000Z (calendar format, UTC)
const stamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

function googleLink(title, location, ev) {
  const q = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${stamp(ev.start)}/${stamp(ev.end)}`,
    location,
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

// Downloads an .ics file (Apple Calendar, Outlook, Samsung Calendar ...).
function downloadIcs(title, location, ev) {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'BEGIN:VEVENT',
    `UID:${stamp(ev.start)}@wedding`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(ev.start)}`,
    `DTEND:${stamp(ev.end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location.replace(/,/g, '\\,')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = 'wedding-event.ics';
  a.click();
  URL.revokeObjectURL(a.href);
}

// 3D tilt that follows the mouse or finger.
const tilt = (e) => {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 16}deg`);
  card.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - 0.5) * 16}deg`);
};
const untilt = (e) => {
  e.currentTarget.style.setProperty('--ry', '0deg');
  e.currentTarget.style.setProperty('--rx', '0deg');
};

export default function Events() {
  const { t } = useLang();
  const venue = `${t(SITE.venue.name)}, ${t(SITE.venue.address)}`;
  const couple = `${t(SITE.couple.groom)} & ${t(SITE.couple.bride)}`;

  return (
    <section id="events" className="section dark events">
      <Paisley className="corner tl" />
      <Paisley className="corner br" />
      <SectionTitle kicker={t(SITE.ui.eventsKicker)} title={t(SITE.ui.eventsTitle)} />

      <div className="event-grid">
        {SITE.events.map((ev, i) => {
          const title = `${couple} — ${t(ev.name)}`;
          return (
            <div className="reveal tilt-wrap" key={i}>
              <article className="event-card glass" onPointerMove={tilt} onPointerLeave={untilt}>
                <span className="event-icon">
                  <Icon name={ev.icon} />
                </span>
                <p className="kicker">{t(ev.day)}</p>
                <h3>{t(ev.name)}</h3>
                <ul className="event-meta">
                  <li><Icon name="calendar" /> {t(ev.date)}</li>
                  <li><Icon name="clock" /> {t(ev.time)}</li>
                  <li><Icon name="pin" /> {venue}</li>
                </ul>
                <div className="btn-row">
                  <button className="btn gold" onClick={() => downloadIcs(title, venue, ev)}>
                    {t(SITE.ui.addIcs)}
                  </button>
                  <a className="btn outline" href={googleLink(title, venue, ev)} target="_blank" rel="noopener noreferrer">
                    {t(SITE.ui.addGoogle)}
                  </a>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
