/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable @next/next/no-img-element */
import { Ghost } from 'lucide-react';
import { NextPage } from 'next';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CreatePaymentLinkPage: NextPage = () => {
  return (
    <div className="flex flex-col">
      <div className="container flex flex-col w-full max-w-3xl gap-4 mx-auto mt-8">
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
            <Input />
            <Label>Price</Label>
            <Input />
            <Button>Create Link</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreatePaymentLinkPage;
