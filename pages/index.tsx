import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import type { MouseEventHandler } from 'react'
import { useState } from 'react'

type PhaseType = 'NormalSale' | 'LastSale' | 'WithdrawOnly' | 'Closed'

const Home: NextPage = () => {
  const [isWalletMenuShown, setIsWalletMenuShown] = useState(false)
  const [isWalletConnecting, setIsWalletConnecting] = useState(false)
  const [salePhase, setSalePhase] = useState<PhaseType>('NormalSale')

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
            onClick={() => {
              setIsWalletConnecting(true)
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
          str={isWalletConnecting ? 'Disconnect Wallet' : 'Connect Wallet'}
        />
        <h1 className="h-[6.75rem] text-[4rem] text-blue-black">Token Logo</h1>
        <Button
          str={isWalletConnecting ? 'Disconnect Wallet' : 'Connect Wallet'}
          onClick={() =>
            isWalletConnecting ? setIsWalletConnecting(false) : openWalletMenu()
          }
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
                !isWalletConnecting ||
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

interface ButtonProps {
  hidden?: boolean
  str: string
  className?: string
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={
        'rounded-3xl px-[42px] font text-4xl leading-15 text-white-pink drop-shadow' +
        ' ' +
        (props.className ? props.className : '') +
        ' ' +
        (props.hidden ? 'invisible' : '') +
        ' ' +
        (props.disabled ? 'bg-blue-black/50' : 'bg-red-pink')
      }
      value="test"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.str}
    </button>
  )
}

interface TextProps {
  str: string
  className?: string
}

const Text: React.FC<TextProps> = (props) => {
  return (
    <p
      className={
        'font text-blue-black' + ' ' + (props.className ? props.className : '')
      }
    >
      {props.str}
    </p>
  )
}

interface CurrencyInputProps {
  unit: 'ETH' | 'TKN'
  hidden?: boolean
  className?: string
}

const CurrencyInput: React.FC<CurrencyInputProps> = (props) => {
  const [isBeingFocused, setIsBeingFocused] = useState(false)
  return (
    <div
      className={
        'flex w-[688px] flex-row items-center justify-evenly rounded-3xl bg-white-pink py-1.5 outline-[3.3px] drop-shadow hover:outline hover:outline-red-pink' +
        ' ' +
        (props.hidden ? 'invisible' : '') +
        ' ' +
        (props.className ? props.className : '') +
        ' ' +
        (isBeingFocused ? 'outline outline-red-pink' : '')
      }
    >
      <div>
        <Image
          src="/eth-diamond.svg"
          height="67"
          width="41"
          alt="eth diamond"
          priority
          className={props.unit === 'ETH' ? '' : 'invisible'}
        />
      </div>
      <input
        type="text"
        className="max-w-[460px] grow bg-transparent font text-5xl text-blue-black/80 focus:outline-none"
        defaultValue="437847323"
        onFocus={() => setIsBeingFocused(true)}
        onBlur={() => setIsBeingFocused(false)}
      />
      <Text
        str={props.unit === 'ETH' ? 'ETH' : 'TKN'}
        className="grow-0 text-5xl"
      />
    </div>
  )
}

interface DownArrowProps {
  hidden?: boolean
}

const DownArrow: React.FC<DownArrowProps> = (props) => {
  return (
    <div className={'-my-1' + ' ' + (props.hidden ? 'invisible' : '')}>
      <Image
        src="/down-arrow.svg"
        height="43"
        width="43"
        alt="down arrow"
        priority
      />
    </div>
  )
}

interface SwapFormProps {
  disabled?: boolean
  type: 'participate' | 'purchase'
}

const SwapForm: React.FC<SwapFormProps> = (props) => {
  return (
    <div className="relative">
      {/* gray overlay */}
      <div
        className={
          'absolute z-10 flex flex-col items-center rounded-3xl bg-blue-black/25 px-10 py-10' +
          ' ' +
          (props.disabled ? '' : 'invisible')
        }
      >
        <CurrencyInput unit="ETH" hidden />
        <DownArrow hidden />
        <CurrencyInput unit="TKN" hidden />
        <DownArrow hidden />
        <Button str="Participate" className="w-[560px]" disabled hidden />
      </div>

      <div className="flex flex-col items-center rounded-3xl bg-white px-10 py-10 drop-shadow">
        <CurrencyInput unit="ETH" />
        <DownArrow />
        <CurrencyInput unit="TKN" />
        <DownArrow hidden />
        <Button
          str={props.type === 'participate' ? 'Participate' : 'Purchase'}
          className="w-[560px]"
          disabled={props.disabled}
        />
      </div>
    </div>
  )
}

export default Home
