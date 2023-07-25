import { Redis } from '@upstash/redis';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const redis = new Redis({
  url: process.env.UPSTASH_URL as string,
  token: process.env.UPSTASH_TOKEN as string,
});

type FormItem = {
  enabled: boolean;
  required: boolean;
};
type ShippingInformationFormID = 'name' | 'email' | 'address' | 'phone';
type ShippingInformationForm = Record<ShippingInformationFormID, FormItem>;

export type Product = {
  name: string;
  price: string;
  shipping: ShippingInformationForm;
  imageURL: string;
  enabled: boolean;
  ownerAddress: string;
};

const formItemSchema = z.object({
  enabled: z.boolean(),
  required: z.boolean(),
});

const productSchema = z.object({
  name: z.string(),
  price: z.string(),
  shipping: z.object({
    name: formItemSchema,
    email: formItemSchema,
    address: formItemSchema,
    phone: formItemSchema,
  }),
  imageURL: z.string(),
  enabled: z.boolean(),
  ownerAddress: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  // 들어온 정보대로 새로운 payment link (product) 를 만듦. key는 랜덤 nanoid
  let productID = nanoid();
  const product: Product = req.body.product;

  // validate product with zod
  try {
    productSchema.parse(product);
  } catch (e) {
    res.status(400).json({
      success: false,
      message: `Bad request; ${e.message}`,
    });
    return;
  }

  let hasError: boolean = false;
  for (let i = 0; i < 3; i++) {
    try {
      await redis.set(productID, JSON.stringify(product));
      hasError = false;
      break;
    } catch (e) {
      console.log(e);
      productID = nanoid();
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
