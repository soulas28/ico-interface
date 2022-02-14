import { useWeb3React } from '@web3-react/core'
import type { NextPage } from 'next'
import { MouseEventHandler, useState } from 'react'
import React from 'react'
import useSWR from 'swr'

import { ICO__factory } from '../contract'
import { injected } from '../lib/connectors/metamask'
import { ICOContractFetcher } from '../lib/swr-fetchers/ico-contract'
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
  const [participationAddress, setParticipationAddress] = useState('')
  const [participationPeriod, setParticipationPeriod] = useState('')
  const [balanceOfAddress, setBalanceOfAddress] = useState('')

  const { data: account } = useSWR('account', metamaskFetcher)
  const { data: balance } = useSWR(['ethBalance', account], web3Fetcher)
  const { data: tokenName } = useSWR(['name'], ICOContractFetcher)
  const { data: tokenSymbol } = useSWR(['symbol'], ICOContractFetcher)
  const { data: numOfPeriods } = useSWR(['numOfPeriods'], ICOContractFetcher)
  const { data: periodBlock } = useSWR(['periodBlock'], ICOContractFetcher)
  const { data: unitPeriodBalance } = useSWR(
    ['unitPeriodBalance'],
    ICOContractFetcher
  )
  const { data: rate } = useSWR(['rate'], ICOContractFetcher)
  const { data: participation } = useSWR(
    ['participation', participationAddress, participationPeriod],
    ICOContractFetcher
  )
  const { data: currentPeriod } = useSWR(['currentPeriod'], ICOContractFetcher)
  const { data: balanceOf } = useSWR(
    ['balanceOf', balanceOfAddress],
    ICOContractFetcher
  )

  return (
    <div>
      <h1 className="text-4xl mb-4">Contract Control</h1>
      <p className="mb-4">Contract: {contractAddress}</p>

      {/* Wallet Connection */}
      <div className="mb-4">
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

      <div className="mb-4">
        <h2 className="text-3xl">Variables</h2>

        <p>
          {tokenName || 'Name'}({tokenSymbol || 'Symbol'}){' '}
          {periodBlock?.toString()}blocks/period{' '}
          {numOfPeriods?.toString() || 'N'}periods{' '}
          {unitPeriodBalance?.toString() || 'N'}Tokens/period rate:
          {rate?.toString() || 'N'} owner:Ntkn limit:Nblk
        </p>
        <br />
        <p>currentPeriod: {currentPeriod?.toString() || 'N'}</p>
        <h3 className="text-xl">participation</h3>
        <p>{participation?.toString() || 'null'}</p>
        <input
          type="text"
          className="border-2 border-black"
          placeholder="address"
          onInput={(e) => setParticipationAddress(e.currentTarget.value)}
        />
        <input
          type="text"
          className="border-2 border-black"
          placeholder="period"
          onInput={(e) => setParticipationPeriod(e.currentTarget.value)}
        />
        <h3 className="text-xl">balanceOf</h3>
        <p>{balanceOf?.toString() || 'null'}</p>
        <input
          type="text"
          className="border-2 border-black"
          placeholder="address"
          onInput={(e) => setBalanceOfAddress(e.currentTarget.value)}
        />
      </div>
      <div>
        <h2 className="text-3xl">Actions</h2>
        <SimpleButton
          text="mine block(ganache only)"
          onClick={() => {
            const signer = wallet.getSigner()
            const contract = ICO__factory.connect(contractAddress || '', signer)
            contract.approve('0x651b19B9f7fD02767836aF4E3CE22199F959559a', '1')
          }}
        />
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
