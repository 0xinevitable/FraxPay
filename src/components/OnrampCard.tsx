/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx';
import { Landmark } from 'lucide-react';

type FieldItemProps = {
  field: React.ReactNode;
  children?: React.ReactNode;
};
export const FieldItem: React.FC<FieldItemProps> = ({ field, children }) => {
  return (
    <div className="flex flex-col gap-1 pr-6">
      <span className="font-medium text-sm text-slate-300">{field}</span>
      <span className="flex items-center text-base text-slate-200 font-bold h-[24px]">
        {children}
      </span>
    </div>
  );
};

type OnrampCardProps = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
> & {
  src: string;
  name: string;
};
export const OnrampCard: React.FC<OnrampCardProps> = ({
  src,
  name,
  className,
  ...props
}) => {
  return (
    <li
      className={clsx(
        'px-5 py-4 bg-zinc-800 rounded-xl flex flex-col gap-2 transition-all cursor-pointer',
        'hover:bg-zinc-700/60 hover:translate-y-[-16px] hover:backdrop-blur-sm hover:shadow-2xl hover:shadow-black/40 hover:z-30',
        className,
      )}
      {...props}
    >
      <span className="flex items-center gap-2">
        <img src={src} alt={name} className="w-6 h-6 rounded-full" />
        <h3 className="text-slate-100 font-bold text-lg">{name}</h3>
      </span>
      <span className="text-slate-400">
        Bank, Wire, and International Options
      </span>

      <div className="flex gap-2">
        <FieldItem field="Fees">1.5% ~ 3.99%</FieldItem>
        <FieldItem field="Methods">
          <Landmark size={18} />
        </FieldItem>
      </div>
    </li>
  );
};
