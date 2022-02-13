/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import { FunctionFragment, Result } from '@ethersproject/abi'
import { Listener, Provider } from '@ethersproject/providers'
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers'

import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common'

export interface ExclusiveForTestInterface extends utils.Interface {
  contractName: 'ExclusiveForTest'
  functions: {
    'reentrance()': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'reentrance', values?: undefined): string

  decodeFunctionResult(functionFragment: 'reentrance', data: BytesLike): Result

  events: {}
}

export interface ExclusiveForTest extends BaseContract {
  contractName: 'ExclusiveForTest'
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: ExclusiveForTestInterface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    reentrance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>
  }

  reentrance(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>

  callStatic: {
    reentrance(overrides?: CallOverrides): Promise<void>
  }

  filters: {}

  estimateGas: {
    reentrance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>
  }

  populateTransaction: {
    reentrance(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>
  }
}
