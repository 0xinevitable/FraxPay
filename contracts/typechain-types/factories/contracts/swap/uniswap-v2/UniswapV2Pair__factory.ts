/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  UniswapV2Pair,
  UniswapV2PairInterface,
} from "../../../../contracts/swap/uniswap-v2/UniswapV2Pair";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Burn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "Mint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1In",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Swap",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve0",
        type: "uint112",
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve1",
        type: "uint112",
      },
    ],
    name: "Sync",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINIMUM_LIQUIDITY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "burn",
    outputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReserves",
    outputs: [
      {
        internalType: "uint112",
        name: "_reserve0",
        type: "uint112",
      },
      {
        internalType: "uint112",
        name: "_reserve1",
        type: "uint112",
      },
      {
        internalType: "uint32",
        name: "_blockTimestampLast",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token1",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "kLast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "price0CumulativeLast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price1CumulativeLast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "skim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sync",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token0",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token1",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040526001600c5534801561001557600080fd5b5060408051808201825260088152670546f6e6963204c560c41b6020918201528151808301835260018152603160f81b9082015281517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818301527ffe29fbd2c5253d79a654ed81557908904da248d1ada8d5ed93d20192eae8daf7818401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a0808301919091528351808303909101815260c09091019092528151910120600355600580546001600160a01b03191633179055612be6806101066000396000f3fe608060405234801561001057600080fd5b50600436106101b95760003560e01c80636a627842116100f9578063ba9a7a5611610097578063d21220a711610071578063d21220a71461049b578063d505accf146104bb578063dd62ed3e146104ce578063fff6cae9146104f957600080fd5b8063ba9a7a561461045f578063bc25cf7714610468578063c45a01551461047b57600080fd5b80637ecebe00116100d35780637ecebe00146103c857806389afcb44146103e857806395d89b4114610410578063a9059cbb1461044c57600080fd5b80636a6278421461038c57806370a082311461039f5780637464fc3d146103bf57600080fd5b806323b872dd116101665780633644e515116101405780633644e5151461035e578063485cc955146103675780635909c0d51461037a5780635a3d54931461038357600080fd5b806323b872dd1461030a57806330adf81f1461031d578063313ce5671461034457600080fd5b8063095ea7b311610197578063095ea7b31461028b5780630dfe1681146102ae57806318160ddd146102f357600080fd5b8063022c0d9f146101be57806306fdde03146101d35780630902f1ac14610225575b600080fd5b6101d16101cc3660046126cd565b610501565b005b61020f6040518060400160405280600881526020017f546f6e6963204c5000000000000000000000000000000000000000000000000081525081565b60405161021c9190612793565b60405180910390f35b600854604080516dffffffffffffffffffffffffffff80841682526e01000000000000000000000000000084041660208201527c010000000000000000000000000000000000000000000000000000000090920463ffffffff169082015260600161021c565b61029e6102993660046127e4565b610c71565b604051901515815260200161021c565b6006546102ce9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161021c565b6102fc60005481565b60405190815260200161021c565b61029e610318366004612810565b610c87565b6102fc7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b61034c601281565b60405160ff909116815260200161021c565b6102fc60035481565b6101d1610375366004612851565b610d61565b6102fc60095481565b6102fc600a5481565b6102fc61039a36600461288a565b610e35565b6102fc6103ad36600461288a565b60016020526000908152604090205481565b6102fc600b5481565b6102fc6103d636600461288a565b60046020526000908152604090205481565b6103fb6103f636600461288a565b611211565b6040805192835260208301919091520161021c565b61020f6040518060400160405280600881526020017f544f4e49432d4c5000000000000000000000000000000000000000000000000081525081565b61029e61045a3660046127e4565b6116c8565b6102fc6103e881565b6101d161047636600461288a565b6116d5565b6005546102ce9073ffffffffffffffffffffffffffffffffffffffff1681565b6007546102ce9073ffffffffffffffffffffffffffffffffffffffff1681565b6101d16104c93660046128a7565b611897565b6102fc6104dc366004612851565b600260209081526000928352604080842090915290825290205481565b6101d1611b82565b600c54600114610572576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f556e697377617056323a204c4f434b454400000000000000000000000000000060448201526064015b60405180910390fd5b6000600c55841515806105855750600084115b610611576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f556e697377617056323a20494e53554646494349454e545f4f55545055545f4160448201527f4d4f554e540000000000000000000000000000000000000000000000000000006064820152608401610569565b60008061066d6008546dffffffffffffffffffffffffffff808216926e01000000000000000000000000000083049091169163ffffffff7c01000000000000000000000000000000000000000000000000000000009091041690565b5091509150816dffffffffffffffffffffffffffff16871080156106a05750806dffffffffffffffffffffffffffff1686105b61072c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f556e697377617056323a20494e53554646494349454e545f4c4951554944495460448201527f59000000000000000000000000000000000000000000000000000000000000006064820152608401610569565b600654600754600091829173ffffffffffffffffffffffffffffffffffffffff91821691908116908916821480159061079157508073ffffffffffffffffffffffffffffffffffffffff168973ffffffffffffffffffffffffffffffffffffffff1614155b6107f7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f556e697377617056323a20494e56414c49445f544f00000000000000000000006044820152606401610569565b8a1561080857610808828a8d611d4e565b891561081957610819818a8c611d4e565b86156108ac576040517f10d1e85c00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8a16906310d1e85c906108799033908f908f908e908e9060040161291e565b600060405180830381600087803b15801561089357600080fd5b505af11580156108a7573d6000803e3d6000fd5b505050505b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa158015610916573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061093a9190612996565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015290945073ffffffffffffffffffffffffffffffffffffffff8216906370a0823190602401602060405180830381865afa1580156109a7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109cb9190612996565b92505050600089856dffffffffffffffffffffffffffff166109ed91906129de565b83116109fa576000610a1e565b610a148a6dffffffffffffffffffffffffffff87166129de565b610a1e90846129de565b90506000610a3c8a6dffffffffffffffffffffffffffff87166129de565b8311610a49576000610a6d565b610a638a6dffffffffffffffffffffffffffff87166129de565b610a6d90846129de565b90506000821180610a7e5750600081115b610b09576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f556e697377617056323a20494e53554646494349454e545f494e5055545f414d60448201527f4f554e54000000000000000000000000000000000000000000000000000000006064820152608401610569565b6000610b168360036129f5565b610b22866103e86129f5565b610b2c91906129de565b90506000610b3b8360036129f5565b610b47866103e86129f5565b610b5191906129de565b9050610b706dffffffffffffffffffffffffffff808916908a166129f5565b610b7d90620f42406129f5565b610b8782846129f5565b1015610bef576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f556e697377617056323a204b00000000000000000000000000000000000000006044820152606401610569565b5050610bfd84848888611eee565b60408051838152602081018390529081018c9052606081018b905273ffffffffffffffffffffffffffffffffffffffff8a169033907fd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d8229060800160405180910390a350506001600c55505050505050505050565b6000610c7e3384846121ca565b50600192915050565b73ffffffffffffffffffffffffffffffffffffffff831660009081526002602090815260408083203384529091528120547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff14610d4c5773ffffffffffffffffffffffffffffffffffffffff84166000908152600260209081526040808320338452909152902054610d1a9083906129de565b73ffffffffffffffffffffffffffffffffffffffff851660009081526002602090815260408083203384529091529020555b610d57848484612239565b5060019392505050565b60055473ffffffffffffffffffffffffffffffffffffffff163314610de2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f556e697377617056323a20464f5242494444454e0000000000000000000000006044820152606401610569565b6006805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff00000000000000000000000000000000000000009182161790915560078054929093169116179055565b6000600c54600114610ea3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f556e697377617056323a204c4f434b45440000000000000000000000000000006044820152606401610569565b6000600c819055600854600654604080517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015290516dffffffffffffffffffffffffffff808516956e01000000000000000000000000000090950416939273ffffffffffffffffffffffffffffffffffffffff16916370a082319160248083019260209291908290030181865afa158015610f49573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f6d9190612996565b6007546040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015291925060009173ffffffffffffffffffffffffffffffffffffffff909116906370a0823190602401602060405180830381865afa158015610fe1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110059190612996565b905060006110236dffffffffffffffffffffffffffff8616846129de565b905060006110416dffffffffffffffffffffffffffff8616846129de565b9050600061104f8787612308565b6000549091508061108d576103e861106f61106a85876129f5565b612475565b61107991906129de565b985061108860006103e86124e5565b6110e2565b6110df6dffffffffffffffffffffffffffff89166110ab83876129f5565b6110b59190612a61565b6dffffffffffffffffffffffffffff89166110d084876129f5565b6110da9190612a61565b612590565b98505b60008911611172576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f556e697377617056323a20494e53554646494349454e545f4c4951554944495460448201527f595f4d494e5445440000000000000000000000000000000000000000000000006064820152608401610569565b61117c8a8a6124e5565b61118886868a8a611eee565b81156111c3576008546111bf906dffffffffffffffffffffffffffff6e0100000000000000000000000000008204811691166129f5565b600b555b604080518581526020810185905233917f4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f910160405180910390a250506001600c5550949695505050505050565b600080600c54600114611280576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f556e697377617056323a204c4f434b45440000000000000000000000000000006044820152606401610569565b6000600c819055600854600654600754604080517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015290516dffffffffffffffffffffffffffff808616966e010000000000000000000000000000909604169473ffffffffffffffffffffffffffffffffffffffff94851694909316929184916370a08231916024808201926020929091908290030181865afa158015611332573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113569190612996565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015290915060009073ffffffffffffffffffffffffffffffffffffffff8416906370a0823190602401602060405180830381865afa1580156113c6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113ea9190612996565b306000908152600160205260408120549192506114078888612308565b6000549091508061141886856129f5565b6114229190612a61565b9a508061142f85856129f5565b6114399190612a61565b995060008b11801561144b575060008a115b6114d7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f556e697377617056323a20494e53554646494349454e545f4c4951554944495460448201527f595f4255524e45440000000000000000000000000000000000000000000000006064820152608401610569565b6114e130846125a8565b6114ec878d8d611d4e565b6114f7868d8c611d4e565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8816906370a0823190602401602060405180830381865afa158015611561573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115859190612996565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015290955073ffffffffffffffffffffffffffffffffffffffff8716906370a0823190602401602060405180830381865afa1580156115f2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116169190612996565b935061162485858b8b611eee565b811561165f5760085461165b906dffffffffffffffffffffffffffff6e0100000000000000000000000000008204811691166129f5565b600b555b604080518c8152602081018c905273ffffffffffffffffffffffffffffffffffffffff8e169133917fdccd412f0b1252819cb1fd330b93224ca42612892bb3f4f789976e6d81936496910160405180910390a35050505050505050506001600c81905550915091565b6000610c7e338484612239565b600c54600114611741576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f556e697377617056323a204c4f434b45440000000000000000000000000000006044820152606401610569565b6000600c556006546007546008546040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff938416939092169161180d91849186916dffffffffffffffffffffffffffff169083906370a08231906024015b602060405180830381865afa1580156117da573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117fe9190612996565b61180891906129de565b611d4e565b6008546040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015261188d91839186916e01000000000000000000000000000090046dffffffffffffffffffffffffffff169073ffffffffffffffffffffffffffffffffffffffff8416906370a08231906024016117bd565b50506001600c5550565b42841015611901576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f556e697377617056323a204558504952454400000000000000000000000000006044820152606401610569565b60035473ffffffffffffffffffffffffffffffffffffffff8816600090815260046020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b91908761196183612a75565b9091555060408051602081019690965273ffffffffffffffffffffffffffffffffffffffff94851690860152929091166060840152608083015260a082015260c0810187905260e00160405160208183030381529060405280519060200120604051602001611a029291907f190100000000000000000000000000000000000000000000000000000000000081526002810192909252602282015260420190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa158015611a8b573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff811615801590611b0657508873ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b611b6c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f556e697377617056323a20494e56414c49445f5349474e4154555245000000006044820152606401610569565b611b778989896121ca565b505050505050505050565b600c54600114611bee576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f556e697377617056323a204c4f434b45440000000000000000000000000000006044820152606401610569565b6000600c556006546040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152611d479173ffffffffffffffffffffffffffffffffffffffff16906370a0823190602401602060405180830381865afa158015611c63573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c879190612996565b6007546040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff909116906370a0823190602401602060405180830381865afa158015611cf5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d199190612996565b6008546dffffffffffffffffffffffffffff808216916e010000000000000000000000000000900416611eee565b6001600c55565b604080518082018252601981527f7472616e7366657228616464726573732c75696e743235362900000000000000602091820152815173ffffffffffffffffffffffffffffffffffffffff85811660248301526044808301869052845180840390910181526064909201845291810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb0000000000000000000000000000000000000000000000000000000017905291516000928392871691611e159190612aae565b6000604051808303816000865af19150503d8060008114611e52576040519150601f19603f3d011682016040523d82523d6000602084013e611e57565b606091505b5091509150818015611e81575080511580611e81575080806020019051810190611e819190612aca565b611ee7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f556e697377617056323a205452414e534645525f4641494c45440000000000006044820152606401610569565b5050505050565b6dffffffffffffffffffffffffffff8411801590611f1a57506dffffffffffffffffffffffffffff8311155b611f80576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f556e697377617056323a204f564552464c4f57000000000000000000000000006044820152606401610569565b6000611f9164010000000042612aec565b600854909150600090611fca907c0100000000000000000000000000000000000000000000000000000000900463ffffffff1683612b00565b905060008163ffffffff16118015611ff157506dffffffffffffffffffffffffffff841615155b801561200c57506dffffffffffffffffffffffffffff831615155b156120da578063ffffffff16612049856120258661265b565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff169061268c565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1661207191906129f5565b600960008282546120829190612b25565b909155505063ffffffff811661209b846120258761265b565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff166120c391906129f5565b600a60008282546120d49190612b25565b90915550505b6008805463ffffffff84167c0100000000000000000000000000000000000000000000000000000000027bffffffffffffffffffffffffffffffffffffffffffffffffffffffff6dffffffffffffffffffffffffffff8981166e0100000000000000000000000000009081027fffffffff000000000000000000000000000000000000000000000000000000009095168c83161794909417918216831794859055604080519382169282169290921783529290930490911660208201527f1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1910160405180910390a1505050505050565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff831660009081526001602052604090205461226a9082906129de565b73ffffffffffffffffffffffffffffffffffffffff80851660009081526001602052604080822093909355908416815220546122a7908290612b25565b73ffffffffffffffffffffffffffffffffffffffff80841660008181526001602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061222c9085815260200190565b600080600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663017e7e586040518163ffffffff1660e01b8152600401602060405180830381865afa158015612378573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061239c9190612b3d565b600b5473ffffffffffffffffffffffffffffffffffffffff821615801594509192509061246157801561245c5760006123eb61106a6dffffffffffffffffffffffffffff8088169089166129f5565b905060006123f883612475565b90508082111561245957600061240e82846129de565b60005461241b91906129f5565b905060008261242b8560056129f5565b6124359190612b25565b905060006124438284612a61565b905080156124555761245587826124e5565b5050505b50505b61246d565b801561246d576000600b555b505092915050565b600060038211156124d6575080600061248f600283612a61565b61249a906001612b25565b90505b818110156124d0579050806002816124b58186612a61565b6124bf9190612b25565b6124c99190612a61565b905061249d565b50919050565b81156124e0575060015b919050565b806000546124f39190612b25565b600090815573ffffffffffffffffffffffffffffffffffffffff8316815260016020526040902054612526908290612b25565b73ffffffffffffffffffffffffffffffffffffffff83166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906125849085815260200190565b60405180910390a35050565b600081831061259f57816125a1565b825b9392505050565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600160205260409020546125d99082906129de565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600160205260408120919091555461260e9082906129de565b600090815560405182815273ffffffffffffffffffffffffffffffffffffffff8416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001612584565b60006126866e0100000000000000000000000000006dffffffffffffffffffffffffffff8416612b5a565b92915050565b60006125a16dffffffffffffffffffffffffffff831684612b9e565b73ffffffffffffffffffffffffffffffffffffffff811681146126ca57600080fd5b50565b6000806000806000608086880312156126e557600080fd5b853594506020860135935060408601356126fe816126a8565b9250606086013567ffffffffffffffff8082111561271b57600080fd5b818801915088601f83011261272f57600080fd5b81358181111561273e57600080fd5b89602082850101111561275057600080fd5b9699959850939650602001949392505050565b60005b8381101561277e578181015183820152602001612766565b8381111561278d576000848401525b50505050565b60208152600082518060208401526127b2816040850160208701612763565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b600080604083850312156127f757600080fd5b8235612802816126a8565b946020939093013593505050565b60008060006060848603121561282557600080fd5b8335612830816126a8565b92506020840135612840816126a8565b929592945050506040919091013590565b6000806040838503121561286457600080fd5b823561286f816126a8565b9150602083013561287f816126a8565b809150509250929050565b60006020828403121561289c57600080fd5b81356125a1816126a8565b600080600080600080600060e0888a0312156128c257600080fd5b87356128cd816126a8565b965060208801356128dd816126a8565b95506040880135945060608801359350608088013560ff8116811461290157600080fd5b9699959850939692959460a0840135945060c09093013592915050565b73ffffffffffffffffffffffffffffffffffffffff8616815284602082015283604082015260806060820152816080820152818360a0830137600081830160a090810191909152601f9092017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0160101949350505050565b6000602082840312156129a857600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000828210156129f0576129f06129af565b500390565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612a2d57612a2d6129af565b500290565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600082612a7057612a70612a32565b500490565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612aa757612aa76129af565b5060010190565b60008251612ac0818460208701612763565b9190910192915050565b600060208284031215612adc57600080fd5b815180151581146125a157600080fd5b600082612afb57612afb612a32565b500690565b600063ffffffff83811690831681811015612b1d57612b1d6129af565b039392505050565b60008219821115612b3857612b386129af565b500190565b600060208284031215612b4f57600080fd5b81516125a1816126a8565b60007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff80831681851681830481118215151615612b9557612b956129af565b02949350505050565b60007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff80841680612bcd57612bcd612a32565b9216919091049291505056fea164736f6c634300080a000a";

type UniswapV2PairConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UniswapV2PairConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UniswapV2Pair__factory extends ContractFactory {
  constructor(...args: UniswapV2PairConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<UniswapV2Pair> {
    return super.deploy(overrides || {}) as Promise<UniswapV2Pair>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): UniswapV2Pair {
    return super.attach(address) as UniswapV2Pair;
  }
  override connect(signer: Signer): UniswapV2Pair__factory {
    return super.connect(signer) as UniswapV2Pair__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UniswapV2PairInterface {
    return new utils.Interface(_abi) as UniswapV2PairInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniswapV2Pair {
    return new Contract(address, _abi, signerOrProvider) as UniswapV2Pair;
  }
}
