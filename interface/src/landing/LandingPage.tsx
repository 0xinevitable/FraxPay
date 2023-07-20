/* eslint-disable @next/next/no-img-element */
import { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';

import { ProductCard } from '@/components/ProductCard';

import { HeroSection } from './sections/HeroSection';

const PRICE_ANIMATION_DURATION = 1_000;
const ANIMATED_PRICE_DISPLAY_VALUES = [
  '60',
  '63.2',
  '112.04',
  '58.99',
  '138.2',
  '60.1',
  '63.99',
];

const LandingPage: NextPage = () => {
  const [price, setPrice] = useState<string>(ANIMATED_PRICE_DISPLAY_VALUES[0]);
  const [priceDisplay, setPriceDisplay] = useState<string>(
    ANIMATED_PRICE_DISPLAY_VALUES[0],
  );
  const currentAnimationPriceRef = useRef<number>(0);
  const currentAnimationTargetRef = useRef<number>(0);

  // FIXME: Duplicated code w/ CreatePaymentLinkPage
  useEffect(() => {
    let start = Number(currentAnimationPriceRef.current);
    const end = Number(price);
    currentAnimationTargetRef.current = end;
    const startTimestamp = performance.now();

    const fractionDigits = (price.split('.')[1] || '').length;
    const step = (timestamp: number) => {
      if (currentAnimationTargetRef.current !== end) {
        return;
      }
      const progress = Math.min(
        (timestamp - startTimestamp) / PRICE_ANIMATION_DURATION,
        1,
      );
      const current = start + (end - start) * progress;

      setPriceDisplay(
        current.toLocaleString('en-US', {
          minimumFractionDigits: fractionDigits,
          maximumFractionDigits: fractionDigits,
        }),
      );

      if (current !== end) {
        window.requestAnimationFrame(step);
      } else {
        currentAnimationPriceRef.current = Number(price);
      }
    };

    window.requestAnimationFrame(step);
  }, [price]);

  // change price every 3 seconds
  useEffect(() => {
    const callback = () =>
      setPrice((prev) => {
        const index = ANIMATED_PRICE_DISPLAY_VALUES.indexOf(prev);
        return ANIMATED_PRICE_DISPLAY_VALUES[
          (index + 1) % ANIMATED_PRICE_DISPLAY_VALUES.length
        ];
      });

    const interval = setInterval(callback, 2_000);
    return () => clearInterval(interval);
  }, []);

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
          Accept <br />
          Frax Stablecoins <br />
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
            <ProductCard
              name={'Test Artifact — .ERA .Max 002'}
              description="TEST ARTIFACT ™ — Experimental brand in Seoul."
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
