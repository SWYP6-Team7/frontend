"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo, RefObject } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const TopModal = ({
  children,
  onHeightChange,
  setIsMapFull,
  containerRef,
}: {
  children: React.ReactNode;
  onHeightChange: (height: number) => void;
  setIsMapFull: (bool: boolean) => void;
  containerRef: RefObject<HTMLDivElement | null>;
}) => {
  const touchStartY = useRef(null);

  const [startY, setStartY] = useState(0);
  const [modalHeight, setModalHeight] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const firstTop = useRef(false);

  const SCROLL_THRESHOLD = 30; // 픽셀 단위
  const scrollAttempts = useRef(0);
  const handleInteraction = useCallback(
    (deltaY) => {
      const container = containerRef.current;
      if (!container) return;

      const isAtTop = container.scrollTop === 0;
      const isScrollingUp = deltaY < 0;

      if (modalHeight === 0 && isAtTop && isScrollingUp) {
        scrollAttempts.current += Math.abs(deltaY);

        if (scrollAttempts.current > SCROLL_THRESHOLD) {
          setModalHeight(contentHeight);
          setIsMapFull(false);
          onHeightChange(contentHeight);
          scrollAttempts.current = 0; // 리셋
        }
      } else {
        scrollAttempts.current = 0; // 조건이 맞지 않으면 리셋
      }
    },
    [modalHeight, contentHeight, onHeightChange]
  );

  const handleWheel = useCallback(
    (event) => {
      const container = containerRef.current;
      if (!container) return;

      const isAtTop = container.scrollTop === 0;
      const isScrollingUp = event.deltaY < 0;

      if (modalHeight === 0 && isAtTop && isScrollingUp) {
        event.preventDefault();
        scrollAttempts.current += Math.abs(event.deltaY);

        if (scrollAttempts.current > SCROLL_THRESHOLD) {
          setModalHeight(contentHeight);
          setIsMapFull(false);
          onHeightChange(contentHeight);
          scrollAttempts.current = 0; // 리셋
        }
      } else {
        scrollAttempts.current = 0; // 조건이 맞지 않으면 리셋
      }
    },
    [modalHeight]
  );

  const handleTouchStart = useCallback((event) => {
    touchStartY.current = event.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (event) => {
      if (touchStartY.current === null) return;

      const deltaY = touchStartY.current - event.touches[0].clientY;
      handleInteraction(deltaY);

      touchStartY.current = event.touches[0].clientY;
    },
    [handleInteraction]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      // container.addEventListener("touchmove", handleTouchMove);

      container.addEventListener("wheel", handleWheel);

      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);

        // container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  const handleScroll = useCallback(
    (e: any) => {
      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;

      const currentScrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const modalHeightPercentage = (modalHeight / clientHeight) * 100;
      // 스크롤 진행률 계산
      const scrollPercentage = (currentScrollTop / (scrollHeight - clientHeight)) * 100;

      if (scrollPercentage >= modalHeightPercentage) {
        contentRef.current?.style.setProperty("transition", "height 0.3s ease-in-out, transform 0.3s ease-in-out");
        setModalHeight(0);

        setIsMapFull(true);
        onHeightChange(48 + currentScrollTop);
        setTimeout(() => {
          if (firstTop.current === false) {
            container.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            firstTop.current = true;
          }
        }, 100);
      } else if (scrollPercentage < modalHeightPercentage) {
        // 스크롤 진행률이 modalHeightPercentage% 미만일 때 modalHeight를 점진적으로 줄임
        if (firstTop.current) firstTop.current = false;
        contentRef.current?.style.setProperty("transition", "transform 0.3s ease-in-out");
        const newHeight = Math.max(0, modalHeight * (1 - scrollPercentage / modalHeightPercentage));
        console.log(newHeight);
        setModalHeight(newHeight);
        // setIsMapFull(false);
        onHeightChange(Math.max(48, newHeight + currentScrollTop));
      }

      setLastScrollTop(currentScrollTop);
    },
    [modalHeight]
  );

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener("scroll", handleScroll);

      return () => {
        currentContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

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
    console.log("children", childrenRef.current?.getBoundingClientRect());
    setModalHeight(
      childrenRef.current?.getBoundingClientRect().height ? childrenRef.current?.getBoundingClientRect().height + 48 : 0
    );
    setContentHeight(
      childrenRef.current?.getBoundingClientRect().height ? childrenRef.current?.getBoundingClientRect().height + 48 : 0
    );
    onHeightChange(
      childrenRef.current?.getBoundingClientRect().height ? childrenRef.current?.getBoundingClientRect().height + 48 : 0
    );
  }, [childrenRef.current?.getBoundingClientRect().height]);
  // 드래그 중이 아닐 때만 contentHeight 업데이트
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current?.getBoundingClientRect().height);
    }
  }, [contentRef.current]);

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
    contentRef.current?.style.setProperty("transition", "height 0.3s ease-in-out, transform 0.3s ease-in-out");

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

    const newHeight = Math.max(0, Math.min(contentHeight, currentY - 116));
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
        firstTop.current = true;
        setModalHeight(0);
        setIsMapFull(true);
        onHeightChange(48);
      } else {
        // 위로 충분히 드래그한 경우
        firstTop.current = false;

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        setModalHeight(contentHeight);
        setIsMapFull(false);
        onHeightChange(contentHeight);
      }
    },
    [isDragging, windowHeight, startY, contentHeight, onHeightChange]
  );

  useEffect(() => {
    if (childrenRef.current) {
      childrenRef.current.addEventListener("scroll", (e) => {
        console.log("1");
        e.stopPropagation();
      });
    }
  }, [childrenRef.current]);

  if (!isClient) return null;
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <ContentContainer
      ref={contentRef}
      maxHeight={window.innerHeight - 280}
      onClick={handleContentClick}
      isClosing={isClosing}
    >
      <ChildrenContainer maxHeight={window.innerHeight - 308} ref={childrenRef}>
        {children}
      </ChildrenContainer>

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

const ChildrenContainer = styled.div<{ maxHeight: number }>`
  max-height: ${(props) => props.maxHeight}px;
  overscroll-behavior: none;
`;

const ContentContainer = styled.div<{ maxHeight: number; isClosing: boolean; height: number }>`
  width: 100%;
  max-height: ${(props) => props.maxHeight}px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;

  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
    transform: translate(-50%);
  }
  z-index: 1000;
  position: fixed;

  min-height: 48px;
  left: 0;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
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
  height: 48px;
  width: 100%;
  bottom: 0;
  background-color: #fff;
`;

export default TopModal;
