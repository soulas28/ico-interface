import { Button } from './Button'
import { CurrencyInput } from './CurrencyInput'
import { DownArrow } from './DownArrow'

/** props of SwapForm component */
export interface SwapFormProps {
  /** whether to show of hide component */
  disabled?: boolean
  /** form type */
  type: 'participate' | 'purchase'
}

/** component to display the form for currency swapping */
export const SwapForm: React.FC<SwapFormProps> = (props) => {
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
