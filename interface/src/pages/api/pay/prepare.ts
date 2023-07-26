import { Redis } from '@upstash/redis';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { Order, orderSchema } from '@/types/order';

const redis = new Redis({
  url: process.env.UPSTASH_URL as string,
  token: process.env.UPSTASH_TOKEN as string,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  // redis 에 uuid와 req로 들어온 data로 order 만들고, txHash null 로 설정함. 생성된 order id 를 response 로 보내준다.
  const productID = req.body.productID;
  const orderID = uuidv4();

  const key = `payment:${productID}:order:${orderID}`;

  const order: Order = {
    id: orderID,
    shippingInfo: req.body.shippingInfo,
    txHash: null,
  };

  try {
    orderSchema.parse(order);
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: `Bad request; ${e.message}`,
    });
    return;
  }

  try {
    await redis.set(key, JSON.stringify(order));
    res.status(200).json({ orderID });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: `Internal server error; Failed to insert. Key: ${key}`,
    });
    return;
  }
};

export default handler;
