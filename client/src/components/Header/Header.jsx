import { Link } from 'react-router-dom'
import { PATH } from '@/constants/path'
import { useSelector } from 'react-redux'
import { AvatarImage } from '../AvatarImage'

export default function Header() {
  const { currentUser, isAuthenticated } = useSelector((state) => state.auth)

  return (
    <header className="bg-slate-200">
      <div className="container flex items-center justify-between py-3">
        <Link to={PATH.HOMEPAGE} className="p-1 font-bold">
          Auth App
        </Link>

        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link to={PATH.ABOUT} className="inline-block p-1">
                About
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                <Link to={PATH.PROFILE} className="flex items-center">
                  <AvatarImage src={currentUser.photo_url} alt={currentUser.username} w={9} h={9} />
                </Link>
              ) : (
                <Link to={PATH.SIGN_IN} className="inline-block p-1">
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
