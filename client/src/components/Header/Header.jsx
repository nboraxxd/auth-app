import { Link } from 'react-router-dom'
import { PATH } from '@/constants/path'

export default function Header() {
  return (
    <header className="bg-slate-200">
      <div className="container flex items-center justify-between py-3">
        <h1>
          <Link to={PATH.HOMEPAGE} className="font-bold">
            Auth App
          </Link>
        </h1>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link to={PATH.ABOUT}>About</Link>
            </li>
            <li>
              <Link to={PATH.SIGNIN}>Sign In</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
