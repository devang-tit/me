'use client';

import { useState } from 'react';
import { SITE } from '@/config/site';
import { useLang } from '@/lib/lang';
import { Diya, Icon, Mandala, SectionTitle, WhatsAppIcon } from './Decor';

const waLink = (text, number = '') => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

/** WhatsApp share of this invitation (used in Blessings and the footer). */
function ShareButton({ className }) {
  const { t } = useLang();
  const share = () => {
    const names = `${t(SITE.couple.groom)} & ${t(SITE.couple.bride)}`;
    const text = `${t(SITE.ui.shareText)}\n${names} · ${t(SITE.datesText)}\n${window.location.href.split('#')[0]}`;
    window.open(waLink(text), '_blank', 'noopener');
  };
  return (
    <button className={className} onClick={share}>
      <Icon name="share" /> {t(SITE.ui.share)}
    </button>
  );
}

export function Blessings() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const guests = form.get('guests');
    const message = form.get('message');

    // Optional: also save to Google Sheets (see README).
    if (SITE.googleSheetsUrl) {
      fetch(SITE.googleSheetsUrl, { method: 'POST', mode: 'no-cors', body: form }).catch(() => {});
    }

    const text =
      `🙏 Blessings for ${SITE.couple.groom.en} & ${SITE.couple.bride.en}\n\n` +
      `Name: ${name}\nGuests: ${guests}\n\n${message}`;
    window.open(waLink(text, SITE.contact.whatsapp), '_blank', 'noopener');
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <section id="blessings" className="section dark blessings">
      <Mandala className="bg-mandala" />
      <SectionTitle kicker={t(SITE.ui.blessKicker)} title={t(SITE.ui.blessTitle)} />

      <form className="bless-form glass reveal" onSubmit={submit}>
        <label>
          {t(SITE.ui.formName)}
          <input name="name" type="text" required autoComplete="name" maxLength={80} />
        </label>
        <label>
          {t(SITE.ui.formGuests)}
          <select name="guests" defaultValue="2">
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
            <option value="10+">10+</option>
          </select>
        </label>
        <label>
          {t(SITE.ui.formMessage)}
          <textarea name="message" rows={4} required maxLength={600} />
        </label>
        <button type="submit" className="btn gold wide">{t(SITE.ui.formSend)}</button>
        {sent && <p className="form-thanks" role="status">{t(SITE.ui.formThanks)}</p>}
      </form>

      <div className="btn-row center reveal">
        <a className="btn whatsapp" href={`https://wa.me/${SITE.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon /> {t(SITE.ui.whatsappChat)}
        </a>
        <a className="btn outline" href={`tel:${SITE.contact.phoneDisplay.replace(/\s/g, '')}`}>
          <Icon name="phone" /> {t(SITE.ui.call)} {SITE.contact.phoneDisplay}
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="diyas" aria-hidden="true">
        <Diya /><Diya /><Diya />
      </div>
      <p className="footer-thanks">{t(SITE.ui.footerThanks)}</p>
      <p className="script footer-names">
        {t(SITE.couple.groom)} &amp; {t(SITE.couple.bride)}
      </p>
      <p className="footer-date">{t(SITE.datesText)}</p>
      <p className="hashtag">{SITE.hashtag}</p>
      <ShareButton className="btn outline" />
      <p className="made">{t(SITE.ui.madeWith)} ♥</p>
    </footer>
  );
}
