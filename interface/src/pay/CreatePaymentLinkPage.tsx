/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable @next/next/no-img-element */
import Haikunator from 'haikunator';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';
import React, { useState } from 'react';
import title from 'title';

import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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

type FormItem = {
  enabled: boolean;
  required: boolean;
};
type ShippingInformationFormID = 'name' | 'email' | 'address' | 'phone';
type ShippingInformationForm = Record<ShippingInformationFormID, FormItem>;

const defaultShippingInformationForm = {
  name: {
    enabled: true,
    required: false,
  },
  email: {
    enabled: true,
    required: true,
  },
  address: {
    enabled: true,
    required: false,
  },
  phone: {
    enabled: true,
    required: false,
  },
};

const CreatePaymentLinkPage: NextPage<Props> = (props) => {
  const [name, setName] = useState<string>(props.randomDefaultName);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [price, setPrice] = useState<string>('');
  const currentAnimationPriceRef = useRef<number>(0);
  const currentAnimationTargetRef = useRef<number>(0);
  const [priceDisplay, setPriceDisplay] = useState<string>('');

  const [shippingInfoForm, setShippingInfoForm] =
    useState<ShippingInformationForm>(defaultShippingInformationForm);
  const generateShippingInfoFormItemProps = useCallback(
    (id: ShippingInformationFormID) => ({
      id: id,
      enabled: shippingInfoForm[id].enabled,
      required: shippingInfoForm[id].required,
      onClickSelect: (status: boolean) => {
        setShippingInfoForm((prev) => ({
          ...prev,
          [id]: { ...prev[id], enabled: status },
        }));
      },
      onClickRequired: (status: boolean) => {
        setShippingInfoForm((prev) => ({
          ...prev,
          [id]: { ...prev[id], required: status },
        }));
      },
    }),
    [shippingInfoForm],
  );

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

            <div className="flex flex-col gap-4">
              <CheckboxItem
                name="Name"
                description="User Name"
                {...generateShippingInfoFormItemProps('name')}
              />
              <CheckboxItem
                name="Email"
                description="User Email"
                {...generateShippingInfoFormItemProps('email')}
              />
              <CheckboxItem
                name="Address"
                description="City, Country, and Address with ZIP/Postal Code"
                {...generateShippingInfoFormItemProps('address')}
              />
              <CheckboxItem
                name="Phone Number"
                description="Phone Number"
                {...generateShippingInfoFormItemProps('phone')}
              />
            </div>
            <Link href="/pay" className="w-fit">
              <Button>Create Link</Button>
            </Link>
          </CardContent>
        </Card>

        <ProductCard
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

type CheckboxItemProps = {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  required: boolean;
  onClickSelect: (status: boolean) => void;
  onClickRequired: (status: boolean) => void;
};
const CheckboxItem: React.FC<CheckboxItemProps> = ({
  id,
  name,
  description,
  enabled,
  required,
  onClickSelect,
  onClickRequired,
}) => (
  <div className="flex space-x-2 select-none items-top">
    <Switch
      id={id}
      checked={enabled}
      onCheckedChange={(value) => {
        if (!value) {
          onClickRequired(false);
        }
        onClickSelect(value);
      }}
    />
    <div className="grid gap-1.5 leading-none">
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {name}
      </label>

      <div className="flex">
        <Checkbox
          id={`${id}-required`}
          checked={required}
          onCheckedChange={(value) => {
            if (!!value) {
              onClickSelect(true);
            }
            onClickRequired(!!value);
          }}
        />
        <label
          htmlFor={`${id}-required`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Required
        </label>
      </div>
      <p className="text-sm text-muted-foreground text-slate-500">
        {description}
      </p>
    </div>
  </div>
);
