/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable @next/next/no-img-element */
import Haikunator from 'haikunator';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';
import React, { useState } from 'react';
import title from 'title';

import { PaymentLinkPreviewCard } from '@/components/PaymentLinkPreviewCard';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PRICE_ANIMATION_DURATION = 1_000;
const haikunator = new Haikunator({
  seed: 'custom-seed',
});

type Props = {
  randomDefaultName: string;
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const randomDefaultName = title(
    haikunator.haikunate({
      tokenLength: 0,
      delimiter: ' ',
    }),
  );

  return {
    props: {
      randomDefaultName,
    },
  };
};

const CreatePaymentLinkPage: NextPage<Props> = (props) => {
  const [name, setName] = useState<string>(props.randomDefaultName);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [price, setPrice] = useState<string>('');
  const currentAnimationPriceRef = useRef<number>(0);
  const currentAnimationTargetRef = useRef<number>(0);
  const [priceDisplay, setPriceDisplay] = useState<string>('');

  useEffect(() => {
    if (!nameInputRef.current) {
      return;
    }
    nameInputRef.current.select();
  }, []);

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

  const onChangePrice = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const strippedValue = inputValue.replace(/[^0-9.,]/g, '');

      setPrice(strippedValue);
    },
    [],
  );

  return (
    <div className="flex flex-col mt-[64px]">
      <div className="container flex w-full max-w-6xl gap-4 mx-auto mt-8">
        <Card className="relative flex-1 bg-gradient-to-b from-black to-zinc-800/30">
          <CardHeader className="flex flex-row items-center gap-3 pt-3 pb-5">
            <img
              alt=""
              src="/assets/rock.png"
              className="absolute w-10 h-10 -ml-3 -left-1 -top-4"
            />
            <CardTitle className="text-2xl text-slate-300">
              Create Payment Link
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label className="text-base font-medium text-slate-50">
                Name
              </Label>
              <Input
                ref={nameInputRef}
                className="text-2xl h-14"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-base font-medium text-slate-50">
                Price
              </Label>
              <Tabs defaultValue="1" value={price} onValueChange={setPrice}>
                <TabsList className="w-full h-12">
                  <TabsTrigger className="flex-1 text-lg" value="1">
                    $1
                  </TabsTrigger>
                  <TabsTrigger className="flex-1 text-lg" value="5">
                    $5
                  </TabsTrigger>
                  <TabsTrigger className="flex-1 text-lg" value="10">
                    $10
                  </TabsTrigger>
                  <TabsTrigger className="flex-1 text-lg" value="100">
                    $100
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Input
                className="text-2xl h-14"
                value={price}
                onChange={onChangePrice}
              />
            </div>
            <Link href="/pay">
              <Button>Create Link</Button>
            </Link>
          </CardContent>
        </Card>

        <PaymentLinkPreviewCard
          name={name}
          priceDisplay={priceDisplay}
          imageURL="/assets/package.jpg"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </div>
    </div>
  );
};

export default CreatePaymentLinkPage;
