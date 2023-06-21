/* eslint-disable @next/next/no-img-element */
import { Landmark } from 'lucide-react';

type OnrampCardProps = {
  src: string;
  name: string;
};
export const OnrampCard: React.FC<OnrampCardProps> = ({ src, name }) => {
  return (
    <li className="px-5 py-4 bg-zinc-800 rounded-xl flex flex-col gap-2">
      <span className="flex items-center gap-2">
        <img src={src} alt={name} className="w-6 h-6 rounded-full" />
        <h3 className="text-slate-200 font-semibold text-lg">{name}</h3>
      </span>
      <span className="text-slate-400">
        Bank, Wire, and International Options
      </span>

      <div className="flex gap-2">
        <div className="flex flex-col gap-2 pr-6 text-slate-400">
          <span>Fees</span>
          <span className="flex items-center text-base h-[24px]">
            1.5% ~ 3.99%
          </span>
        </div>

        <div className="flex flex-col gap-2 pr-6 text-slate-400">
          <span>Methods</span>
          <span className="flex items-center text-base h-[24px]">
            <Landmark size={18} />
          </span>
        </div>
      </div>
    </li>
  );
};
