import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { faro } from '@/lib/faro';

export function useFaroPageview(pageName: string) {
  const location = useLocation();

  useEffect(() => {
    faro.api.pushEvent('page_view', {
      page: pageName,
      path: location.pathname,
    });
  }, [pageName, location.pathname]);
}
