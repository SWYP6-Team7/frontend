"use client";
import ButtonContainer from "@/components/ButtonContainer";
import Badge from "@/components/designSystem/Badge";
import CheckingModal from "@/components/designSystem/modal/CheckingModal";
import RoundedImage from "@/components/designSystem/profile/RoundedImage";
import ResultToast from "@/components/designSystem/toastMessage/resultToast";

import ArrowIcon from "@/components/icons/ArrowIcon";
import Calendar from "@/components/icons/Calendar";
import PersonIcon from "@/components/icons/PersonIcon";
import PlaceIcon from "@/components/icons/PlaceIcon";
import Spacing from "@/components/Spacing";
import { authStore } from "@/store/client/authStore";
import useEnrollment from "@/hooks/enrollment/useEnrollment";
import { tripDetailStore } from "@/store/client/tripDetailStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";

import React, { useEffect, useRef, useState } from "react";
import CompanionsView from "./CompanionsView";
import { daysAgo, daysLeft } from "@/utils/time";
import useTripDetail from "@/hooks/tripDetail/useTripDetail";
import NewIcon from "@/components/icons/NewIcon";
import NoticeModal from "@/components/designSystem/modal/NoticeModal";
import { editStore } from "@/store/client/editStore";
import { isGuestUser } from "@/utils/user";
import { useUpdateBookmark } from "@/hooks/bookmark/useUpdateBookmark";
import ApplyListButton from "@/components/designSystem/Buttons/ApplyListButton";
import useViewTransition from "@/hooks/useViewTransition";
import { useParams, usePathname, useRouter } from "next/navigation";
import { myPageStore } from "@/store/client/myPageStore";
import { useBackPathStore } from "@/store/client/backPathStore";
import TopModal from "@/components/TopModal";
import MapContainer from "../CreateTrip/CreateTripDetail/MapContainer";
import CalendarWrapper from "../CreateTrip/CreateTripDetail/CalendarWrapper";
import InfoWrapper from "../CreateTrip/CreateTripDetail/InfoWrapper";
import { getDatesArray } from "../CreateTrip/CreateTripDetail/CreateTripDetail";
import TagListWrapper from "../CreateTrip/CreateTripDetail/TagListWrapper";
const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];

function verifyGenderType(genderType: string | null, gender: string) {
  console.log("genderType", genderType, gender);
  if (!genderType || genderType === "모두") {
    return true;
  } else {
    if (genderType === "남자만" && gender === "M") {
      return true;
    } else if (genderType === "여자만" && gender === "F") {
      return true;
    }
    return false;
  }
}

interface Companion {
  userNumber: number;
  userName: string;
  ageGroup: string;
}
const LOGIN_ASKING_FOR_WATCHING_COMMENT = `여행에 참여한 멤버만 볼 수 있어요.\n로그인 하시겠어요?`;
const LOGIN_ASKING_FOR_APPLY_TRIP = `로그인하여 설레는 여행에\n참가해 보세요!`;

