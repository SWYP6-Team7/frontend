"use client";
import { useRouter, usePathname } from "next/navigation";
import { userStore } from "@/store/client/userStore";
import { ReactNode } from "react";
import { useBackPathStore } from "@/store/client/backPathStore";
import { useTransitionRouter } from "next-view-transitions";
import { tripDetailStore } from "@/store/client/tripDetailStore";

const ROUTES = {
  REGISTER: "/register",
  VERIFYCODE: "/verifyEmail",
  CREATE_TRIP: {
    INDEX: "/create/trip",
    REGION: "/create/trip/region",
    DATE: "/create/trip/date",
    INFO: "/create/trip/info",
    TAG: "/create/trip/tag",
    INTRODUCE: "/create/trip/introduce",
    DETAIL: "/create/trip/detail",
  },
  SEARCH: {
    TRAVEL: "/search/travel",
    COMMUNITY: "/search/community",
    PLACE: "/search/place",
  },
  TRIP: {
    DETAIL: "/trip/detail",
    ENROLLMENT_LIST: "/trip/enrollmentList",
    EDIT: "/trip/edit",
    APPLY: "/trip/apply",
    LIST: "/trip/list",
    COMMENT: "/trip/comment",
  },
  COMMUNITY: {
    INDEX: "/community",
    CREATE: "/community/create",
    DETAIL: "/community/detail",
    EDIT: "/community/edit",
  },
  MY: {
    TRIP: "/myTrip",
    PAGE: "/myPage",
    EDIT_INFO: "/editMyInfo",
    EDIT_NAME: "/editMyName",
    EDIT_PASSWORD: "/editMyPassword",
    EDIT_TAG: "/editMyTag",
    WITHDRAWAL: "/withdrawal",
  },
  REGISTER_PROCESS: {
    AGE: "/registerAge",

    GENDER: "/registerAge/registerGender",
    EMAIL: "/registerEmail",
    PASSWORD: "/registerPassword",
    NAME: "/registerName",
    TRIP_STYLE: "/registerTripStyle",
  },
  CONTACT: "/contact",
  LOGIN: "/login",
  NOTIFICATION: "/notification",
  ANNOUNCEMENT: "/announcement",
  REQUESTED_TRIP: "/requestedTrip",
  MY_COMMUNITY: "/myCommunity",
  HOME: "/",
  REPORT: "/report",
  BLOCK: "/block",
  EXPLANATION: "/explanation",
  USER_TRAVEL_LOG: "/userProfile/:userId/log",
};

