/* Decorative SVGs: mandala, floral divider, paisley, diya and line icons.
   Everything uses `currentColor`, so colour is controlled from CSS. */

export function Mandala({ className = '' }) {
  const ring = (count, rx, ry, radius, key) =>
    Array.from({ length: count }, (_, i) => (
      <ellipse
        key={key + i}
        cx="100"
        cy={100 - radius}
        rx={rx}
        ry={ry}
        transform={`rotate(${(i * 360) / count} 100 100)`}
      />
    ));
  return (
    <svg
      viewBox="0 0 200 200"
      className={`mandala ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="97" />
      <circle cx="100" cy="100" r="92" strokeDasharray="1 4" strokeWidth="1.6" />
      {ring(24, 7, 16, 74, 'a')}
      <circle cx="100" cy="100" r="57" />
      {ring(16, 8, 18, 39, 'b')}
      <circle cx="100" cy="100" r="21" />
      {ring(8, 4.5, 9, 11, 'c')}
      <circle cx="100" cy="100" r="3.5" fill="currentColor" />
    </svg>
  );
}

export function Paisley({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={`paisley ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M52 8c22 0 38 16 38 38 0 25-20 44-45 44-15 0-26-10-26-22 0-11 8-18 18-18 8 0 13 5 13 12 0 5-4 9-9 9" />
      <path d="M54 20c15 0 25 11 25 26 0 18-14 32-33 32" strokeDasharray="2 5" />
      <circle cx="41" cy="62" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Thin gold rule with a flower in the middle. */
export function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span />
      <svg viewBox="0 0 40 40" fill="currentColor">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <ellipse key={a} cx="20" cy="9" rx="3.2" ry="7" transform={`rotate(${a} 20 20)`} opacity="0.85" />
        ))}
        <circle cx="20" cy="20" r="3.5" />
      </svg>
      <span />
    </div>
  );
}

export function SectionTitle({ kicker, title }) {
  return (
    <header className="section-title reveal">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      <Divider />
    </header>
  );
}

export function Diya({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={`diya ${className}`} aria-hidden="true">
      <path className="diya-flame" d="M32 4c7 9 9 14 9 19a9 9 0 0 1-18 0c0-5 2-10 9-19z" fill="#f59e1b" />
      <path className="diya-flame" d="M32 14c3 4 4 7 4 9a4 4 0 0 1-8 0c0-2 1-5 4-9z" fill="#fff3c4" />
      <path d="M6 34h52c0 13-11 22-26 22S6 47 6 34z" fill="#d4af37" />
      <ellipse cx="32" cy="34" rx="26" ry="4.5" fill="#a67c1a" />
      <path d="M14 44c5 5 11 7 18 7s13-2 18-7" fill="none" stroke="#7a1630" strokeWidth="1.5" strokeDasharray="1 4" strokeLinecap="round" />
    </svg>
  );
}

const ICONS = {
  doc: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>,
  meet: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15 14.2c.6-.1 1.3-.2 2-.2 2.8 0 5 2 5 5" /></>,
  home: <><path d="M3 11l9-8 9 8M5 9.5V21h14V9.5" /><path d="M12 18s-3-1.8-3-4a1.7 1.7 0 0 1 3-1 1.7 1.7 0 0 1 3 1c0 2.200-3 4-3 4z" /></>,
  chat: <><path d="M21 12a8 8 0 0 1-11.6 7.100L4 20l1-4.600A8 8 0 1 1 21 12z" /><path d="M9 11h6M9 14h4" /></>,
  gift: <><rect x="3" y="9" width="18" height="4" rx="1" /><path d="M5 13v8h14v-8M12 9v12M12 9c-1.500-4-6-4-5-1 .5 1.500 3 1 5 1zm0 0c1.500-4 6-4 5-1-.5 1.500-3 1-5 1z" /></>,
  heart: <path d="M12 20s-8-5-8-11a4.500 4.500 0 0 1 8-2.800A4.500 4.500 0 0 1 20 9c0 6-8 11-8 11z" />,
  monument: <><path d="M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M2 10h20L12 3z" /></>,
  road: <><path d="M3 20l5-11 4 6 3-4 6 9z" /><circle cx="17" cy="5" r="2" /></>,
  rings: <><circle cx="9" cy="14" r="5.500" /><circle cx="15" cy="14" r="5.500" /><path d="M10 4l2-2 2 2-2 2z" /></>,
  mandap: <><path d="M3 21h18M5 21V9M19 21V9M3 9h18M12 3L4 9M12 3l8 6" /><path d="M9 21v-5a3 3 0 0 1 6 0v5" /></>,
  train: <><rect x="5" y="3" width="14" height="14" rx="3" /><path d="M5 11h14M8 21l2-4M16 21l-2-4M9 14h.01M15 14h.01" /></>,
  plane: <path d="M21 3l-7.500 18-3-7.500L3 10.500z M10.500 13.500L21 3" />,
  bed: <><path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="2" /></>,
  pin: <><path d="M12 21s7-6.500 7-12a7 7 0 0 0-14 0c0 5.500 7 12 7 12z" /><circle cx="12" cy="9" r="2.500" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  share: <><circle cx="6" cy="12" r="2.500" /><circle cx="18" cy="6" r="2.500" /><circle cx="18" cy="18" r="2.500" /><path d="M8.200 11l7.600-4M8.200 13l7.600 4" /></>,
  phone: <path d="M5 3h4l2 5-2.500 1.500a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />,
  music: <><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></>,
  pause: <path d="M8 5v14M16 5v14" />,
  left: <path d="M15 5l-7 7 7 7" />,
  right: <path d="M9 5l7 7-7 7" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  image: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5-9 9" /></>,
};

export function Icon({ name, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`icon ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] || ICONS.heart}
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="icon" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2zm0 1.800a8.200 8.200 0 1 1-4.300 15.200l-.3-.2-2.900.8.8-2.800-.2-.3A8.200 8.200 0 0 1 12 3.800zM8.600 7.300c-.2 0-.5 0-.7.300-.3.300-1 1-1 2.300s1 2.700 1.100 2.900c.1.200 2 3.100 4.900 4.300 2.400 1 2.900.8 3.400.7.500 0 1.700-.7 1.900-1.300.2-.700.2-1.200.2-1.300-.1-.200-.3-.200-.6-.400l-1.900-.900c-.300-.100-.500-.200-.700.100l-.900 1.100c-.200.200-.300.200-.600.100-.300-.200-1.200-.500-2.300-1.400-.800-.800-1.400-1.700-1.600-2-.200-.300 0-.400.100-.600l.400-.500c.200-.200.200-.300.300-.500.100-.200 0-.400 0-.500l-.900-2.100c-.200-.500-.400-.500-.600-.500z" />
    </svg>
  );
}
