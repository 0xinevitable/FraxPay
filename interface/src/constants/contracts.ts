export type ContractKeys = 'FraxPayCore' | 'FraxToken' | 'FraxSwapRouterV2';
export const Contracts = {
  FraxPayCore: '0x986ec2aeE73E21B28b29A2E040DDFfd839F6F07d'.toLowerCase(),
  FraxToken: '0x2E3D870790dC77A83DD1d18184Acc7439A53f475'.toLowerCase(),
  FraxSwapRouterV2: '0xB9A55F455e46e8D717eEA5E47D2c449416A0437F'.toLowerCase(),
} as Record<ContractKeys, `0x${string}`>;
