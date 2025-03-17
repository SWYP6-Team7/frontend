"use client";
import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/designSystem/Buttons/Button";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Block = () => {
  const router = useRouter();
  return (
    <div>
      <HeaderContainer>
        <IconContainer onClick={() => router.replace("/login")}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.7782 2.22202L2.22183 17.7784M17.7782 17.7784L2.22183 2.22202"
              stroke="#343434"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconContainer>
      </HeaderContainer>
      <Container>
        <TitleContainer>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_5166_24880)">
              <circle cx="12" cy="12" r="12" fill="#3E8D00" />
              <path
                d="M11.668 6.33333C11.668 6.14924 11.8172 6 12.0013 6V6C12.1854 6 12.3346 6.14924 12.3346 6.33333V12.8667C12.3346 13.0508 12.1854 13.2 12.0013 13.2V13.2C11.8172 13.2 11.668 13.0508 11.668 12.8667V6.33333Z"
                stroke="#FDFDFD"
                strokeWidth="2"
              />
              <path
                d="M10.5 17.5C10.5 16.6716 11.1716 16 12 16C12.8284 16 13.5 16.6716 13.5 17.5C13.5 18.3284 12.8284 19 12 19C11.1716 19 10.5 18.3284 10.5 17.5Z"
                fill="#FDFDFD"
              />
            </g>
            <defs>
              <clipPath id="clip0_5166_24880">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <Title>현재 차단된 계정이에요</Title>
        </TitleContainer>
        <Bar />
        <ProfileContainer>
          <Image src={"/"} alt="profile" width={80} height={80} style={{ borderRadius: "50%" }} />
          <ProfileTextContainer>
            <ProfileName>dd</ProfileName>
            <ProfileEmail>ee</ProfileEmail>
          </ProfileTextContainer>
        </ProfileContainer>
        <Description>
          신고가 5회 이상 접수되었습니다. 이에 따라 회원님의 계정 접속을 차단하였습니다. 계정 차단은 yyyy. mm. dd.
          hh.mm까지 적용됩니다.
          <br /> 문의가 있으실 경우,
          <br /> 문의하기를 통해 접수해주시기 바랍니다.
        </Description>
      </Container>
      <ButtonContainer>
        <Button onClick={() => router.replace(`/contact?type=block`)} text={"문의하기"} />
      </ButtonContainer>
    </div>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  height: 100px;
  align-items: center;

  position: relative;
  top: 0px;
  background-color: ${palette.BG};
  z-index: 1000;

  width: 100%;
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 40px;
  left: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  padding: 0 24px;
`;

const TitleContainer = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const Title = styled.div`
  line-height: 31px;
  font-weight: 600;
  font-size: 24px;
  color: ${palette.기본};
`;

const Bar = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e7e7e7;
  margin: 40px 0;
`;

const ProfileContainer = styled.div`
  border-radius: 20px;
  width: 100%;
  height: 120px;
  padding: 20px;
  background-color: ${palette.검색창};
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProfileName = styled.div`
  line-height: 16px;
  font-size: 20px;
  font-weight: 600;
  color: ${palette.기본};
`;
const ProfileEmail = styled.div`
  line-height: 16px;
  font-size: 12px;
  font-weight: 400;
  color: ${palette.비강조};
`;

const Description = styled.div`
  margin-top: 32px;
  padding: 0 18px;
  text-align: center;
  line-height: 19.6px;
  font-size: 14px;
  font-weight: 400;
`;

export default Block;
