"use client";
import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { palette } from "@/styles/palette";

const TopModal = ({ children }: { children: React.ReactNode }) => {
  const [startY, setStartY] = useState(0);
  const [modalHeight, setModalHeight] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setWindowHeight(window.innerHeight);

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      console.log(contentRef.current?.getBoundingClientRect().height, "height");
      setContentHeight(contentRef.current?.getBoundingClientRect().height || 0);
    }
  }, [contentRef.current]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = `${modalHeight}%`;
    }
  }, [modalHeight]);

  useEffect(() => {
    if (contentRef.current) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    if ("touches" in e) {
      setStartY(e.touches[0].pageY);
    } else {
      setStartY(e.pageY);
    }
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !windowHeight) return;

    let currentY;
    if ("touches" in e) {
      currentY = e.touches[0].pageY;
    } else {
      currentY = e.pageY;
    }

    const newHeight = Math.max(0, Math.min(100, ((currentY - 116) / windowHeight) * 100));
    setModalHeight(newHeight);
  };

  const handleDragEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !windowHeight) return;

    setIsDragging(false);
    let endY;
    if ("changedTouches" in e) {
      endY = e.changedTouches[0].pageY;
    } else {
      endY = e.pageY;
    }

    const distanceY = endY - startY;
    const percentMoved = Math.abs(distanceY) / windowHeight;

    if (distanceY < 0) {
      // 아래로 드래그한 경우
      setModalHeight(0);
    } else if (distanceY > 0) {
      // 위로 드래그한 경우
      setModalHeight((contentHeight / windowHeight) * 100);
    }
  };

  if (!isClient) return null;
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <ContentContainer ref={contentRef} onClick={handleContentClick} isClosing={isClosing}>
      {children}
      <BarContainer
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <Bar />
      </BarContainer>
    </ContentContainer>
  );
};

const slideDownMobile = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideDownDesktop = keyframes`
  from {
    transform: translateY(-100%) translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
`;

const slideUpMobile = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const slideUpDesktop = keyframes`
  from {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
  to {
    transform: translateY(-100%) translateX(-50%);
    opacity: 0;
  }
`;

const ContentContainer = styled.div<{ isClosing: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: blue;
  top: 116px;
  overflow: hidden;
  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
    transform: translate(-50%);
  }
  z-index: 1000;
  position: fixed;
  max-height: 100%;
  min-height: 48px;
  left: 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: white;
  padding-bottom: 48px;
  //  animation: ${(props) => (props.isClosing ? slideUpMobile : slideDownMobile)} 0.3s ease-out forwards;
  @media (min-width: 440px) {
    left: 50%;
    //  animation: ${(props) => (props.isClosing ? slideUpDesktop : slideDownDesktop)} 0.3s ease-out forwards;
  }
  transition: all 0.1s ease-out;
  box-shadow: 0px 3px 0 0 rgba(170, 170, 170, 0.15);
`;

const Bar = styled.div`
  height: 3px;
  width: 54px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);

  background-color: rgba(205, 205, 205, 1);
`;

const BarContainer = styled.div`
  display: flex;
  padding: 2.84svh 0;
  position: absolute;
  height: 48px;
  width: 100%;
  bottom: 0;
  background-color: #fff;
`;

export default TopModal;
