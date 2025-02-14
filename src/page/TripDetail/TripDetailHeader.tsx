"use client";
import CheckingModal from "@/components/designSystem/modal/CheckingModal";
import EditAndDeleteModal from "@/components/designSystem/modal/EditAndDeleteModal";
import ReportModal from "@/components/designSystem/modal/ReportModal";
import ResultToast from "@/components/designSystem/toastMessage/resultToast";
import AlarmIcon from "@/components/icons/AlarmIcon";
import MoreIcon from "@/components/icons/MoreIcon";
import ShareIcon from "@/components/icons/ShareIcon";
import { useUpdateBookmark } from "@/hooks/bookmark/useUpdateBookmark";
import useTripDetail from "@/hooks/tripDetail/useTripDetail";
import useViewTransition from "@/hooks/useViewTransition";
import { authStore } from "@/store/client/authStore";
import { useBackPathStore } from "@/store/client/backPathStore";
import { reportStore } from "@/store/client/reportStore";
import { tripDetailStore } from "@/store/client/tripDetailStore";
import { palette } from "@/styles/palette";
import { isGuestUser } from "@/utils/user";
import styled from "@emotion/styled";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// 헤더부터 주최자인지에 따라 화면이 달라서, 헤더에서 여행 정보를 들고 오기.
export default function TripDetailHeader() {
  const { userId, accessToken } = authStore();
  const params = useParams();
  const pathname = usePathname();
  const travelNumber = params?.travelNumber as string;
  const { tripDetail } = useTripDetail(parseInt(travelNumber!));
  const isTripDetailEdit = pathname?.startsWith("/trip/edit");

  const router = useRouter();
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
  const [isReportBtnClicked, setIsReportBtnClicked] = useState(false);
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [checkingModalClicked, setCheckingModalClicked] = useState(false);
  const [threeDotsClick, setThreeDotsClick] = useState(false);
  const [reportThreeDotsClick, setReportThreeDotsClick] = useState(false);
  const {
    addProfileUrl,
    addLocation,
    addUserName,
    addUserNumber,
    addCreatedAt,
    addTitle,
    addDetails,
    addMaxPerson,
    addGenderType,
    addDueDate,
    addPeriodType,
    addTags,
    addPostStatus,
    addNowPerson,
    addEnrollCount,
    addBookmarkCount,
    addHostUserCheck,
    addViewCount,
    addTravelNumber,
    addEnrollmentNumber,
    hostUserCheck,
    addUserAgeGroup,
    addBookmarked,
    bookmarked,
  } = tripDetailStore();
  const { setNotification } = useBackPathStore();
  const tripInfos = tripDetail.data?.data;
  useEffect(() => {
    console.log(tripInfos);
    if (tripDetail.isFetched) {
      const {
        travelNumber,
        userNumber,
        userName,
        createdAt,
        location,
        title,
        details,
        maxPerson,
        genderType,
        dueDate,
        periodType,
        tags,
        postStatus,
        nowPerson,
        bookmarkCount,
        viewCount,
        enrollCount,
        userAgeGroup,
        profileUrl,
        loginMemberRelatedInfo,
      } = tripInfos;

      const [year, month, day] = dueDate.split("-").map((v: string) => +v);
      const DUEDATE = {
        year,
        month,
        day,
      };
      if (!loginMemberRelatedInfo) {
        addHostUserCheck(false);
        addEnrollmentNumber(null);
        addBookmarked(false);
      } else {
        addHostUserCheck(loginMemberRelatedInfo.hostUser);
        addEnrollmentNumber(loginMemberRelatedInfo.enrollmentNumber);
        addBookmarked(loginMemberRelatedInfo.bookmarked);
      }
      addProfileUrl(profileUrl);
      addTravelNumber(travelNumber);

      addEnrollCount(enrollCount);
      addCreatedAt(createdAt);
      addUserNumber(userNumber);
      addUserName(userName);
      addLocation(location);
      addTitle(title);
      addDetails(details);
      addMaxPerson(maxPerson);
      addGenderType(genderType);
      addDueDate(DUEDATE);
      addPeriodType(periodType);
      addTags(tags);
      addPostStatus(postStatus);
      addBookmarkCount(bookmarkCount);
      addViewCount(viewCount);

      addNowPerson(nowPerson);
      addUserAgeGroup(userAgeGroup);
      addPostStatus(postStatus);
    }
  }, [tripDetail.isFetched, tripInfos]);
  const navigateWithTransition = useViewTransition();
  const { deleteTripDetailMutation } = useTripDetail(parseInt(travelNumber!));
  const [isToastShow, setIsToastShow] = useState(false); // 삭제 완료 메시지.
  const { reportSuccess, setReportSuccess } = reportStore();

  const { postBookmarkMutation, deleteBookmarkMutation } = useUpdateBookmark(
    accessToken!,
    userId!,
    parseInt(travelNumber!)
  );

  const handleNotification = () => {
    setNotification(travelNumber ? `/trip/detail/${travelNumber}` : "/trip/list");
    router.push(`/notification`);
  };
  useEffect(() => {
    if (isDeleteBtnClicked) {
      setIsResultModalOpen(true);
      setIsDeleteBtnClicked(false);
    }
    if (isEditBtnClicked) {
      setThreeDotsClick(false);
      setIsEditBtnClicked(false);
      document.documentElement.style.viewTransitionName = "forward";
      navigateWithTransition(`/trip/edit/${travelNumber}`);
    }
    if (isReportBtnClicked) {
      setIsReportBtnClicked(false);
      document.documentElement.style.viewTransitionName = "forward";
      navigateWithTransition(`/report/travel/${travelNumber}`);
    }
    if (checkingModalClicked) {
      // 삭제 요청.

      deleteTripDetailMutation().then((res) => {
        console.log("result", res);
        if (res?.status === 204) {
          setIsToastShow(true);
          setTimeout(() => {
            router.push("/");
          }, 1800);
        }
      });
    }
  }, [isDeleteBtnClicked, isReportBtnClicked, isEditBtnClicked, checkingModalClicked]);

  // 북마크
  const bookmarkClickHandler = () => {
    if (bookmarked) {
      deleteBookmarkMutation();
    } else {
      // 북마크 추가.
      postBookmarkMutation();
    }
  };

  const onClickThreeDots = () => {
    if (hostUserCheck) {
      setThreeDotsClick(true);
    } else {
      setReportThreeDotsClick(true);
    }
  };

  return (
    <Container hostUserCheck={hostUserCheck} isTripDetailEdit={Boolean(isTripDetailEdit)}>
      {!isGuestUser() && (
        <IconContainer onClick={handleNotification}>
          <AlarmIcon size={23} stroke={palette.기본} />
        </IconContainer>
      )}
      <IconContainer>
        <ShareIcon />
      </IconContainer>

      <IconContainer onClick={onClickThreeDots}>
        <MoreIcon />
      </IconContainer>

      <EditAndDeleteModal
        setIsEditBtnClicked={setIsEditBtnClicked}
        setIsDeleteBtnClicked={setIsDeleteBtnClicked}
        isOpen={threeDotsClick}
        setIsOpen={setThreeDotsClick}
      />
      <ReportModal
        setIsReportBtnClicked={setIsReportBtnClicked}
        isOpen={reportThreeDotsClick}
        setIsOpen={setReportThreeDotsClick}
      />
      <CheckingModal
        isModalOpen={reportSuccess}
        showSelect={false}
        modalMsg={"소중한 의견 감사합니다."}
        modalTitle={"신고 완료"}
        modalButtonText={"닫기"}
        setModalOpen={setReportSuccess}
      />
      <CheckingModal
        isModalOpen={isResultModalOpen}
        modalMsg={`여행 멤버나 관심을 가진 분들이 \n 당황할 수 있어요.`}
        modalTitle="정말 삭제할까요?"
        modalButtonText="삭제하기"
        setIsSelected={setCheckingModalClicked}
        setModalOpen={setIsResultModalOpen}
      />
      <ResultToast bottom="80px" isShow={isToastShow} setIsShow={setIsToastShow} text="여행 게시글이 삭제되었어요." />
    </Container>
  );
}

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div<{
  hostUserCheck: boolean;
  isTripDetailEdit: boolean;
}>`
  display: ${(props) => (props.isTripDetailEdit ? "none" : "flex")};
  align-items: center;
  justify-content: space-around;

  width: ${(props) => (props.hostUserCheck ? "136px" : "auto")};
`;
