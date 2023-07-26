import { Redis } from '@upstash/redis';
import { Interface, JsonRpcProvider } from 'ethers';
import { NextApiRequest, NextApiResponse } from 'next';

// FIXME: Order definition path
import { Order } from './prepare';

const redis = new Redis({
  url: process.env.UPSTASH_URL as string,
  token: process.env.UPSTASH_TOKEN as string,
});

// FIXME:
const provider = new JsonRpcProvider('');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  // 들어온 order id로 쿼리, 없으면 404

  const productID = req.body.productID;
  const orderID = req.body.orderID;
  const key = `payment:${productID}:order:${orderID}`;
  const doc = await redis.get(key);
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
  const receipt = await provider.getTransactionReceipt(txHash);
  if (!receipt) {
    res.status(400).json({
      success: false,
      message: 'Invalid tx hash; Failed to retrieve receipt',
    });
    return;
  }

  // FIXME:
  const abi: any[] = [];
  const iface = new Interface(abi);
  const events = receipt.logs.map((log) => {
    try {
      return iface.parseLog(log as any);
    } catch (e) {
      return null;
    }
  });

  // FIXME: Fix event name
  const event = events.find((event) => {
    return event && event.name === 'Payment';
  });

  if (!event) {
    res
      .status(400)
      .json({ success: false, message: 'Invalid tx hash; Event not found' });
    return;
  }

  if (event.args.orderID !== order.id) {
    res
      .status(400)
      .json({ success: false, message: 'Invalid tx hash; Order ID mismatch' });
    return;
  }

  await redis.set(key, JSON.stringify({ ...order, txHash }));
  res.status(200).json({ success: true });
};

export default handler;
