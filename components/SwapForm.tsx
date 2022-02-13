import { useMemo, useState } from 'react'
import type { FormEventHandler } from 'react'

import { Button } from './Button'
import { CurrencyInput } from './CurrencyInput'
import { DownArrow } from './DownArrow'

/** props of SwapForm component */
export interface SwapFormProps {
  /** whether to show of hide component */
  disabled?: boolean
  /** form type */
  type: 'participate' | 'purchase'
  /** function to convert eth to token. */
  ethToToken: (eth: string) => Promise<string>
  /** function to convert token to eth. */
  tokenToEth: (token: string) => Promise<string>
}

/** component to display the form for currency swapping */
export const SwapForm: React.FC<SwapFormProps> = (props) => {
  const [eth, setEth] = useState('')
  const [tkn, setTkn] = useState('')

  const onEthUpdated: FormEventHandler<HTMLInputElement> = async (e) => {
    const value = e.currentTarget.value
    if (validate(value)) {
      setEth(value)
      setTkn(await props.ethToToken(value))
    }
    console.log('eth input')
  }
  // useMemo(async () => {
  //   setTkn(await props.ethToToken(eth))
  // }, [props, eth])

  const onTknUpdated: FormEventHandler<HTMLInputElement> = async (e) => {
    const value = e.currentTarget.value
    if (validate(value)) {
      setTkn(value)
      setEth(await props.tokenToEth(value))
    }
    console.log('tkn input')
  }
  const validate = (target: string) => target.match(/^[0-9]*\.?[0-9]{0,18}$/)

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
        <CurrencyInput unit="ETH" onInput={onEthUpdated} value={eth} />
        <DownArrow />
        <CurrencyInput unit="TKN" onInput={onTknUpdated} value={tkn} />
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
