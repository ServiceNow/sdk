import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

export default function Root({ children }) {
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const embed = params.get('embed');
    if (embed === 'true' || embed === '1') {
      document.documentElement.setAttribute('data-embed', 'true');
    } else {
      document.documentElement.removeAttribute('data-embed');
    }
  }, [search]);

  return <>{children}</>;
}
