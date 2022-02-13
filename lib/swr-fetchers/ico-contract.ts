import { ethers } from 'ethers'
import type { BigNumber } from 'ethers'
import type { Fetcher } from 'swr'

import { ICO__factory } from '../../contract/factories/ICO__factory'

const providerURL = process.env.NEXT_PUBLIC_PROVIDER_URL
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

const provider = new ethers.providers.JsonRpcProvider(providerURL)

/**
 * Fetcher to get contract's info
 * @param type - type of information you want.
 * @param arg1 - custom arg 1.
 *
 * @remarks when type is "deployedBlock", arg1 is not used.
 * @remarks when type is "name", arg1 is not used.
 * @remarks when type is "symbol", arg1 is not used.
 * @remarks when type is "periodBlock", arg1 is not used.
 * @remarks when type is "numOfPeriods", arg1 is not used.
 * @remarks when type is "unitPeriodBalance", arg1 is not used.
 * @remarks when type is "rate", arg1 is not used.
 * @remarks when type is "withdrawLimit", arg1 is not used.
 * @remarks when type is "currentPeriod", arg1 is not used.
 *
 * @returns the data you specified in type.
 */
export const ICOContractFetcher: Fetcher<
  string | BigNumber,
  [
    (
      | 'deployedBlock'
      | 'name'
      | 'symbol'
      | 'periodBlock'
      | 'numOfPeriods'
      | 'unitPeriodBalance'
      | 'rate'
      | 'withdrawLimit'
      | 'currentPeriod'
    ),
    string?
  ]
> = (type, arg1) => {
  if (!contractAddress) return ''
  const contract = ICO__factory.connect(contractAddress, provider)
  switch (type) {
    case 'deployedBlock':
      return contract.deployedBlock()
      break
    case 'name':
      return contract.name()
      break
    case 'symbol':
      return contract.symbol()
      break
    case 'periodBlock':
      return contract.periodBlock()
      break
    case 'numOfPeriods':
      return contract.numOfPeriods()
      break
    case 'unitPeriodBalance':
      return contract.unitPeriodBalance()
      break
    case 'rate':
      return contract.rate()
      break
    case 'withdrawLimit':
      return contract.withdrawLimit()
      break
    case 'currentPeriod':
      return contract.getCurrentPeriod()
      break
  }
}
