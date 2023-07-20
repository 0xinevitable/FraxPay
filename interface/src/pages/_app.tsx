import { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import React from 'react';

import { GlobalStyle } from '@/components/GlobalStyle';
import { NavigationBar } from '@/components/NavigationBar';
import '@/styles/globals.css';

const lexend = localFont({
  src: '../../public/fonts/Lexend-VariableFont_wght.ttf',
  variable: '--font-lexend',
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <React.Fragment>
      <GlobalStyle />

      {router.route !== '/pay/[paymentRequestID]' && <NavigationBar />}
      <Component {...pageProps} />

      <div id="portal" />
      <style jsx global>{`
        html {
          font-family: ${lexend.style.fontFamily};
        }
      `}</style>
    </React.Fragment>
  );
};

export default App;
