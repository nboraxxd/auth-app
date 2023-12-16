import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { useDeleteAccount } from '@/lib/tanstack-query/queriesAndMutations'
import { setAuth } from '@/lib/redux/auth/authSlice'
import { cn } from '@/utils/common'

export default function DeleteAccountBtn() {
  const dispatch = useDispatch()
  const { isPending, mutate } = useDeleteAccount()

  function handleDelAccount() {
    mutate(null, {
      onSuccess: (res) => {
        toast.success(res.data.message)
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
        'p-1 text-red-500 transition-all disabled:text-red-300',
        !isPending && 'hover:text-red-700 hover:underline'
      )}
      disabled={isPending}
      onClick={handleDelAccount}
    >
      Delete account
    </button>
  )
}
