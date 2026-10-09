'use client';

import { useEffect } from 'react';

// Avisa por correo cada vez que alguien hace clic en un enlace de WhatsApp de la web
export default function WhatsAppClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || !/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(a.href)) return;

      const data = JSON.stringify({ page: window.location.pathname, href: a.href });
      const blob = new Blob([data], { type: 'application/json' });
      if (!navigator.sendBeacon?.('/api/whatsapp-click', blob)) {
        fetch('/api/whatsapp-click', { method: 'POST', body: data, keepalive: true }).catch(() => {});
      }
    }

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
