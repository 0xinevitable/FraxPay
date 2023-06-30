/* eslint-disable @next/next/no-img-element */
export const HeroSection: React.FC = () => {
  return (
    <div className="relative z-0 flex flex-col items-center pb-8 overflow-hidden bg-zinc-95">
      <div className="mt-[86px] w-[700px] h-[400px] relative z-0 overflow-hidden rounded-3xl shadow-2xl shadow-black">
        <img
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
  );
};
