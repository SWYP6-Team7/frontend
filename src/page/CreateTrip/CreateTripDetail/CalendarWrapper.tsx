"use client";
import Calendar from "@/components/icons/Calendar";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { formatDateRange } from "../CalendarClient";
import ArrowIcon from "@/components/icons/ArrowIcon";
import CalendarModal from "../CalendarModal";

const CalendarWrapper = ({
  date,
  addDate,
}: {
  date?: {
    startDate: string;
    endDate: string;
  } | null;
  addDate: ({ startDate, endDate }: { startDate: string; endDate: string }) => void;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <CalendarModal addDate={addDate} showModal={showModal} setShowModal={setShowModal} />
      <Container onClick={() => setShowModal(true)}>
        <TextContainer>
          <Calendar />
          <Title>여행 날짜</Title>
          <Content>{date ? formatDateRange(date.startDate, date.endDate) : "날짜를 선택하세요."}</Content>
        </TextContainer>
        <ArrowIconContainer>
          <ArrowIcon />
        </ArrowIconContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 11px 0;
  padding-left: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ArrowIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`;

const Title = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${palette.비강조};
  font-weight: 600;
  margin-left: 8px;
  margin-right: 29px;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${palette.기본};
  font-weight: 500;
`;
export default CalendarWrapper;
