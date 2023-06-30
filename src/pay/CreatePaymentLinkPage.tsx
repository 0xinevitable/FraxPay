/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable @next/next/no-img-element */
import { Ghost } from 'lucide-react';
import { NextPage } from 'next';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CreatePaymentLinkPage: NextPage = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  return (
    <div className="flex flex-col">
      <div className="container flex w-full max-w-6xl gap-4 mx-auto mt-8">
        <Card className="relative flex-1 bg-gradient-to-b from-black to-zinc-800/30">
          <CardHeader className="flex flex-row items-center gap-3 pt-3 pb-4">
            <img
              alt=""
              src="/assets/rock.png"
              className="absolute w-10 h-10 -ml-3 -left-1 -top-4"
            />
            <CardTitle className="text-2xl text-slate-300">
              Create Payment Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <Label>Price</Label>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
            <Button>Create Link</Button>
          </CardContent>
        </Card>
        <div className="flex-1 rounded-lg bg-zinc-900">
          <span className="text-slate-400">{name || '-'}</span>
          <div className="flex items-end gap-2">
            <h1 className="text-6xl font-medium text-slate-300">{`$${price}`}</h1>
            <img
              src="/assets/frax.png"
              alt=""
              className="inline-block border-2 rounded-full shadow-xl w-14 h-14 border-slate-500/20 shadow-black/60"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePaymentLinkPage;
