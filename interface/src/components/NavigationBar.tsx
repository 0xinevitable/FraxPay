import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { wagmiConnectors } from '@/lib/web3';

import { ConnectButton } from './ConnectButton';
import { Modal } from './Modal';
import { NoSSR } from './NoSSR';
import { Button } from './ui/button';

const MetaMaskAvatar = dynamic(
  () => import('react-metamask-avatar').then((module) => module.MetaMaskAvatar),
  {
    ssr: false,
    loading: () => <div />,
  },
);

const CurrentAddress: React.FC<{ onClickConnect: () => void }> = ({
  onClickConnect,
}) => {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <NoSSR>
      {isConnected ? (
        <div className="flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-zinc-900">
          <span className="h-[26px] pl-0.5 pr-2 inline-flex items-center gap-1.5 leading-none align-bottom border shadow-lg text-md bg-zinc-800 rounded-3xl border-zinc-600/50 shadow-zinc-950">
            <MetaMaskAvatar address={address} size={20} />
            <span>{address.slice(0, 6)}</span>
          </span>
          <button
            className="px-2 border rounded-md bg-zinc-800 border-zinc-700 text-zinc-500"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <Button onClick={onClickConnect}>Connect Wallet</Button>
      )}
    </NoSSR>
  );
};

export const NavigationBar: React.FC = () => {
  const { connectAsync: connect } = useConnect();
  const { address } = useAccount();
  const [isWalletModalOpen, setWalletModalOpen] = useState<boolean>(false);
  const { signMessageAsync } = useSignMessage();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-6 py-4 text-white bg-zinc-950">
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

      <CurrentAddress
        onClickConnect={() => setWalletModalOpen((prev) => !prev)}
      />
      <Modal
        isOpen={isWalletModalOpen}
        onClose={() => setWalletModalOpen((prev) => !prev)}
        title="Connect Wallet"
      >
        <div className="grid w-full grid-cols-2 gap-2">
          {Object.entries(wagmiConnectors).map(
            ([connectorIdentifier, connector]) => (
              <ConnectButton
                key={connector.id}
                connector={connector}
                connectorIdentifier={connectorIdentifier}
                onClick={async () => {
                  await connect({ connector });
                  setWalletModalOpen((prev) => !prev);
                }}
              />
            ),
          )}
        </div>
      </Modal>
    </div>
  );
};
