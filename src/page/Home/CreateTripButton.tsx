"use client";
import AddIcon from "@/components/icons/AddIcon";
import useViewTransition from "@/hooks/useViewTransition";
import { useBackPathStore } from "@/store/client/backPathStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isGuestUser } from "@/utils/user";

interface CreateTripButtonProps {
  type?: "trip" | "community";
}

export default function CreateTripButton({
  type = "trip",
}: CreateTripButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const addRef = useRef<HTMLButtonElement>(null); // 버튼 참조
  const pathname = usePathname();
  const router = useRouter();
  const { setCreateTripPlace } = useBackPathStore();
  const createButtonRef = useRef<HTMLButtonElement>(null); // 버튼 참조
  const toggleRotation = () => {
    setIsClicked(!isClicked);
  };
  const navigateWithTransition = useViewTransition();
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // 초기값 설정
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // resize 이벤트 핸들러
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 클린업
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  //가로화면 길이가 좁아질 경우 right 조절.
  const newRightPosition = (24 + 390 - windowSize.width).toString() + "px";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 만약 클릭한 곳이 버튼이 아닌 경우
      if (
        createButtonRef.current &&
        !createButtonRef.current.contains(event.target as Node) &&
        addRef.current &&
        !addRef.current.contains(event.target as Node)
      ) {
        setIsClicked(false); // 상태를 false로 변경
      }
    };

    // 문서에 click 이벤트를 등록
    document.addEventListener("click", handleClickOutside);

    // cleanup 함수: 이벤트 해제
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onClickCreate = () => {
    if (isGuestUser()) {
      router.push("/login");
      return;
    }
    setCreateTripPlace(pathname === "/trip/list" ? "/trip/list" : "/");
    document.documentElement.style.viewTransitionName = "forward";

    if (type === "community") {
      navigateWithTransition("/community/create");
    } else {
      navigateWithTransition("/create/trip/region");
    }
  };
  return (
    <CreatedTripWrapper>
      <CreateBtn
        isClicked={isClicked}
        right={newRightPosition}
        onClick={onClickCreate}
        ref={createButtonRef}
      >
        <img
          src={
            type === "community"
              ? "/images/createCommunityBtn.png"
              : "/images/createTripBtn.png"
          }
          alt=""
          style={{ marginRight: "13px" }}
        />
        {type === "trip" ? "여행 만들기" : "글쓰기"}
      </CreateBtn>

      <IconContainer
        ref={addRef}
        onClick={toggleRotation}
        rotated={isClicked}
        right={newRightPosition}
      >
        <AddIcon />
      </IconContainer>
      {isClicked && <Hide></Hide>}
    </CreatedTripWrapper>
  );
}

const Hide = styled.div`
  position: absolute;
  width: 100%;
  height: 100svh;
  z-index: 1001;
  top: 0;
  bottom: 0;
  background-color: rgba(26, 26, 26, 0.3);
  opacity: 0.8;
  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
    height: 100svh;
    transform: translateX(-50%);
    overflow-x: hidden;
  }
`;
const CreatedTripWrapper = styled.div`
  height: 100svh;
  width: 390px;
  pointer-events: none;
  position: fixed;
  top: 0;
  z-index: 1001;
`;
const CreateBtn = styled.button<{ right: string; isClicked: boolean }>`
  position: absolute;
  bottom: 210px;
  right: 24px;
  pointer-events: auto;
  height: 48px;
  padding: 14px 24px;
  border-radius: 20px;
  cursor: pointer;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  color: ${palette.기본};
  z-index: 1003;
  opacity: ${(props) => (props.isClicked ? 1 : 0)};
  transform: ${(props) =>
    props.isClicked ? "translateY(-5px)" : "translateY(35px)"};

  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
  @media (max-width: 390px) {
    right: ${(props) => props.right};
  }
`;
const IconContainer = styled.button<{ rotated: boolean; right: string }>`
  position: absolute;
  pointer-events: auto;
  right: 24px;
  bottom: 124px;
  cursor: pointer;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${palette.기본};
  z-index: 1003;
  font-size: 32px;
  @media (max-width: 390px) {
    right: ${(props) => props.right};
  }
  transition: transform 0.3s ease; /* 회전 애니메이션 */
  transform: ${(props) => (props.rotated ? "rotate(45deg)" : "rotate(0deg)")};
  /* left: calc(80% - 195px); 버튼의 가로 중앙 조정 (390px의 절반) */
  /* transform: translateY(-50%); 버튼을 정확히 중앙에 위치시킴 */
`;
