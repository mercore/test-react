import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Input } from "../../components"
import { FormProps } from './types'

export const Auth = () => {
  const navigate = useNavigate()
  const [isLoginPage, setIsLoginPage] = useState(false)
  const {
   register,
   handleSubmit,
   reset,
   formState: { errors }
  } = useForm<FormProps>()

  const onRegister: SubmitHandler<FormProps> = data => {
    const users: Array<FormProps> = JSON.parse(localStorage.getItem('users') || '[]')

    if (users.length && users.find(user => user.email === data.email)) {
      alert("User already exists!")
    } else {
      localStorage.setItem('users', JSON.stringify([...users, data]))
      reset()
      setIsLoginPage(true)
    }
  }

  const onLogin: SubmitHandler<Omit<FormProps, "firstName" | "lastName">> = ({ email }) => {
    const users: Array<FormProps> = JSON.parse(localStorage.getItem('users') || '[]')

    if (users.length && !users.find(user => user.email === email)) {
      alert("User not found!")
    } else {
      navigate(`/tasks?email=${email}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(isLoginPage ? onLogin : onRegister)} className="p-3 w-full sm:w-1/2 md:w-1/4 xl:w-1/5">
      <Input
        placeholder="Email"
        containerClassName="mb-2.5"
        error={errors.email?.message}
        { ...register("email", {
          required: "This field is required!",
          pattern: {
            value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            message: "Email is not valid!"
          }
        }) }
      />
      {!isLoginPage && (
        <>
          <Input
            placeholder="First Name"
            containerClassName="mb-2.5"
            error={errors.firstName?.message}
            { ...register("firstName", {
              required: "This field is required!",
              pattern: {
                value: /^[A-Z]+$/i,
                message: "Field can't contain numbers!"
              }
            }) }
          />
          <Input
            placeholder="Last Name"
            containerClassName="mb-2.5"
            error={errors.lastName?.message}
            { ...register("lastName", {
              required: "This field is required!",
              pattern: {
                value: /^[A-Z]+$/i,
                message: "Field can't contain numbers!"
              }
            }) }
          />
        </>
      )}
      <Button type='submit'>{isLoginPage ? "Login" : "Register"}</Button>
      <div className='flex justify-end mt-2'>
        <button
          className='cursor-pointer font-semibold'
          onClick={() => setIsLoginPage(prev => !prev)}
        >
          { isLoginPage ? 'Get started' : 'Go to login' }
        </button>
      </div>
    </form>
  )
}