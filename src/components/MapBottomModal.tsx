"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { createPortal } from "react-dom";
import { palette } from "@/styles/palette";

const MapBottomModal = ({
  children,

  initialHeight,
}: {
  children: React.ReactNode;

  initialHeight: number;
}) => {
  const [startY, setStartY] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const SCROLL_THRESHOLD = 100; // 픽셀 단위
  const scrollAttempts = useRef(0);
  const [touchY, setTouchY] = useState(0);
  const [modalHeight, setModalHeight] = useState(initialHeight);
  const [isClosing, setIsClosing] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // window 객체를 안전하게 사용하기 위한 useEffect
  useEffect(() => {
    setWindowHeight(window.innerHeight);

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = `${modalHeight}px`;
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
      console.log(e?.touches[0].pageY, e);
    } else {
      currentY = e.pageY;
    }

    const newHeight = Math.max(0, windowHeight - currentY);
    setModalHeight(newHeight);
  };

  const handleDragEnd = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!isDragging || !windowHeight) return;

      setIsDragging(false);
      let endY;
      if ("changedTouches" in e) {
        endY = e.changedTouches[0].pageY;
      } else {
        endY = e.pageY;
      }

      const distanceY = endY - startY;

      if (distanceY < 0) {
        // 아래로 충분히 드래그한 경우
        setModalHeight(initialHeight);
      } else {
        // 위로 충분히 드래그한 경우
        setModalHeight(0);
      }
    },
    [isDragging, windowHeight, startY, initialHeight]
  );

  // 서버 사이드 렌더링 시 초기 상태
  if (typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <>
      <>
        <ContentContainer
          ref={contentRef}
          onClick={handleContentClick}
          isClosing={isClosing}
        >
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
          {children}
        </ContentContainer>
      </>
    </>,
    document.getElementById("end-modal") as HTMLElement
  );
};

// 나머지 스타일 컴포넌트들은 동일하게 유지...
const slideUpMobile = keyframes`
  from {
    transform: translateY(100%);
    opacity: 1;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideDownMobile = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
opacity: 1;
  }
`;

const Container = styled.div<{ isClosing: boolean }>``;
const ContentContainer = styled.div<{ isClosing: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  bottom: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: white;
  padding-bottom: 48px;
  @media (min-width: 440px) {
    left: 50%;
  }
  transition:
    height 0.3s ease-out,
    transform 0.3s ease-out;
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
  top: 0;
  z-index: 5;
  left: 0;
  right: 0;
  background-color: ${palette.BG};
`;

export default MapBottomModal;
