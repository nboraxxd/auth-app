import { Link } from 'react-router-dom'
import { PATH } from '@/constants/path'

export default function Header() {
  return (
    <header className="bg-slate-200">
      <div className="container flex items-center justify-between py-3">
        <Link to={PATH.HOMEPAGE} className="p-1 font-bold">
          Auth App
        </Link>

        <nav>
          <ul className="flex gap-4">
            <li>
              <Link to={PATH.ABOUT} className="p-1">
                About
              </Link>
            </li>
            <li>
              <Link to={PATH.SIGN_IN} className="p-1">
                Sign In
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
