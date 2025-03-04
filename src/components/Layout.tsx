"use client";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import Header from "./Header";

import Navbar from "@/page/Home/Navbar";
import { authStore } from "@/store/client/authStore";
import path from "path";
import { palette } from "@/styles/palette";
import useAuth from "@/hooks/user/useAuth";
import { myPageStore } from "@/store/client/myPageStore";
import useMyPage from "@/hooks/myPage/useMyPage";
import { ImyPage, IProfileImg } from "@/model/myPages";
import Splash from "@/page/Splash";
import { splashOnStore } from "@/store/client/splashOnOffStore";
import { usePathname } from "next/navigation";
import { APIProvider } from "@vis.gl/react-google-maps";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { userPostRefreshToken } = useAuth();
  const { userId, accessToken, logoutCheck } = authStore();
  // 유저 프로필 정보 불러오기
  const { addEmail, addProfileUrl, addName, addGender, addAgegroup, addPreferredTags, profileUrl, addUserSocialTF } =
    myPageStore();

  const { data, isLoading, profileImage, isLoadingImage, firstProfileImageMutation, isFirstProfileImagePostSuccess } =
    useMyPage();
  console.log(data, "user data");
  const isOnboarding = pathname?.startsWith("/onBoarding");

  const isCommunityDetail = pathname?.startsWith("/community/detail");

  const myPageData: ImyPage = data as any;
  const profileImg: IProfileImg = profileImage as IProfileImg;
  console.log(profileImg, profileImage, "프로필 이미지 get");
  useEffect(() => {
    if (!isLoading && myPageData) {
      addName(myPageData.name);
      addAgegroup(myPageData.ageGroup);
      addEmail(myPageData.email);
      addPreferredTags(myPageData.preferredTags);
      addGender(myPageData.gender);
      addUserSocialTF(myPageData.userSocialTF);
      const tags: string[] = [];
      for (const tag of myPageData.preferredTags) {
        const text = tag.split(" ");

        tags.push(text[text.length - 1]);
      }
      addPreferredTags(tags);
    }
    if (!isLoadingImage && profileImg) {
      addProfileUrl(profileImg.url);
    }
  }, [isLoading, myPageData, profileImage, isLoadingImage]); // 새로고침 시, 토큰이 다시 생겼을 때 정보 할당히 가능하도록.

  useEffect(() => {
    if (
      accessToken !== null &&
      !isLoadingImage &&
      !profileImg &&
      !isFirstProfileImagePostSuccess // 성공 여부 확인
    ) {
      // 이미 가입한 회원들의 경우. post 요청으로 첫 이미지 등록 요청.
      firstProfileImageMutation(accessToken);
    }
  }, [accessToken, isLoadingImage, profileImg, isFirstProfileImagePostSuccess]);

  useEffect(() => {
    // 컴포넌트가 렌더링될 때마다 토큰 갱신 시도(새로고침시 토큰 사라지는 문제해결 위해)
    if (!accessToken && !logoutCheck) {
      // 토큰이 없으면 리프레쉬 토큰 api 요청.
      const refreshAccessToken = async () => {
        userPostRefreshToken();
      };

      refreshAccessToken();
    }
  }, [accessToken]);

  const { splashOn } = splashOnStore();
  // 배경이 검색창 색인 경우 제외하고는 BG색. 노치 영역 색 지정해서 변경시키기.
  const backGroundGrey = ["/trip/detail", "/", "/myTrip", "/requestedTrip"];
  useEffect(() => {
    if (splashOn === true) return;
    let themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
    if (themeColorMetaTag) {
      themeColorMetaTag.setAttribute("content", backGroundGrey.includes(pathname ?? "") ? "#F5F5F5" : `${palette.BG}`);
    }
  }, [pathname]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""} onLoad={() => console.log("google map load")}>
      <Container pathname={pathname}>
        <Splash />
        <Body pathname={pathname}>
          {/* {isSignup && <Header />} */}
          {/* 홈 화면 헤더는 다른 형태. */}
          {pathname !== "/" &&
            !isOnboarding &&
            pathname !== "/registerDone" &&
            pathname !== "/login" &&
            pathname !== "/trip/list" &&
            pathname !== "/community" && <Header />}
          {children}
          {/* {accessToken || isAccessTokenNoNeedpages(pathname) ? (
          <Outlet />
        ) : (
          <Navigate to="/login" />
        )} */}

          {/* 로그인을 해야만 보이는거 처리. */}
          <Navbar />
        </Body>
      </Container>
    </APIProvider>
  );
};

// 대중적인 mobile device는 430px 미만
// 그렇기 때문에 440px 이상이면 모바일 환경이 아니라고 생각하고 max-width를 figma layout에 맞춤
const Body = styled.div<{ pathname: string | null }>`
  width: 100svw;
  height: 100%;
  position: relative;

  background-color: ${(props) =>
    props.pathname === "/"
      ? "#f0f0f0"
      : props.pathname?.startsWith("/trip/detail") ||
          props.pathname?.startsWith("/myTrip") ||
          props.pathname?.startsWith("/requestedTrip")
        ? `${palette.검색창}`
        : `${palette.BG}`};

  @media (max-width: 440px) {
    width: 100svw;
  }
  @media (min-width: 440px) {
    width: 390px;
    overflow-x: hidden;
  }
  &::-webkit-scrollbar {
    // scrollbar 자체의 설정
    // 너비를 작게 설정
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    // scrollbar의 배경부분 설정
    // 부모와 동일하게 함(나중에 절전모드, 밤모드 추가되면 수정하기 번거로우니까... 미리 보이는 노동은 최소화)
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    // scrollbar의 bar 부분 설정
    // 동글동글한 회색 바를 만든다.
    border-radius: 1rem;
    height: 80px;
    background: rgba(217, 217, 217, 1);
  }
  &::-webkit-scrollbar-button {
    // scrollbar의 상하단 위/아래 이동 버튼
    // 크기를 안줘서 안보이게 함.
    width: 0;
    height: 0;
  }
`;
// pc환경에서 화면을 가운데 정렬하기 위한 레이아웃 스타일
const Container = styled.div<{ pathname: string | null }>`
  /* height는 홈화면 스크롤을 보기 위해서 auto로 잡아두기. width는 가로스크롤이 생겨서 auto로. */
  height: ${(props) => (props.pathname !== "/" ? "100svh" : "auto")};
  width: ${(props) => (props.pathname !== "/" ? "100svw" : "auto")};

  overflow-x: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Layout;
