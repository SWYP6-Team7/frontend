"use client";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";

import { userProfileOverlayStore } from "@/store/client/userProfileOverlayStore";
import { keyframes } from "@emotion/react";
import UserProfileOverlayHeader from "./UserProfileOverlayHeader";
import UserProfileDetail from "./UserProfileDetail";
import UserTravelTabMenu from "./UserTravelTabMenu";

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
  useEffect(() => {
    console.log(bottomRef.current, "존재");
    if (bottomRef.current) {
      const bottom = bottomRef.current.getBoundingClientRect().bottom;
      setHeight(bottom);
    }
  }, [profileShow]);

  return (
    <>
      {profileShow && (
        <OverlayWrapper isClickedCloseBtn={isClickedCloseBtn} height={height}>
          <UserProfileOverlayHeader setIsClickedCloseBtn={setIsClickedCloseBtn} />
          <UserProfileDetail />
          <UserTravelTabMenu />
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
  padding: 0px 24px;
  position: absolute;
  z-index: 1001;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  height: ${({ height }) => height}px;
  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
  }
  left: 50%;
  animation: ${(props) => (props.isClickedCloseBtn ? slideDown : slideUp)} 0.3s ease-out forwards;
`;
