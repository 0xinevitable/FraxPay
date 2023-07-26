import { z } from 'zod';

import { ShippingInformationFormID } from './product';

export type OrderShippingInfo = Record<
  ShippingInformationFormID | 'zip' | 'city' | 'country',
  string | null
>;
export type Order = {
  id: string;
  shippingInfo: OrderShippingInfo;
  txHash: string | null;
};

export const orderSchema = z.object({
  id: z.string(),
  shippingInfo: z.object({
    name: z.string().nullable(),
    email: z.string().nullable(),
    address: z.string().nullable(),
    phone: z.string().nullable(),
    zip: z.string().nullable(),
    city: z.string().nullable(),
    country: z.string().nullable(),
  }),
  txHash: z.string().nullable(),
});
