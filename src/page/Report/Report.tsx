"use client";
import Accordion from "@/components/Accordion";
import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/designSystem/Buttons/Button";
import TextareaField from "@/components/designSystem/input/TextareaField";
import ArrowIcon from "@/components/icons/ArrowIcon";
import { reportStore } from "@/store/client/reportStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export const REPORT_LIST = [
  {
    title: "욕설, 비방, 혐오",
    query: "abuse",
    item: [
      { id: 1, title: "다른 사람을 비하하거나 모욕했어요." },
      { id: 2, title: "특정 집단을 혐오하거나 차별하는 표현이 있어요." },
      { id: 3, title: "공격적이거나 불쾌한 내용을 포함하고 있어요." },
    ],
  },
  {
    title: "도배, 홍보, 영리목적",
    query: "spam",
    item: [
      { id: 4, title: "똑같은 글이나 댓글을 반복해서 올렸어요." },
      { id: 5, title: "상업적인 광고나 홍보, 수익 창출 목적의 글이에요." },
    ],
  },
  {
    title: "허위 정보 및 사기, 거짓 후기 등",
    query: "misinformation",
    item: [
      { id: 6, title: "사실과 다른 정보를 제공하고 있어요." },
      { id: 7, title: "신뢰할 수 없는 거짓 후기예요." },
      { id: 8, title: "여행 사기와 관련된 내용이 의심돼요." },
    ],
  },
  {
    title: "저작권 침해, 불법적 거래 유도",
    query: "illegal",
    item: [
      {
        id: 9,
        title: "다른 사람이 만든 콘텐츠(사진, 글, 영상 등)를 허락 없이 사용했어요.",
      },
      { id: 10, title: "법적으로 금지된 상품이나 서비스를 거래하려고 해요." },
    ],
  },
  {
    title: "개인정보 관련 및 안전 위협",
    query: "privacy",
    item: [
      { id: 11, title: "계좌번호, 신분증, 여권 등 개인정보가 노출되었어요." },

      {
        id: 12,
        title: "성희롱, 협박, 스토킹 등 불쾌하거나 위협적인 경험을 했어요.",
      },
    ],
  },
  {
    title: "기타",
    id: 13,
    query: "etc",
  },
];

const Report = () => {
  const [checkItem, setCheckItem] = useState(-1);
  const [text, setText] = useState("");
  const { setReportSuccess } = reportStore();
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = (idx: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(idx);
    router.push(`${pathname}/${REPORT_LIST[idx].query}`);
  };

  const submitReport = () => {
    setReportSuccess(true);
    router.back();
  };
  console.log(checkItem, checkItem === -1 || checkItem === 5 ? (text === "" ? true : false) : false);
  return (
    <Container>
      <Title>신고 유형을 선택해 주세요.</Title>
      <Subtitle>
        신고는 익명으로 처리되며,
        <br />
        순차적으로 확인 후 조치해 드릴게요
      </Subtitle>
      {REPORT_LIST.map((item, idx) => (
        <Description onClick={handleClick(idx)} isFirst={idx === 0}>
          <Text>{item.title}</Text>
          <ArrowIconContainer>
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 17L9 9L1 1" stroke="#ABABAB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ArrowIconContainer>
        </Description>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 0 24px;
  padding-top: 18px;
  padding-bottom: 214px;
`;

const Title = styled.div`
  font-size: 20px;
  line-height: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding-left: 4px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${palette.비강조};
  line-height: 20px;
  margin-top: 12px;
  margin-bottom: 26px;
`;

const Text = styled.div`
  padding-left: 4px;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Description = styled.div<{ isFirst: boolean }>`
  display: flex;
  cursor: pointer;
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 66px;
  border-bottom: 1px #e7e7e7 solid;
  border-top: ${(props) => (props.isFirst ? "1px" : 0)} #e7e7e7 solid;
`;

const ArrowIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`;

export default Report;
