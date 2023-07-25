/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronsRight,
  Chrome,
  CircleDashed,
  Loader2,
} from 'lucide-react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

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
  CONFIRM_AMOUNT,
}

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

const HAS_INSUFFICIENT_FUNDS = true;

const PayPage: NextPage = () => {
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { connect, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState<SelectMenuOption['value']>('BE');

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [query, setQuery] = useState('');

  // phone number input
  const [isPhoneNumberSelectOpen, setPhoneNumberSelectOpen] =
    useState<boolean>(false);
  const phoneNumberInputDivRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        phoneNumberInputDivRef.current &&
        !phoneNumberInputDivRef.current.contains(event.target as any) &&
        open
      ) {
        // onToggle();
        setPhoneNumberSelectOpen((prev) => !prev);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [phoneNumberInputDivRef]);

  const [stage, setStage] = useState<Stage>(Stage.SHIPPING_INFO_AND_CONNECT);

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

                <PhoneInputWithCountrySelect
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  // flagUrl={`https://purecatamphetamine.github.io/country-flag-icons/3x2/{xx}.svg`}
                  flagComponent={({ country, countryName }) => (
                    <img
                      alt={countryName}
                      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                      className="inline object-contain w-6 h-4 mr-2 rounded-sm"
                    />
                  )}
                  countryOptionsOrder={['🌐', '...']}
                  countrySelectComponent={({ disabled, value, onChange }) => (
                    <div className={cn('relative')}>
                      <button
                        type="button"
                        className={`${
                          disabled ? 'bg-zinc-100' : 'bg-zinc-950'
                        } relative w-full border border-zinc-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-zinc-800 focus:border-zinc-800 sm:text-sm`}
                        aria-haspopup="listbox"
                        aria-expanded="true"
                        aria-labelledby="listbox-label"
                        onClick={() =>
                          setPhoneNumberSelectOpen((prev) => !prev)
                        }
                        disabled={disabled}
                      >
                        <span className="flex items-center truncate">
                          {!value ? (
                            <img
                              alt=""
                              src="/assets/flag-antarctica.png"
                              className="inline object-contain w-6 h-4 mr-2 rounded-sm"
                            />
                          ) : (
                            <img
                              alt={`${value}`}
                              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value}.svg`}
                              className="inline object-contain w-6 h-4 mr-2 rounded-sm"
                            />
                          )}
                          <span className="font-normal truncate text-zinc-300">
                            {/* {selectedValue.title} */}
                          </span>
                        </span>
                        <span
                          className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${
                            disabled ? 'hidden' : ''
                          }`}
                        >
                          <svg
                            className="w-5 h-5 text-zinc-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>

                      <AnimatePresence>
                        {isPhoneNumberSelectOpen && (
                          <motion.ul
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            className="absolute z-10 w-full mt-1 text-base rounded-lg shadow-lg bg-zinc-800 max-h-80 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            tabIndex={-1}
                            role="listbox"
                            aria-labelledby="listbox-label"
                            aria-activedescendant="listbox-option-3"
                          >
                            <div className="sticky top-0 z-10 overflow-hidden rounded-t-lg">
                              <li className="relative px-3 py-2 cursor-default select-none text-zinc-900 ">
                                <input
                                  type="search"
                                  name="search"
                                  autoComplete={'off'}
                                  className="block w-full rounded-md text-zinc-300 border-zinc-700 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  placeholder={'Search a country'}
                                  onChange={(e) => setQuery(e.target.value)}
                                />
                              </li>
                              <div className="h-[1px] w-full bg-zinc-600" />
                            </div>

                            <div
                              className={
                                'max-h-64 scrollbar scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 hover:scrollbar-thumb-zinc-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll'
                              }
                            >
                              <li
                                // key={`${id}-${index}`}
                                className={cn(
                                  'relative flex items-center px-3 py-2 transition cursor-default select-none text-zinc-900 hover:bg-zinc-700',
                                  !value && 'bg-zinc-700',
                                )}
                                id="listbox-option-0"
                                // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                                role="option"
                                onClick={() => {
                                  onChange('');
                                  setQuery('');
                                  // onToggle();
                                  setPhoneNumberSelectOpen((prev) => !prev);
                                }}
                              >
                                <img
                                  alt="International"
                                  src="/assets/flag-antarctica.png"
                                  className={
                                    'inline mr-2 w-6 min-w-6 h-4 min-h-4 rounded-sm bg-zinc-600'
                                  }
                                />

                                <span className="font-normal truncate text-zinc-300">
                                  International
                                </span>
                                {!value ? (
                                  <span className="flex items-center ml-auto text-zinc-200">
                                    <Check size={20} strokeWidth={3} />
                                  </span>
                                ) : null}
                              </li>

                              {COUNTRIES.filter((country) =>
                                country.title
                                  .toLowerCase()
                                  .startsWith(query.toLowerCase()),
                              ).length === 0 ? (
                                <li className="relative py-2 pl-3 cursor-default select-none text-zinc-900 pr-9">
                                  No countries found
                                </li>
                              ) : (
                                COUNTRIES.filter((country) =>
                                  country.title
                                    .toLowerCase()
                                    .startsWith(query.toLowerCase()),
                                ).map((k, index) => {
                                  return (
                                    <li
                                      // key={`${id}-${index}`}
                                      key={`-${index}`}
                                      className={cn(
                                        'relative flex items-center px-3 py-2 transition cursor-default select-none text-zinc-900 hover:bg-zinc-700',
                                        k === value && 'bg-zinc-700',
                                      )}
                                      id="listbox-option-0"
                                      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                                      role="option"
                                      onClick={() => {
                                        onChange(k.value);
                                        setQuery('');
                                        // onToggle();
                                        setPhoneNumberSelectOpen(
                                          (prev) => !prev,
                                        );
                                      }}
                                    >
                                      <img
                                        alt={`${k.value}`}
                                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${k.value}.svg`}
                                        className={cn(
                                          'inline mr-2 w-6 min-w-6 h-4 min-h-4 rounded-sm bg-zinc-600',
                                          'inline object-contain w-6 h-4 mr-2 rounded-sm',
                                        )}
                                      />

                                      <span className="font-normal truncate text-zinc-300">
                                        {k.title}
                                      </span>
                                      {k.value === value ? (
                                        <span className="flex items-center ml-auto text-zinc-200">
                                          <Check size={20} strokeWidth={3} />
                                        </span>
                                      ) : null}
                                    </li>
                                  );
                                })
                              )}
                            </div>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                  internationalIcon={() => (
                    <img
                      alt=""
                      src="/assets/flag-antarctica.png"
                      className="inline object-contain w-6 h-4 mr-2 rounded-sm"
                    />
                  )}
                  inputComponent={Input}
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

                <div className="grid w-full grid-cols-2 gap-2">
                  {Object.entries(wagmiConnectors).map(
                    ([connectorIdentifier, connector]) => (
                      <button
                        disabled={!connector.ready}
                        className="flex p-3 transition-colors rounded-lg group bg-zinc-800 hover:bg-zinc-700/80 disabled:opacity-75 disabled:cursor-not-allowed"
                        key={connector.id}
                        onClick={() => connect({ connector })}
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
                            {getNameByConnectorIdentifier(
                              connector.id,
                              connector.name,
                            )}
                          </span>
                          {isLoading &&
                            pendingConnector?.id === connector.id && (
                              <span className="inline-flex items-center w-full gap-1 text-left text-slate-400">
                                <Loader2
                                  className="animate-spin text-slate-400"
                                  size={16}
                                />
                                Connecting
                              </span>
                            )}
                        </div>
                      </button>
                    ),
                  )}
                </div>

                <button className="w-full py-3 mt-4 font-bold transition-colors bg-slate-100 rounded-xl text-zinc-800 hover:bg-slate-300">
                  Continue
                </button>
              </div>
            )}

            {isConnected && HAS_INSUFFICIENT_FUNDS && (
              <>
                <button
                  className="absolute px-2 border rounded-md top-4 right-4 bg-zinc-800 border-zinc-700 text-zinc-500"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </button>
                <div className="flex flex-col w-full h-full py-6">
                  <CircleDashed className="mx-auto text-slate-200" size={48} />
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
                                alt={{ token: 'Ethereum', network: 'Optimism' }}
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
                          <OnrampCard src="/assets/stably.png" name="Stably" />
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

            {isConnected && !HAS_INSUFFICIENT_FUNDS && (
              <>
                <button
                  className="absolute px-2 border rounded-md top-4 right-4 bg-zinc-800 border-zinc-700 text-zinc-500"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </button>
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
