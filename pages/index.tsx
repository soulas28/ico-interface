import { useWeb3React } from '@web3-react/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import { Button } from '../components/Button'
import { SwapForm } from '../components/SwapForm'
import { Text } from '../components/Text'
import { injected } from '../lib/connectors/metamask'

type PhaseType = 'NormalSale' | 'LastSale' | 'WithdrawOnly' | 'Closed'

const Home: NextPage = () => {
  const [isWalletMenuShown, setIsWalletMenuShown] = useState(false)
  const [salePhase, setSalePhase] = useState<PhaseType>('NormalSale')
  const { activate, active, deactivate } = useWeb3React()

  const openWalletMenu = () => setIsWalletMenuShown(true)
  const closeWalletMenu = () => setIsWalletMenuShown(false)

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
              str="---- Blocks Remaining Until the Period Sale Ends"
              className="text-4xl leading-15"
            />
            <SwapForm
              type={salePhase === 'LastSale' ? 'purchase' : 'participate'}
              disabled={
                !active ||
                salePhase === 'WithdrawOnly' ||
                salePhase === 'Closed'
              }
            />
          </div>
          <div className="flex grow flex-col items-center justify-center">
            <Text
              str="You can withdraw ---- ETH"
              className="text-4xl leading-15"
            />
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
