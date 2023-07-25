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

  // 들어온 order id로 쿼리, 없으면 404
  // 들어온 tx hash로 쿼리, 이벤트 가져온 뒤에 해당 이벤트의 order id가 위의 order id와 같은지 확인
  // 같으면 해당 이벤트의 tx hash를 order에 저장
  // 다르면 400
};

export default handler;
