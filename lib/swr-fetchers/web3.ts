import { ethers } from 'ethers'
import type { Fetcher } from 'swr'

/**
 * Fetcher to get blockchain info.
 * @param type - type of information you want.
 * @param arg1 - custom arg 1.
 *
 * @remarks when type is "ethBalance", arg1 is account's address.
 * @remarks when type is "currentBlock", arg1 is not used.
 *
 * @returns the data you specified in type.
 */
export const web3Fetcher: Fetcher<
  string | number,
  ['ethBalance' | 'blockNumber', string]
> = (type, arg1) => {
  if (!type) return ''
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_PROVIDER_URL
  )
  switch (type) {
    case 'ethBalance':
      if (!arg1) return ''
      return provider.getBalance(arg1).then((res) => res.toString())
      break
    case 'blockNumber':
      return provider.getBlockNumber()
      break
  }
}
