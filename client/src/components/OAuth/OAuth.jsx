import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { HttpStatusCode } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

import { PATH } from '@/constants/path'
import { auth } from '@/lib/firebase'
import { useGoogleOAuth } from '@/lib/tanstack-query/queriesAndMutations'
import { setAuth } from '@/lib/redux/auth/authSlice'
import { Button } from '@/components/Button'

export default function OAuth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isPending, mutate } = useGoogleOAuth()

  async function handleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider()

      const result = await signInWithPopup(auth, provider)
      const user = { name: result.user.displayName, email: result.user.email, photo_url: result.user.photoURL }

      mutate(user, {
        onSuccess: (res) => {
          dispatch(setAuth({ user: res.data.result, isAuthenticated: true }))
          navigate(PATH.HOMEPAGE)
        },
        onError: (error) => {
          if (error.response.status === HttpStatusCode.InternalServerError) {
            toast.error(error.response.data.message)
          }
        },
      })
    } catch (error) {
      toast.error('Could not login with Google')
      throw new Error(error)
    }
  }

  return (
    <Button className="mt-6 bg-red-700" type="button" onClick={handleGoogleClick} isPending={isPending}>
      Continue with Google
    </Button>
  )
}
