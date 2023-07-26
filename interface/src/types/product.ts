import { z } from 'zod';

export type FormItem = {
  enabled: boolean;
  required: boolean;
};
export type ShippingInformationFormID = 'name' | 'email' | 'address' | 'phone';
export type ShippingInformationForm = Record<
  ShippingInformationFormID,
  FormItem
>;

export type Product = {
  name: string;
  price: string;
  shipping: ShippingInformationForm;
  description: string;
  imageURL: string;
  enabled: boolean;
  merchantAddress: string;
  paymentTokenAddress: string;
};

export const formItemSchema = z.object({
  enabled: z.boolean(),
  required: z.boolean(),
});

export const productSchema = z.object({
  name: z.string(),
  price: z.string(),
  shipping: z.object({
    name: formItemSchema,
    email: formItemSchema,
    address: formItemSchema,
    phone: formItemSchema,
  }),
  description: z.string(),
  imageURL: z.string(),
  enabled: z.boolean(),
  merchantAddress: z.string(),
  paymentTokenAddress: z.string(),
});
