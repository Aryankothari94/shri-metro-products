import { useState, useEffect, useCallback } from 'react';

export function useRouter() {
  const getRoute = () => {
    if (typeof window === 'undefined') return { path: '/', isAdmin: false, isLogin: false };
    
    // Check both pathname and hash (e.g., #/admin)
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');
    const current = hash || path;

    if (current === '/admin/login' || current.startsWith('/admin/login')) {
      return { path: '/admin/login', isAdmin: false, isLogin: true };
    }
    if (current === '/admin' || current.startsWith('/admin')) {
      return { path: '/admin', isAdmin: true, isLogin: false };
    }
    return { path: '/', isAdmin: false, isLogin: false };
  };

  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(getRoute());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigate = useCallback((to) => {
    if (typeof window === 'undefined') return;
    window.history.pushState({}, '', to);
    setRoute(getRoute());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    ...route,
    navigate
  };
}

export default useRouter;
