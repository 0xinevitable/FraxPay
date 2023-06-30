import { AppProps } from 'next/app';
import localFont from 'next/font/local';
import Link from 'next/link';
import React from 'react';

import { GlobalStyle } from '@/components/GlobalStyle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
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

      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full py-4 text-white bg-zinc-950">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/home" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
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
