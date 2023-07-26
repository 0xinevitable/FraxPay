import { Redis } from '@upstash/redis';
import { Interface, JsonRpcProvider } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';

import { FRAXPAY_CORE_ABI } from '@/lib/abi';
// FIXME: Order definition path
import { Order } from '@/types/order';

const redis = new Redis({
  url: process.env.UPSTASH_URL as string,
  token: process.env.UPSTASH_TOKEN as string,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  const provider = new JsonRpcProvider(
    `https://opt-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_OPTIMISM_ALCHEMY_API_KEY}`,
  );

  // 들어온 order id로 쿼리, 없으면 404

  const productID = req.body.productID;
  const orderID = req.body.orderID;
  const key = `payment:${productID}:order:${orderID}`;
  const doc = await redis.get(key);
  console.log({ doc });

  if (!doc) {
    res.status(404).json({ success: false, message: 'Not found' });
    return;
  }

  let order: Order;
  try {
    if (typeof doc === 'string') {
      order = JSON.parse(doc);
    } else {
      order = doc as any;
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: `Internal server error; Failed to parse. Doc: ${doc}`,
    });
    return;
  }

  // 들어온 tx hash로 쿼리, ethers 통해 이벤트 가져온 뒤에 해당 이벤트의 order id가 위의 order id와 같은지 확인

  const txHash = req.body.txHash;
  let receipt = await provider.getTransactionReceipt(txHash);
  if (!receipt) {
    // wait 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));
    receipt = await provider.getTransactionReceipt(txHash);
  }
  if (!receipt) {
    res.status(400).json({
      success: false,
      message: 'Invalid tx hash; Failed to retrieve receipt',
    });
    return;
  }

  const iface = new Interface(FRAXPAY_CORE_ABI);
  const events = receipt.logs.map((log) => {
    try {
      return iface.parseLog(log as any);
    } catch (e) {
      return null;
    }
  });

  // FIXME: Fix event name
  const event = events.find((event) => {
    return event && event.name === 'NativePayment';
  });
  console.log({ event });

  if (!event) {
    res
      .status(400)
      .json({ success: false, message: 'Invalid tx hash; Event not found' });
    return;
  }

  if (event.args[3] !== order.id) {
    res
      .status(400)
      .json({ success: false, message: 'Invalid tx hash; Order ID mismatch' });
    return;
  }

  await redis.set(key, JSON.stringify({ ...order, txHash }));
  res.status(200).json({ success: true });
};

export default handler;
