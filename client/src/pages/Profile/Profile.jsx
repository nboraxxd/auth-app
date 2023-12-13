import { useSelector } from 'react-redux'
import { twMerge } from 'tailwind-merge'

import { AuthInput } from '@/components/AuthInput'
import { Title } from '@/components/Title'
import { Button } from '@/components/Button'

export default function Profile() {
  const { currentUser } = useSelector((state) => state.auth)

  return (
    <section className={twMerge('container max-w-lg pb-4')}>
      <Title>Profile</Title>

      <form className="flex flex-col">
        <img
          src={currentUser.photo_url}
          alt={currentUser.username}
          className="mb-5 h-24 w-24 cursor-pointer self-center rounded-full object-cover"
        />

        <AuthInput placeholder="Username" name="username" />
        <AuthInput type="email" placeholder="Email" autoComplete="email" name="email" />
        <AuthInput type="password" placeholder="Password" autoComplete="new-password" name="password" />
        <AuthInput type="password" placeholder="Confirm password" autoComplete="new-password" name="confirm_password" />

        <Button className="mt-1">Update</Button>
      </form>

      <div className="mt-4 flex justify-between">
        <button className="p-1 text-red-500 hover:text-red-600">Delete account</button>
        <button className="p-1 text-slate-500 hover:text-slate-600">Log out</button>
      </div>
    </section>
  )
}
