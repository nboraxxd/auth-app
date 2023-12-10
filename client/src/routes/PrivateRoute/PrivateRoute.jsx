import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from '@/constants/path'

export default function PrivateRoute() {
  const [isLoggedIn] = useState(false)

  return isLoggedIn ? <Outlet /> : <Navigate replace to={PATH.SIGNIN} />
}
