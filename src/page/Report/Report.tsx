"use client";
import Accordion from "@/components/Accordion";
import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/designSystem/Buttons/Button";
import TextareaField from "@/components/designSystem/input/TextareaField";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useState } from "react";

const REPORT_LIST = [
  {
    title: "욕설, 비방, 혐오",
    description: "욕설을 사용하여 타인을 비방하거나 모욕하는 행위\n타인의 감정을 상하게 하거나 불쾌감을 유발하는 행위",
  },
  {
    title: "도배, 중복",
    description: "욕설을 사용하여 타인을 비방하거나 모욕하는 행위\n타인의 감정을 상하게 하거나 불쾌감을 유발하는 행위",
  },
  {
    title: "음란, 청소년 유해",
    description: "욕설을 사용하여 타인을 비방하거나 모욕하는 행위\n타인의 감정을 상하게 하거나 불쾌감을 유발하는 행위",
  },
  {
    title: "홍보, 영리목적",
    description: "욕설을 사용하여 타인을 비방하거나 모욕하는 행위\n타인의 감정을 상하게 하거나 불쾌감을 유발하는 행위",
  },
  {
    title: "부적절한 행동 및 글",
    description: "욕설을 사용하여 타인을 비방하거나 모욕하는 행위\n타인의 감정을 상하게 하거나 불쾌감을 유발하는 행위",
  },
];

const Report = () => {
  const [checkItem, setCheckItem] = useState(-1);

  return (
    <Container>
      <Title>신고 유형을 선택해 주세요.</Title>
      {REPORT_LIST.map((item, idx) => (
        <Accordion
          tabBorder={true}
          tabLineHeihgt="18px"
          tabPadding="23px"
          count={0}
          paddingRight="8px"
          paddingLeft="8px"
          paddingTop="0px"
          paddingBottom="20px"
          id={item.title}
          title={item.title}
          initialChecked={idx === 0}
          key={item.title}
        >
          <Description>{item.description}</Description>
        </Accordion>
      ))}
      <Accordion
        tabBorder={true}
        tabLineHeihgt="18px"
        tabPadding="23px"
        count={0}
        paddingRight="8px"
        paddingLeft="8px"
        paddingTop="0px"
        paddingBottom="20px"
        id={"기타"}
        title={"기타"}
        initialChecked={false}
        key={"기타"}
      >
        <TextareaField
          placeholder="신고 사유 직접 입력 (최대 500자)"
          height="62px"
          placeholderColor={palette.비강조}
          isReport
          padding={"12px 16px"}
          lineHeight="20px"
          fontSize="14px"
        />
      </Accordion>
      <ButtonContainer>
        <Button
          onClick={() => {}}
          disabled={true}
          addStyle={
            true
              ? {
                  backgroundColor: "rgba(220, 220, 220, 1)",
                  color: "rgba(132, 132, 132, 1)",
                  boxShadow: "-2px 4px 5px 0px rgba(170, 170, 170, 0.1)",
                }
              : undefined
          }
          text={"신고하기"}
        />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 24px;
  padding-top: 16px;
`;

const Title = styled.div`
  height: 36px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 20px;
  width: 100%;
  border-radius: 14px;
  background-color: ${palette.검색창};
  color: ${palette.비강조};
  font-weight: 400;
  padding: 12px 16px;
`;

export default Report;
