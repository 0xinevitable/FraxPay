import {
  SessionProvider,
  getCsrfToken,
  signIn,
  signOut,
  useSession,
} from 'next-auth/react';
import { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import { SiweMessage } from 'siwe';
import { WagmiConfig, useAccount, useSignMessage } from 'wagmi';
import { optimism } from 'wagmi/chains';

import { GlobalStyle } from '@/components/GlobalStyle';
import { NavigationBar } from '@/components/NavigationBar';
import { isSameAddress } from '@/lib/address';
import { wagmiConfig } from '@/lib/web3';
import '@/styles/globals.css';

const PAYMENT_PAGE_PATH = '/pay/[productID]';

const lexend = localFont({
  src: '../../public/fonts/Lexend-VariableFont_wght.ttf',
  variable: '--font-lexend',
});

const Web3Provider: React.FC = () => {
  const router = useRouter();
  const account = useAccount();
  const session = useSession();
  const { signMessageAsync } = useSignMessage();

  console.log({ session });
  const isSigningRef = useRef<boolean>(false);
  useEffect(() => {
    if (router.pathname === PAYMENT_PAGE_PATH) {
      return;
    }

    const handleLogin = async () => {
      try {
        if (
          !isSameAddress(
            (session?.data?.user as any)?.address,
            account.address,
          ) &&
          account.isConnected &&
          account.address
        ) {
          if (isSigningRef.current) {
            return;
          }
          isSigningRef.current = true;
          const signLogin = async () => {
            try {
              const message = new SiweMessage({
                domain: window.location.host,
                uri: window.location.origin,
                version: '1',
                address: account.address,
                statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
                nonce: await getCsrfToken(),
                chainId: optimism.id,
              });

              const signedMessage = await signMessageAsync({
                message: message.prepareMessage(),
              });

              const response = await signIn('web3', {
                message: JSON.stringify(message),
                signedMessage,
                redirect: true,
                callbackUrl: '/home',
              });
              if (response?.error) {
                console.log('Error occured:', response.error);
              }
            } catch (error) {
              console.log('Error Occured', error);
            }
            isSigningRef.current = false;
          };

          await signLogin();
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

    console.log(session, router);
    if (session.status === 'unauthenticated') {
      handleLogin();
    }
  }, [account.isConnected, account.address, session, router, signMessageAsync]);

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
        {router.pathname !== PAYMENT_PAGE_PATH && <NavigationBar />}
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
