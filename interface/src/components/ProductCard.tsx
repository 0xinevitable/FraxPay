/* eslint-disable @next/next/no-img-element */
import { Separator } from '@/components/ui/separator';

import { AspectRatio } from './ui/aspect-ratio';

type ProductCardProps = {
  name: string;
  description?: string;
  priceDisplay: string;
  imageURL: string;
  imageRatio?: number;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  priceDisplay,
  imageURL,
  imageRatio = 16 / 9,
}) => (
  <div className="flex-1 overflow-hidden rounded-lg bg-zinc-900">
    <div className="w-full">
      <AspectRatio ratio={imageRatio} className="relative bg-black">
        <img
          alt=""
          src={imageURL}
          className="absolute top-0 bottom-0 left-0 right-0 object-cover w-full h-full"
        />
      </AspectRatio>
    </div>

    <div className="flex flex-col px-5 pt-5 pb-8">
      <div className="flex flex-col gap-1">
        <span className="text-slate-400">{name || '-'}</span>
        <div className="flex items-end gap-2">
          <h1 className="text-6xl font-medium text-slate-300">{`$${
            priceDisplay || '-'
          }`}</h1>
          <img
            src="/assets/frax.png"
            alt=""
            className="inline-block border-2 rounded-full shadow-xl w-14 h-14 border-slate-500/20 shadow-black/60"
          />
        </div>
      </div>

      <Separator className="my-6" />

      <p className="text-sm leading-relaxed text-slate-300">{description}</p>
    </div>
  </div>
);
