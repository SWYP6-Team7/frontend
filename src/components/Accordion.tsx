"use client";
import styled from "@emotion/styled";
import React, { useState } from "react";
import SelectArrow from "./icons/SelectArrow";
import { palette } from "@/styles/palette";
import Vector from "./icons/Vector";
import { usePathname } from "next/navigation";

const Accordion = ({
  id,
  title,
  children,
  initialChecked,
  count,
}: {
  id: string;
  count: number;
  title: string;
  children: React.ReactNode;
  initialChecked: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(initialChecked);
  const pathname = usePathname();
  const isCreateTripPage = pathname === "/createTripDetail";
  const isEditTripPage = pathname?.startsWith("/trip/edit");

  return (
    <List>
      <input
        type="checkbox"
        id={id}
        style={{ display: "none" }}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <Tab htmlFor={id} isCreateTripPage={Boolean((isCreateTripPage || isEditTripPage) && isChecked)}>
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
      <Content checked={isChecked} isCreateTripPage={isCreateTripPage || Boolean(isEditTripPage)}>
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

const Tab = styled.label<{ isCreateTripPage: boolean }>`
  display: flex;

  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;

  align-items: center;
  justify-content: space-between;
  border-bottom: ${(props) => (props.isCreateTripPage ? "none" : "1px solid rgba(240, 240, 240, 1)")};
  padding: 2.3svh 0;
  cursor: pointer;
`;

const Content = styled.div<{ checked: boolean; isCreateTripPage: boolean }>`
  max-height: ${(props) => (props.checked ? (props.isCreateTripPage ? "55svh" : "25svh") : "0")};

  padding: ${(props) => (props.checked ? "1.7svh" : "0 1.7svh")};
  opacity: ${(props) => (props.checked ? "1" : "0 ")};

  transform: ${(props) => (props.checked ? "translateY(0)" : "translateY(20px)")};
  transition:
    max-height 0.3s ease,
    padding 0.3s ease;
`;

const List = styled.li`
  overflow: hidden;
  list-style: none;
`;

export default Accordion;
