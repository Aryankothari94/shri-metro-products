import { useState, useEffect, useCallback } from 'react';

export const ADMIN_URL_PATH = '/shri-metro-admin';

const ADMIN_BASE_PATHS = [
  '/shri-metro-admin',
  '/smp-admin-7888',
  '/admin'
];

export function useRouter() {
  const getRoute = () => {
    if (typeof window === 'undefined') return { path: '/', isAdmin: false, isLogin: false };
    
    const pathname = (window.location.pathname || '/').toLowerCase().replace(/\/+$/, '') || '/';
    const rawHash = (window.location.hash || '').toLowerCase();
    const hashClean = rawHash.replace(/^#\/?/, '/').replace(/\/+$/, '');

    const isLogin = ADMIN_BASE_PATHS.some(base =>
      pathname === `${base}/login` ||
      pathname.startsWith(`${base}/login/`) ||
      hashClean === `${base}/login` ||
      hashClean.startsWith(`${base}/login/`)
    );

    const isAdmin = !isLogin && ADMIN_BASE_PATHS.some(base =>
      pathname === base ||
      pathname.startsWith(`${base}/`) ||
      hashClean === base ||
      hashClean.startsWith(`${base}/`) ||
      rawHash === `#${base.slice(1)}` ||
      rawHash === `#${base}`
    );

    if (isLogin) {
      return { path: `${ADMIN_URL_PATH}/login`, isAdmin: false, isLogin: true };
    }
    if (isAdmin) {
      return { path: ADMIN_URL_PATH, isAdmin: true, isLogin: false };
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
