import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home/Home'
import NotFound from './components/NotFound'
import Login from './pages/Login'

import RegisterForm from './pages/RegisterForm'
import RegisterName from './pages/RegisterName'
import RegisterTripStyle from './pages/RegisterTripStyle'
import RegisterGender from './pages/RegisterGender'
import OauthKakao from './pages/OauthKakao'
import OauthNaver from './pages/OauthNaver'
import OauthGoogle from './pages/OauthGoogle'
import SearchTravel from './pages/SearchTravel'
import MyPage from './pages/MyPage/MyPage'
import Bookmark from './pages/Bookmark/Bookmark'
import Community from './pages/Community/Community'
import CreateTripDetail from './pages/CreateTrip/CreateTripDetail/CreateTripDetail'

import CreateTripPlace from './pages/CreateTrip/CreateTripPlace'
import CreateTripIntroduce from './pages/CreateTrip/CreateTripIntroduce'
import RegisterAge from './pages/RegisterAge'
import ApplyTrip from './pages/ApplyTrip'
import TripDetail from './pages/TripDetail/TripDetail'
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
        element: <RegisterName />
      },

      {
        path: 'registerAge',
        element: <RegisterAge />,
        children: [
          {
            path: 'registerGender',
            element: <RegisterGender />
          }
        ]
      },
      {
        path: 'registerTripStyle',
        element: <RegisterTripStyle />
      },
      {
        path: 'search',
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          {
            path: 'travel',
            element: <SearchTravel />
          }
        ]
      },
      {
        path: '/myPage',
        element: <MyPage />
      },

      {
        path: '/bookmark',
        element: <Bookmark />
      },
      {
        path: '/community',
        element: <Community />
      },
      {
        path: '/createTripPlace',
        element: <CreateTripPlace />
      },
      {
        path: '/createTripIntroduce',
        element: <CreateTripIntroduce />
      },
      {
        path: 'createTripDetail',
        element: <CreateTripDetail />
      },
      {
        path: 'trip/apply/:travelNumber',
        element: <ApplyTrip />
      },
      {
        path: 'trip/detail/:travelNumber',
        element: <TripDetail />
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
