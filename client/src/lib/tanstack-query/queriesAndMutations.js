import { authApi } from '@/apis/auth.api'
import { useMutation } from '@tanstack/react-query'

export function useSignup() {
  return useMutation({ mutationFn: (user) => authApi.signUp(user) })
}

export function useLogin() {
  return useMutation({ mutationFn: (user) => authApi.signIn(user) })
}

export function useGoogleOAuth() {
  return useMutation({ mutationFn: (user) => authApi.oAuth(user) })
}

export function useUpdateMe() {
  return useMutation({ mutationFn: (user) => authApi.updateMe(user) })
}

export function useSignOut() {
  return useMutation({ mutationFn: () => authApi.signOut() })
}
