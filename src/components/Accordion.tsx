"use client";
import styled from "@emotion/styled";
import React, { useState, useRef, useEffect } from "react";
import SelectArrow from "./icons/SelectArrow";
import { palette } from "@/styles/palette";
import Vector from "./icons/Vector";
import { usePathname } from "next/navigation";

const Accordion = ({
  id,
  title,
  children,
  initialChecked,
  paddingTop = "1.7svh",
  paddingLeft = "1.7svh",
  paddingRight = "1.7svh",
  paddingBottom = "1.7svh",
  tabPadding = "20px",
  tabLineHeihgt = "19px",
  fontWeight = 600,
  tabBorder = true,
  count,
}: {
  id: string;
  count: number;
  fontWeight: number;
  title: string | React.ReactNode;
  paddingTop?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingBottom?: string;
  tabPadding?: string;
  tabLineHeihgt?: string;
  tabBorder?: boolean;
  children: React.ReactNode;
  initialChecked: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null); // 콘텐츠 참조 추가
  const pathname = usePathname();
  const isCreateTripPage = pathname === "/createTripDetail";
  const isEditTripPage = pathname?.startsWith("/trip/edit");

  useEffect(() => {
    if (contentRef.current) {
      const paddingTopNumber = Number(paddingTop.match(/\d+(\.\d+)?/g));
      const paddingBottomNumber = Number(paddingBottom.match(/\d+(\.\d+)?/g));

      const paddingHeight = paddingTop.includes("vh")
        ? paddingTopNumber * (window.innerHeight / 100) + paddingBottomNumber * (window.innerHeight / 100)
        : paddingTopNumber + paddingBottomNumber; // svh 값을 픽셀로 계산
      setContentHeight(contentRef.current.scrollHeight + paddingHeight);
    }
  }, [isChecked]);

  return (
    <List>
      <input
        type="checkbox"
        id={id}
        style={{ display: "none" }}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <Tab
        tabPadding={tabPadding}
        tabLineHeight={tabLineHeihgt}
        fontWeight={fontWeight}
        htmlFor={id}
        isCreateTripPage={Boolean((isCreateTripPage || isEditTripPage) && isChecked)}
      >
        <TitleContainer>
          {isCreateTripPage ? (
            <TitleTextCreateTrip isCreateTripPage={isCreateTripPage || isEditTripPage}>{title}</TitleTextCreateTrip>
          ) : (
            <div>{title}</div>
          )}

          {count > 0 && <Count isCreateTripPage={isCreateTripPage || Boolean(isEditTripPage)}>{count}</Count>}
        </TitleContainer>
        <div style={{ transform: isChecked ? "rotate(180deg)" : "rotate(0)" }}>
          {isCreateTripPage ? <Vector stroke={palette.비강조} /> : <SelectArrow width={12} height={6} />}
        </div>
      </Tab>
      <Content
        tabBorder={Boolean((isCreateTripPage || isEditTripPage) && isChecked) || tabBorder}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        paddingLeft={paddingLeft}
        paddingRight={paddingRight}
        ref={contentRef} // ref 추가
        isChecked={isChecked}
        contentHeight={contentHeight} // 동적으로 계산된 높이 전달
        isCreateTripPage={isCreateTripPage || Boolean(isEditTripPage)}
      >
        {children}
      </Content>
      {isCreateTripPage && isChecked && (
        <div
          style={{
            marginTop: "24px",
            height: "1px",
            border: "0.5px solid rgba(240, 240, 240, 1)",
          }}
        ></div>
      )}
    </List>
  );
};

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const TitleTextCreateTrip = styled.div<{ isCreateTripPage: boolean }>`
  font-size: 18px;
  font-weight: 600;
  line-height: ${(props) => (props.isCreateTripPage ? "29.2px" : "25.2px")};
  text-align: left;
  color: ${palette.기본};
  height: 25px;
  padding: 0px 6px;
  gap: 8px;
  opacity: 0px;
`;
const Count = styled.div<{ isCreateTripPage: boolean }>`
  width: 16px;
  height: 16px;
  padding: 1px 5px 1px 5px;
  gap: 10px;
  background-color: ${palette.keycolor};
  border-radius: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 600;

  line-height: ${(props) => (props.isCreateTripPage ? "0" : "14.32px")};
  color: ${palette.비강조4};

  opacity: 0px;
`;

const Tab = styled.label<{ tabLineHeight: string; tabPadding: string; fontWeight: number }>`
  display: flex;

  font-size: 16px;
  font-weight: ${(props) => props.fontWeight};
  line-height: ${(props) => props.tabLineHeight};

  align-items: center;
  justify-content: space-between;

  padding: ${(props) => props.tabPadding} 0;
  cursor: pointer;
`;

const Content = styled.div<{
  isChecked: boolean;
  contentHeight: number;
  isCreateTripPage: boolean;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
  tabBorder: boolean;
}>`
  height: ${(props) => (props.isChecked ? `${props.contentHeight}px` : "1px")};
  overflow: hidden;
  border-bottom: ${(props) => (props.tabBorder ? "1px solid rgba(240, 240, 240, 1)" : "none")};
  padding: ${(props) =>
    props.isChecked
      ? `${props.paddingTop} ${props.paddingRight} ${props.paddingBottom} ${props.paddingLeft}`
      : `0 ${props.paddingRight} 0 ${props.paddingLeft}`};
  /* opacity: ${(props) => (props.isChecked ? "1" : "0")}; */
  transform: ${(props) => (props.isChecked ? "translateY(0)" : `translateY(${props.paddingTop})`)};
  transition:
    height 0.4s ease-in-out,
    padding 0.4s ease-in-out,
    /* opacity 0.4s ease-in-out, */ transform 0.4s ease-in-out;
`;

const List = styled.li`
  overflow: hidden;
  list-style: none;
`;

export default Accordion;
