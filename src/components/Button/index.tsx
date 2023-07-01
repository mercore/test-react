import { FC } from 'react'
import classNames from 'classnames'
import { ButtonProps } from './type'

export const Button: FC<ButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={
        classNames(
          className,
          'w-full transition-all bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
        )
      }
      { ...props }
    >
      {children}
    </button>
  )
}