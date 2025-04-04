"use client";
import Badge from "@/components/designSystem/Badge";
import CheckingModal from "@/components/designSystem/modal/CheckingModal";
import ResultModal from "@/components/designSystem/modal/ResultModal";
import RoundedImage from "@/components/designSystem/profile/RoundedImage";
import ResultToast from "@/components/designSystem/toastMessage/resultToast";
import useEnrollment from "@/hooks/enrollment/useEnrollment";

import { palette } from "@/styles/palette";
import { daysAgo } from "@/utils/time";
import styled from "@emotion/styled";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface enrollmentCardProps {
  enrollmentNumber: number;
  userName: string;
  ageGroup: string;
  enrolledAt: string;
  profileUrl: string;
  message: string;
  isNew: boolean;
}
export default function TripEnrollmentCard({
  enrollmentNumber,
  userName,
  ageGroup,
  enrolledAt,
  message,
  isNew,
  profileUrl,
}: enrollmentCardProps) {
  const params = useParams();
  const travelNumber = params?.travelNumber as string;
  const { enrollmentAcceptanceMutate, enrollmentRejectionMutate } = useEnrollment(parseInt(travelNumber!));
  // 수락 모달
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isAcceptBtnClicked, setIsAcceptBtnClicked] = useState(false);
  // 거절 모달
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isRejectBtnClicked, setIsRejecttBtnClicked] = useState(false);
  // 거절 완료 토스트 메시지
  const [isToastShow, setIsToastShow] = useState(false);
  // 수락 후 완료 모달
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  // 현재 유저가 주최자 인지 확인.

  useEffect(() => {
    if (isAcceptBtnClicked) {
      // 수락 요청.

      enrollmentAcceptanceMutate(enrollmentNumber).then((res) => {
        setIsResultModalOpen(true);
      });
    } else if (isRejectBtnClicked) {
      // 거절 요청
      enrollmentRejectionMutate(enrollmentNumber).then((res) => {
        setIsToastShow(true);
      });
    }
  }, [isAcceptBtnClicked, isRejectBtnClicked]);

  return (
    <Container>
      <UserBox>
        <Profile>
          <RoundedImage src={profileUrl} size={36} />
          <UserName>{userName}</UserName>
          {/* 뱃지. */}
          <Badge
            isDueDate={false}
            text={ageGroup}
            height={"22px"}
            color={palette.keycolor}
            backgroundColor={palette.keycolorBG}
          />
        </Profile>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TimeAgo>{daysAgo(enrolledAt)}</TimeAgo>
          {/* 최신인가 아닌가 부분. */}
          {isNew && <NewMark></NewMark>}
        </div>
      </UserBox>
      <Msg>{message}</Msg>
      <BtnBox>
        <RejectBtn onClick={() => setIsRejectModalOpen(true)}>거절</RejectBtn>
        <AcceptBtn onClick={() => setIsAcceptModalOpen(true)}>수락</AcceptBtn>
      </BtnBox>
      <CheckingModal
        isModalOpen={isAcceptModalOpen}
        modalMsg={`정말 ${userName}의\n여행 참가를 수락하시겠어요?`}
        modalTitle="참가 수락"
        modalButtonText="수락하기"
        setIsSelected={setIsAcceptBtnClicked}
        setModalOpen={setIsAcceptModalOpen}
      />
      <CheckingModal
        isModalOpen={isRejectModalOpen}
        modalMsg={`정말 ${userName}님의\n여행 참가를 거절하시겠어요?`}
        modalTitle="참가 거절"
        modalButtonText="거절하기"
        setIsSelected={setIsRejecttBtnClicked}
        setModalOpen={setIsRejectModalOpen}
      />
      <ResultModal
        isModalOpen={isResultModalOpen}
        modalMsg={`${userName}님의 여행 참가 요청이 \n수락되었어요`}
        modalTitle="참가 수락 완료"
        setModalOpen={setIsResultModalOpen}
      />
      <ResultToast isShow={isToastShow} setIsShow={setIsToastShow} text="여행 참가가 거절되었어요." />
    </Container>
  );
}
const Msg = styled.div`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  color: ${palette.기본};
`;
const BtnBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  width: 100%;
`;
const RejectBtn = styled.div`
  margin-right: 8px;
  width: 50%;
  height: 42px;
  padding: 10px 20px;
  gap: 10px;
  border-radius: 40px;
  opacity: 0px;
  background-color: #e7e7e7;
  color: ${palette.비강조};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const AcceptBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 42px;
  padding: 10px 20px;
  gap: 10px;
  border-radius: 40px;
  opacity: 0px;
  background-color: ${palette.keycolor};
  color: ${palette.비강조4};
`;
const NewMark = styled.div`
  margin-left: 3px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${palette.like};
`;
const TimeAgo = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  text-align: left;
  color: ${palette.비강조2};
`;
const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Container = styled.div`
  padding: 24px;
  gap: 16px;
  border-radius: 20px;
  opacity: 0px;
  background-color: ${palette.검색창};
  margin-bottom: 16px;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
`;
const UserName = styled.div`
  margin-left: 8px;
  margin-right: 4px;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.48px;
  text-align: left;
  color: ${palette.기본};
`;