export default function TripDetail() {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalTextForLogin, setModalTextForLogin] = useState(LOGIN_ASKING_FOR_WATCHING_COMMENT);

  const [isApplyToast, setIsApplyToast] = useState(false);
  const [isCancelToast, setIsCancelToast] = useState(false);

  // 신청 대기 모달
  const [noticeModal, setNoticeModal] = useState(false);

  const [isAccepted, setIsAccepted] = useState(false);
  const { userId, accessToken } = authStore();
  const { gender } = myPageStore();
  const [isCommentUpdated, setIsCommentUpdated] = useState(false);
  const { travelNumber } = useParams<{ travelNumber: string }>();
  const {
    location,
    postStatus,
    userName,
    createdAt,
    title,
    details,
    tags,
    bookmarkCount,
    enrollCount,
    viewCount,
    dueDate,
    maxPerson,
    genderType,
    hostUserCheck,
    enrollmentNumber,
    nowPerson,
    applySuccess,
    setApplySuccess,
    profileUrl,
    bookmarked,
  } = tripDetailStore();
  const router = useRouter();
  if (isNaN(parseInt(travelNumber))) {
    router.replace("/");
  }
  // const isClosed = !Boolean(daysLeft(`${dueDate.year}-${dueDate.month}-${dueDate.day}`) > 0) || maxPerson === nowPerson;
  const isClosed = false;
  const { cancel, cancelMutation } = useEnrollment(parseInt(travelNumber));
  const { tripEnrollmentCount } = useTripDetail(parseInt(travelNumber));
  const nowEnrollmentCount = tripEnrollmentCount.data as any;
  const { editToastShow, setEditToastShow } = editStore();
  const { companions } = useTripDetail(parseInt(travelNumber));
  const allCompanions = (companions as any)?.data?.companions;
  const alreadyApplied = !!enrollmentNumber;
  //북마크
  const { postBookmarkMutation, deleteBookmarkMutation } = useUpdateBookmark(
    accessToken!,
    userId!,
    parseInt(travelNumber)
  );

  const bookmarkClickHandler = () => {
    if (isGuestUser()) {
      return;
    }
    if (bookmarked) {
      deleteBookmarkMutation();
    } else {
      // 북마크 추가.
      postBookmarkMutation();
    }
  };

  useEffect(() => {
    if (applySuccess) {
      setIsApplyToast(true);
      setApplySuccess(false);
    }
  }, [applySuccess]);

  useEffect(() => {
    allCompanions?.map((company: Companion) => {
      if (company.userNumber === userId) {
        setIsAccepted(true);
      }
    });
  }, [allCompanions]);

  const navigateWithTransition = useViewTransition();
  // const { year, month, day } = dueDate;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMapFull, setIsMapFull] = useState(false);
  const [openItemIndex, setOpenItemIndex] = useState(0);
  const [topModalHeight, setTopModalHeight] = useState(0);
  // const DAY = new Date(`${year}/${month}/${day}`);
  //const dayOfWeek = WEEKDAY[DAY.getDay()];
  const [personViewClicked, setPersonViewClicked] = useState(false);
  const pathname = usePathname();
  const buttonClickHandler = () => {
    if (isGuestUser()) {
      setShowLoginModal(true);
      setModalTextForLogin(LOGIN_ASKING_FOR_APPLY_TRIP);
    } else if (hostUserCheck) {
      document.documentElement.style.viewTransitionName = "forward";
      navigateWithTransition(`/trip/enrollmentList/${travelNumber}`);
    } else {
      if (enrollmentNumber) {
        setShowCancelModal(true);
      } else {
        // 신청하러 바로 이동.
        document.documentElement.style.viewTransitionName = "forward";
        navigateWithTransition(`/trip/apply/${travelNumber}`);
      }
    }
  };
  const onClickCancelApply = async () => {
    if (enrollmentNumber) {
      try {
        await cancel(enrollmentNumber);
      } catch (err) {
        console.log(err, "cancelMutation ERROR");
      }
    }
  };
  useEffect(() => {
    if (cancelMutation.isSuccess) {
      setIsCancelToast(true);
    }
  }, [cancelMutation.isSuccess]);

  const companionsViewHandler = () => {
    setPersonViewClicked(true);
  };
  function timeUntilDate(year: number, month: number, day: number): number {
    const today = new Date(); // 오늘 날짜
    const targetDate = new Date(year, month - 1, day); // 목표 날짜 (month는 0부터 시작하므로 -1)

    // 날짜 차이 계산
    const timeDiff = targetDate.getTime() - today.getTime(); // 밀리초 단위로 차이 계산
    // 남은 일 수 계산
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysLeft;
  }
  // 댓글 새로 업데이트 여부 표시

  // const {
  //   commentList: { isLoading, data, error }
  // } = useComment('travel', Number(travelNumber))
  // // console.log(data)
  // // useEffect(() => {
  // //   if (data && data.length > 0) {
  // //     if (data.length > commentLength) {
  // //       setIsCommentUpdated(true)
  // //     }
  // //   }
  // // }, [data])

  const commentClickHandler = () => {
    if (isGuestUser()) {
      // 로그인을 하지 않은 게스트 유저.
      setShowLoginModal(true);
      setModalTextForLogin(LOGIN_ASKING_FOR_WATCHING_COMMENT);
      return;
    } else if (isAccepted || hostUserCheck) {
      document.documentElement.style.viewTransitionName = "forward";
      navigateWithTransition(`/trip/comment/${travelNumber}`);
      return;
    } else if (!hostUserCheck && !enrollmentNumber) {
      // 주최자가 아니며, 신청 번호가 없는 사람은 댓글을 볼 수 없음.
      setShowApplyModal(true);
    } else {
      // 신청 대기중인 경우.
      setNoticeModal(true);
    }
  };

  return (
    <>
      <ResultToast height={120} isShow={editToastShow} setIsShow={setEditToastShow} text="게시글이 수정되었어요." />
      <NoticeModal
        isModalOpen={noticeModal}
        modalMsg={`여행에 참가가 확정된\n 멤버만 볼 수 있어요.`}
        modalTitle="참가 신청 대기중"
        setModalOpen={setNoticeModal}
      />
      <ResultToast height={80} isShow={isCancelToast} setIsShow={setIsCancelToast} text="여행 신청이 취소 되었어요." />
      <ResultToast height={80} isShow={isApplyToast} setIsShow={setIsApplyToast} text="여행 신청이 완료 되었어요." />

      <CheckingModal
        isModalOpen={showLoginModal}
        onClick={() => {
          localStorage.setItem("loginPath", pathname);
          router.replace("/login");
        }}
        modalMsg={modalTextForLogin}
        modalTitle="로그인 안내"
        modalButtonText="로그인"
        setModalOpen={setShowLoginModal}
      />

      <CheckingModal
        isModalOpen={showApplyModal}
        onClick={() => {
          document.documentElement.style.viewTransitionName = "forward";
          navigateWithTransition(`/trip/apply/${travelNumber}`);
        }}
        modalMsg="여행에 참여한 멤버만 볼 수 있어요.
여행 참가 신청을 할까요?"
        modalTitle="참가 신청 안내"
        modalButtonText="신청하기"
        setModalOpen={setShowApplyModal}
      />

      <CheckingModal
        isModalOpen={showCancelModal}
        onClick={onClickCancelApply}
        modalMsg="아쉬워요🥺
정말 여행을 취소하시겠어요?"
        modalTitle="참가 취소"
        modalButtonText="취소하기"
        setModalOpen={setShowCancelModal}
      />

      <TripDetailWrapper ref={containerRef}>
        <TopModal containerRef={containerRef} setIsMapFull={setIsMapFull} onHeightChange={setTopModalHeight}>
          <ModalContainer>
            <PostWrapper>
              <MainContent>
                <BadgeContainer>
                  <PlaceBadge>
                    <PlaceIcon width={14} />
                    <div>{location}</div>
                  </PlaceBadge>
                  <Badge
                    isDueDate={false}
                    text={postStatus}
                    height="22px"
                    backgroundColor={palette.비강조4}
                    color={palette.비강조}
                    fontWeight="600"
                  />
                </BadgeContainer>
                <ProfileContainer>
                  {/* 프로필 */}
                  <RoundedImage src={profileUrl} size={40} />
                  <div style={{ marginLeft: "8px" }}>
                    <UserName>{userName}</UserName>
                    <div
                      style={{
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "16.71px",
                        color: palette.비강조,
                      }}
                    >
                      {daysAgo(createdAt)}
                    </div>
                  </div>
                </ProfileContainer>
                {/* 제목  */}
                <Title>{title}</Title>
                {/* 내용 */}
                <Details>{details}</Details>
                {/*태그   */}
                <TagContainer>
                  {tags.map((tag, idx) => (
                    <Badge
                      key={tag}
                      isDueDate={false}
                      text={tag}
                      height="22px"
                      backgroundColor={palette.비강조4}
                      color={palette.비강조}
                      fontWeight="500"
                    />
                  ))}
                </TagContainer>
              </MainContent>
              <ViewsETC>
                <div>신청 {enrollCount}</div>
                <div style={{ margin: "0px 4px" }}> · </div>
                <div>관심 {bookmarkCount}</div>
                <div style={{ margin: "0px 4px" }}> · </div>
                <div>조회수 {viewCount}</div>
              </ViewsETC>
            </PostWrapper>
            <Bar />
            <CalendarWrapper />
            <Bar />
            <InfoWrapper />
          </ModalContainer>
        </TopModal>
        <BottomContainer isMapFull={isMapFull} topModalHeight={topModalHeight}>
          {/* <MapContainer
            index={openItemIndex}
            isMapFull={isMapFull}
            lat={initGeometry?.lat || 37.57037778}
            lng={initGeometry?.lng || 126.9816417}
            zoom={locationName.mapType === "google" ? 11 : 9}
          /> */}
          <ScheduleContainer>
            <ScheduleTitle>여행 일정</ScheduleTitle>
            <ScheduleList>
              {/* {date &&
                getDatesArray(date.startDate, date.endDate).map((item, idx) => (
                  // <CreateScheduleItem
                  //   idx={idx}
                  //   title={item}
                  //   isOpen={openItemIndex === idx}
                  //   onToggle={() => handleItemToggle(idx)}
                  // />
                  <></>
                ))} */}
            </ScheduleList>
          </ScheduleContainer>
        </BottomContainer>
      </TripDetailWrapper>

      <Spacing size={120} />
      <ButtonContainer backgroundColor={palette.검색창}>
        <ApplyListButton
          hostUserCheck={hostUserCheck}
          nowEnrollmentCount={nowEnrollmentCount}
          bookmarkOnClick={bookmarkClickHandler}
          bookmarked={bookmarked}
          onClick={buttonClickHandler}
          disabled={
            (hostUserCheck && nowEnrollmentCount === 0) ||
            (!hostUserCheck && !verifyGenderType(genderType, gender)) ||
            isAccepted ||
            isClosed
          }
          addStyle={{
            backgroundColor: isClosed
              ? palette.비강조3
              : !verifyGenderType(genderType, gender) || isAccepted
                ? palette.비강조3
                : hostUserCheck
                  ? nowEnrollmentCount > 0
                    ? palette.keycolor
                    : palette.비강조3
                  : alreadyApplied
                    ? palette.비강조3
                    : palette.keycolor,
            color: isClosed
              ? palette.비강조4
              : !verifyGenderType(genderType, gender)
                ? palette.비강조
                : hostUserCheck
                  ? nowEnrollmentCount > 0
                    ? palette.비강조4
                    : palette.비강조
                  : alreadyApplied
                    ? palette.비강조
                    : palette.비강조4,
          }}
          text={
            hostUserCheck
              ? "참가 신청 목록"
              : isAccepted
                ? "참가 중인 여행"
                : alreadyApplied
                  ? "참가 신청 취소"
                  : "참가 신청 하기"
          }
        ></ApplyListButton>
      </ButtonContainer>
      <CompanionsView isOpen={personViewClicked} setIsOpen={setPersonViewClicked} />

      <CommentWrapper>
        <IconContainer onClick={commentClickHandler}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22 14.6667C22 15.315 21.7425 15.9367 21.284 16.3952C20.8256 16.8536 20.2039 17.1111 19.5556 17.1111H4.88889L0 22V2.44444C0 1.79614 0.257539 1.17438 0.715961 0.715961C1.17438 0.257539 1.79614 0 2.44444 0H19.5556C20.2039 0 20.8256 0.257539 21.284 0.715961C21.7425 1.17438 22 1.79614 22 2.44444V14.6667Z"
              fill="#FEFEFE"
            />
          </svg>
        </IconContainer>
      </CommentWrapper>
    </>
  );
}

