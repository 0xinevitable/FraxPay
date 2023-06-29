/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { ChevronsRight } from 'lucide-react';
import React from 'react';

import { OnrampCard } from '@/components/OnrampCard';

const HomePage = () => {
  return (
    <div className="h-full bg-zinc-950">
      <h1 className="mt-[160px] text-4xl font-bold text-center text-zinc-50">
        <span className="text-3xl text-zinc-300">
          Frictionless Stablecoin Payments
        </span>
        <br />
        <span className="text-zinc-200">with </span>
        <span className="inline-block">
          <span>FraxPay</span>
          <img
            src="/assets/frax.png"
            alt=""
            className="ml-1 inline-block w-8 h-8 mb-[3px] align-bottom border-2 rounded-full shadow-xl border-slate-500/20 shadow-black/60"
          />
        </span>
      </h1>
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
