import { ethers } from 'hardhat';

import { FraxPayCore__factory } from '@/typechain-types';

async function main() {
  const [deployer] = await ethers.getSigners();

  const FraxPayCoreFactory = (await ethers.getContractFactory(
    'FraxPayCore',
    deployer,
  )) as unknown as FraxPayCore__factory;

  const feeRecipient = deployer;
  const FraxPayCore = await FraxPayCoreFactory.deploy(feeRecipient, 5, 1_000); // 0.5% fee
  console.log('FraxPayCore deployed to:', await FraxPayCore.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
