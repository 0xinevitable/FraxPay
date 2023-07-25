import { Redis } from '@upstash/redis';
import { NextApiRequest, NextApiResponse } from 'next';

import { Product } from '@/types/product';

const redis = new Redis({
  url: process.env.UPSTASH_URL as string,
  token: process.env.UPSTASH_TOKEN as string,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  const productID = req.body.productID;
  let key = `product:${productID}`;

  const doc = await redis.get(key);
  let product: Product;
  try {
    if (typeof doc === 'string') {
      product = JSON.parse(doc);
    } else {
      product = doc as any;
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: `Internal server error; Failed to parse. Doc: ${doc}`,
    });
    return;
  }

  if (!product) {
    res.status(404).json({ success: false, message: 'Product not found' });
    return;
  }

  res.status(200).json({ success: true, product });
};

export default handler;
