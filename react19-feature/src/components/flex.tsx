import clsx from "clsx"
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  col: boolean
}

const Flex  = (props: FlexProps) => {
  const { col, children, className, ...other} = props
  
  const base = 'flex items-center'
  const cls = twMerge(clsx(base, {
    'flex-col': col,
    'flex-row': !col
  }, className))
   return (
    <div className={cls} {...other} >
      {children}
    </div>
   )
}

export default Flex