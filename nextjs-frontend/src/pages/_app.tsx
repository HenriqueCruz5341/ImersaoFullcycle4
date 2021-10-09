import type { AppContext, AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../utils/theme';
import { CssBaseline } from '@material-ui/core';
import { useEffect } from 'react';
import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr';
import { KEYCLOAK_PUBLIC_CONFIG } from '../utils/auth';
import { parseCookies } from '../utils/cookies';
import Head from 'next/head';

function MyApp({ Component, pageProps, cookies }: AppProps & { cookies: any }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SSRKeycloakProvider
        keycloakConfig={KEYCLOAK_PUBLIC_CONFIG}
        persistor={SSRCookies(cookies)}
        initOptions={{
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri:
            typeof window !== 'undefined'
              ? `${window.location.origin}/silent-check-sso.html`
              : null,
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </SSRKeycloakProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return {
    cookies: parseCookies(appContext.ctx.req),
  };
};

export default MyApp;
