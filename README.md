# ¤ FraxPay by Inevitable

**FraxPay** was built during the **Hackathon [FraxBuild 2023](https://dorahacks.io/hackathon/fraxbuild/track) under the Consumer Adoption Track**, enabling merchants and content creators to accept payments in Frax Stablecoins seamlessly. We have integrated Fraxswap into our smart contract-based payment gateway, thereby providing the option for users to pay with any token.

1. Payment Gateway (Done✅, Deployed to 🔴Optimism Mainnet) integrated with Fraxswap (WIP, Specs Present)
2. Dashboard
3. Payment Links with Easy-to-use Customer Onboarding
4. Frontend Widgets/SDK for FraxPay and Fraxswap

이런 오픈소스를 생태계에 제공 해서 꼭

## For Merchants

> Accept **Frax Stablecoins** with Ease, Simplify Payments with **Instant Payment Links**

In just a few seconds, you can generate payment links and start accepting cryptocurrency for your products. **For this hackathon, we limited the base token to FRAX.** However, its _contract is **versatile** and can accommodate Native Tokens, such as ETH, as well as any ERC20 Token._

First, input your product information(This example features the AirPods Max case from [artifact.supply](https://artifact.supply)). Then, add the price along with the necessary user information required for shipping and management.

As a merchant, you'll need to log in with your wallet. We implemented web3 Auth using [NextAuth](https://next-auth.js.org). Once logged in, you can generate payment information with no additional fees. This information is sent to an API which, in return, provides a `productID` associated with the created document. The IDs are not sequential and are designed to be URL-friendly, made possible by [nanoid](https://github.com/ai/nanoid/).

**Given our use of the stablecoin FRAX, we aim to establish a mental equivalence for users that 1 FRAX equals 1 USD. To further reinforce this concept, we have hidden the token symbol and replaced it with the dollar sign(`$`) and logo.**

### Screenshots

![](https://github.com/inevitable-dao/FraxPay/raw/main/.github/assets/landing.png?v=2)

> ^ Landing Page

![](https://github.com/inevitable-dao/FraxPay/raw/main/.github/assets/list.png?v=2)

> ^ Payment Link List

![](https://github.com/inevitable-dao/FraxPay/raw/main/.github/assets/create.png?v=2)

> ^ Creating a new Link

## For Users

![](https://github.com/inevitable-dao/FraxPay/raw/main/.github/assets/shipping-connect-1.png?v=2)
![](https://github.com/inevitable-dao/FraxPay/raw/main/.github/assets/shipping-connect-2.png?v=2)
![](https://github.com/inevitable-dao/FraxPay/raw/main/.github/assets/connect-wallet.png?v=2)
![](https://github.com/inevitable-dao/FraxPay/raw/main/.github/assets/insufficient-amount-swap.png?v=2)
![](https://github.com/inevitable-dao/FraxPay/raw/main/.github/assets/insufficient-amount-onramp.png?v=2)
![](https://github.com/inevitable-dao/FraxPay/raw/main/.github/assets/done.png?v=2)

## 🔴 Deployments

### FraxPay

- Optimism(`FraxPayCore`): `0x986ec2aeE73E21B28b29A2E040DDFfd839F6F07d`

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
