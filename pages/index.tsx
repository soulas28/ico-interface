import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import useSWR from 'swr'

import { Button } from '../components/Button'
import { SwapForm } from '../components/SwapForm'
import { Text } from '../components/Text'
import { ICO__factory } from '../contract'
import { injected } from '../lib/connectors/metamask'
import { ICOContractFetcher } from '../lib/swr-fetchers/ico-contract'

type PhaseType = 'NormalSale' | 'LastSale' | 'WithdrawOnly' | 'Closed'

/**
 * The main page of the application.
 * @returns {NextPage}
 */
const Home: NextPage = () => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
  const decimal = ethers.FixedNumber.fromString('1000000000000000000')

  // states
  const [isWalletMenuShown, setIsWalletMenuShown] = useState(false)
  const [salePhase, setSalePhase] = useState<PhaseType>('NormalSale')

  // web3-react
  const { activate, active, deactivate, library: wallet } = useWeb3React()

  // Fetch data from blockchain through infura.io (without metamask)
  const { data: periodBlock } = useSWR(['periodBlock'], ICOContractFetcher)
  const { data: numOfPeriods } = useSWR(['numOfPeriods'], ICOContractFetcher)
  const { data: deployedBlock } = useSWR(['deployedBlock'], ICOContractFetcher)
  const { data: rate } = useSWR(['rate'], ICOContractFetcher)

  // convert raw data to useful shape
  const periodSaleRemainingBlocks =
    periodBlock && numOfPeriods && deployedBlock
      ? ethers.FixedNumber.fromString(periodBlock.toString() || '0')
          .mulUnsafe(
            ethers.FixedNumber.fromString(numOfPeriods.toString() || '0')
          )
          .subUnsafe(
            ethers.FixedNumber.fromString(deployedBlock.toString() || '0')
          )
          .toString()
          .split('.')[0]
      : '----'

  // control wallet menu
  const openWalletMenu = () => setIsWalletMenuShown(true)
  const closeWalletMenu = () => setIsWalletMenuShown(false)

  // convert between token and eth
  const ethToToken = async (eth: string) => {
    if (!eth) return ''
    const contract = ICO__factory.connect(contractAddress, wallet)
    return ethers.FixedNumber.fromString(
      (
        await contract.ETHToToken(
          ethers.FixedNumber.fromString(eth)
            .mulUnsafe(decimal)
            .toString()
            .split('.')[0]
        )
      ).toString()
    )
      .divUnsafe(decimal)
      .toString()
  }
  const tokenToEth = async (token: string) => {
    if (!token) return ''
    const contract = ICO__factory.connect(contractAddress, wallet)
    return ethers.FixedNumber.fromString(
      (
        await contract.TokenToETH(
          ethers.FixedNumber.fromString(token)
            .mulUnsafe(decimal)
            .toString()
            .split('.')[0]
        )
      ).toString()
    )
      .divUnsafe(decimal)
      .toString()
  }

  return (
    <div className="relative flex h-full flex-col bg-white-pink">
      <Head>
        <title>Token name here</title>
      </Head>

      {/* Wallet Menu Modal */}
      <div
        className={
          'absolute z-50 flex h-full w-full cursor-pointer flex-row items-center justify-center bg-blue-black/25 transition-visibility duration-300' +
          ' ' +
          (isWalletMenuShown ? '' : 'invisible opacity-0')
        }
        onClick={closeWalletMenu}
      >
        <div
          className="rounded-3xl bg-white py-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="p-8"
            onClick={async () => {
              await activate(injected)
              closeWalletMenu()
            }}
          >
            <Image
              alt="metamask logo"
              src="/metamask-logo.svg"
              width="320"
              height="62"
            />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="flex grow-0 flex-row items-center justify-between px-12 font">
        <Button hidden str={active ? 'Disconnect Wallet' : 'Connect Wallet'} />
        <h1 className="h-[6.75rem] text-[4rem] text-blue-black">Token Logo</h1>
        <Button
          str={active ? 'Disconnect Wallet' : 'Connect Wallet'}
          onClick={() => (active ? deactivate() : openWalletMenu())}
        />
      </header>

      {/* Main Contents */}
      <div className="grow">
        {/* Shown when not closed */}
        <div
          className={
            'flex h-full flex-col' +
            ' ' +
            (salePhase === 'Closed' ? 'hidden' : '')
          }
        >
          <div className="flex grow-0 flex-col items-center">
            <Text
              str={
                periodSaleRemainingBlocks +
                ' ' +
                'Blocks Remaining Until the Period Sale Ends'
              }
              className="text-4xl leading-15"
            />
            <Text
              str={
                '1.0 ETH = ' +
                ethers.FixedNumber.fromString('0.01')
                  .mulUnsafe(
                    ethers.FixedNumber.fromString(rate?.toString() || '0')
                  )
                  .toString() +
                ' TKN'
              }
              className="text-4xl leading-15"
            />
            <SwapForm
              type={salePhase === 'LastSale' ? 'purchase' : 'participate'}
              disabled={
                !active ||
                salePhase === 'WithdrawOnly' ||
                salePhase === 'Closed'
              }
              ethToToken={ethToToken}
              tokenToEth={tokenToEth}
            />
          </div>
          <div className="flex grow flex-col items-center justify-center">
            <Text str="You can withdraw ---- ETH" className="text-3xl" />
            <Button str="Withdraw ETH" className="w-[560px]" disabled />
          </div>
        </div>

        {/* Shown when closed */}
        <div
          className={
            'flex grow flex-col items-center justify-center' +
            ' ' +
            (salePhase === 'Closed' ? '' : 'hidden')
          }
        >
          <Text
            str="ALL SALES HAS BEEN ALREADY FINISHED"
            className="text-[4rem] leading-[6.75rem]"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
