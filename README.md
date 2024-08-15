# ¤ FraxPay by Inevitable

**FraxPay** was built during the **Hackathon [FraxBuild 2023](https://dorahacks.io/hackathon/fraxbuild/track) under the Consumer Adoption Track**, enabling merchants and content creators to accept payments in Frax Stablecoins seamlessly. We have integrated Fraxswap into our smart contract-based payment gateway, thereby providing the option for users to pay with any token.

1. Payment Gateway (Done✅, Deployed to 🔴Optimism Mainnet) integrated with Fraxswap
2. Dashboard
3. Payment Links with Easy-to-use Customer Onboarding
4. Frontend Widgets/SDK for FraxPay and Fraxswap

**The primary goal of this project is to offer an open-source solution that can be used within the ecosystem. This means that even if it's not our front-end distribution or service, anyone who needs to integrate crypto payments into their product can easily do so using FraxPay's open-source code, facilitating payments with the FRAX Stablecoin.**
The code is fully available on [GitHub](https://github.com/0xinevitable/FraxPay) under the LGPL-3.0 license. Drop a star in our repo if you liked it!

## Contents

- [🛍️ For Merchants](#for-merchants)
- [🚗 For Users](#for-users)

## For Merchants

> Accept **Frax Stablecoins** with Ease, Simplify Payments with **Instant Payment Links**

In just a few seconds, you can generate payment links and start accepting cryptocurrency for your products. **For this hackathon, we limited the base token to FRAX.** However, its _contract is **versatile** and can accommodate Native Tokens, such as ETH, as well as any ERC20 Token._

First, input your product information(This example features the AirPods Max case from [artifact.supply](https://artifact.supply)). Then, add the price along with the necessary user information required for shipping and management.

As a merchant, you'll need to log in with your wallet. We implemented web3 Auth using [NextAuth](https://next-auth.js.org). Once logged in, you can generate payment information with no additional fees. This information is sent to an API which, in return, provides a `productID` associated with the created document. The IDs are not sequential and are designed to be URL-friendly, made possible by [nanoid](https://github.com/ai/nanoid/).

**Given our use of the stablecoin FRAX, we aim to establish a mental equivalence for users that 1 FRAX equals 1 USD. To further reinforce this concept, we have hidden the token symbol and replaced it with the dollar sign(`$`) and logo.**

### Screenshots

![FraxPay - Landing](https://github.com/0xinevitable/FraxPay/raw/main/.github/assets/landing.png?v=2)

> ^ Landing Page

![FraxPay - Payment Link List](https://github.com/0xinevitable/FraxPay/raw/main/.github/assets/list.png?v=2)

> ^ Payment Link List

![FraxyPay- New Payment Link Form](https://github.com/0xinevitable/FraxPay/raw/main/.github/assets/create.png?v=2)

> ^ Creating a new Payment Link

## For Users

Users can visit `/pay/${productID}` to view product details and pay with FRAX. We've constructed the entire UI components library using [shadcn/ui](https://ui.shadcn.com), TailwindCSS, and modifications of some open-source packages.

The payment process involves the following steps:

1. **Input Payment Information**: Users start by entering their payment details.
2. **Connect Wallet**: Connection to the wallet is enabled using multiple browser providers, with the help of Wagmi.
3. **Pay with FRAX**: Finally, users can complete their payment using FRAX.

Additional details regarding the payment process include:

- We verify both FRAX Balance and Allowance.
- **If users have insufficient balance compared to the product price, we render a _Top Up Frax_ view. This view enables users to swap other tokens for payment (by utilizing `FraxSwapRouterV2`), while ensuring the merchant still receives FRAX, or connect to multiple on-ramp services.**
- In case of sufficient funds, users can simply pay via our smart contract by invoking `erc20Payment`(or `nativePayment`, but it's currently disabled — we accept only FRAX!) with the `productID` and pre-server-generated `orderID`. Payments to the merchant occur in real-time within the function, based on the verified amount in the backend.

![FraxPay - Input Shipping Info](https://github.com/0xinevitable/FraxPay/raw/main/.github/assets/shipping-connect-1.png?v=2)

> Input Shipping Information. _Supported values: Name, Email, Address(Country, City, Street Address and ZIP/Postal Code), Phone Number_

![FraxPay - Connect Wallet(Example: Coinbase Wallet Provider)](https://github.com/0xinevitable/FraxPay/raw/main/.github/assets/shipping-connect-2.png?v=2)

> Connect Wallet (Example: Coinbase Wallet Provider)

![FraxPay - Wallet Connected](https://github.com/0xinevitable/FraxPay/raw/main/.github/assets/connect-wallet.png?v=2)

> Wallet Connected View: We display the same avatar as MetaMask for easy distinction, ensuring user safety. 😆

![FraxPay - Insufficient Balance: Swap with `FraxSwapRouterV2`](https://github.com/0xinevitable/FraxPay/raw/main/.github/assets/insufficient-amount-swap.png?v=2)

> Insufficient Balance: Swap with `FraxSwapRouterV2`

![FraxPay - Insufficient Balance: Onramp](https://github.com/0xinevitable/FraxPay/raw/main/.github/assets/insufficient-amount-onramp.png?v=2)

> Insufficient Balance: Onramp. \_Options: [Stably](https://stably.io/) and [Transak](https://transak.com/).\_

![FraxPay - Done](https://github.com/0xinevitable/FraxPay/raw/main/.github/assets/done.png?v=2)

> Done! 🎉

## 🔴 Deployments

### FraxPay

- Optimism(`FraxPayCore`): `0x986ec2aeE73E21B28b29A2E040DDFfd839F6F07d`
- Optimism(`FraxPayPeriphery`): WIP

### Ecosystem

- Optimism(`Frax Token`): `0x2E3D870790dC77A83DD1d18184Acc7439A53f475`
- Optimism(`FraxSwapRouterV2`): `0xB9A55F455e46e8D717eEA5E47D2c449416A0437F`

## 🛠️ Contributing

### Setup Environment Variables

```conf
# contracts/.env
PRIVATE_KEY=
```

```conf
# interface/.env
JWT_SECRET=
NEXT_AUTH_SECRET=
UPSTASH_URL=
UPSTASH_TOKEN=
NEXT_PUBLIC_SIGNIN_MESSAGE="Sign In to FraxPay"
NEXT_PUBLIC_OPTIMISM_ALCHEMY_API_KEY=
```

### Run!

```bash
# install dependencies
yarn
```

```bash
# start frontend dev server
yarn workspace interface dev
```
