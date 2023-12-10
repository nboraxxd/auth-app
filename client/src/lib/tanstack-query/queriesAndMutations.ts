import { authApi } from '@/apis/auth.api'
import { useMutation } from '@tanstack/react-query'

export function useSignup() {
  return useMutation({ mutationFn: (user) => authApi.register(user) })
}
