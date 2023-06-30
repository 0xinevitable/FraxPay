/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable @next/next/no-img-element */
import { Ghost } from 'lucide-react';
import { NextPage } from 'next';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CreatePaymentLinkPage: NextPage = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');

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
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <Button>Create Link</Button>
          </CardContent>
        </Card>
        <div className="flex-1 p-5 rounded-lg bg-zinc-900">
          <div className="flex flex-col gap-1">
            <span className="text-slate-400">{name || '-'}</span>
            <div className="flex items-end gap-2">
              <h1 className="text-6xl font-medium text-slate-300">{`$${
                price || '-'
              }`}</h1>
              <img
                src="/assets/frax.png"
                alt=""
                className="inline-block border-2 rounded-full shadow-xl w-14 h-14 border-slate-500/20 shadow-black/60"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePaymentLinkPage;
