/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IJackpot,
  IJackpotInterface,
} from "../../../../contracts/governance/TonicToken.sol/IJackpot";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "tradeEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IJackpot__factory {
  static readonly abi = _abi;
  static createInterface(): IJackpotInterface {
    return new utils.Interface(_abi) as IJackpotInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IJackpot {
    return new Contract(address, _abi, signerOrProvider) as IJackpot;
  }
}
