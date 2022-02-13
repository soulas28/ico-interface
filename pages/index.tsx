import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import type { BigNumber } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useSWR, { SWRConfig } from 'swr'
import useSWRInfinite from 'swr/infinite'

import { Button } from '../components/Button'
import { SwapForm } from '../components/SwapForm'
import { Text } from '../components/Text'
import { ICO__factory } from '../contract'
import { injected } from '../lib/connectors/metamask'
import { ICOContractFetcher } from '../lib/swr-fetchers/ico-contract'
import { metamaskFetcher } from '../lib/swr-fetchers/metamask'
import { web3Fetcher } from '../lib/swr-fetchers/web3'

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
  const [isTokenWithdrawable, setIsTokenWithdrawable] = useState(false)

  // web3-react
  const { activate, active, deactivate, library: wallet } = useWeb3React()

  // Fetch data from blockchain through metamask
  const { data: account } = useSWR('account', metamaskFetcher)

  // Fetch data from blockchain through infura.io (without metamask)
  const { data: periodBlock } = useSWR(['periodBlock'], ICOContractFetcher)
  const { data: numOfPeriods } = useSWR(['numOfPeriods'], ICOContractFetcher)
  const { data: deployedBlock } = useSWR(['deployedBlock'], ICOContractFetcher)
  const { data: rate } = useSWR(['rate'], ICOContractFetcher)
  const { data: withdrawLimit } = useSWR(['withdrawLimit'], ICOContractFetcher)
  const { data: currentPeriod } = useSWR(['currentPeriod'], ICOContractFetcher)
  const { data: currentBlock } = useSWR(['blockNumber'], web3Fetcher)
  const { data: participations, setSize } = useSWRInfinite(
    (index, previousData) => {
      if (index === (numOfPeriods as BigNumber).toNumber()) return null
      return ['participation', account, index]
    },
    ICOContractFetcher,
    { refreshInterval: 1000, revalidateAll: true }
  )
  const { data: withdrawal } = useSWR(
    ['withdrawal', account],
    ICOContractFetcher
  )

  // update size of participation array to be loaded
  useEffect(() => {
    if (numOfPeriods) {
      setSize((numOfPeriods as BigNumber).toNumber())
    }
  }, [numOfPeriods, setSize])

  // convert raw data to useful shape
  const periodSaleRemainingBlocks =
    periodBlock && numOfPeriods && deployedBlock && currentBlock
      ? ethers.FixedNumber.fromString(periodBlock.toString())
          .mulUnsafe(ethers.FixedNumber.fromString(numOfPeriods.toString()))
          .addUnsafe(ethers.FixedNumber.fromString(deployedBlock.toString()))
          .subUnsafe(ethers.FixedNumber.fromString(currentBlock.toString()))
          .toString()
          .split('.')[0]
      : '----'

  // check if there's some withdrawable tokens
  useEffect(() => {
    setIsTokenWithdrawable(false)
    if (currentPeriod && (currentPeriod as BigNumber).toNumber() !== 0) {
      if (participations) {
        for (let i = 0; i < (currentPeriod as BigNumber).toNumber(); i++) {
          if (!(participations[i] as BigNumber).eq('0'))
            setIsTokenWithdrawable(true)
        }
      }
    }
  }, [participations, currentPeriod])

  // calculate current sale phase
  useEffect(() => {
    if (
      deployedBlock &&
      currentPeriod &&
      numOfPeriods &&
      withdrawLimit &&
      currentBlock
    ) {
      const deployedBlockInNumber = (deployedBlock as BigNumber).toNumber()
      const currentPeriodInNumber = (currentPeriod as BigNumber).toNumber()
      const numOfPeriodsInNumber = (numOfPeriods as BigNumber).toNumber()
      const withdrawLimitInNumber = (withdrawLimit as BigNumber).toNumber()
      const currentBlockInNumber = currentBlock as number

      if (deployedBlockInNumber + withdrawLimitInNumber <= currentBlockInNumber)
        setSalePhase('Closed')
      else if (currentPeriodInNumber < numOfPeriodsInNumber)
        setSalePhase('NormalSale')
      else if (currentPeriodInNumber === numOfPeriodsInNumber)
        setSalePhase('LastSale')
      else setSalePhase('WithdrawOnly')
    }
  }, [deployedBlock, currentPeriod, numOfPeriods, withdrawLimit, currentBlock])

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

  // interact contract with ETH
  const participate = (eth: string) => {
    if (!eth) return
    const signer = wallet.getSigner()
    const contract = ICO__factory.connect(contractAddress, signer)
    contract.participate({
      value: ethers.FixedNumber.fromString(eth)
        .mulUnsafe(decimal)
        .toString()
        .split('.')[0],
    })
  }
  const withdrawToken = () => {
    let withdrawablePeriods = []
    if (participations) {
      for (let i = 0; i < (currentPeriod as BigNumber).toNumber(); i++) {
        if (!(participations[i] as BigNumber).eq('0'))
          withdrawablePeriods.push(i)
      }
    }
    const signer = wallet.getSigner()
    const contract = ICO__factory.connect(contractAddress, signer)
    withdrawablePeriods.forEach((period) => contract.withdrawToken(period))
  }
  const withdrawEth = () => {
    const signer = wallet.getSigner()
    const contract = ICO__factory.connect(contractAddress, signer)
    contract.withdrawETH()
  }

  return (
    <SWRConfig value={{ refreshInterval: 1000 }}>
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
          <Button
            hidden
            str={active ? 'Disconnect Wallet' : 'Connect Wallet'}
          />
          <h1 className="h-[6.75rem] text-[4rem] text-blue-black">
            Token Logo
          </h1>
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
                onSubmit={participate}
              />
            </div>

            <div className="flex grow flex-col items-center justify-evenly">
              <Button
                str="Withdraw Token"
                className="w-[560px]"
                disabled={!isTokenWithdrawable}
                onClick={withdrawToken}
              />
              <div className="flex flex-col items-center justify-center">
                <Text
                  str={
                    'You can withdraw ' +
                    (withdrawal
                      ? ethers.FixedNumber.fromString(
                          (withdrawal as BigNumber).toString()
                        )
                          .divUnsafe(decimal)
                          .toString()
                      : '----') +
                    ' ETH'
                  }
                  className="text-3xl"
                />
                <Button
                  str="Withdraw ETH"
                  className="w-[560px]"
                  disabled={withdrawal ? (withdrawal as BigNumber).eq(0) : true}
                  onClick={withdrawEth}
                />
              </div>
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
    </SWRConfig>
  )
}

export default Home
