import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { useSignOut } from '@/lib/tanstack-query/queriesAndMutations'
import { setAuth } from '@/lib/redux/auth/authSlice'
import { cn } from '@/utils/common'

export default function SignOutBtn() {
  const dispatch = useDispatch()
  const { isPending, mutate } = useSignOut()

  function handleSignOut() {
    mutate(null, {
      onSuccess: () => {
        toast.success('Sign out successfully')
        dispatch(setAuth({ user: null, isAuthenticated: false }))
      },
      onError: (error) => {
        toast.error(error.response.data.message)
      },
    })
  }

  return (
    <button
      className={cn(
        'p-1 text-slate-500 transition-all  disabled:text-slate-300',
        !isPending && 'hover:text-slate-700 hover:underline'
      )}
      disabled={isPending}
      onClick={handleSignOut}
    >
      Sign out
    </button>
  )
}
