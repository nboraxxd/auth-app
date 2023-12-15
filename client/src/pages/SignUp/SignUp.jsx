import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignup } from '@/lib/tanstack-query/queriesAndMutations'
import { useDispatch } from 'react-redux'

import { PATH } from '@/constants/path'
import { handleInternalServerError, handleUnauthorizedError } from '@/utils/error'
import { signUpSchema } from '@/lib/validation'
import { setAuth } from '@/lib/redux/auth/authSlice'
import { AuthInput } from '@/components/AuthInput'
import { Button } from '@/components/Button'
import { OAuth } from '@/components/OAuth'
import { Title } from '@/components/Title'

export default function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  })

  const { mutate, isPending } = useSignup()

  function onSubmit(data) {
    mutate(data, {
      onSuccess: (res) => {
        dispatch(setAuth({ user: res.data.result, isAuthenticated: true }))
        navigate(PATH.PROFILE)
        reset()
      },
      onError: (error) => {
        handleUnauthorizedError(error, setError)
        handleInternalServerError(error)
      },
    })
  }

  return (
    <section className={twMerge('container max-w-lg')}>
      <Title>Sign in</Title>

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)} noValidate>
        <AuthInput
          type="username"
          placeholder="Username"
          name="username"
          register={register}
          errorMessage={errors.username?.message}
        />
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
        <AuthInput
          type="password"
          placeholder="Confirm password"
          autoComplete="new-password"
          name="confirm_password"
          register={register}
          errorMessage={errors.confirm_password?.message}
        />

        <Button className="mt-1" isPending={isPending}>
          Sign up
        </Button>
        <OAuth />
      </form>
      <div>
        <p className="mt-3 text-slate-500">
          Already have an account?{' '}
          <Link to={PATH.SIGN_IN} className="font-semibold text-slate-700">
            Log in
          </Link>
        </p>
      </div>
    </section>
  )
}
