export const FRAXPAY_CORE_ABI: any[] = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_feeRecipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_feeNumerator',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_feeDenominator',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transferAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'identifier',
        type: 'string',
      },
    ],
    name: 'ERC20Payment',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transferAmount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'identifier',
        type: 'string',
      },
    ],
    name: 'NativePayment',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transferAmount',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct FraxPayCore.RecipientAndAmount[]',
        name: 'splitData',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'identifier',
        type: 'string',
      },
    ],
    name: 'SplitERC20Payment',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'transferAmount',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        indexed: false,
        internalType: 'struct FraxPayCore.RecipientAndAmount[]',
        name: 'splitData',
        type: 'tuple[]',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'identifier',
        type: 'string',
      },
    ],
    name: 'SplitNativePayment',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'identifier',
        type: 'string',
      },
    ],
    name: 'erc20Payment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'identifier',
        type: 'string',
      },
    ],
    name: 'nativePayment',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        internalType: 'struct FraxPayCore.RecipientAndAmount[]',
        name: 'splitData',
        type: 'tuple[]',
      },
      {
        internalType: 'string',
        name: 'identifier',
        type: 'string',
      },
    ],
    name: 'splitERC20Payment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'recipient',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        internalType: 'struct FraxPayCore.RecipientAndAmount[]',
        name: 'splitData',
        type: 'tuple[]',
      },
      {
        internalType: 'string',
        name: 'identifier',
        type: 'string',
      },
    ],
    name: 'splitNativePayment',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];
