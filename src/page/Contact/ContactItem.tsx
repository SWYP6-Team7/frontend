"use client";

import BoxLayoutTag from "@/components/designSystem/tag/BoxLayoutTag";
import Spacing from "@/components/Spacing";
import { palette } from "@/styles/palette";
import { daysAgo, formatTimeOnContact } from "@/utils/time";
import styled from "@emotion/styled";
import React from "react";

interface ContactItemProps {
  data: Data;
}

type Data = {
  status: "진행 중" | "답변 완료";
  date: string; // 2024-11-18 17:01;
  inquiryType: string;
  title: string;
  content: string;
};

const ContactItem = ({ data }: ContactItemProps) => {
  return (
    <Container>
      <TopContainer>
        {data.status === "답변 완료" ? (
          <BoxLayoutTag
            addStyle={{
              backgroundColor: `${palette.비강조4}`,
              padding: "4px 6px 4px 6px",
              color: `${palette.비강조}`,
              height: "22px",
              borderRadius: "20px",
              fontSize: "12px",
            }}
            text={`답변 완료`}
          />
        ) : (
          <BoxLayoutTag
            text={"답변 중"}
            addStyle={{
              backgroundColor: palette.keycolorBG,
              color: palette.keycolor,
              padding: "4px 10px 4px 10px",
              height: "22px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
            }}
          />
        )}
        <DateText>{formatTimeOnContact(data.date)}</DateText>
      </TopContainer>
      <Spacing size={8} />
      <TitleContainer>
        <InquiryTypeText>[{data.inquiryType}]</InquiryTypeText>
        <Title>{data.title}</Title>
      </TitleContainer>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 11px;
  padding-bottom: 16px;
  cursor: pointer;
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DateText = styled.div`
  color: ${palette.비강조2};
  font-size: 12px;
  letter-spacing: -0.025em;
  line-height: 22px;
  font-weight: 400;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const InquiryTypeText = styled.div`
  line-height: 19px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: ${palette.기본};
`;

const Title = styled.div`
  line-height: 19px;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.025em;
  color: ${palette.기본};
`;

export default ContactItem;
