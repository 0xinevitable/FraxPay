/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ITonicDistributor,
  ITonicDistributorInterface,
} from "../../../../contracts/swap/MiningTreasury.sol/ITonicDistributor";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    name: "setClsRewardRatio",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ITonicDistributor__factory {
  static readonly abi = _abi;
  static createInterface(): ITonicDistributorInterface {
    return new utils.Interface(_abi) as ITonicDistributorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ITonicDistributor {
    return new Contract(address, _abi, signerOrProvider) as ITonicDistributor;
  }
}