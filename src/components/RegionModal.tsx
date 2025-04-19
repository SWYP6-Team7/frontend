"use client";
import React from "react";
import { createPortal } from "react-dom";
import TripRegion from "./TripRegion";
import Spacing from "./Spacing";
import styled from "@emotion/styled";
import { palette } from "@/styles/palette";

interface RegionModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addLocationName: ({
    locationName,
    mapType,
    countryName,
  }: {
    locationName: string;
    mapType: "google" | "kakao";
    countryName: string;
  }) => void;
  locationName: {
    locationName: string;
    mapType: "google" | "kakao";
    countryName: string;
  };
}

const RegionModal = ({
  isModalOpen,
  setIsModalOpen,
  addLocationName,
  locationName,
}: RegionModalProps) => {
  const handleClose = () => {
    console.log("testing");
    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;
  return createPortal(
    <Container>
      <Header>
        <CloseContainer onClick={handleClose}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.7782 2.22202L2.22183 17.7784M17.7782 17.7784L2.22183 2.22202"
              stroke="#343434"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CloseContainer>
      </Header>
      <Spacing size={8} />

      <TripRegion
        addLocationName={addLocationName}
        initLocationName={locationName}
        nextFunc={handleClose}
      />
    </Container>,
    document.getElementById("region-modal") as HTMLElement
  );
};

const Container = styled.div`
  height: 100svh;
  width: 100svw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1010;
  background-color: ${palette.BG};
  padding: 0 24px;
  @media (min-width: 440px) {
    left: 50%;
    transform: translateX(-50%);
    width: 390px;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 116px;
  top: 0;
  position: relative;
`;

const CloseContainer = styled.div`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 52px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default RegionModal;
