import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from '@/constants/path'

export default function AuthRoute() {
  const [isLoggedIn] = useState(true)

  return isLoggedIn ? <Navigate to={PATH.PROFILE} replace /> : <Outlet />
}
