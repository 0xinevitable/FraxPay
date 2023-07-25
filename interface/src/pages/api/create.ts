import { Redis } from '@upstash/redis';
import { NextApiRequest, NextApiResponse } from 'next';

const redis = new Redis({
  url: process.env.UPSTASH_URL as string,
  token: process.env.UPSTASH_TOKEN as string,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  // 들어온 정보대로 새로운 payment link를 만듦. key는 랜덤 shortid https://github.com/dylang/shortid
};

export default handler;
