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

import React, { useEffect, useState } from "react";
import CompanionsView from "./CompanionsView";
import { daysAgo } from "@/utils/time";
import useTripDetail from "@/hooks/tripDetail/useTripDetail";
import NewIcon from "@/components/icons/NewIcon";
import NoticeModal from "@/components/designSystem/modal/NoticeModal";
import { editStore } from "@/store/client/editStore";
import Opengraph from "@/components/Opengraph";
import { isGuestUser } from "@/utils/user";
import { useUpdateBookmark } from "@/hooks/bookmark/useUpdateBookmark";
import ApplyListButton from "@/components/designSystem/Buttons/ApplyListButton";
import useViewTransition from "@/hooks/useViewTransition";
import { useParams, useRouter } from "next/navigation";
import { myPageStore } from "@/store/client/myPageStore";
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
  console.log("123", travelNumber);
  const { cancel, cancelMutation } = useEnrollment(parseInt(travelNumber));
  const { tripEnrollmentCount } = useTripDetail(parseInt(travelNumber));
  const nowEnrollmentCount = tripEnrollmentCount.data?.data;
  const { editToastShow, setEditToastShow } = editStore();
  const { companions } = useTripDetail(parseInt(travelNumber));
  const allCompanions = companions.data?.data.companions;

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

  const isEditing = false;

  const navigateWithTransition = useViewTransition();
  const { year, month, day } = dueDate;
  const DAY = new Date(`${year}/${month}/${day}`);
  const dayOfWeek = WEEKDAY[DAY.getDay()];
  const [personViewClicked, setPersonViewClicked] = useState(false);

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
    } else if (!hostUserCheck && !enrollmentNumber) {
      // 주최자가 아니며, 신청 번호가 없는 사람은 댓글을 볼 수 없음.
      setShowApplyModal(true);
    } else if (isAccepted || hostUserCheck) {
      document.documentElement.style.viewTransitionName = "forward";
      navigateWithTransition(`/trip/comment/${travelNumber}`);
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
        onClick={() => router.replace("/login")}
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

      <TripDetailWrapper>
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
        <CommentWrapper onClick={commentClickHandler}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src="/images/createTripBtn.png" alt="" style={{ marginRight: "13px" }} />
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "14px",
                marginRight: " 8px",
              }}
            >
              멤버 댓글
            </div>
            {hostUserCheck && isCommentUpdated && <NewIcon />}
          </div>
          <div>
            <ArrowIcon stroke={palette.비강조3} />
          </div>
        </CommentWrapper>
        <DueDateWrapper>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "16px",
            }}
          >
            <Calendar />
            <ContentTitle>모집 마감일</ContentTitle>
          </div>

          {/* 뱃지 추가 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <DueDate>
              {year}.{month}.{day}({dayOfWeek})
            </DueDate>
            <Badge text={""} daysLeft={timeUntilDate(year, month, day)} />
          </div>
        </DueDateWrapper>
        <PersonWrapper onClick={companionsViewHandler}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "32px",
              }}
            >
              <PersonIcon width={20} height={20} stroke={palette.keycolor} />
              <ContentTitle>모집 인원</ContentTitle>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <PersonStatus>
                {nowPerson}/{maxPerson}
              </PersonStatus>
              <Badge
                isDueDate={false}
                text={genderType}
                backgroundColor={palette.검색창}
                color={palette.keycolor}
                fontWeight="600"
              />
            </div>
          </div>
          <ArrowIcon />
        </PersonWrapper>
        <Spacing size={120} />
        <ButtonContainer backgroundColor={palette.검색창}>
          <ApplyListButton
            hostUserCheck={hostUserCheck}
            nowEnrollmentCount={nowEnrollmentCount}
            bookmarkOnClick={bookmarkClickHandler}
            bookmarked={bookmarked}
            onClick={buttonClickHandler}
            disabled={
              (hostUserCheck && nowEnrollmentCount === 0) || !verifyGenderType(genderType, gender) || isAccepted
            }
            addStyle={{
              backgroundColor:
                !verifyGenderType(genderType, gender) || isAccepted
                  ? palette.비강조3
                  : hostUserCheck
                    ? nowEnrollmentCount > 0
                      ? palette.keycolor
                      : palette.비강조3
                    : alreadyApplied
                      ? palette.비강조3
                      : palette.keycolor,
              color: !verifyGenderType(genderType, gender)
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
      </TripDetailWrapper>
    </>
  );
}
const AppliedPersonCircle = styled.div`
  background-color: ${palette.BG};
  color: ${palette.keycolor};
  width: 16px;
  height: 16px;
  padding: 1px 5px 1px 4px;
  gap: 10px;
  border-radius: 20px;
  opacity: 0px;
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PersonStatus = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  color: ${palette.기본};
  margin-right: 4px;
`;
const BtnContainer = styled.div<{ width: string }>`
  width: 390px;
  @media (max-width: 389px) {
    width: ${(props) => props.width};
  }
  @media (max-width: 450px) {
    width: ${(props) => props.width};
  }
  /* pointer-events: none; */
  position: fixed;
  /* top: 0; */
  bottom: 4.7svh;
  margin-left: -24px;
  padding: 0 24px;
  z-index: 10;
`;
const BadgeContainer = styled.div`
  display: flex;
`;
const DueDate = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  color: ${palette.기본};
  margin-right: 8px;
`;
const ProfileContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  margin-top: 32px;
  font-size: 22px;
  font-weight: 600;
  line-height: 26.25px;
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
const ContentTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 19.6px;
  text-align: left;
  color: ${palette.비강조};
  max-width: 63px;
  margin-left: 8px;
`;
const TagContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
const TripDetailWrapper = styled.div`
  padding: 0px 24px;
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
const CommentWrapper = styled.div`
  cursor: pointer;
  margin-top: 16px;
  height: 70px;
  display: flex;
  padding: 24px 0px 24px 16px;
  gap: 0px;
  border-radius: 20px;
  border-bottom: 1px solid ${palette.비강조5};
  justify-content: space-between;
  opacity: 0px;
  align-items: center;
  background-color: ${palette.BG};
`;
const DueDateWrapper = styled.div`
  margin: 16px 0px;
  display: flex;
  background-color: ${palette.비강조5};
  height: 67px;
  top: 86px;
  padding: 24px 16px 21px 16px;
  border-radius: 20px;
  opacity: 0px;
  align-items: center;
`;
const PersonWrapper = styled.div`
  display: flex;
  background-color: ${palette.비강조5};
  height: 67px;
  padding: 24px 0px 21px 16px;
  justify-content: space-between;
  border-radius: 20px;
  opacity: 0px;
  align-items: center;
`;
