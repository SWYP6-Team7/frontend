"use client";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";

import { userProfileOverlayStore } from "@/store/client/userProfileOverlayStore";
import { keyframes } from "@emotion/react";
import UserProfileOverlayHeader from "./UserProfileOverlayHeader";
import UserProfileDetail from "./UserProfileDetail";
import UserTravelTabMenu from "./UserTravelTabMenu";

const HEADER_DETAIL_HEIGHT = 529;
const TAB_NAVBAR_HEIGHT = 52;

export default function UserProfileOverlay() {
  const { setProfileShow, profileShow } = userProfileOverlayStore();
  //   const navigateWithTransition = useViewTransition()
  const [isClickedCloseBtn, setIsClickedCloseBtn] = useState(false);

  useEffect(() => {
    if (isClickedCloseBtn) {
      setTimeout(() => {
        setProfileShow(false);
        setIsClickedCloseBtn(false);
      }, 300);
    }
  }, [isClickedCloseBtn]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabHeight, setTabHeight] = useState(0);

  useEffect(() => {
    if (bottomRef.current?.parentElement) {
      const scrollHeight = bottomRef.current.parentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      const newHeight = Math.max(scrollHeight, windowHeight);

      console.log("scrollHeight:", scrollHeight);
      console.log("window.innerHeight:", windowHeight);

      setHeight(newHeight);
    }
  }, [profileShow]);

  useEffect(() => {
    const handlePopState = () => {
      // 뒤로가기 하면 프로필 모달 화면 닫기.
      setProfileShow(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    setHeight(tabHeight + HEADER_DETAIL_HEIGHT + TAB_NAVBAR_HEIGHT);
  }, [tabHeight]);

  return (
    <>
      {profileShow && (
        <OverlayWrapper isClickedCloseBtn={isClickedCloseBtn} height={height}>
          <UserProfileOverlayHeader setIsClickedCloseBtn={setIsClickedCloseBtn} />
          <UserProfileDetail />
          <UserTravelTabMenu
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            setTabHeight={setTabHeight}
            tabHeight={tabHeight}
          />
          <div ref={bottomRef} style={{ height: "1px" }}></div> {/* 마지막 요소 */}
        </OverlayWrapper>
      )}
    </>
  );
}

const slideUp = keyframes`
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0%);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translate(-50%, 0%);
    opacity: 1;
  }
  to {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
`;
const OverlayWrapper = styled.div<{ isClickedCloseBtn: boolean; height: number }>`
  width: 100%;
  min-height: 100vh;
  padding: 0px 24px;
  position: absolute;
  z-index: 1001;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  height: ${({ height }) => height}px;
  @media (min-width: 440px) {
    width: 390px;
  }
  left: 50%;
  animation: ${(props) => (props.isClickedCloseBtn ? slideDown : slideUp)} 0.3s ease-out forwards;
`;
