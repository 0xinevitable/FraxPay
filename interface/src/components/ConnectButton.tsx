/* eslint-disable @next/next/no-img-element */
import { Chrome, Loader2 } from 'lucide-react';
import { Connector, useConnect } from 'wagmi';

const getNameByConnectorIdentifier = (
  connectorIdentifier: string,
  connectorName?: string,
) => {
  connectorIdentifier = connectorIdentifier.toLowerCase();
  if (connectorIdentifier === 'injected') {
    if (!!connectorName) {
      return `Injected (${connectorName})`;
    }
    return 'Injected';
  }
  if (connectorIdentifier === 'metamask') {
    return 'MetaMask';
  }
  if (connectorIdentifier === 'coinbasewallet') {
    return 'Coinbase Wallet';
  }
  return 'Unknown';
};

type ConnectButtonProps = {
  connector: Connector;
  connectorIdentifier: string;
  onClick: () => void;
};
export const ConnectButton: React.FC<ConnectButtonProps> = ({
  connector,
  connectorIdentifier,
  onClick,
}) => {
  // TODO: pendingConnector state undefined
  const { isLoading, pendingConnector } = useConnect();

  return (
    <button
      disabled={!connector.ready}
      className="flex p-3 transition-colors rounded-lg group bg-zinc-800 hover:bg-zinc-700/80 disabled:opacity-75 disabled:cursor-not-allowed"
      key={connector.id}
      onClick={onClick}
    >
      {connectorIdentifier === 'injected' && (
        <span className="w-[48px] min-w-[48px]">
          <Chrome className="text-slate-300" size={48} />
        </span>
      )}
      {connectorIdentifier === 'metamask' && (
        <img
          alt="MetaMask"
          src="/assets/connectors/metamask.svg"
          className="w-[48px] h-[48px]"
        />
      )}
      {connectorIdentifier === 'coinbase' && (
        <img
          alt="Coinbase Wallet"
          src="/assets/connectors/coinbase.svg"
          className="w-[48px] h-[48px]"
        />
      )}
      <div className="flex flex-col h-full justify-center flex-1 gap-1 ml-2 max-w-[calc(100%-52px)]">
        <span className="block w-full text-left truncate transition-colors text-zinc-300 group-hover:text-white">
          {getNameByConnectorIdentifier(connector.id, connector.name)}
        </span>
        {isLoading && pendingConnector?.id === connector.id && (
          <span className="inline-flex items-center w-full gap-1 text-left text-slate-400">
            <Loader2 className="animate-spin text-slate-400" size={16} />
            Connecting
          </span>
        )}
      </div>
    </button>
  );
};
