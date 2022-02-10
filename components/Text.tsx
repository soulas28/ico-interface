/** props of Text Component */
export interface TextProps {
  /** string to be displayed on component*/
  str: string
  /** additional class name for component (use for tailwind styling) */
  className?: string
}

/** component to display text */
export const Text: React.FC<TextProps> = (props) => {
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
