/* eslint-disable @next/next/no-img-element */
import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      <div className="relative z-0 flex flex-col items-center pb-8 overflow-hidden bg-zinc-95">
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
        <div className="mt-[-132px] z-10 flex flex-col items-center px-4">
          <span className="text-[28px] text-slate-300 text-center leading-none">
            Frictionless Stablecoin Payments
          </span>
          <h1 className="mt-3 text-5xl font-medium tracking-tight text-center text-zinc-50">
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
          <button className="mt-4 bg-white hover:bg-slate-200 transition-colors font-semibold tracking-tight w-[180px] rounded-lg h-[52px] shadow-lg shadow-white/40">
            Connect Wallet
          </button>
        </div>

        <div
          className="h-[200px] w-full -z-10 absolute bottom-0 left-0 right-0"
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #1b1b1e 70%)`,
          }}
        ></div>
      </div>
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
