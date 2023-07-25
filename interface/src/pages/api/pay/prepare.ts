import { Redis } from '@upstash/redis';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

const redis = new Redis({
  url: process.env.UPSTASH_URL as string,
  token: process.env.UPSTASH_TOKEN as string,
});

export type Order = {
  id: string;
  txHash: string | null;
};

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
    txHash: null,
  };

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
