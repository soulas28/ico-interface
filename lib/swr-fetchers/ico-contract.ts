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
 * @param arg2 - custom arg 2.
 *
 * @remarks when type is "deployedBlock", args are not used.
 * @remarks when type is "name", args are not used.
 * @remarks when type is "symbol", args are not used.
 * @remarks when type is "periodBlock", args are not used.
 * @remarks when type is "numOfPeriods", args are not used.
 * @remarks when type is "unitPeriodBalance", args are not used.
 * @remarks when type is "rate", args are not used.
 * @remarks when type is "withdrawLimit", args are not used.
 * @remarks when type is "currentPeriod", args are not used.
 * @remarks when type is "participation", arg1 is address and arg2 is period.
 * @remarks when type is "withdrawal", arg1 is address and arg2 is not used.
 * @remarks when type is "balanceOf", arg1 is address adn arg2 is not used.
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
      | 'participation'
      | 'withdrawal'
      | 'balanceOf'
    ),
    any,
    any
  ]
> = (type, arg1, arg2) => {
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
    case 'participation':
      return contract.participation(arg1, arg2)
      break
    case 'withdrawal':
      return contract.withdrawal(arg1)
      break
    case 'balanceOf':
      return contract.balanceOf(arg1)
      break
  }
}
