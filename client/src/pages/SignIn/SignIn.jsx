import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { twMerge } from 'tailwind-merge'
import { useDispatch } from 'react-redux'

import { PATH } from '@/constants/path'
import { isAxiosUnprocessableEntityError, isEmailNotFoundError } from '@/utils/common'
import { signInSchema } from '@/lib/validation'
import { useLogin } from '@/lib/tanstack-query/queriesAndMutations'
import { setUser } from '@/lib/redux/auth/authSlice'
import { AuthInput } from '@/components/AuthInput'
import { Button } from '@/components/Button'
import { OAuth } from '@/components/OAuth'

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate, isPending } = useLogin()

  function onSubmit(data) {
    mutate(data, {
      onSuccess: (res) => {
        dispatch(setUser(res.data.result))
        navigate(PATH.HOMEPAGE)
        reset()
      },
      onError: (error) => {
        console.log('🔥 ~ onSubmit ~ error:', error)
        if (isAxiosUnprocessableEntityError(error)) {
          const formError = error.response.data.errors

          if (formError) {
            // Dùng Object.keys để lấy ra các key của formError object
            // Sau đó dùng forEach để lặp qua từng key và set error cho input tương ứng
            Object.keys(formError).forEach((key) => {
              setError(key, {
                message: formError[key].msg,
                type: 'server',
              })
            })
          }
        }

        if (isEmailNotFoundError(error)) {
          setError('email', {
            message: error.response.data.message,
            type: 'server',
          })
        }
      },
    })
  }

  return (
    <section className={twMerge('container max-w-lg')}>
      <h1 className="my-7 text-center text-3xl font-semibold">Sign In</h1>

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)} noValidate>
        <AuthInput
          type="email"
          placeholder="Email"
          autoComplete="email"
          name="email"
          register={register}
          errorMessage={errors.email?.message}
        />
        <AuthInput
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          name="password"
          register={register}
          errorMessage={errors.password?.message}
        />

        <Button className="mt-1" isPending={isPending}>
          Sign in
        </Button>
        <OAuth>Sign in with Google</OAuth>
      </form>
      <div>
        <p className="mt-3 text-slate-500">
          Are you new here?{' '}
          <Link to={PATH.SIGN_UP} className="font-semibold text-slate-700">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  )
}
