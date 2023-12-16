import ms from 'ms'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import { authApi } from '@/apis/auth.api'

export function useSignup() {
  return useMutation({ mutationFn: (user) => authApi.signUp(user) })
}

export function useLogin() {
  return useMutation({ mutationFn: (user) => authApi.signIn(user) })
}

export function useGoogleOAuth() {
  return useMutation({ mutationFn: (user) => authApi.oAuth(user) })
}

export function useGetMe() {
  const { currentUser } = useSelector((state) => state.auth)

  return useQuery({
    queryKey: ['me'],
    queryFn: authApi.getMe,
    staleTime: ms('15s'),
    initialData: { data: { result: currentUser } },
  })
}

export function useUpdateMe() {
  return useMutation({ mutationFn: (user) => authApi.updateMe(user) })
}

export function useSignOut() {
  return useMutation({ mutationFn: () => authApi.signOut() })
}

export function useDeleteAccount() {
  return useMutation({ mutationFn: () => authApi.delteMe() })
}
