import { FC, forwardRef, LegacyRef } from 'react'
import classNames from 'classnames'
import { InputProps } from "./type"

export const Input: FC<InputProps> = forwardRef(({
  containerClassName,
  className,
  error,
  ...props
}, ref) => {
  return (
    <div className={containerClassName}>
      <input
        ref={ref as LegacyRef<HTMLInputElement>}
        className={
          classNames(
            className,
            'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-blue-500'
          )
        }
        { ...props }
      />
      { error && <p className='text-sm text-red-700 mt-1'>{error}</p> }
    </div>
  )
})