/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { LimitedToken, LimitedTokenInterface } from "../LimitedToken";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
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
    anonymous: false,
    inputs: [],
    name: "Unlocked",
    type: "event",
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
        name: "amount",
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
        name: "account",
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
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
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
    inputs: [],
    name: "owner",
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
        name: "amount",
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
        name: "amount",
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
  {
    inputs: [],
    name: "isLimited",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405233600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600560146101000a81548160ff0219169083151502179055503480156200006d57600080fd5b5060405162001a8738038062001a878339818101604052810190620000939190620001ff565b81818160039080519060200190620000ad929190620000d1565b508060049080519060200190620000c6929190620000d1565b505050505062000408565b828054620000df9062000319565b90600052602060002090601f0160209004810192826200010357600085556200014f565b82601f106200011e57805160ff19168380011785556200014f565b828001600101855582156200014f579182015b828111156200014e57825182559160200191906001019062000131565b5b5090506200015e919062000162565b5090565b5b808211156200017d57600081600090555060010162000163565b5090565b6000620001986200019284620002ad565b62000284565b905082815260208101848484011115620001b757620001b6620003e8565b5b620001c4848285620002e3565b509392505050565b600082601f830112620001e457620001e3620003e3565b5b8151620001f684826020860162000181565b91505092915050565b60008060408385031215620002195762000218620003f2565b5b600083015167ffffffffffffffff8111156200023a5762000239620003ed565b5b6200024885828601620001cc565b925050602083015167ffffffffffffffff8111156200026c576200026b620003ed565b5b6200027a85828601620001cc565b9150509250929050565b600062000290620002a3565b90506200029e82826200034f565b919050565b6000604051905090565b600067ffffffffffffffff821115620002cb57620002ca620003b4565b5b620002d682620003f7565b9050602081019050919050565b60005b8381101562000303578082015181840152602081019050620002e6565b8381111562000313576000848401525b50505050565b600060028204905060018216806200033257607f821691505b6020821081141562000349576200034862000385565b5b50919050565b6200035a82620003f7565b810181811067ffffffffffffffff821117156200037c576200037b620003b4565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61166f80620004186000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80638da5cb5b1161008c578063a69df4b511610066578063a69df4b514610275578063a9059cbb1461027f578063db5671fb146102af578063dd62ed3e146102cd576100ea565b80638da5cb5b1461020957806395d89b4114610227578063a457c2d714610245576100ea565b806323b872dd116100c857806323b872dd1461015b578063313ce5671461018b57806339509351146101a957806370a08231146101d9576100ea565b806306fdde03146100ef578063095ea7b31461010d57806318160ddd1461013d575b600080fd5b6100f76102fd565b604051610104919061109e565b60405180910390f35b61012760048036038101906101229190610e78565b61038f565b6040516101349190611083565b60405180910390f35b6101456103b2565b60405161015291906111e0565b60405180910390f35b61017560048036038101906101709190610e25565b6103bc565b6040516101829190611083565b60405180910390f35b6101936103eb565b6040516101a091906111fb565b60405180910390f35b6101c360048036038101906101be9190610e78565b6103f4565b6040516101d09190611083565b60405180910390f35b6101f360048036038101906101ee9190610db8565b61049e565b60405161020091906111e0565b60405180910390f35b6102116104e6565b60405161021e9190611068565b60405180910390f35b61022f610510565b60405161023c919061109e565b60405180910390f35b61025f600480360381019061025a9190610e78565b6105a2565b60405161026c9190611083565b60405180910390f35b61027d61068c565b005b61029960048036038101906102949190610e78565b610765565b6040516102a69190611083565b60405180910390f35b6102b7610788565b6040516102c49190611083565b60405180910390f35b6102e760048036038101906102e29190610de5565b61079f565b6040516102f491906111e0565b60405180910390f35b60606003805461030c90611310565b80601f016020809104026020016040519081016040528092919081815260200182805461033890611310565b80156103855780601f1061035a57610100808354040283529160200191610385565b820191906000526020600020905b81548152906001019060200180831161036857829003601f168201915b5050505050905090565b60008061039a610826565b90506103a781858561082e565b600191505092915050565b6000600254905090565b6000806103c7610826565b90506103d48582856109f9565b6103df858585610a85565b60019150509392505050565b60006012905090565b6000806103ff610826565b9050610493818585600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461048e9190611232565b61082e565b600191505092915050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606004805461051f90611310565b80601f016020809104026020016040519081016040528092919081815260200182805461054b90611310565b80156105985780601f1061056d57610100808354040283529160200191610598565b820191906000526020600020905b81548152906001019060200180831161057b57829003601f168201915b5050505050905090565b6000806105ad610826565b90506000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905083811015610673576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066a906111c0565b60405180910390fd5b610680828686840361082e565b60019250505092915050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461071c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161071390611140565b60405180910390fd5b6000600560146101000a81548160ff0219169083151502179055507f19aad37188a1d3921e29eb3c66acf43d81975e107cb650d58cca878627955fd660405160405180910390a1565b600080610770610826565b905061077d818585610a85565b600191505092915050565b6000600560149054906101000a900460ff16905090565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561089e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610895906111a0565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561090e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610905906110e0565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516109ec91906111e0565b60405180910390a3505050565b6000610a05848461079f565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610a7f5781811015610a71576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a6890611100565b60405180910390fd5b610a7e848484840361082e565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610af5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aec90611180565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610b65576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b5c906110c0565b60405180910390fd5b610b70838383610d06565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610bf6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bed90611120565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610c899190611232565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610ced91906111e0565b60405180910390a3610d00848484610d89565b50505050565b3073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161480610d455750610d43610788565b155b610d84576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d7b90611160565b60405180910390fd5b505050565b505050565b600081359050610d9d8161160b565b92915050565b600081359050610db281611622565b92915050565b600060208284031215610dce57610dcd6113a0565b5b6000610ddc84828501610d8e565b91505092915050565b60008060408385031215610dfc57610dfb6113a0565b5b6000610e0a85828601610d8e565b9250506020610e1b85828601610d8e565b9150509250929050565b600080600060608486031215610e3e57610e3d6113a0565b5b6000610e4c86828701610d8e565b9350506020610e5d86828701610d8e565b9250506040610e6e86828701610da3565b9150509250925092565b60008060408385031215610e8f57610e8e6113a0565b5b6000610e9d85828601610d8e565b9250506020610eae85828601610da3565b9150509250929050565b610ec181611288565b82525050565b610ed08161129a565b82525050565b6000610ee182611216565b610eeb8185611221565b9350610efb8185602086016112dd565b610f04816113a5565b840191505092915050565b6000610f1c602383611221565b9150610f27826113b6565b604082019050919050565b6000610f3f602283611221565b9150610f4a82611405565b604082019050919050565b6000610f62601d83611221565b9150610f6d82611454565b602082019050919050565b6000610f85602683611221565b9150610f908261147d565b604082019050919050565b6000610fa8601183611221565b9150610fb3826114cc565b602082019050919050565b6000610fcb601583611221565b9150610fd6826114f5565b602082019050919050565b6000610fee602583611221565b9150610ff98261151e565b604082019050919050565b6000611011602483611221565b915061101c8261156d565b604082019050919050565b6000611034602583611221565b915061103f826115bc565b604082019050919050565b611053816112c6565b82525050565b611062816112d0565b82525050565b600060208201905061107d6000830184610eb8565b92915050565b60006020820190506110986000830184610ec7565b92915050565b600060208201905081810360008301526110b88184610ed6565b905092915050565b600060208201905081810360008301526110d981610f0f565b9050919050565b600060208201905081810360008301526110f981610f32565b9050919050565b6000602082019050818103600083015261111981610f55565b9050919050565b6000602082019050818103600083015261113981610f78565b9050919050565b6000602082019050818103600083015261115981610f9b565b9050919050565b6000602082019050818103600083015261117981610fbe565b9050919050565b6000602082019050818103600083015261119981610fe1565b9050919050565b600060208201905081810360008301526111b981611004565b9050919050565b600060208201905081810360008301526111d981611027565b9050919050565b60006020820190506111f5600083018461104a565b92915050565b60006020820190506112106000830184611059565b92915050565b600081519050919050565b600082825260208201905092915050565b600061123d826112c6565b9150611248836112c6565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561127d5761127c611342565b5b828201905092915050565b6000611293826112a6565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b838110156112fb5780820151818401526020810190506112e0565b8381111561130a576000848401525b50505050565b6000600282049050600182168061132857607f821691505b6020821081141561133c5761133b611371565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b6000601f19601f8301169050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f5065726d697373696f6e2044656e696564000000000000000000000000000000600082015250565b7f5472616e73666572206e6f7420616c6c6f7765642e0000000000000000000000600082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b61161481611288565b811461161f57600080fd5b50565b61162b816112c6565b811461163657600080fd5b5056fea264697066735822122043fc065ccae8c1baf439ecedffafc651fd2444749ce4800e52f1699998377d6c64736f6c63430008070033";

type LimitedTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LimitedTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LimitedToken__factory extends ContractFactory {
  constructor(...args: LimitedTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "LimitedToken";
  }

  deploy(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LimitedToken> {
    return super.deploy(
      name_,
      symbol_,
      overrides || {}
    ) as Promise<LimitedToken>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  attach(address: string): LimitedToken {
    return super.attach(address) as LimitedToken;
  }
  connect(signer: Signer): LimitedToken__factory {
    return super.connect(signer) as LimitedToken__factory;
  }
  static readonly contractName: "LimitedToken";
  public readonly contractName: "LimitedToken";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LimitedTokenInterface {
    return new utils.Interface(_abi) as LimitedTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LimitedToken {
    return new Contract(address, _abi, signerOrProvider) as LimitedToken;
  }
}
