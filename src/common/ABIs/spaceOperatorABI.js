export const SpaceOperatorABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "TGTSToken",
    "outputs": [
      {
        "internalType": "contract External3",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "mappSpacePrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "swapOption",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "spaceID",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "offer",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tgts",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tgtc",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "a",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "b",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "offer",
        "type": "uint256"
      }
    ],
    "name": "swapDemand",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "spaceFrom",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "TGTCPrice",
        "type": "uint256"
      }
    ],
    "name": "onSale",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "spaceFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "spaceTo",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "optionalTGTCOffer",
        "type": "uint256"
      }
    ],
    "name": "exchangeSpace",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "spaceFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "TGTCPrice",
        "type": "uint256"
      }
    ],
    "name": "sellSpace",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "spaceFrom",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "TGTCAmount",
        "type": "uint256"
      }
    ],
    "name": "buySpace",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
