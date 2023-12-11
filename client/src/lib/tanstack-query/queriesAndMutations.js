import { authApi } from '@/apis/auth.api'
import { useMutation } from '@tanstack/react-query'

export function useSignup() {
  return useMutation({ mutationFn: (user) => authApi.signUp(user) })
}

export function useLogin() {
  return useMutation({ mutationFn: (user) => authApi.signIn(user) })
}
