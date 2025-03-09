"use client";
import DnDList from "@/components/DnDList";
import Spacing from "@/components/Spacing";
import { createTripStore } from "@/store/client/createTripStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import React, { DragEvent, ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";

const LIST = [
  { id: 0, title: "도쿄 타워", description: "전망대 도쿄도" },
  { id: 1, title: "도요스 시장", description: "수산시장 도쿄도" },
  { id: 2, title: "도쿄 프린스 호텔", description: "호텔 도쿄도" },
];

const CreateScheduleItem = ({
  title,
  idx,
  isOpen,
  onToggle,
}: {
  title: string;
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const [contentHeight, setContentHeight] = useState(0);
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null); // 콘텐츠 참조 추가
  const { plans } = createTripStore();
  const plan = plans.find((plan) => plan.planOrder === idx);
  const count = plan?.spots?.length ?? 0;
  useEffect(() => {
    if (contentRef.current) {
      console.log(contentRef.current.scrollHeight, "scroll");
      setContentHeight(contentRef.current.scrollHeight + 32);
    }
  }, [isOpen]);
  return (
    <Container>
      <List>
        <input id={title} type="checkbox" style={{ display: "none" }} checked={isOpen} onChange={onToggle} />
        <Tab htmlFor={title}>
          <TitleContainer>
            <Title>Day {idx + 1}</Title>
            <Date>{title}</Date>
          </TitleContainer>
          <RightContainer>
            {count > 0 && <Count>{count}</Count>}
            <IconContainer isChecked={isOpen}>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="#848484" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </IconContainer>
          </RightContainer>
        </Tab>
        <Content
          ref={contentRef} // ref 추가
          isChecked={isOpen}
          contentHeight={contentHeight} // 동적으로 계산된 높이 전달
        >
          {plan?.planOrder !== undefined && <DnDList planOrder={plan!.planOrder} />}
          <Spacing size={16} />
          <Button onClick={() => router.push(`/search/place/${idx}`)}>+장소추가</Button>
        </Content>
      </List>
    </Container>
  );
};

const Container = styled.div`
  padding: 13px 0;
  background-color: #fff;
  border-radius: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Count = styled.div`
  width: 18px;
  height: 16px;

  background-color: ${palette.keycolor};
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 600;
  color: ${palette.비강조4};
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #000;
`;

const Date = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: ${palette.비강조};
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Tab = styled.label<{ tabLineHeight: string; tabPadding: string; fontWeight: number }>`
  display: flex;
  font-size: 16px;
  line-height: 16px;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  padding: 0 16px;
  cursor: pointer;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  transform: ${(props) => (props.isChecked ? "rotate(180deg)" : "rotate(0)")};
`;

const Button = styled.button`
  border-radius: 40px;
  width: 100%;
  height: 42px;
  background-color: ${palette.비강조4};
  color: ${palette.비강조};
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  text-align: center;
`;

const Content = styled.div<{
  isChecked: boolean;
  contentHeight: number;
}>`
  height: ${(props) => (props.isChecked ? `${props.contentHeight}px` : "0")};
  overflow: hidden;
  border-bottom: ${(props) => (props.tabBorder ? "1px solid rgba(240, 240, 240, 1)" : "none")};
  padding: ${(props) => (props.isChecked ? `16px 6px 16px 6px` : `0 0 0 0`)};

  transform: ${(props) => (props.isChecked ? "translateY(0)" : `translateY(${props.paddingTop})`)};
  transition:
    height 0.4s ease-in-out,
    padding 0.4s ease-in-out,
    transform 0.4s ease-in-out;
`;

const List = styled.li`
  overflow: hidden;
  list-style: none;
`;

export default CreateScheduleItem;
