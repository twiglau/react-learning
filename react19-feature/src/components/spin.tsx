import clsx from "clsx";
import { LoaderCircle } from 'lucide-react';
import { PropsWithChildren } from "react";
import "./spin.css";

export interface SpinProps extends PropsWithChildren {
  loading: boolean
}
export default function Spin(props:SpinProps) {
  const { loading, children } = props
  const base = 'spin flex items-center justify-center top-0 bg-white/80 dark:bg-gray-800/50'
  const othCls = loading ? 'in':'out'
  const cls = clsx(base, othCls)
  return (
    <div className="relative">
      {children}
      {loading ? <div className={cls}>
        <LoaderCircle className="animate-spin text-gray-500" />
      </div> : null}
    </div>
  )
}