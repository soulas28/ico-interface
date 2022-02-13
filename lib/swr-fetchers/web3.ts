import { BigNumber, ethers } from 'ethers'
import type { Fetcher } from 'swr'

// passing provider as props is forbidden. It causes problem with ethers.js. The reason is unknown yet.

/**
 * Fetcher to get an account's balance.
 * @param address - address of target account
 * @returns the balance of target account
 */
export const web3Fetcher: Fetcher<string, [string, 'ethBalance']> = (
  address
) => {
  if (!address) return '0'
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_PROVIDER_URL
  )
  const balance = provider.getBalance(address).then((res) => res.toString())
  return balance
}
