/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ITreasury,
  ITreasuryInterface,
} from "../../../../contracts/governance/TonicToken.sol/ITreasury";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "setTonic",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ITreasury__factory {
  static readonly abi = _abi;
  static createInterface(): ITreasuryInterface {
    return new utils.Interface(_abi) as ITreasuryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ITreasury {
    return new Contract(address, _abi, signerOrProvider) as ITreasury;
  }
}
