"use client";
import styled from "@emotion/styled";
import BackIcon from "./icons/BackIcon";
import TripDetailHeader from "@/page/TripDetail/TripDetailHeader";
import AlarmIcon from "./icons/AlarmIcon";
import { palette } from "@/styles/palette";

import CommunityHeader from "./community/CommunityHeader";
import { useHeaderNavigation } from "@/hooks/useHeaderNavigation";
import { useBackPathStore } from "@/store/client/backPathStore";
import { isGuestUser } from "@/utils/user";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createTripStore } from "@/store/client/createTripStore";

const Header = () => {
  const {
    getPageTitle,
    shouldShowAlarmIcon,
    shouldShowSkip,
    ROUTES,
    checkRoute,
    handleBack,
  } = useHeaderNavigation();
  const { addTags } = createTripStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setNotification } = useBackPathStore();
  const handleNotification = () => {
    setNotification(
      checkRoute.exact(ROUTES.MY.PAGE) ? ROUTES.MY.PAGE : ROUTES.MY.TRIP
    );
    router.push("/notification");
  };

  const headerBackgroundColorIsGrey = () => {
    return (
      checkRoute.exact(ROUTES.MY.TRIP) ||
      checkRoute.startsWith(ROUTES.REQUESTED_TRIP)
    );
  };

  const headerBackgroundColorIsF5 = () => {
    return (
      checkRoute.exact(ROUTES.HOME) ||
      checkRoute?.startsWith(ROUTES.NOTIFICATION) ||
      checkRoute?.startsWith(ROUTES.COMMUNITY.DETAIL)
    );
  };
  return (
    <HeaderContainer
      isHeaderBackgroundColorIsF5={Boolean(headerBackgroundColorIsF5())}
      isBackGroundColorIsGrey={Boolean(headerBackgroundColorIsGrey())}
    >
      {!shouldShowAlarmIcon() && (
        <RightFlex>
          <ButtonContainer onClick={handleBack}>
            <BackIcon />
          </ButtonContainer>
          {(checkRoute.startsWith(ROUTES.TRIP.DETAIL) ||
            checkRoute.startsWith(ROUTES.COMMUNITY.DETAIL)) &&
            searchParams?.get("share") === "true" && (
              <Link href="/" style={{ marginLeft: 14 }}>
                <img
                  src={"/images/homeLogo.png"}
                  width={96}
                  height={24}
                  alt="홈 모잉의 로고입니다"
                />
              </Link>
            )}
        </RightFlex>
      )}

      <Title>{getPageTitle()}</Title>
      {shouldShowSkip() && (
        <Skip
          onClick={() => {
            if (checkRoute.exact(ROUTES.CREATE_TRIP.TAG)) {
              addTags([]);
              router.push(ROUTES.CREATE_TRIP.INTRODUCE);
              return;
            }
            router.push("/");
          }}
        >
          건너뛰기
        </Skip>
      )}
      {!checkRoute.exact(ROUTES.REGISTER_PROCESS.TRIP_STYLE) &&
        !checkRoute.exact(ROUTES.CREATE_TRIP.TAG) && <VoidArea />}
      {checkRoute.startsWith(ROUTES.TRIP.DETAIL) && <TripDetailHeader />}
      {checkRoute.startsWith(ROUTES.COMMUNITY.DETAIL) && <CommunityHeader />}
      {shouldShowAlarmIcon() &&
        !shouldShowSkip() &&
        (isGuestUser() ? (
          <Alarm></Alarm>
        ) : (
          <Alarm onClick={handleNotification}>
            <AlarmIcon size={23} stroke={palette.기본} />
          </Alarm>
        ))}
    </HeaderContainer>
  );
};

// button에 cursor pointer 추가
const ButtonContainer = styled.button`
  cursor: pointer;
`;

// header container
// 상단 헤더 스타일
const HeaderContainer = styled.header<{
  isBackGroundColorIsGrey: boolean;
  isHeaderBackgroundColorIsF5: boolean;
  isBottomBorder: boolean;
}>`
  display: flex;
  padding: 52px 24px 16px 24px;
  height: 116px;
  align-items: center;
  gap: 22px;
  position: sticky;
  top: 0px;
  background-color: ${(props) =>
    props.isHeaderBackgroundColorIsF5
      ? "#F5F5F5"
      : props.isBackGroundColorIsGrey
        ? palette.검색창
        : palette.BG};
  z-index: 1000;
  justify-content: space-between;
  width: 100%;
  border-bottom: ${(props) => (props.isBottomBorder ? "1px" : "0")} solid
    ${palette.비강조3};
`;

const RightFlex = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
`;

// 레이아웃을 맞추기 위한 빈 공간 할당
const VoidArea = styled.div`
  size: 24px;
`;
// skip
const Skip = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: rgba(155, 155, 155, 1);
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`;

const Alarm = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;
export default Header;
