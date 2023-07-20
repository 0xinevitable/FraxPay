/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { ChevronsRight, CircleDashed } from 'lucide-react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

import { OnrampCard } from '@/components/OnrampCard';
import { ProductCard } from '@/components/ProductCard';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const MetaMaskAvatar = dynamic(
  () => import('react-metamask-avatar').then((module) => module.MetaMaskAvatar),
  {
    ssr: false,
    loading: () => <div />,
  },
);

const PayPage: NextPage = () => {
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

        <div className="flex flex-col flex-1 px-6 py-6 rounded-xl bg-zinc-900">
          <button className="py-3 font-bold transition-colors bg-slate-100 rounded-xl text-zinc-800 hover:bg-slate-300">
            Connect Wallet
          </button>

          <CircleDashed className="mx-auto text-slate-200" size={48} />
          <h2 className="mt-4 text-3xl font-medium leading-snug text-center text-slate-200">
            Wallet{' '}
            <span className="inline-flex items-center gap-2 py-2 pl-1.5 pr-3 leading-none border shadow-lg text-2xl bg-zinc-800 rounded-3xl border-zinc-600/50 shadow-zinc-950 align-bottom">
              <div className="inline-flex items-center justify-center w-8 h-8 -my-3 align-middle border-2 rounded-full border-slate-500/20">
                <MetaMaskAvatar
                  address="0x7777777141f111cf9f0308a63dbd9d0cad3010c4"
                  size={28}
                />
              </div>
              <span>0x7777</span>
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

          <h3 className="text-2xl font-medium text-slate-300">Switch Wallet</h3>

          <h3 className="text-2xl font-medium text-slate-300">Swap to Frax</h3>

          {/* <div className="flex flex-col">
            <span>Optimism</span>
            <span>Balance: $0</span>
          </div> */}

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
                {/* <button className="z-20 flex items-center gap-1 px-2 py-1 transition-colors shadow-xl rounded-xl bg-zinc-700 hover:bg-zinc-600 shadow-black/40">
                <span className="inline-block leading-tight text-slate-300">
                  Ethereum
                </span>
                <ChevronDown size={16} className="text-slate-300" />
              </button> */}
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

          <button className="py-3 font-bold transition-colors bg-slate-100 rounded-xl text-zinc-800 hover:bg-slate-300">
            Continue
          </button>

          <h3 className="text-2xl font-medium text-slate-300">
            Onramp to Frax
          </h3>

          <ul className="flex flex-col gap-2 mt-3">
            <OnrampCard src="/assets/stably.png" name="Stably" />
            <OnrampCard src="/assets/transak.svg" name="Transak" />
          </ul>
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
