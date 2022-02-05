import Image from 'next/image'

export interface DownArrowProps {
  /** whether to show or hide the component*/
  hidden?: boolean
}

/** component to display down arrow icon */
export const DownArrow: React.FC<DownArrowProps> = (props) => {
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
