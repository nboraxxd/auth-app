import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { auth } from '@/lib/firebase'
import { Button } from '@/components/Button'

export default function OAuth({ children }) {
  async function handleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider()

      const result = await signInWithPopup(auth, provider)
      console.log('🔥 ~ handleGoogleClick ~ result:', result)
    } catch (error) {
      console.log('Could not login with Google', error)
    }
  }

  return (
    <Button className="mt-6 bg-red-700" type="button" onClick={handleGoogleClick} isPending={status === 'pending'}>
      {children}
    </Button>
  )
}
