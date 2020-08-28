import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function TopOfPage() {
  const { pathname } = useLocation();

  // Scroll to top of page with each navigation.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
