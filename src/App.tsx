import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import RegisterForm from './pages/Register/RegisterForm'
import RegisterName from './pages/Register/RegisterName'
import RegisterTripStyle from './pages/Register/RegisterTripStyle'
import RegisterGender from './pages/Register/RegisterGender'
import OauthKakao from './pages/Login/OauthKakao'
import OauthNaver from './pages/Login/OauthNaver'
import OauthGoogle from './pages/Login/OauthGoogle'
import SearchTravel from './pages/Seacrh/SearchTravel'
import MyPage from './pages/MyPage/MyPage'
import Bookmark from './pages/Bookmark/Bookmark'
import Community from './pages/Community/Community'
import CreateTripDetail from './pages/CreateTrip/CreateTripDetail/CreateTripDetail'
import CreateTripPlace from './pages/CreateTrip/CreateTripPlace'
import CreateTripIntroduce from './pages/CreateTrip/CreateTripIntroduce'
import RegisterAge from './pages/Register/RegisterAge'
import ApplyTrip from './pages/ApplyTrip'
import TripDetail from './pages/TripDetail/TripDetail'
import TripEnrollmentList from './pages/TripAcceptance/TripEnrollmentList'
import Notifications from './pages/Notifications'
import TripEdit from './pages/TripDetail/TripEdit'
import EditTripPlace from './pages/TripDetail/EditTripPlace'
import TripList from './pages/TripList/TripList'
import ServiceTerms from './pages/Terms/ServiceTerms'
import MyTrip from './pages/MyTrip/MyTrip'
import EditMyInfo from './pages/MyPage/EditMyInfo'
import EditMyName from './pages/MyPage/EditMyName'
import TripComment from './pages/Comment/TripComment'
import RegisterDone from './pages/Register/RegisterDone'
import OnBoarding from './pages/OnBoarding/OnBoarding'
import CreateCommunity from './pages/Community/CreateCommunity'
import SearchCommunity from './pages/Seacrh/SearchCommunity'
import DetailCommunity from './pages/Community/DetailCommunity'
import EditCommunity from './pages/Community/EditCommunity'
import EditMyPassword from './pages/MyPage/EditMyPassword'
import EditMyTag from './pages/MyPage/EditMyTag'
import Withdrawal from './pages/MyPage/Withdrawal'
import NewPassword from './pages/MyPage/NewPassword'
import Announcement from './pages/MyPage/Announcement'
import RequestedTrip from './pages/MyTrip/RequestedTrip'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: (
          <>
            <Home />
          </>
        )
      },
      {
        path: 'login/oauth/kakao/callback',
        element: <OauthKakao />
      },
      {
        path: 'login/oauth/naver/callback',
        element: <OauthNaver />
      },
      {
        path: 'login/oauth/google/callback',
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
        path: 'registerDone',
        element: <RegisterDone />
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
          },
          {
            path: 'community',
            element: <SearchCommunity />
          }
        ]
      },
      {
        path: '/myPage',
        element: <MyPage />
      },
      {
        path: '/editMyInfo',
        element: <EditMyInfo />
      },
      {
        path: '/editMyName',
        element: <EditMyName />
      },
      {
        path: '/bookmark',
        element: <Bookmark />
      },
      {
        path: '/community',
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          {
            path: '',
            element: <Community />
          },
          {
            path: 'create',
            element: <CreateCommunity />
          },
          {
            path: 'detail/:communityNumber',
            element: <DetailCommunity />
          },
          {
            path: 'edit/:communityNumber',
            element: <EditCommunity />
          }
        ]
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
      },
      {
        path: 'trip/enrollmentList/:travelNumber',
        element: <TripEnrollmentList />
      },
      {
        path: 'notification',
        element: <Notifications />
      },
      {
        path: 'trip/edit/:travelNumber',
        element: <TripEdit />
      },
      {
        path: 'editPlace/:travelNumber',
        element: <EditTripPlace />
      },
      {
        path: 'trip/list',
        element: <TripList />
      },

      { path: 'trip/comment/:travelNumber', element: <TripComment /> },
      {
        path: 'terms',
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          {
            path: 'service',
            element: <ServiceTerms />
          }
        ]
      },
      {
        path: 'myTrip',
        element: <MyTrip />
      },
      {
        path: '/onBoarding',
        element: <OnBoarding />
      },
      {
        path: '/editMyPassword',
        element: <EditMyPassword />
      },
      {
        path: '/editMyPassword2',
        element: <NewPassword />
      },
      {
        path: '/editMyTag',
        element: <EditMyTag />
      },
      {
        path: '/withdrawal',
        element: <Withdrawal />
      },
      {
        path: '/announcement',
        element: <Announcement />
      },
      {
        path: '/requestedTrip',
        element: <RequestedTrip />
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
