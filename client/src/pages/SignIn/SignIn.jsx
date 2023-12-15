import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { twMerge } from 'tailwind-merge'
import { useDispatch } from 'react-redux'

import { PATH } from '@/constants/path'
import { handleInternalServerError, handleNotFoundError, handleUnauthorizedError } from '@/utils/error'
import { signInSchema } from '@/lib/validation'
import { useLogin } from '@/lib/tanstack-query/queriesAndMutations'
import { setAuth } from '@/lib/redux/auth/authSlice'
import { AuthInput } from '@/components/AuthInput'
import { Button } from '@/components/Button'
import { OAuth } from '@/components/OAuth'
import { Title } from '@/components/Title'

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
        dispatch(setAuth({ user: res.data.result, isAuthenticated: true }))
        navigate(PATH.PROFILE)
        reset()
      },
      onError: (error) => {
        handleUnauthorizedError(error, setError)
        handleNotFoundError(error, setError)
        handleInternalServerError(error)
      },
    })
  }

  return (
    <section className={twMerge('container max-w-lg')}>
      <Title>Sign in</Title>

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
        <OAuth />
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
