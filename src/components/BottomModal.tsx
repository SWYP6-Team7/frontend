"use client";
import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { createPortal } from "react-dom";

const BottomModal = ({
  children,
  closeModal,
  initialHeight,
  backdropClick,
}: {
  children: React.ReactNode;
  closeModal: () => void;
  backdropClick?: () => void;
  initialHeight: number;
}) => {
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

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!windowHeight) return; // windowHeight가 0이면 early return

    const currentY = e.changedTouches[0].pageY;
    const newHeight = Math.max(0, Math.min(100, 100 - (currentY / windowHeight) * 100));
    setModalHeight(newHeight);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchY(e.changedTouches[0].pageY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!windowHeight) return; // windowHeight가 0이면 early return

    const distanceY = e.changedTouches[0].pageY - touchY;
    const percentMoved = Math.abs(distanceY) / windowHeight;

    if (distanceY > 0 && percentMoved > 0.2) {
      setIsClosing(true);
      setTimeout(() => {
        if (backdropClick) {
          backdropClick();
        } else {
          closeModal();
        }
      }, 300);
    } else {
      setModalHeight(100);
    }
  };

  // 서버 사이드 렌더링 시 초기 상태
  if (typeof window === "undefined") {
    return null;
  }

  return createPortal(
    <>
      <Container
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
          setIsClosing(true);

          setTimeout(() => {
            if (backdropClick) {
              backdropClick();
            } else {
              closeModal();
            }
          }, 200);
        }}
      >
        <ContentContainer ref={contentRef} onClick={handleContentClick} isClosing={isClosing}>
          <BarContainer onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <Bar />
          </BarContainer>
          {children}
        </ContentContainer>
      </Container>
    </>,
    document.getElementById("end-modal") as HTMLElement
  );
};

// 나머지 스타일 컴포넌트들은 동일하게 유지...
const slideUpMobile = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideUpDesktop = keyframes`
  from {
    transform: translateY(100%) translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(0) translateX(-50%);
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
    opacity: 0;
  }
`;

const slideDownDesktop = keyframes`
  from {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
  to {
    transform: translateY(100%) translateX(-50%);
    opacity: 0;
  }
`;

const Container = styled.div<{ isClosing: boolean }>`
  height: 100svh;
  position: fixed;
  z-index: 1005;
  width: 100%;
  top: 0;
  left: 0;
  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
    transform: translateX(-50%);
  }
  background-color: rgba(0, 0, 0, 0.4);
`;

const ContentContainer = styled.div<{ isClosing: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  bottom: 0;
  left: 0;
  @media (min-width: 440px) {
    width: 390px;
    /* left: 50%;
    transform: translateX(-50%); */
  }
  z-index: 2001;
  position: fixed;
  max-height: 100%;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: white;
  animation: ${(props) => (props.isClosing ? slideDownMobile : slideUpMobile)} 0.3s ease-out forwards;

  transition: all 0.1s ease-out;
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
  position: relative;
`;

export default BottomModal;
