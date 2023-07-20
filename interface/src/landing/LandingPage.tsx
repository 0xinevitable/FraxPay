/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import React from 'react';

import { HeroSection } from './sections/HeroSection';

const LandingPage: NextPage = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <div className="flex flex-col items-center justify-center w-full gap-2 px-4 bg-black py-7">
        <p className="w-full text-lg italic leading-tight text-center text-white">
          {`"Instant transactions,`}{' '}
          <span className="inline-block">{`tangible as cash!"`}</span>
        </p>
        <span className="text-sm text-center text-slate-600">
          Powered by the Frax Ecosystem
        </span>
      </div>

      <section className="w-full max-w-6xl px-6 py-20 mx-auto">
        <span className="text-xl font-medium text-slate-400">
          For Merchants and Creators
        </span>
        <h2 className="mt-2 text-5xl font-medium leading-[1.18] text-zinc-50">
          Accept Frax Stablecoins <br />
          with Ease
        </h2>
      </section>

      <section className="w-full max-w-6xl px-6 py-20 mx-auto">
        <span className="text-xl font-medium text-slate-400">
          Simplify Payments with Instant Payment Links
        </span>
        <h2 className="mt-2 text-5xl font-medium leading-[1.18] text-zinc-50">
          Generate <br />
          Payment Links <br />
          in Seconds
        </h2>
      </section>
    </div>
  );
};

export default LandingPage;
