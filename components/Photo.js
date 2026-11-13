'use client';

import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/lang';
import { Icon } from './Decor';

/** Shows a photo from /public. If the file is missing it shows a clearly
 *  labelled placeholder naming the exact file to add. */
export default function Photo({ src, alt = '', label = 'Photo', icon = 'image', eager = false, className = '' }) {
  const [failed, setFailed] = useState(!src);
  const ref = useRef(null);

  // Catch images that failed before React attached the onError handler.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div className={`photo placeholder ${className}`} role="img" aria-label={alt || label}>
        <Icon name={icon} />
        <strong>{label}</strong>
        {src && <code>public{src}</code>}
      </div>
    );
  }

  return (
    <img
      ref={ref}
      className={`photo ${className}`}
      src={asset(src)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}
