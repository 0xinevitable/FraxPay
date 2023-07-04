import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import 'solidity-coverage';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.10',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1_000_000,
      },
      metadata: {
        bytecodeHash: 'none',
      },
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
  },
};

export default config;
