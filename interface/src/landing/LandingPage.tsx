/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import React from 'react';

import { PaymentLinkPreviewCard } from '@/components/PaymentLinkPreviewCard';

import { HeroSection } from './sections/HeroSection';

const LandingPage: NextPage = () => {
  const priceDisplay = '60';

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

        <div className="flex justify-center w-full">
          <div className="relative w-full max-w-sm h-fit">
            <PaymentLinkPreviewCard
              name={'Test Artifact - .ERA .Max 002'}
              description="TEST ARTIFACT ™. Experimental brand in Seoul."
              priceDisplay={priceDisplay}
              imageURL="/assets/eva-max-002.jpg"
              imageRatio={1 / 1}
            />
            <div className="absolute bottom-0 left-0 right-0  bg-gradient-to-b from-[rgba(9,9,11,0)] to-[#09090B] h-[100px]" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
