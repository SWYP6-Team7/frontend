"use client";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useState } from "react";
import CreateContact from "./CreateContact";
import ContactList from "./ContactList";

const Contact = () => {
  const [activeTab, setActiveTab] = useState<number>(0); // 현재 선택된 탭을 상태로 관리
  const tabClickHandler = (tab: number) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <CreateContact />;

      case 1:
        return <ContactList />;

      default:
        return null;
    }
  };

  return (
    <Container>
      <TabWrapper>
        <TabContainer>
          <Slider index={activeTab} />
          <Tab active={activeTab === 0} onClick={() => tabClickHandler(0)}>
            문의하기
          </Tab>
          <Tab active={activeTab === 1} onClick={() => tabClickHandler(1)}>
            문의내역
          </Tab>
        </TabContainer>
      </TabWrapper>
      {renderTabContent()}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  top: 116px;
  position: sticky;
  width: 100%;
  height: 48px;
`;
const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  background-color: rgba(253, 253, 253, 1);
  padding: 14px 0px;
  width: 100%;
`;

const Tab = styled.div<{ active: boolean }>`
  flex: 1;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  color: ${(props) => (props.active ? palette.keycolor : palette.비강조)};

  font-weight: 600 !important;
  position: relative;
  z-index: 2; // 탭 글자가 슬라이더 위에 오도록 설정

  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled.div<{ index: number }>`
  position: absolute;
  bottom: 0;
  left: ${({ index }) => (index * 100) / 2}%;
  width: 50%;
  height: 2px;
  background-color: white;
  background-color: ${palette.keycolor};

  transition: left 0.3s ease;
  z-index: 1; // 슬라이더는 탭 뒤에 위치
`;

export default Contact;
