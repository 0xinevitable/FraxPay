/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { ChevronsRight } from 'lucide-react';
import { NextPage } from 'next';
import React from 'react';

import { OnrampCard } from '@/components/OnrampCard';

const PayPage: NextPage = () => {
  return (
    <div className="h-full bg-zinc-950">
      <div className="container flex flex-col h-full max-w-lg min-h-screen bg-zinc-900 px-7">
        <div className="flex flex-col gap-1">
          <span className="text-slate-400">Atelier Haus</span>
          <div className="flex items-end gap-2">
            <h1 className="text-6xl font-medium text-slate-300">$50.18</h1>
            <img
              src="/assets/frax.png"
              alt=""
              className="inline-block border-2 rounded-full shadow-xl w-14 h-14 border-slate-500/20 shadow-black/60"
            />
          </div>
        </div>
        <button className="py-3 font-bold transition-colors bg-slate-100 rounded-xl text-slate-800 hover:bg-slate-300">
          Connect Wallet
        </button>

        <div className="flex flex-col">
          <span>Optimism</span>
          <span>Balance: $0</span>
        </div>

        <div className="flex items-center">
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
              {/* <button className="z-20 flex items-center gap-1 px-2 py-1 transition-colors rounded-lg shadow-xl bg-zinc-700 hover:bg-zinc-600 shadow-black/40">
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

        <button className="py-3 font-bold transition-colors bg-slate-100 rounded-xl text-slate-800 hover:bg-slate-300">
          Continue
        </button>

        <h1 className="text-2xl font-medium text-slate-300">Buy Frax</h1>

        <ul className="flex flex-col gap-2 mt-3">
          <OnrampCard src="/assets/stably.png" name="Stably" />
          <OnrampCard src="/assets/transak.svg" name="Transak" />
        </ul>
      </div>
    </div>
  );
};

export default PayPage;

type TokenLogoProps = {
  src: {
    token: string;
    network: string;
  };
  alt: {
    token?: string;
    network?: string;
  };
};
const TokenLogo: React.FC<TokenLogoProps> = ({ src, alt }) => {
  return (
    <div className="relative flex w-14 h-14">
      <img
        src={src.token}
        alt={alt.token}
        className="inline-block border-2 rounded-full shadow-xl w-14 h-14 border-slate-500/20 shadow-black/60"
      />
      <img
        src={src.network}
        alt={alt.network}
        className="absolute bottom-0 right-0 w-5 h-5 z-2"
      />
    </div>
  );
};
