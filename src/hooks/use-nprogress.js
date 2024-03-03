import { useEffect } from 'react';
import Router from 'next/router';
import nProgress from 'nprogress';

/**
 * Custom hook to manage NProgress bar during route changes.
 */
export function useNProgress() {
  useEffect(() => {
    // Start NProgress bar when route change starts
    Router.events.on('routeChangeStart', nProgress.start);
    // Complete NProgress bar when route change encounters error
    Router.events.on('routeChangeError', nProgress.done);
    // Complete NProgress bar when route change completes successfully
    Router.events.on('routeChangeComplete', nProgress.done);

    // Remove event listeners when component unmounts
    return () => {
      Router.events.off('routeChangeStart', nProgress.start);
      Router.events.off('routeChangeError', nProgress.done);
      Router.events.off('routeChangeComplete', nProgress.done);
    };
  }, []);
}
