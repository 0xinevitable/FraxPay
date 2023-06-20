/* eslint-disable @next/next/no-img-element */
import React from 'react';

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
        <button className="bg-slate-100 rounded-lg text-slate-800 font-bold py-3 hover:bg-slate-300 transition-colors">
          Connect Wallet
        </button>

        <div className="flex flex-col">
          <span>Optimism</span>
          <span>Balance: $0</span>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col items-center py-3 flex-1 gap-1 bg-zinc-800 rounded-xl">
            <div className="flex w-14 h-14 relative">
              <img
                src="/assets/eth.png"
                alt=""
                className="w-14 h-14 inline-block border-2 border-slate-500/20 shadow-xl shadow-black/60 rounded-full"
              />
              <img
                src="/assets/optimism.png"
                alt="Optimism"
                className="absolute w-5 h-5 right-0 bottom-0 z-2"
              />
            </div>
            <div className="mt-1 flex flex-col items-center gap-0.5">
              <span className="text-slate-400 inline-block leading-tight">
                Ethereum
              </span>
              <span className="text-slate-200 leading-tight inline-block">
                0.1 ETH
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center py-3 flex-1 gap-1 bg-zinc-800 rounded-xl">
            <div className="flex w-14 h-14 relative">
              <img
                src="/assets/frax.png"
                alt=""
                className="w-14 h-14 inline-block border-2 border-slate-500/20 shadow-xl shadow-black/60 rounded-full"
              />
              <img
                src="/assets/optimism.png"
                alt="Optimism"
                className="absolute w-5 h-5 right-0 bottom-0 z-2"
              />
            </div>
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

        <button className="bg-slate-100 rounded-lg text-slate-800 font-bold py-3 hover:bg-slate-300 transition-colors">
          Continue
        </button>
      </div>
    </div>
  );
};

export default HomePage;
