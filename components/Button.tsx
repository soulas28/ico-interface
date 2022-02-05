import type { MouseEventHandler } from 'react'

/**  props of button component */
export interface ButtonProps {
  /** whether to show or hide component */
  hidden?: boolean
  /** string to be displayed on button */
  str: string
  /** additional class name for component (use for tailwind styling) */
  className?: string
  /** wether to activate or deactivate component */
  disabled?: boolean
  /** callback function to be called when button is clicked */
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = (props) => {
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
