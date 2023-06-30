/* eslint-disable @next/next/no-img-element */
import React from 'react';

import { HeroSection } from './sections/HeroSection';

const HomePage = () => {
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
    </div>
  );
};

export default HomePage;
