import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from '@/router'
import '@/globals.css'

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster theme="dark" duration={3000} />
    </>
  )
}
