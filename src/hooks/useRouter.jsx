import { useState, useEffect, useCallback } from 'react';

export function useRouter() {
  const getRoute = () => {
    if (typeof window === 'undefined') return { path: '/', isAdmin: false, isLogin: false };
    
    const pathname = (window.location.pathname || '/').toLowerCase().replace(/\/+$/, '') || '/';
    const rawHash = (window.location.hash || '').toLowerCase();
    const hashClean = rawHash.replace(/^#\/?/, '/').replace(/\/+$/, '');

    const isLogin = 
      pathname === '/admin/login' || 
      pathname.startsWith('/admin/login/') ||
      hashClean === '/admin/login' ||
      hashClean.startsWith('/admin/login/');

    const isAdmin = !isLogin && (
      pathname === '/admin' || 
      pathname.startsWith('/admin/') || 
      hashClean === '/admin' || 
      hashClean.startsWith('/admin/') ||
      rawHash === '#admin' ||
      rawHash === '#/admin'
    );

    if (isLogin) {
      return { path: '/admin/login', isAdmin: false, isLogin: true };
    }
    if (isAdmin) {
      return { path: '/admin', isAdmin: true, isLogin: false };
    }
    return { path: pathname, isAdmin: false, isLogin: false };
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