export const useHeaderNavigation = () => {
  const originalRouter = useRouter();
  const router = useTransitionRouter();

  const {
    searchTravel,
    setSearchTravel,
    notification,
    setNotification,
    createTripPlace,
    setCreateTripPlace,
    travelDetail,
    setTravelDetail,
  } = useBackPathStore();
  const pathname = usePathname() || "/";
  const { resetAge, resetForm, resetGender, resetName, socialLogin, setSocialLogin } = userStore();
  const { resetTripDetail } = tripDetailStore();
  const pathToRegex = (path) => new RegExp("^" + path.replace(/:[^/]+/g, "[^/]+") + "$");

  const checkRoute = {
    startsWith: (route) => pathname?.startsWith(route),
    exact: (route) => {
      if (route.includes(":")) {
        // 동적 파라미터가 있을 때

        const regex = pathToRegex(route);
        console.log("regex", regex);
        return regex.test(pathname);
      }
      // 일반 라우트는 기존대로
      return pathname === route;
    },
  };
  const getPageTitle = () => {
    const titleMap: { [key: string]: ReactNode } = {
      [ROUTES.MY.TRIP]: "내 여행",
      [ROUTES.MY_COMMUNITY]: "작성한 글",
      [ROUTES.REPORT]: "신고하기",
      [ROUTES.MY.PAGE]: "마이 페이지",
      [ROUTES.REGISTER]: "회원가입",
      [ROUTES.VERIFYCODE]: "회원가입",
      [ROUTES.SEARCH.TRAVEL]: "여행검색",
      [ROUTES.SEARCH.COMMUNITY]: "검색",
      [ROUTES.CREATE_TRIP.INDEX]: "여행 만들기",
      [ROUTES.EXPLANATION]: "신고 소명",
      [ROUTES.TRIP.APPLY]: "참가 신청",
      [ROUTES.TRIP.ENROLLMENT_LIST]: "참가 신청 목록",
      [ROUTES.TRIP.COMMENT]: "멤버 댓글",
      [ROUTES.NOTIFICATION]: "알림",
      [ROUTES.MY.EDIT_INFO]: "내 정보 수정",
      [ROUTES.MY.EDIT_NAME]: "이름 변경",
      [ROUTES.COMMUNITY.CREATE]: "글쓰기",
      [ROUTES.COMMUNITY.EDIT]: "수정하기",
      [ROUTES.MY.EDIT_PASSWORD]: "비밀번호 변경",
      [ROUTES.MY.EDIT_TAG]: "태그 수정",
      [ROUTES.MY.WITHDRAWAL]: "탈퇴하기",
      [ROUTES.ANNOUNCEMENT]: "공지사항",
      [ROUTES.REQUESTED_TRIP]: "참가 신청한 여행",
      [ROUTES.CONTACT]: "1:1 문의하기",
    };

    for (const [route, title] of Object.entries(titleMap)) {
      if (checkRoute.startsWith(route)) return title;
    }

    if (checkRoute.exact(ROUTES.USER_TRAVEL_LOG)) {
      return "방문한 국가";
    }

    return "";
  };

  const createNavigationRules = (pathname: string) => {
    const isGoogleLogin = socialLogin === "google";
    const isKakaoLogin = socialLogin === "kakao";

    return [
      // 회원가입 파트
      {
        condition: () => pathname.startsWith(ROUTES.REGISTER_PROCESS.EMAIL),
        action: () => {
          if (isKakaoLogin) {
            setSocialLogin(null, null);
          }
          router.push(ROUTES.LOGIN);
          resetForm();
        },
      },
      {
        condition: () => pathname.startsWith(ROUTES.VERIFYCODE),
        action: () => {
          originalRouter.push(ROUTES.REGISTER_PROCESS.EMAIL);
          resetForm();
        },
      },
      {
        condition: () => pathname.startsWith(ROUTES.REGISTER_PROCESS.NAME),
        action: () => {
          resetName();
          originalRouter.push(ROUTES.REGISTER_PROCESS.PASSWORD);
        },
      },
      {
        condition: () => pathname.startsWith(ROUTES.REGISTER_PROCESS.AGE),
        action: () => {
          if (isGoogleLogin) {
            resetAge();
            originalRouter.push(ROUTES.LOGIN);
            setSocialLogin(null, null);
            return;
          }
          if (isKakaoLogin) {
            resetAge();
            originalRouter.push(ROUTES.REGISTER_PROCESS.EMAIL);
            return;
          }
          resetAge();
          originalRouter.push(ROUTES.REGISTER_PROCESS.NAME);
        },
      },
      {
        condition: () => pathname.startsWith(ROUTES.REGISTER_PROCESS.GENDER),
        action: () => {
          resetGender();
          originalRouter.push(ROUTES.REGISTER_PROCESS.AGE);
        },
      },
      {
        condition: () => pathname.startsWith(ROUTES.REGISTER_PROCESS.TRIP_STYLE),
        action: () => {
          originalRouter.push(ROUTES.REGISTER_PROCESS.AGE);
        },
      },

      // 검색 파트
      {
        condition: () => pathname.startsWith(ROUTES.SEARCH.TRAVEL),
        action: () => {
          router.push(searchTravel);
        },
      },
      {
        condition: () => pathname.startsWith(ROUTES.SEARCH.COMMUNITY),
        action: () => {
          router.push(ROUTES.COMMUNITY.INDEX);
        },
      },

      // 알림 파트
      {
        condition: () => pathname.startsWith(ROUTES.NOTIFICATION),
        action: () => {
          setNotification("/");
          router.back();
        },
      },

      // 여행 만들기
      {
        condition: () => pathname.startsWith(ROUTES.CREATE_TRIP.REGION),
        action: () => {
          setCreateTripPlace("/");
          router.push(createTripPlace);
        },
      },
      {
        condition: () => pathname.startsWith(ROUTES.CREATE_TRIP.DATE),
        action: () => {
          router.push(ROUTES.CREATE_TRIP.REGION);
        },
      },
      {
        condition: () => pathname.startsWith(ROUTES.CREATE_TRIP.INFO),
        action: () => {
          router.push(ROUTES.CREATE_TRIP.DATE);
        },
      },
      {
        condition: () => pathname.startsWith(ROUTES.CREATE_TRIP.TAG),
        action: () => {
          router.push(ROUTES.CREATE_TRIP.INFO);
        },
      },
      {
        condition: () => pathname.startsWith(ROUTES.CREATE_TRIP.INTRODUCE),
        action: () => {
          router.push(ROUTES.CREATE_TRIP.TAG);
        },
      },
      {
        condition: () => pathname.startsWith(ROUTES.CREATE_TRIP.DETAIL),
        action: () => {
          router.push(ROUTES.CREATE_TRIP.INTRODUCE);
        },
      },

      // 여행 상세 파트
      {
        condition: () => pathname.startsWith(ROUTES.TRIP.DETAIL),
        action: () => {
          resetTripDetail();
          router.push(travelDetail);
          setTravelDetail("/");
        },
      },

      // 여행 수정 파트
      // 얘는 지정하기가 너무 애매하네..
      {
        condition: () => pathname.startsWith(ROUTES.TRIP.EDIT),
        action: () => {
          router.back();
        },
      },
      //여행 댓글
      {
        condition: () => pathname.startsWith(ROUTES.TRIP.COMMENT),
        action: () => {
          const parts = pathname.split("/");
          const id = parts[parts.length - 1];
          router.push(`/trip/detail/${id}`);
        },
      },

      // 참가 신청
      {
        condition: () => pathname.startsWith(ROUTES.TRIP.APPLY),
        action: () => {
          const parts = pathname.split("/");
          const id = parts[parts.length - 1];
          //router.push(`/trip/detail/${id}`);
          router.back();
        },
      },
      // 참가 신청 목록
      {
        condition: () => pathname.startsWith(ROUTES.TRIP.ENROLLMENT_LIST),
        action: () => {
          const parts = pathname.split("/");
          const id = parts[parts.length - 1];
          router.push(`/trip/detail/${id}`);
        },
      },

      // 공지사항 파트
      {
        condition: () => pathname.startsWith(ROUTES.ANNOUNCEMENT),
        action: () => {
          router.push(ROUTES.MY.PAGE);
        },
      },
      // 참가 신청한 여행 파트
      {
        condition: () => pathname.startsWith(ROUTES.REQUESTED_TRIP),
        action: () => {
          router.push(ROUTES.MY.PAGE);
        },
      },
      // 작성한 글
      {
        condition: () => pathname.startsWith(ROUTES.MY_COMMUNITY),
        action: () => {
          router.push(ROUTES.MY.PAGE);
        },
      },

      // 이름 수정, 비밀번호 변경, 태그 변경
      {
        condition: () => pathname.startsWith(ROUTES.MY.EDIT_NAME),
        action: () => {
          router.push(ROUTES.MY.EDIT_INFO);
        },
      },
      {
        condition: () => pathname.startsWith(ROUTES.MY.EDIT_PASSWORD),
        action: () => {
          router.push(ROUTES.MY.EDIT_INFO);
        },
      },
      {
        condition: () => pathname.startsWith(ROUTES.MY.EDIT_TAG),
        action: () => {
          router.push(ROUTES.MY.EDIT_INFO);
        },
      },

      // 커뮤니티 글쓰기 파트
      {
        condition: () => pathname.startsWith(ROUTES.COMMUNITY.CREATE),
        action: () => router.push(ROUTES.COMMUNITY.INDEX),
      },

      // 커뮤니티 상세 파트
      {
        condition: () => pathname.startsWith(ROUTES.COMMUNITY.DETAIL),
        action: () => router.push(ROUTES.COMMUNITY.INDEX),
      },
      // 신고 소명
      {
        condition: () => pathname.startsWith(ROUTES.EXPLANATION),
        action: () => router.push(ROUTES.NOTIFICATION),
      },

      // 커뮤니티 수정
      {
        condition: () => pathname.startsWith(ROUTES.COMMUNITY.EDIT),
        action: () => {
          const parts = pathname.split("/");
          const id = parts[parts.length - 1];
          router.push(`/community/detail/${id}`);
        },
      },
    ];
  };

  // 뒤로가기 핸들러
  const handleBack = () => {
    const rules = createNavigationRules(pathname);
    const matchedRule = rules.find((rule) => rule.condition());
    document.documentElement.style.viewTransitionName = checkRoute.startsWith(ROUTES.CREATE_TRIP.INDEX)
      ? "instant"
      : "back";

    if (matchedRule) {
      matchedRule.action();
      return;
    }

    router.back();
  };

  const shouldShowAlarmIcon = () => checkRoute.startsWith(ROUTES.MY.TRIP) || checkRoute.startsWith(ROUTES.MY.PAGE);

  const shouldShowSkip = () => pathname === ROUTES.REGISTER_PROCESS.TRIP_STYLE || pathname === ROUTES.CREATE_TRIP.TAG;

  return {
    ROUTES,
    checkRoute,
    getPageTitle,
    handleBack,
    shouldShowAlarmIcon,
    shouldShowSkip,
  };
};
