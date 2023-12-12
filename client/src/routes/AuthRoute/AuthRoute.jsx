import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PATH } from '@/constants/path'

export default function AuthRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return isAuthenticated ? <Navigate to={PATH.PROFILE} replace /> : <Outlet />
}
