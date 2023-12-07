import { createBrowserRouter } from 'react-router-dom'

import { PATH } from '@/constants/path'
import { MainLayout } from '@/layouts/MainLayout'
import { AuthRoute } from '@/routes/AuthRoute'
import { PrivateRoute } from '@/routes/PrivateRoute'
import { PageNotFound } from '@/pages/PageNotFound'
import { Homepage } from '@/pages/Homepage'
import { About } from '@/pages/About'
import { Signup } from '@/pages/Signup'
import { Signin } from '@/pages/Signin'
import { Profile } from '@/pages/Profile'

export const router = createBrowserRouter([
  {
    path: PATH.HOMEPAGE,
    element: <MainLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: PATH.ABOUT,
        element: <About />,
      },
      {
        element: <AuthRoute />,
        children: [
          {
            path: PATH.SIGNUP,
            element: <Signup />,
          },
          {
            path: PATH.SIGNIN,
            element: <Signin />,
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: PATH.PROFILE,
            element: <Profile />,
          },
        ],
      },
    ],
  },
])
