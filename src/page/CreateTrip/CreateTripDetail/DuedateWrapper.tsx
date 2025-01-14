"use client";
import BottomModal from "@/components/BottomModal";

import Spacing from "@/components/Spacing";
import { palette } from "@/styles/palette";
import React, { useEffect, useState } from "react";
import Button from "@/components/designSystem/Buttons/Button";
import styled from "@emotion/styled";
import Vector from "@/components/icons/Vector";
import DuedatePickerView from "./DuedatePickerView";
import Calendar from "@/components/icons/Calendar";
import { tripDetailStore } from "@/store/client/tripDetailStore";
import { createTripStore } from "@/store/client/createTripStore";
import { usePathname } from "next/navigation";

interface DateValue {
  year: number;
  month: number;
  day: number;
}

const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];

export default function DuedateWrapper() {
  const { dueDate } = tripDetailStore();

  const { dueDate: dueDateForCreateTrip } = createTripStore();
  const [year, month, date] = dueDateForCreateTrip.split("-").map((e) => +e);

  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const isCreateTripDetailPage = pathname === "/createTripDetail";
  const [duedate, setDuedate] = useState<DateValue>(
    isCreateTripDetailPage ? { year: year, month: month, day: date } : dueDate
  );

  const day = new Date(`${duedate.year}/${duedate.month}/${duedate.day}`);
  const dayOfWeek = WEEKDAY[day.getDay()];
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // 초기값 설정
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // resize 이벤트 핸들러
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 클린업
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const duedateSubmitHandler = () => {
    setShowModal(false);
    // zustand에 채용 인원 및 성별 저장 로직 필수.
  };
  // width가 390px 미만인 경우에도 버튼의 위치가 고정될 수 있도록. width값 조정.
  const newRightPosition = windowSize.width.toString() + "px";
  return (
    <>
      <DuedateContainer>
        <DetailTitle>모집 마감일</DetailTitle>
        <DuedateBtn onClick={(e) => setShowModal(true)}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Calendar />

            <DueDateValue>
              {duedate.year}. {duedate.month < 10 ? `0${duedate.month}` : duedate.month}.{" "}
              {duedate.day < 10 ? `0${duedate.day}` : duedate.day} ({dayOfWeek})
            </DueDateValue>
          </div>
          <Vector />
        </DuedateBtn>
      </DuedateContainer>
      {showModal && (
        <BottomModal
          initialHeight={windowSize.height <= 700 ? 58 : 50} // height 비율이 짧아 진다면 58%로 맞추기.
          closeModal={handleCloseModal}
        >
          <ModalWrapper style={{ marginTop: "6px" }}>
            <ModalContainer style={{ padding: "0px 24px" }}>
              <DetailTitle>모집 마감일</DetailTitle>
              <Spacing size={40} />
              <DuedatePickerView duedate={duedate} setDuedate={setDuedate} />
            </ModalContainer>
          </ModalWrapper>
          <ButtonWrapper showModal={showModal} width={newRightPosition}>
            <Button
              text="완료"
              onClick={duedateSubmitHandler}
              addStyle={{
                backgroundColor: "rgba(62, 141, 0, 1)",
                color: "rgba(240, 240, 240, 1)",
                boxShadow: "rgba(170, 170, 170, 0.1)",
              }}
            />
          </ButtonWrapper>
        </BottomModal>
      )}
    </>
  );
}

const ModalWrapper = styled.div``;
const ModalContainer = styled.div``;
const DetailTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 25.2px;
  text-align: left;
  color: ${palette.기본};
  height: 25px;
  padding: 0px 6px;
  gap: 8px;
  opacity: 0px;
`;
const DueDateValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  margin-left: 8px;
`;

const DuedateContainer = styled.div`
  margin-top: 24px;
`;
const DuedateBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  gap: 0px;
  border-radius: 20px;
  border: 1px solid ${palette.비강조3};
  opacity: 0px;
`;
const ButtonWrapper = styled.div<{ width: string; showModal: boolean }>`
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
  /* z-index: 1001; */

  /* margin-left: ${(props) => (props.showModal ? "0px" : "-24px")}; */
  padding: 0px 24px;
  z-index: 10;
`;
