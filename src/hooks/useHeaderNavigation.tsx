import { useNavigate, useLocation } from 'react-router-dom'
import { userStore } from '@/store/client/userStore'
import { ReactNode } from 'react'
import { useBackPathStore } from '@/store/client/backPathStore'

const ROUTES = {
  REGISTER: '/register',
  CREATE_TRIP: {
    INDEX: '/createTrip',
    PLACE: '/createTripPlace',
    INTRODUCE: '/createTripIntroduce',
    DETAIL: '/createTripDetail'
  },
  SEARCH: {
    TRAVEL: '/search/travel',
    COMMUNITY: '/search/community'
  },
  TRIP: {
    DETAIL: '/trip/detail',
    ENROLLMENT_LIST: '/trip/enrollmentList',
    EDIT: '/trip/edit',
    APPLY: '/trip/apply',
    LIST: '/trip/list',
    COMMENT: '/trip/comment'
  },
  COMMUNITY: {
    INDEX: '/community',
    CREATE: '/community/create',
    DETAIL: '/community/detail',
    EDIT: '/community/edit'
  },
  MY: {
    TRIP: '/myTrip',
    PAGE: '/myPage',
    EDIT_INFO: '/editMyInfo',
    EDIT_NAME: '/editMyName',
    EDIT_PASSWORD: '/editMyPassword',
    EDIT_TAG: '/editMyTag',
    WITHDRAWAL: '/withdrawal'
  },
  REGISTER_PROCESS: {
    AGE: '/registerAge',
    GENDER: '/registerAge/registerGender',
    FORM: '/registerForm',
    NAME: '/registerName',
    TRIP_STYLE: '/registerTripStyle'
  },
  LOGIN: '/login',
  NOTIFICATION: '/notification',
  ANNOUNCEMENT: '/announcement',
  REQUESTED_TRIP: '/requestedTrip',
  MY_COMMUNITY: '/myCommunity',
  HOME: '/'
}

