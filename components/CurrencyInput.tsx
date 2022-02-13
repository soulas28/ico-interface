import Image from 'next/image'
import { useState } from 'react'
import type { FormEventHandler } from 'react'

import { Text } from './Text'

/** props of CurrencyInput component */
export interface CurrencyInputProps {
  /** unit of the currency */
  unit: 'ETH' | 'TKN'
  /** whether to show or hide the component */
  hidden?: boolean
  /** additional class name for component (use for tailwind styling) */
  className?: string
  /** function to be called on Input. */
  onInput?: FormEventHandler<HTMLInputElement>
  /** value of input form. */
  value?: string
}

/** Component to display currency input form */
export const CurrencyInput: React.FC<CurrencyInputProps> = (props) => {
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
        onFocus={() => setIsBeingFocused(true)}
        onBlur={() => setIsBeingFocused(false)}
        onInput={props.onInput}
        value={props.value}
      />
      <Text
        str={props.unit === 'ETH' ? 'ETH' : 'TKN'}
        className="grow-0 text-5xl"
      />
    </div>
  )
}
