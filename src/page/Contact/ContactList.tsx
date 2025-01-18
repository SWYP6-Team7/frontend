"use client";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React from "react";
import ContactInfinite from "./ContactInfinite";

const ContactList = () => {
  return (
    <>
      <SortContainer>
        <CountContainer>
          총&nbsp;
          {/* <Count>{data?.pages[0].page.totalElements ?? 0}건</Count> */}
          <Count>{0}건</Count>
        </CountContainer>
      </SortContainer>
      <Container>
        <ContactInfinite />
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 0 24px;
  min-height: 100%;
  overflow-y: auto;
  width: 100%;
`;

const SortContainer = styled.div`
  padding: 0 24px;
  padding-top: 22px;
  padding-bottom: 16px;

  position: sticky;
  top: 172px;
  z-index: 1001;

  background-color: ${palette.BG};
  box-sizing: border-box;
`;
const CountContainer = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  letter-spacing: -0.025em;
`;

const Count = styled.span`
  color: #3e8d00;
  font-weight: 700;
`;

export default ContactList;
