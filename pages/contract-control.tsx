import { useWeb3React } from '@web3-react/core'
import type { NextPage } from 'next'
import type { MouseEventHandler } from 'react'
import React from 'react'
import useSWR from 'swr'

import { injected } from '../lib/connectors/metamask'
import { metamaskFetcher } from '../lib/swr-fetchers/metamask'
import { web3Fetcher } from '../lib/swr-fetchers/web3'

/**
 * Simple page for interact smart contract
 *
 * @returns Next.js Page
 */
const ContractControl: NextPage = () => {
  const { activate, active, deactivate, library: wallet } = useWeb3React()
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  const { data: account } = useSWR('account', metamaskFetcher)
  const { data: balance } = useSWR([account, 'ethBalance'], web3Fetcher)

  return (
    <div>
      <h1 className="text-4xl mb-4">Contract Control</h1>
      <p className="mb-4">Contract: {contractAddress}</p>

      {/* Wallet Connection */}
      <div>
        <h2 className="text-3xl">Wallet Connect</h2>
        <h3 className="text-xl">
          <span className={active ? 'text-green-500' : 'text-red-500'}>
            ●{active ? 'Active' : 'Not Active'}
          </span>
        </h3>
        <p>{account || 'Cannot get user account.'}</p>
        <p>{balance || '0'} ETH 0 TKN</p>
        <SimpleButton text="connect" onClick={() => activate(injected)} />
        <SimpleButton text="disconnect" onClick={deactivate} />
      </div>
    </div>
  )
}

/**
 * Type definition for the SimpleButton component.
 */
interface SimpleButtonProps {
  /**
   * The text to display on the button.
   */
  text: string

  /**
   * The additional class names for styling.
   */
  className?: string

  /**
   * Function called when the component clicked.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>
}

/**
 * A simple button component.
 *
 * @param props - The properties for the component.
 * @see SimpleButtonProps
 * @returns React component
 */
const SimpleButton: React.FC<SimpleButtonProps> = (props) => {
  return (
    <button
      className={
        'bg-gray-300 rounded-sm border-black border-2' +
        ' ' +
        (props.className || '')
      }
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

export default ContractControl
