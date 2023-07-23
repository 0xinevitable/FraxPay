import { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import React from 'react';
import { WagmiConfig } from 'wagmi';

import { GlobalStyle } from '@/components/GlobalStyle';
import { NavigationBar } from '@/components/NavigationBar';
import { wagmiConfig } from '@/lib/web3';
import '@/styles/globals.css';

const lexend = localFont({
  src: '../../public/fonts/Lexend-VariableFont_wght.ttf',
  variable: '--font-lexend',
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <WagmiConfig config={wagmiConfig}>
      <GlobalStyle />

      {router.route !== '/pay/[paymentRequestID]' && <NavigationBar />}
      <Component {...pageProps} />

      <div id="portal" />
      <style jsx global>{`
        html {
          font-family: ${lexend.style.fontFamily};
        }
      `}</style>
    </WagmiConfig>
  );
};

export default App;
