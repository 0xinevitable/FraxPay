import Link from 'next/link';
import React from 'react';
import { useAccount, useConnect } from 'wagmi';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { shortenAddress } from '@/lib/address';

const CurrentAddress: React.FC = () => {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <div>
      {isConnected ? (
        <div>
          {activeConnector?.id} {shortenAddress(address)}
        </div>
      ) : (
        <>
          {connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {isLoading &&
                pendingConnector?.id === connector.id &&
                ' (connecting)'}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export const NavigationBar: React.FC = () => {
  return (
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

      <CurrentAddress></CurrentAddress>
    </div>
  );
};