export const useHeaderNavigation = () => {
  const navigate = useNavigate()
  const {
    searchTravel,
    setSearchTravel,
    notification,
    setNotification,
    createTripPlace,
    setCreateTripPlace,
    travelDetail,
    setTravelDetail
  } = useBackPathStore()
  const location = useLocation()
  const {
    resetAge,
    resetForm,
    resetGender,
    resetName,
    socialLogin,
    setSocialLogin
  } = userStore()

  const checkRoute = {
    startsWith: (route: string) => location.pathname.startsWith(route),
    exact: (route: string) => location.pathname === route
  }

  const getPageTitle = () => {
    const titleMap: { [key: string]: ReactNode } = {
      [ROUTES.MY.TRIP]: '내 여행',
      [ROUTES.MY_COMMUNITY]: '작성한 글',
      [ROUTES.MY.PAGE]: '마이 페이지',
      [ROUTES.REGISTER]: '회원가입',
      [ROUTES.SEARCH.TRAVEL]: '여행검색',
      [ROUTES.SEARCH.COMMUNITY]: '검색',
      [ROUTES.CREATE_TRIP.INDEX]: '여행 만들기',
      [ROUTES.TRIP.APPLY]: '참가 신청',
      [ROUTES.TRIP.ENROLLMENT_LIST]: '참가 신청 목록',
      [ROUTES.TRIP.COMMENT]: '멤버 댓글',
      [ROUTES.NOTIFICATION]: '알림',
      [ROUTES.MY.EDIT_INFO]: '내 정보 수정',
      [ROUTES.MY.EDIT_NAME]: '이름 변경',
      [ROUTES.COMMUNITY.CREATE]: '글쓰기',
      [ROUTES.COMMUNITY.EDIT]: '수정하기',
      [ROUTES.MY.EDIT_PASSWORD]: '비밀번호 변경',
      [ROUTES.MY.EDIT_TAG]: '태그 수정',
      [ROUTES.MY.WITHDRAWAL]: '탈퇴하기',
      [ROUTES.ANNOUNCEMENT]: '공지사항',
      [ROUTES.REQUESTED_TRIP]: '참가 신청한 여행'
    }

    for (const [route, title] of Object.entries(titleMap)) {
      if (checkRoute.startsWith(route)) return title
    }

    return ''
  }

  const createNavigationRules = (pathname: string) => {
    const isGoogleLogin = socialLogin === 'google'
    const isKakaoLogin = socialLogin === 'kakao'

    return [
      // 회원가입 파트
      {
        condition: () => pathname.startsWith(ROUTES.REGISTER_PROCESS.FORM),
        action: () => {
          if (isKakaoLogin) {
            setSocialLogin(null, null)
          }
          navigate(ROUTES.LOGIN)
          resetForm()
        }
      },
      {
        condition: () => pathname.startsWith(ROUTES.REGISTER_PROCESS.NAME),
        action: () => {
          resetName()
          navigate(ROUTES.REGISTER_PROCESS.FORM)
        }
      },
      {
        condition: () => pathname.startsWith(ROUTES.REGISTER_PROCESS.AGE),
        action: () => {
          if (isGoogleLogin) {
            resetAge()
            navigate(ROUTES.LOGIN)
            setSocialLogin(null, null)
            return
          }
          if (isKakaoLogin) {
            resetAge()
            navigate(ROUTES.REGISTER_PROCESS.FORM)
            return
          }
          resetAge()
          navigate(ROUTES.REGISTER_PROCESS.FORM)
        }
      },
      {
        condition: () => pathname.startsWith(ROUTES.REGISTER_PROCESS.GENDER),
        action: () => {
          resetGender()
          navigate(ROUTES.REGISTER_PROCESS.AGE)
        }
      },
      {
        condition: () =>
          pathname.startsWith(ROUTES.REGISTER_PROCESS.TRIP_STYLE),
        action: () => {
          navigate(ROUTES.REGISTER_PROCESS.AGE)
        }
      },

      // 검색 파트
      {
        condition: () => pathname.startsWith(ROUTES.SEARCH.TRAVEL),
        action: () => {
          navigate(searchTravel)
          setSearchTravel('/')
        }
      },
      {
        condition: () => pathname.startsWith(ROUTES.SEARCH.COMMUNITY),
        action: () => {
          navigate(ROUTES.COMMUNITY.INDEX)
        }
      },

      // 알림 파트
      {
        condition: () => pathname.startsWith(ROUTES.NOTIFICATION),
        action: () => {
          setNotification('/')
          navigate(notification)
        }
      },

      // 여행 만들기
      {
        condition: () => pathname.startsWith(ROUTES.CREATE_TRIP.PLACE),
        action: () => {
          setCreateTripPlace('/')
          navigate(createTripPlace)
        }
      },
      {
        condition: () => pathname.startsWith(ROUTES.CREATE_TRIP.INTRODUCE),
        action: () => {
          navigate(ROUTES.CREATE_TRIP.PLACE)
        }
      },
      {
        condition: () => pathname.startsWith(ROUTES.CREATE_TRIP.DETAIL),
        action: () => {
          navigate(ROUTES.CREATE_TRIP.INTRODUCE)
        }
      },

      // 여행 상세 파트
      {
        condition: () => pathname.startsWith(ROUTES.TRIP.DETAIL),
        action: () => navigate(ROUTES.TRIP.LIST)
      },

      // 여행 수정 파트
      // 얘는 지정하기가 너무 애매하네..
      {
        condition: () => pathname.startsWith(ROUTES.TRIP.EDIT),
        action: () => {
          navigate(-1)
        }
      },
      //여행 댓글
      {
        condition: () => pathname.startsWith(ROUTES.TRIP.COMMENT),
        action: () => {
          const parts = location.pathname.split('/')
          const id = parts[parts.length - 1]
          navigate(`/trip/detail/${id}`)
        }
      },

      // 참가 신청
      {
        condition: () => pathname.startsWith(ROUTES.TRIP.APPLY),
        action: () => {
          const parts = location.pathname.split('/')
          const id = parts[parts.length - 1]
          navigate(`/trip/detail/${id}`)
        }
      },
      // 참가 신청 목록
      {
        condition: () => pathname.startsWith(ROUTES.TRIP.ENROLLMENT_LIST),
        action: () => {
          const parts = location.pathname.split('/')
          const id = parts[parts.length - 1]
          navigate(`/trip/detail/${id}`)
        }
      },

      // 공지사항 파트
      {
        condition: () => pathname.startsWith(ROUTES.ANNOUNCEMENT),
        action: () => {
          navigate(ROUTES.MY.PAGE)
        }
      },
      // 참가 신청한 여행 파트
      {
        condition: () => pathname.startsWith(ROUTES.REQUESTED_TRIP),
        action: () => {
          navigate(ROUTES.MY.PAGE)
        }
      },
      // 작성한 글
      {
        condition: () => pathname.startsWith(ROUTES.MY_COMMUNITY),
        action: () => {
          navigate(ROUTES.MY.PAGE)
        }
      },

      // 이름 수정, 비밀번호 변경, 태그 변경
      {
        condition: () => pathname.startsWith(ROUTES.MY.EDIT_NAME),
        action: () => {
          navigate(ROUTES.MY.EDIT_INFO)
        }
      },
      {
        condition: () => pathname.startsWith(ROUTES.MY.EDIT_PASSWORD),
        action: () => {
          navigate(ROUTES.MY.EDIT_INFO)
        }
      },
      {
        condition: () => pathname.startsWith(ROUTES.MY.EDIT_TAG),
        action: () => {
          navigate(ROUTES.MY.EDIT_INFO)
        }
      },

      // 커뮤니티 글쓰기 파트
      {
        condition: () => pathname.startsWith(ROUTES.COMMUNITY.CREATE),
        action: () => navigate(ROUTES.COMMUNITY.INDEX)
      },

      // 커뮤니티 상세 파트
      {
        condition: () => pathname.startsWith(ROUTES.COMMUNITY.DETAIL),
        action: () => navigate(ROUTES.COMMUNITY.INDEX)
      },

      // 커뮤니티 수정
      {
        condition: () => pathname.startsWith(ROUTES.COMMUNITY.EDIT),
        action: () => {
          const parts = location.pathname.split('/')
          const id = parts[parts.length - 1]
          navigate(`/community/detail/${id}`)
        }
      }
    ]
  }

  // 뒤로가기 핸들러
  const handleBack = () => {
    const pathname = location.pathname
    const rules = createNavigationRules(pathname)
    const matchedRule = rules.find(rule => rule.condition())
    if (!document.startViewTransition) {
      if (matchedRule) {
        matchedRule.action()
        return
      }

      navigate(-1)
      return
    }
    document.documentElement.style.viewTransitionName = 'back'
    document.startViewTransition(() => {
      if (matchedRule) {
        matchedRule.action()
        return
      }

      navigate(-1)
    })
  }

  const shouldShowAlarmIcon = () =>
    checkRoute.startsWith(ROUTES.MY.TRIP) ||
    checkRoute.startsWith(ROUTES.MY.PAGE)

  const shouldShowSkip = () =>
    location.pathname === ROUTES.REGISTER_PROCESS.TRIP_STYLE

  return {
    ROUTES,
    checkRoute,
    getPageTitle,
    handleBack,
    shouldShowAlarmIcon,
    shouldShowSkip
  }
}
