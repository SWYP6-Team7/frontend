import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './components/NotFound'
import Login from './pages/Login'

import RegisterForm from './pages/RegisterForm'
import RegisterName from './pages/ResgiterName'
import RegisterPhoneNumber from './pages/RegisterPhoneNumber'
import RegisterTripStyle from './pages/RegisterTripStyle'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        // url 아직 안정해진건가요?
        path: 'login',
        element: <Login />
      },
      {
        path: 'registerForm',
        element: <RegisterForm />
      },
      {
        path: 'registerName',
        element: <RegisterName />
      },
      {
        path: 'registerPhoneNumber',
        element: <RegisterPhoneNumber />
      },
      {
        path: 'registerTripStyle',
        element: <RegisterTripStyle />
      }
    ]
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
