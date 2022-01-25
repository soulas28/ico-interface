import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import type { MouseEventHandler } from 'react'
import { useState } from 'react'

const Home: NextPage = () => {
  const [isWalletMenuShown, setIsWalletMenuShown] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const openWalletMenu = () => setIsWalletMenuShown(true)
  const closeWalletMenu = () => setIsWalletMenuShown(false)

  return (
    <div className="relative flex flex-col h-full bg-white-pink">
      <Head>
        <title>Token name here</title>
      </Head>

      {/* Wallet Menu Modal */}
      <div
        className={
          'absolute z-50 flex flex-row items-center justify-center w-full h-full bg-blue-black/25 cursor-pointer transition-visibility duration-300' +
          ' ' +
          (isWalletMenuShown ? '' : 'invisible opacity-0')
        }
        onClick={closeWalletMenu}
      >
        <div
          className="py-5 bg-white rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="p-8"
            onClick={() => {
              setIsWalletConnected(true)
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
      <header className="flex flex-row items-center justify-between px-12 grow-0 font">
        <Button
          hidden
          str={isWalletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
        />
        <h1 className="h-[6.75rem] text-[4rem] text-blue-black">Token Logo</h1>
        <Button
          str={isWalletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
          onClick={() =>
            isWalletConnected ? setIsWalletConnected(false) : openWalletMenu()
          }
        />
      </header>

      {/* Main Contents */}
      <div className="flex flex-col grow">
        <div className="flex flex-col items-center grow-0">
          <Text
            str="---- Blocks Remaining Until the Period Sale Ends"
            className="text-4xl leading-15"
          />
          <SwapForm type="participate" disabled={!isWalletConnected} />
        </div>
        <div className="flex flex-col items-center justify-center grow">
          <Text
            str="You can withdraw ---- ETH"
            className="text-4xl leading-15"
          />
          <Button str="Withdraw ETH" className="w-[560px]" disabled />
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
        'font px-[42px] text-white-pink rounded-3xl text-4xl leading-15 drop-shadow' +
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
        'flex flex-row items-center justify-evenly rounded-3xl bg-white-pink drop-shadow w-[688px] py-1.5 outline-[3.3px] hover:outline hover:outline-red-pink' +
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
        className="text-5xl bg-transparent font grow text-blue-black/80 max-w-[460px] focus:outline-none"
        defaultValue="437847323"
        onFocus={() => setIsBeingFocused(true)}
        onBlur={() => setIsBeingFocused(false)}
      />
      <Text
        str={props.unit === 'ETH' ? 'ETH' : 'TKN'}
        className="text-5xl grow-0"
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
          'absolute z-10 flex flex-col items-center px-10 py-10 bg-blue-black/25 rounded-3xl' +
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

      <div className="flex flex-col items-center px-10 py-10 bg-white rounded-3xl drop-shadow">
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
