"use client";
import styled from "@emotion/styled";
import TripDetailHeader from "@/page/TripDetail/TripDetailHeader";
import { palette } from "@/styles/palette";

import { useHeaderNavigation } from "@/hooks/useHeaderNavigation";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createTripStore } from "@/store/client/createTripStore";
import CloseIcon from "../icons/CloseIcon";
import MoreIcon from "../icons/MoreIcon";
import ProfileMoreIcon from "../icons/ProfileMoreIcon";
import { userProfileOverlayStore } from "@/store/client/userProfileOverlayStore";
import ReportModal from "../designSystem/modal/ReportModal";
import { useEffect, useState } from "react";
import useViewTransition from "@/hooks/useViewTransition";

interface UserProfileOverlayHeaderProps {
  setIsClickedCloseBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserProfileOverlayHeader = ({ setIsClickedCloseBtn }: UserProfileOverlayHeaderProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setProfileShow } = userProfileOverlayStore();

  //   const handleNotification = () => {
  //     setNotification(checkRoute.exact(ROUTES.MY.PAGE) ? ROUTES.MY.PAGE : ROUTES.MY.TRIP);
  //     router.push("/notification");
  //   };

  //   const headerBackgroundColorIsGrey = () => {
  //     return (
  //       checkRoute.exact(ROUTES.HOME) || checkRoute.exact(ROUTES.MY.TRIP) || checkRoute.startsWith(ROUTES.REQUESTED_TRIP)
  //     );
  //   };
  const closeOverlay = () => {
    setIsClickedCloseBtn(true);
  };
  const [isReportBtnClicked, setIsReportBtnClicked] = useState(false);
  const [reportThreeDotsClick, setReportThreeDotsClick] = useState(false);
  const [userNumber, setUserNumber] = useState(1);
  const navigateWithTransition = useViewTransition();
  useEffect(() => {
    if (isReportBtnClicked) {
      setIsReportBtnClicked(false);
      setIsClickedCloseBtn(true);
      setUserNumber(userNumber);
      document.documentElement.style.viewTransitionName = "forward";

      navigateWithTransition(`/report/userProfile/${userNumber}`);
    }
  }, [isReportBtnClicked]);
  return (
    <HeaderContainer>
      <RightFlex>
        <ButtonContainer onClick={closeOverlay}>
          <CloseIcon />
        </ButtonContainer>

        <ButtonContainer onClick={() => setReportThreeDotsClick(true)}>
          <ProfileMoreIcon />
        </ButtonContainer>
      </RightFlex>
      <ReportModal
        setIsReportBtnClicked={setIsReportBtnClicked}
        isOpen={reportThreeDotsClick}
        setIsOpen={setReportThreeDotsClick}
      />
    </HeaderContainer>
  );
};

// button에 cursor pointer 추가
const ButtonContainer = styled.button`
  cursor: pointer;
`;

// header container
// 상단 헤더 스타일
const HeaderContainer = styled.header<{ isBackGroundColorIsGrey: boolean; isBottomBorder: boolean }>`
  display: flex;
  padding: 52px 0px 16px 0px;
  height: 116px;
  align-items: center;
  gap: 22px;
  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 1000;
  justify-content: space-between;
  width: 100%;
  border-bottom: ${(props) => (props.isBottomBorder ? "1px" : "0")} solid ${palette.비강조3};
`;

const RightFlex = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export default UserProfileOverlayHeader;
