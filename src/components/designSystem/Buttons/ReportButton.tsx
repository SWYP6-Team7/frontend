"use client";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React from "react";

interface ReportButtonProps {
  isOpen: boolean;

  reportClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void;
  reportText?: string;
}
export default function ReportButton({
  reportClickHandler,

  reportText = "신고하기",
  isOpen,
}: ReportButtonProps) {
  return (
    <BtnBox isOpen={isOpen}>
      <ReportBtn onClick={reportClickHandler}>{reportText}</ReportBtn>
    </BtnBox>
  );
}

const BtnBox = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 20px;
  height: 52px;

  transform: ${(props) => (props.isOpen ? "translateY(-5%)" : "translateY(20%)")};

  transition: transform 0.5s ease;
`;

const ReportBtn = styled.button`
  height: ${(props) => (props.isMyApplyTrip ? "100%" : "50%")};
  @media (max-width: 390px) {
    width: 100%;
  }
  @media (min-width: 390px) {
    width: 342px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  color: ${palette.like};
  border: none;
  border-radius: 0px 0px 20px 20px;
  &:active {
    background-color: ${palette.비강조3};
    border-radius: 0px 0px 20px 20px;
  }
`;
