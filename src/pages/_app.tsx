import { AppProps } from 'next/app';
import localFont from 'next/font/local';
import React from 'react';

import { GlobalStyle } from '@/components/GlobalStyle';
import '@/styles/globals.css';

const lexend = localFont({
  src: '../../public/fonts/Lexend-VariableFont_wght.ttf',
  variable: '--font-lexend',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      {/* @ts-ignore // Type mismatch after upgrading to React 18 */}
      <GlobalStyle />
      <Component {...pageProps} />

      <div id="portal" />
      <style jsx global>{`
        html {
          font-family: ${lexend.style.fontFamily};
        }
      `}</style>
    </React.Fragment>
  );
}

export default MyApp;
