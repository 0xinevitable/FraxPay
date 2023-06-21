/* eslint-disable @next/next/no-img-element */
import { ChevronDown, ChevronsRight } from 'lucide-react';
import React from 'react';

import { OnrampCard } from '@/components/OnrampCard';

const HomePage = () => {
  return (
    <div className="bg-zinc-950 h-full">
      <div className="bg-zinc-900 container px-7 max-w-lg h-full min-h-screen flex flex-col">
        <span className="text-slate-400">Atelier Haus</span>
        <div className="flex items-end gap-2">
          <h1 className="text-slate-300 text-6xl font-medium">$50.18 </h1>
          <img
            src="/assets/frax.png"
            alt=""
            className="w-14 h-14 inline-block border-2 border-slate-500/20 shadow-xl shadow-black/60 rounded-full"
          />
        </div>
        <button className="bg-slate-100 rounded-xl text-slate-800 font-bold py-3 hover:bg-slate-300 transition-colors">
          Connect Wallet
        </button>

        <div className="flex flex-col">
          <span>Optimism</span>
          <span>Balance: $0</span>
        </div>

        <div className="flex items-center">
          <div className="flex flex-col items-center py-3 flex-1 gap-1 bg-zinc-700 hover:bg-zinc-600 rounded-xl relative transition-colors cursor-pointer">
            <TokenLogo
              src={{
                token: '/assets/eth.png',
                network: '/assets/optimism.png',
              }}
              alt={{ token: 'Ethereum', network: 'Optimism' }}
            />
            <div className="mt-1 flex flex-col items-center gap-0.5">
              {/* <button className=" bg-zinc-700 hover:bg-zinc-600 px-2 py-1 rounded-lg shadow-xl shadow-black/40 z-20 flex items-center gap-1 transition-colors">
                <span className="text-slate-300 inline-block leading-tight">
                  Ethereum
                </span>
                <ChevronDown size={16} className="text-slate-300" />
              </button> */}
              <span className="text-slate-300 inline-block leading-tight">
                Ethereum
              </span>
              <span className="text-slate-200 leading-tight inline-block">
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

          <div className="flex flex-col items-center py-3 flex-1 gap-1 bg-zinc-800 rounded-xl">
            <TokenLogo
              src={{
                token: '/assets/frax.png',
                network: '/assets/optimism.png',
              }}
              alt={{ token: 'Frax', network: 'Optimism' }}
            />
            <div className="mt-1 flex flex-col items-center gap-0.5">
              <span className="text-slate-400 inline-block leading-tight">
                Frax
              </span>
              <span className="text-slate-200 leading-tight inline-block">
                50.18 FRAX
              </span>
            </div>
          </div>
        </div>

        <button className="bg-slate-100 rounded-xl text-slate-800 font-bold py-3 hover:bg-slate-300 transition-colors">
          Continue
        </button>

        <ul className="flex flex-col gap-2">
          <OnrampCard src="/assets/stably.png" name="Stably" />
          <OnrampCard src="/assets/transak.svg" name="Transak" />
        </ul>
      </div>
    </div>
  );
};

export default HomePage;

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
    <div className="flex w-14 h-14 relative">
      <img
        src={src.token}
        alt={alt.token}
        className="w-14 h-14 inline-block border-2 border-slate-500/20 shadow-xl shadow-black/60 rounded-full"
      />
      <img
        src={src.network}
        alt={alt.network}
        className="absolute w-5 h-5 right-0 bottom-0 z-2"
      />
    </div>
  );
};
