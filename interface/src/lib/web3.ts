import { configureChains, createConfig } from 'wagmi';
import {
  arbitrum,
  arbitrumGoerli,
  optimism,
  optimismGoerli,
} from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [arbitrum, arbitrumGoerli, optimism, optimismGoerli],
  [publicProvider()],
);

export const wagmiConnectors = {
  injected: new InjectedConnector({ chains }),
  metamask: new MetaMaskConnector({ chains }),
};

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});
