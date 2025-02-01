"use client";
import React, { useState } from "react";
import Bookmark from "./Bookmark";
import HostTrip from "./HostTrip";
import ApplyTrip from "./ApplyTrip";
import styled from "@emotion/styled";
import { palette } from "@/styles/palette";

export default function MyTrip() {
  const [activeTab, setActiveTab] = useState<number>(0); // 현재 선택된 탭을 상태로 관리
  // 신청한 여행.

  const tabView = document.querySelector(".tab-view")! as HTMLElement;

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="tab-view">
            <Bookmark />
          </div>
        );

      case 1:
        return (
          <div className="tab-view">
            <HostTrip />
          </div>
        );
      case 2:
        return (
          <div className="tab-view">
            <ApplyTrip />
          </div>
        );
      default:
        return null;
    }
  };

  const tabClickHandler = (tab: number) => {
    setActiveTab(tab);
    if (!(document as any).startViewTransition) {
      return;
    }
    (document as any).startViewTransition(() => {
      tabView.style.viewTransitionName = "tabView";
      document.documentElement.style.viewTransitionName = "";
    });
  };
  return (
    <Container>
      <TabWrapper>
        <TabContainer>
          <Slider index={activeTab} />
          <Tab active={activeTab === 0} onClick={() => tabClickHandler(0)}>
            북마크
          </Tab>
          <Tab active={activeTab === 1} onClick={() => tabClickHandler(1)}>
            만든 여행
          </Tab>
          <Tab active={activeTab === 2} onClick={() => tabClickHandler(2)}>
            참가한 여행
          </Tab>
        </TabContainer>
      </TabWrapper>

      {renderTabContent()}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 24px;
  margin-bottom: 24px;
  height: 46px;
`;
const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 10px 0px;
  width: 100%;
`;

const Tab = styled.div<{ active: boolean }>`
  flex: 1;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  color: ${(props) => (props.active ? palette.keycolor : palette.비강조)};

  font-weight: ${(props) => (props.active ? 600 : 400)} !important;
  position: relative;
  z-index: 2; // 탭 글자가 슬라이더 위에 오도록 설정

  font-size: 14px;
  font-weight: 400;
  line-height: 19.6px;
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled.div<{ index: number }>`
  position: absolute;
  top: 0;
  left: ${({ index }) => (index * 100) / 3}%;
  width: 33%;
  height: 100%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 2px 4px 1px #aaaaaa2e;

  transition: left 0.3s ease;
  z-index: 1; // 슬라이더는 탭 뒤에 위치
`;
