import { createBrowserRouter, RouterProvider } from 'react-router'

import { SetupVerificationScreen } from '@/app/SetupVerificationScreen'

const router = createBrowserRouter([
  {
    path: '/',
    element: <SetupVerificationScreen />,
  },
])

export function App() {
  return <RouterProvider router={router} />
}
