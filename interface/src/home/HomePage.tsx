/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable @next/next/no-img-element */
import { Ghost } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage: NextPage = () => {
  return (
    <div className="flex flex-col mt-[64px]">
      <div className="container flex flex-col w-full max-w-2xl gap-4 mx-auto mt-8">
        <Card className="relative flex-1 bg-gradient-to-b from-black to-zinc-800/30">
          <CardHeader className="flex flex-row items-center gap-3 pt-3 pb-4">
            <img
              alt=""
              src="/assets/rock.png"
              className="absolute w-10 h-10 -ml-3 -left-1 -top-4"
            />
            <CardTitle className="text-2xl text-slate-300">
              Your Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-2 px-6 py-10 rounded-xl shadow-2xl bg-zinc-900 shadow-zinc-950/40">
              <Ghost className="text-slate-50" size={36} />
              <h4 className="mt-2 text-xl font-semibold leading-tight text-center text-slate-50">
                List Empty
              </h4>
              <p className="text-sm leading-tight text-center text-slate-400">
                Make a new link to start receiving crypto payments!
              </p>
              <Link href="/pay/new">
                <Button className="mt-2">Create Link</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
