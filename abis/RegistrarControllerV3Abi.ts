export const RegistrarControllerV3Abi = [
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'string', name: 'label', type: 'string' },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'labelhash',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'baseCost',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'premium',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'expires',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'referrer',
        type: 'bytes32',
      },
    ],
    name: 'NameRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'string', name: 'label', type: 'string' },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'labelhash',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cost',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'expires',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'referrer',
        type: 'bytes32',
      },
    ],
    name: 'NameRenewed',
    type: 'event',
  },
] as const
