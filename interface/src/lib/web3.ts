import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { configureChains, createConfig } from 'wagmi';
import {
  arbitrum,
  arbitrumGoerli,
  optimism,
  optimismGoerli,
} from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  // [arbitrum, arbitrumGoerli, optimism, optimismGoerli],
  [optimism],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_API_KEY as string,
    }),
    publicProvider(),
  ],
);

export const wagmiConnectors = {
  injected: new InjectedConnector({ chains }),
  metamask: new MetaMaskConnector({ chains }),
  coinbase: new CoinbaseWalletConnector({
    chains,
    options: { appName: 'FraxPay', darkMode: true },
  }),
};

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: Object.values(wagmiConnectors),
  publicClient,
  webSocketPublicClient,
});

export { publicClient };
