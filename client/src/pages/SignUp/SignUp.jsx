import { Link } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { PATH } from '@/constants/path'
import { AuthInput } from '@/components/AuthInput'
import { Button } from '@/components/Button'

export default function SignUp() {
  return (
    <section className={twMerge('container max-w-lg')}>
      <h1 className="my-7 text-center text-3xl font-semibold">Sign Up</h1>

      <form className="flex flex-col">
        <AuthInput placeholder="Username" />
        <AuthInput placeholder="Email" />
        <AuthInput placeholder="Password" />
        <AuthInput placeholder="Confirm password" />

        <Button className="mt-1">Sign up</Button>
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
