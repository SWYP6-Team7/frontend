import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './components/NotFound'
import Login from './pages/Login'

import RegisterForm from './pages/RegisterForm'
import RegisterName from './pages/RegisterName'
import RegisterPhoneNumber from './pages/RegisterPhoneNumber'
import RegisterTripStyle from './pages/RegisterTripStyle'
import RegisterGender from './pages/RegisterGender'
import OauthKakao from './pages/OauthKakao'
import OauthNaver from './pages/OauthNaver'
import OauthGoogle from './pages/OauthGoogle'
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
        path: 'login/oauth/kakao',
        element: <OauthKakao />
      },
      {
        path: 'login/oauth/naver',
        element: <OauthNaver />
      },
      {
        path: 'login/oauth/google',
        element: <OauthGoogle />
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
        element: <RegisterName />,
        children: [
          {
            path: 'RegisterGender',
            element: <RegisterGender />
          }
        ]
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
