import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';
import { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { WagmiConfig, useAccount } from 'wagmi';

import { GlobalStyle } from '@/components/GlobalStyle';
import { NavigationBar } from '@/components/NavigationBar';
import { isSameAddress } from '@/lib/address';
import { wagmiConfig } from '@/lib/web3';
import '@/styles/globals.css';

const lexend = localFont({
  src: '../../public/fonts/Lexend-VariableFont_wght.ttf',
  variable: '--font-lexend',
});

const Web3Provider: React.FC = () => {
  const account = useAccount();
  const session = useSession();

  useEffect(() => {
    const handleLogin = async () => {
      try {
        if (account.isConnected && account.address) {
          signIn('credentials', {
            address: account.address,
            callbackUrl: '/home',
          });
          return;
        }
      } catch (error) {
        console.error(error);
      }
    };

    // if lost wallet connection
    if (!account.isConnected && session.status === 'authenticated') {
      signOut({ callbackUrl: '/' });
      return;
    }

    // if wallet changed
    if (
      !isSameAddress(account.address, (session.data as any)?.address) &&
      session.status === 'authenticated'
    ) {
      handleLogin();
      return;
    }

    console.log(session);
    if (session.status === 'unauthenticated') {
      handleLogin();
    }
  }, [account.isConnected, account.address, session]);

  return null;
};

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <WagmiConfig config={wagmiConfig}>
        <GlobalStyle />

        <Web3Provider />
        {router.route !== '/pay/[paymentRequestID]' && <NavigationBar />}
        <Component {...pageProps} />

        <div id="portal" />
        <style jsx global>{`
          html {
            font-family: ${lexend.style.fontFamily};
          }
        `}</style>
      </WagmiConfig>
    </SessionProvider>
  );
};

export default App;