const ModalContainer = styled.div`
  padding: 0 24px;
`;

const Bar = styled.div`
  background-color: #e7e7e7;
  width: 100%;
  height: 1px;
`;

const BottomContainer = styled.div<{
  topModalHeight: number;
  isMapFull: boolean;
}>`
  margin-top: ${(props) => `${props.isMapFull ? 32 : props.topModalHeight + 32}px`};
  min-height: 100svh;
  transition: padding-top 0.3s ease-out;
  overscroll-behavior: none;
`;

const BadgeContainer = styled.div`
  display: flex;
`;

const ProfileContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  margin-top: 32px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
`;
const Details = styled.div`
  margin-top: 16px;
  font-size: 16px;

  white-space: pre-line;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  color: ${palette.기본};
`;

const TagContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
const TripDetailWrapper = styled.div`
  position: relative;
  background-color: ${palette.검색창};
`;
const UserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  text-align: left;
  color: ${palette.기본};
  margin-bottom: 4px;
`;
const PostWrapper = styled.div`
  background-color: ${palette.BG};
  padding: 24px;

  top: 100px;
  left: 24px;
  gap: 32px;
  border-radius: 20px;
  box-shadow: 0px 2px 6px 3px rgba(170, 170, 170, 0.18);
`;
const MainContent = styled.div``;

const ViewsETC = styled.div`
  margin-top: 32px;
  border-top: 1px solid ${palette.비강조4};
  padding-top: 16px;
  display: flex;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  text-align: left;
  color: ${palette.비강조2};
`;
const PlaceBadge = styled.div`
  margin-right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${palette.keycolorBG};
  color: ${palette.keycolor};
  font-size: 12px;
  font-weight: 600;
  line-height: 14.32px;
  text-align: left;
  height: 22px;
  padding: 4px 10px;
  gap: 4px;
  border-radius: 20px;
  opacity: 0px;
`;

const ScheduleContainer = styled.div`
  margin-top: 24px;
`;
const ScheduleTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #000;
  line-height: 21px;
`;

const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentWrapper = styled.div`
  height: 100svh;
  width: 100%;
  pointer-events: none;
  position: fixed;
  top: 0;
  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
    transform: translateX(-50%);
  }
  z-index: 1001;
`;

const IconContainer = styled.button<{ rotated: boolean; right: string }>`
  position: absolute;
  pointer-events: auto;
  right: 24px;
  bottom: 124px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${palette.기본};
  z-index: 1003;
  font-size: 32px;
  @media (max-width: 390px) {
    right: ${(props) => props.right};
  }
`;
