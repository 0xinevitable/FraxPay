import { Redis } from '@upstash/redis';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';

import { Product, productSchema } from '@/types/product';

const redis = new Redis({
  url: process.env.UPSTASH_URL as string,
  token: process.env.UPSTASH_TOKEN as string,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  // 들어온 정보대로 새로운 payment link (product) 를 만듦. key는 랜덤 nanoid
  let productID = nanoid();
  let key = `product:${productID}`;

  const product: Product = req.body.product;

  // validate product with zod
  try {
    productSchema.parse(product);
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: `Bad request; ${e.message}`,
    });
    return;
  }

  let hasError: boolean = false;
  for (let i = 0; i < 3; i++) {
    try {
      await redis.set(key, JSON.stringify(product));
      hasError = false;
      break;
    } catch (e) {
      console.log(e);

      productID = nanoid();
      key = `product:${productID}`;
      hasError = true;
    }
  }

  if (hasError) {
    res.status(500).json({
      success: false,
      message: `Internal server error; Failed to insert. Last productID: ${productID}`,
    });
    return;
  }
  res.status(200).json({ productID });
};

export default handler;
