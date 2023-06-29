/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { ChevronsRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

// import CoverImage from './cover.png';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center pb-8 bg-zinc-950">
        <div className="mt-[86px] w-[700px] h-[400px] relative z-0 overflow-hidden rounded-3xl shadow-2xl shadow-black">
          <img
            // src={CoverImage}
            src="/assets/cover.png"
            alt=""
            className="w-[700px] h-[400px] object-cover saturate-[120%]"
          />
          <div
            className="w-full h-[220px] z-10 bottom-0 left-0 right-0 absolute"
            style={{
              background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000 70%)`,
            }}
          />
        </div>
        <div className="mt-[-132px] z-10 flex flex-col items-center">
          <span className="text-[28px] text-slate-300">
            Frictionless Stablecoin Payments
          </span>
          <h1 className="text-5xl font-medium tracking-tight text-center text-zinc-50">
            <span className="text-zinc-200">with </span>
            <span className="inline-block">
              <span>FraxPay</span>
              <img
                src="/assets/frax.png"
                alt=""
                className="ml-1.5 inline-block w-12 h-12 mb-[-4px] align-bottom border-2 rounded-full shadow-xl border-slate-500/20 shadow-black/60"
              />
            </span>
          </h1>
          <button className="mt-4 bg-white hover:bg-slate-200 transition-colors font-semibold tracking-tight w-[180px] rounded-lg h-[52px]">
            Connect Wallet
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-0.5 py-7 bg-black">
        <p className="w-full text-lg italic text-center text-white">
          {`"Instant transactions, tangible as cash!"`}
        </p>
        <span className="text-sm text-center text-slate-600">
          Powered by the Frax Ecosystem
        </span>
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
