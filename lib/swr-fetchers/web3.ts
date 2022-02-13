import type ethers from 'ethers'
import type { Fetcher } from 'swr'

export const web3Fetcher: Fetcher<
  string,
  [ethers.providers.Web3Provider, string, 'ethBalance']
> = (provider, address) => {
  return provider.getBalance(address).then((r) => (!r ? '' : r.toString()))
}
