/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { ChevronsRight, Chrome, CircleDashed, Loader2 } from 'lucide-react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { ConnectButton } from '@/components/ConnectButton';
import { NoSSR } from '@/components/NoSSR';
import { OnrampCard } from '@/components/OnrampCard';
import { ProductCard } from '@/components/ProductCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import CountrySelector, {
  SelectMenuOption,
} from '@/components/ui/country-input';
import { Input, InputWithLabel } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/components/ui/phone-input';
import { Separator } from '@/components/ui/separator';
import { COUNTRIES } from '@/constants/countries';
import { cn } from '@/lib/utils';
import { wagmiConnectors } from '@/lib/web3';

const MetaMaskAvatar = dynamic(
  () => import('react-metamask-avatar').then((module) => module.MetaMaskAvatar),
  {
    ssr: false,
    loading: () => <div />,
  },
);

enum Stage {
  SHIPPING_INFO_AND_CONNECT,
  CONFIRM_PAYMENT,
}

const HAS_INSUFFICIENT_FUNDS = true;

const PayPage: NextPage = () => {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { connect, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState<SelectMenuOption['value']>('BE');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [stage, setStage] = useState<Stage>(Stage.SHIPPING_INFO_AND_CONNECT);

  useEffect(() => {
    if (!isConnected && stage === Stage.CONFIRM_PAYMENT) {
      setStage(Stage.SHIPPING_INFO_AND_CONNECT);
    }
  }, [isConnected, stage]);

  return (
    <div className="h-full bg-zinc-950">
      <div className="container flex h-full max-w-5xl min-h-screen gap-8 py-[64px] mx-auto px-7">
        <div className="w-full max-w-sm">
          <ProductCard
            name={'Test Artifact — .ERA .Max 002'}
            description="TEST ARTIFACT ™ — Experimental brand in Seoul."
            priceDisplay={'60'}
            imageURL="/assets/eva-max-002.jpg"
            imageRatio={1 / 1}
          />
        </div>

        <div className="relative flex flex-col flex-1 rounded-xl bg-zinc-900 h-fit">
          <NoSSR>
            {stage === Stage.SHIPPING_INFO_AND_CONNECT && (
              <div className="flex flex-col w-full h-full px-6 py-6">
                <h2 className="mb-4 text-2xl font-medium leading-snug text-left text-slate-200">
                  <span className="w-[24px] min-w-[24px] inline-flex mr-2 text-xl items-center justify-center h-[24px] text-zinc-400 bg-zinc-700 rounded-full">
                    1
                  </span>
                  Shipping Information
                </h2>

                <div className="grid w-full grid-cols-2 gap-2">
                  <InputWithLabel id="name" label="Name" required />
                  <InputWithLabel
                    id="email"
                    type="email"
                    label="Email"
                    required
                  />
                </div>
                <div className="grid w-full grid-cols-2 gap-2">
                  <div className="flex-1">
                    <InputWithLabel id="address" label="City" />
                  </div>
                  <div className="flex flex-col flex-1 gap-1">
                    <Label className="mt-2 font-medium text-zinc-400">
                      Country
                    </Label>
                    <CountrySelector
                      className="w-full"
                      id={'country-selector'}
                      open={isOpen}
                      onToggle={() => setIsOpen(!isOpen)}
                      onChange={setCountry}
                      selectedValue={COUNTRIES.find(
                        (option) => option.value === country,
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col flex-1 gap-1">
                  <Label className="mt-2 font-medium text-zinc-400">
                    Address
                  </Label>
                  <div className="z-0 flex flex-col">
                    <Input
                      id="address"
                      placeholder="Street Address"
                      className="rounded-b-none focus:z-10"
                    />
                    <Input
                      id="zip"
                      placeholder="ZIP/Postal Code"
                      className="mt-[-1px] rounded-t-none focus:z-10"
                    />
                  </div>
                </div>

                <PhoneInput
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                />

                {/* divider */}
                <div className="flex flex-col items-center my-6">
                  <div className="w-[2px] h-[42px] bg-zinc-600 rounded-sm" />
                </div>

                <h2 className="mb-4 text-2xl font-medium leading-snug text-left text-slate-200">
                  <span className="w-[24px] min-w-[24px] inline-flex mr-2 text-xl items-center justify-center h-[24px] text-zinc-400 bg-zinc-700 rounded-full">
                    2
                  </span>
                  Connect Wallet
                </h2>

                {!isConnected && (
                  <div className="grid w-full grid-cols-2 gap-2">
                    {Object.entries(wagmiConnectors).map(
                      ([connectorIdentifier, connector]) => (
                        <ConnectButton
                          key={connector.id}
                          connector={connector}
                          connectorIdentifier={connectorIdentifier}
                          onClick={() => connect({ connector })}
                        />
                      ),
                    )}
                  </div>
                )}

                {isConnected && (
                  <div className="flex flex-col items-center w-full gap-2 pb-3">
                    <span className="mt-4 text-xl font-medium leading-snug text-slate-200">
                      Wallet Connected!
                    </span>
                    <span className="inline-flex items-center gap-2 py-2 pl-1.5 pr-3 leading-none border shadow-lg text-2xl bg-zinc-800 rounded-3xl border-zinc-600/50 shadow-zinc-950 align-bottom w-fit">
                      <div className="inline-flex items-center justify-center w-8 h-8 -my-3 align-middle border-2 rounded-full border-slate-500/20">
                        <MetaMaskAvatar address={address} size={28} />
                      </div>
                      <span className="text-slate-200">
                        {address.slice(0, 6)}
                      </span>
                    </span>

                    <button
                      className="px-2 mt-2 border rounded-md bg-zinc-800 border-zinc-700 text-zinc-500"
                      onClick={() => disconnect()}
                    >
                      Disconnect
                    </button>
                  </div>
                )}

                <button
                  className="w-full py-3 mt-4 font-bold transition-colors bg-slate-100 rounded-xl text-zinc-800 hover:bg-slate-300"
                  disabled={!isConnected}
                  onClick={() => {
                    setStage(Stage.CONFIRM_PAYMENT);
                  }}
                >
                  Continue
                </button>
              </div>
            )}

            {stage === Stage.CONFIRM_PAYMENT && isConnected && (
              <div className="flex justify-between w-full p-4">
                <button
                  className="px-2 border rounded-md bg-zinc-800 border-zinc-700 text-zinc-500"
                  onClick={() => setStage(Stage.SHIPPING_INFO_AND_CONNECT)}
                >
                  Previous
                </button>
                <button
                  className="px-2 border rounded-md bg-zinc-800 border-zinc-700 text-zinc-500"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </button>
              </div>
            )}

            {stage === Stage.CONFIRM_PAYMENT &&
              HAS_INSUFFICIENT_FUNDS &&
              isConnected && (
                <>
                  <div className="flex flex-col w-full h-full py-6">
                    <CircleDashed
                      className="mx-auto text-slate-200"
                      size={48}
                    />
                    <h2 className="mt-4 text-3xl font-medium leading-snug text-center text-slate-200">
                      Wallet{' '}
                      <span className="inline-flex items-center gap-2 py-2 pl-1.5 pr-3 leading-none border shadow-lg text-2xl bg-zinc-800 rounded-3xl border-zinc-600/50 shadow-zinc-950 align-bottom">
                        <div className="inline-flex items-center justify-center w-8 h-8 -my-3 align-middle border-2 rounded-full border-slate-500/20">
                          <MetaMaskAvatar address={address} size={28} />
                        </div>
                        <span>{address.slice(0, 6)}</span>
                      </span>{' '}
                      <br />
                      do not have <br />
                      enough{' '}
                      <span
                        className="inline-flex items-center gap-2 py-2 pl-1.5 pr-3 leading-none border shadow-lg text-2xl bg-slate-950 rounded-3xl border-zinc-700/40 shadow-zinc-950 align-bottom"
                        style={{
                          background: `linear-gradient(135deg, #030616 0%, #000E1F 32.73%, #000 48.96%, #16031B 67.88%, #030616 100%)`,
                        }}
                      >
                        <TokenLogo
                          className="inline-flex w-8 h-8 -my-3 align-middle"
                          src={{
                            token: '/assets/frax.png',
                          }}
                          alt={{ token: 'Frax' }}
                        />
                        <span>FRAX</span>
                      </span>
                    </h2>

                    <Separator className="my-8" />

                    <Accordion
                      type="single"
                      collapsible
                      defaultValue="swap-to-frax"
                    >
                      {/* <AccordionItem value="switch-wallet">
                      <AccordionTrigger className="px-6 py-3">
                        <h3 className="text-[20px] font-medium text-slate-300">
                          Switch Wallet
                        </h3>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pt-3 pb-5 transform-gpu">
                        switch address in your wallet
                      </AccordionContent>
                    </AccordionItem> */}

                      <AccordionItem value="swap-to-frax">
                        <AccordionTrigger className="px-6 py-3">
                          <h3 className="text-[20px] font-medium text-slate-300">
                            Swap to Frax
                          </h3>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pt-3 pb-5 transform-gpu">
                          {/* <div className="flex flex-col">
                  <span>Optimism</span>
                  <span>Balance: $0</span>
                </div> */}

                          <div className="flex flex-col w-full">
                            <div className="flex items-center mt-3">
                              <div
                                className={clsx(
                                  'flex flex-col items-center py-3 flex-1 gap-1 bg-zinc-700 rounded-xl relative transition-all cursor-pointer',
                                  'hover:bg-zinc-600/80 hover:translate-y-[-16px] hover:backdrop-blur-sm',
                                )}
                              >
                                <TokenLogo
                                  src={{
                                    token: '/assets/eth.png',
                                    network: '/assets/optimism.png',
                                  }}
                                  alt={{
                                    token: 'Ethereum',
                                    network: 'Optimism',
                                  }}
                                />
                                <div className="mt-1 flex flex-col items-center gap-0.5">
                                  <span className="inline-block leading-tight text-slate-300">
                                    Ethereum
                                  </span>
                                  <span className="inline-block leading-tight text-slate-200">
                                    0.1 ETH
                                  </span>
                                </div>
                                <span className="bg-zinc-500/20 backdrop-blur-sm text-zinc-50/80 text-sm font-semibold inline-block leading-tight absolute right-[-6px] top-[-6px] rounded-xl px-2 py-1 shadow-xl shadow-black/20">
                                  Change
                                </span>
                              </div>

                              <div className="w-8 h-8 mx-[-12px] z-10 rounded-full bg-zinc-600 flex items-center justify-center text-zinc-400 shadow">
                                <ChevronsRight />
                              </div>

                              <div className="flex flex-col items-center flex-1 gap-1 py-3 bg-zinc-800 rounded-xl">
                                <TokenLogo
                                  src={{
                                    token: '/assets/frax.png',
                                    network: '/assets/optimism.png',
                                  }}
                                  alt={{ token: 'Frax', network: 'Optimism' }}
                                />
                                <div className="mt-1 flex flex-col items-center gap-0.5">
                                  <span className="inline-block leading-tight text-slate-400">
                                    Frax
                                  </span>
                                  <span className="inline-block leading-tight text-slate-200">
                                    50.18 FRAX
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button className="w-full py-3 mt-3 font-bold transition-colors bg-slate-100 rounded-xl text-zinc-800 hover:bg-slate-300">
                              Continue
                            </button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="onramp-to-frax">
                        <AccordionTrigger className="px-6 py-3">
                          <h3 className="text-[20px] font-medium text-slate-300">
                            Onramp to Frax
                          </h3>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pt-3 pb-5 transform-gpu">
                          <ul className="flex flex-col gap-2 mt-3">
                            <OnrampCard
                              src="/assets/stably.png"
                              name="Stably"
                            />
                            <OnrampCard
                              src="/assets/transak.svg"
                              name="Transak"
                            />
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </>
              )}

            {stage === Stage.CONFIRM_PAYMENT && !HAS_INSUFFICIENT_FUNDS && (
              <>
                <div className="flex flex-col w-full h-full py-6">
                  <CircleDashed className="mx-auto text-slate-200" size={48} />
                  <h2 className="mt-4 text-3xl font-medium leading-snug text-center text-slate-200">
                    Pay $43 with <br />
                    Wallet{' '}
                    <span className="inline-flex items-center gap-2 py-2 pl-1.5 pr-3 leading-none border shadow-lg text-2xl bg-zinc-800 rounded-3xl border-zinc-600/50 shadow-zinc-950 align-bottom">
                      <div className="inline-flex items-center justify-center w-8 h-8 -my-3 align-middle border-2 rounded-full border-slate-500/20">
                        <MetaMaskAvatar address={address} size={28} />
                      </div>
                      <span>{address.slice(0, 6)}</span>
                    </span>{' '}
                  </h2>

                  <Separator className="my-8" />

                  <button className="w-full py-3 mt-4 font-bold transition-colors bg-slate-100 rounded-xl text-zinc-800 hover:bg-slate-300">
                    Pay
                  </button>
                </div>
              </>
            )}
          </NoSSR>
        </div>
      </div>
    </div>
  );
};

export default PayPage;

type TokenLogoProps = {
  className?: string;
  src: {
    token: string;
    network?: string;
  };
  alt: {
    token?: string;
    network?: string;
  };
};
const TokenLogo: React.FC<TokenLogoProps> = ({ className, src, alt }) => {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center w-14 h-14',
        className,
      )}
    >
      <img
        src={src.token}
        alt={alt.token}
        className="inline-block w-full h-full border-2 rounded-full shadow-xl border-slate-500/20 shadow-black/60"
      />
      {src.network && (
        <img
          src={src.network}
          alt={alt.network}
          className="absolute bottom-0 right-0 w-5 h-5 z-2"
        />
      )}
    </div>
  );
};
