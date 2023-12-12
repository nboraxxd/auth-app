import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PATH } from '@/constants/path'

export default function PrivateRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return isAuthenticated ? <Outlet /> : <Navigate replace to={PATH.SIGN_IN} />
}
