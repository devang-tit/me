import './globals.css';
import { SITE } from '@/config/site';

const names = `${SITE.couple.groom.en} & ${SITE.couple.bride.en}`;
const title = `${names} | Wedding Invitation · ${SITE.datesText.en}`;
const description = `With the blessings of our families, ${SITE.couple.groom.en} weds ${SITE.couple.bride.en} on ${SITE.datesText.en} at ${SITE.venue.address.en}. You are warmly invited.`;

// Meta tags + Open Graph, so the link previews nicely on WhatsApp.
export const metadata = {
  metadataBase: new URL(SITE.siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    url: SITE.siteUrl,
    images: [{ url: SITE.images.og, width: 1200, height: 630, alt: title }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [SITE.images.og] },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3a0612',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Great+Vibes&family=Noto+Sans+Gujarati:wght@400;500&family=Noto+Serif+Gujarati:wght@500;700&family=Poppins:wght@300;400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
