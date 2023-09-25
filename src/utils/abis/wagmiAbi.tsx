export const wagmiAbi = [
  {
    "name": "name",
    "type": "string",
  },
  {
    "name": "symbol",
    "type": "string",
  },
  {
    "name": "decimals",
    "type": "uint8",
  },
  {
    "name": "totalSupply",
    "type": "uint256",
  },
 
  
  {
    "name": "WAGMI",
    "symbol": "WAGMI",
    "decimals": 18,
    "balanceOf": {
      "type": "function",
      "inputs": [
        {
          "name": "account",
          "type": "address",
        },
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
        },
      ],
    },
  },
  
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    name: 'Transfer',
    type: 'event',
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      { indexed: true, name: 'to', type: 'address' },
      {
        indexed: true,
        name: 'tokenId',
        type: 'uint256',
      },
    ],
  },
    {
      "name": "name",
      "type": "function",
      "outputs": [
        {
          "name": "",
          "type": "string",
        }
      ]
    },
    {
      "name": "symbol",
      "type": "function",
      "outputs": [
        {
          "name": "",
          "type": "string",
        }
      ]
    },
    {
      "name": "decimals",
      "type": "function",
      "outputs": [
        {
          "name": "",
          "type": "uint8",
        }
      ]
    },
    {
      "name": "totalSupply",
      "type": "function",
      "outputs": [
        {
          "name": "",
          "type": "uint256",
        }
      ]
    },
    {
      "name": "balanceOf",
      "type": "function",
      "inputs": [
        {
          "name": "account",
          "type": "address",
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
        }
      ]
    },
    {
      "name": "transfer",
      "type": "function",
      "inputs": [
        {
          "name": "to",
          "type": "address",
        },
        {
          "name": "amount",
          "type": "uint256",
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
        }
      ]
    },
    {
      "name": "transferFrom",
      "type": "function",
      "inputs": [
        {
          "name": "from",
          "type": "address",
        },
        {
          "name": "to",
          "type": "address",
        },
        {
          "name": "amount",
          "type": "uint256",
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
        }
      ]
    },
    {
      "name": "approve",
      "type": "function",
      "inputs": [
        {
          "name": "spender",
          "type": "address",
        },
        {
          "name": "amount",
          "type": "uint256",
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
        }
      ]
    },
    {
      "name": "allowance",
      "type": "function",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
        },
        {
          "name": "spender",
          "type": "address",
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "uint256",
        }
      ]
    },
  
] as const;