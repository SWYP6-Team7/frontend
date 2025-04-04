"use client";
import CheckingModal from "@/components/designSystem/modal/CheckingModal";
import EditAndDeleteModal from "@/components/designSystem/modal/EditAndDeleteModal";
import AlarmIcon from "@/components/icons/AlarmIcon";

import MoreIcon from "@/components/icons/MoreIcon";
import { COMMUNITY_MODAL_MESSAGES } from "@/constants/modalMessages";

import useCommunity from "@/hooks/useCommunity";
import { authStore } from "@/store/client/authStore";
import { useBackPathStore } from "@/store/client/backPathStore";
import { editStore } from "@/store/client/editStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import ShareIcon from "../icons/ShareIcon";
import { useParams, useRouter } from "next/navigation";
import ReportModal from "../designSystem/modal/ReportModal";
import useViewTransition from "@/hooks/useViewTransition";
import { reportStore } from "@/store/client/reportStore";
import NoticeModal from "../designSystem/modal/NoticeModal";
import { isGuestUser } from "@/utils/user";

export default function CommunityHeader() {
  const { userId, accessToken } = authStore();
  const params = useParams();
  const { reportSuccess, setReportSuccess, setUserNumber } = reportStore();

  const communityNumber = params?.communityNumber as string;
  const navigateWithTransition = useViewTransition();

  const router = useRouter();
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
  const [isDeleteBtnClicked, setIsDeleteBtnClicked] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isReportBtnClicked, setIsReportBtnClicked] = useState(false);

  const [checkingModalClicked, setCheckingModalClicked] = useState(false);
  const [threeDotsClick, setThreeDotsClick] = useState(false);
  const [reportThreeDotsClick, setReportThreeDotsClick] = useState(false);
  const { removeToastShow, setRemoveToastShow } = editStore();
  const { setNotification } = useBackPathStore();
  const {
    community: { data, isLoading },
    removeMutation,
    remove,
  } = useCommunity(Number(communityNumber));

  const handleNotification = () => {
    setNotification(data?.postNumber ? `/community/${data?.postNumber}` : "/community");
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
      router.push(`/community/edit/${communityNumber}`);
    }
    if (isReportBtnClicked) {
      setIsReportBtnClicked(false);
      setUserNumber(data?.userNumber || null);
      document.documentElement.style.viewTransitionName = "forward";
      navigateWithTransition(`/report/community/${communityNumber}`);
    }
    if (checkingModalClicked) {
      remove({ communityNumber: Number(communityNumber) });
    }
  }, [isDeleteBtnClicked, isReportBtnClicked, isEditBtnClicked, checkingModalClicked]);

  useEffect(() => {
    if (removeMutation.isSuccess) {
      setRemoveToastShow(true);

      router.push("/community");
    }
  }, [removeMutation.isSuccess]);

  const onClickThreeDots = () => {
    if (data?.userNumber === userId) {
      setThreeDotsClick(true);
    } else {
      setReportThreeDotsClick(true);
    }
  };

  return (
    <Container>
      {userId && (
        <IconContainer onClick={handleNotification}>
          <AlarmIcon size={23} stroke={palette.기본} />
        </IconContainer>
      )}
      <IconContainer>
        <ShareIcon />
      </IconContainer>

      {!isGuestUser() && (
        <IconContainer onClick={onClickThreeDots}>
          <MoreIcon />
        </IconContainer>
      )}

      <EditAndDeleteModal
        setIsEditBtnClicked={setIsEditBtnClicked}
        setIsDeleteBtnClicked={setIsDeleteBtnClicked}
        isOpen={threeDotsClick}
        setIsOpen={setThreeDotsClick}
      />
      <CheckingModal
        isModalOpen={isResultModalOpen}
        modalMsg={COMMUNITY_MODAL_MESSAGES.deleteMessage}
        modalTitle={COMMUNITY_MODAL_MESSAGES.askingDelete}
        modalButtonText={COMMUNITY_MODAL_MESSAGES.delete}
        setIsSelected={setCheckingModalClicked}
        setModalOpen={setIsResultModalOpen}
      />
      <NoticeModal
        isModalOpen={reportSuccess}
        modalMsg={"소중한 의견 감사합니다."}
        modalTitle={"신고 완료"}
        setModalOpen={setReportSuccess}
      />
      <ReportModal
        setIsReportBtnClicked={setIsReportBtnClicked}
        isOpen={reportThreeDotsClick}
        setIsOpen={setReportThreeDotsClick}
      />
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
