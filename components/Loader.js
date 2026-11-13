'use client';

import { useEffect, useState } from 'react';
import { Mandala } from './Decor';

/** Opening screen: a golden mandala with Om, split down the middle,
 *  that swings open like a pair of doors. */
export default function Loader() {
  const [phase, setPhase] = useState('closed'); // closed -> open -> gone

  useEffect(() => {
    const open = setTimeout(() => setPhase('open'), 1500);
    const gone = setTimeout(() => setPhase('gone'), 3100);
    return () => {
      clearTimeout(open);
      clearTimeout(gone);
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div className={`loader ${phase}`} aria-hidden="true">
      <div className="door door-left">
        <Mandala />
      </div>
      <div className="door door-right">
        <Mandala />
      </div>
      <div className="loader-om">ૐ</div>
    </div>
  );
}
