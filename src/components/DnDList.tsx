"use client";

import { SpotType } from "@/model/trip";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import { DragEvent, ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";

const DndItem = (
  {
    idx,
    name,
    region,
    id,
    category,
    isDragging,
    handleMouseDown,
    handleTouchStart,
    handleDragStart,
    handleDelete,
  }: SpotType & {
    idx: number;
    isDragging: boolean;
    handleMouseDown: () => void;
    handleTouchStart: (e: React.TouchEvent) => void;
    handleDragStart: (e: DragEvent) => void;
    handleDelete: () => void;
  },
  ref: ForwardedRef<HTMLLIElement>
) => {
  console.log(idx, name, region);
  return (
    <Item
      data-id={id}
      draggable={isDragging}
      isDragging={isDragging}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onDragStart={handleDragStart}
      ref={ref}
    >
      <LeftContainer>
        <Index>{idx + 1}</Index>
        <TextContainer>
          <Title>{name}</Title>
          <Description>
            {category} {region}
          </Description>
        </TextContainer>
      </LeftContainer>
      <RightContainer>
        <IconContainer data-drag-handle>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6H15" stroke="#ABABAB" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 1H15" stroke="#ABABAB" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 11H15" stroke="#ABABAB" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </IconContainer>
        <IconContainer onClick={handleDelete}>
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4H2.55556H15" stroke="#ABABAB" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M13.4436 4V14.5C13.4436 14.8978 13.2797 15.2794 12.988 15.5607C12.6962 15.842 12.3006 16 11.888 16H4.11024C3.69768 16 3.30202 15.842 3.0103 15.5607C2.71858 15.2794 2.55469 14.8978 2.55469 14.5V4M4.88802 4V2.5C4.88802 2.10218 5.05191 1.72064 5.34363 1.43934C5.63536 1.15804 6.03102 1 6.44358 1H9.55469C9.96725 1 10.3629 1.15804 10.6546 1.43934C10.9464 1.72064 11.1102 2.10218 11.1102 2.5V4"
              stroke="#ABABAB"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M6.44531 7.75V12.25" stroke="#ABABAB" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.55469 7.75V12.25" stroke="#ABABAB" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </IconContainer>
      </RightContainer>
    </Item>
  );
};

const ForwardedDndItem = forwardRef(DndItem);

const DnDList = ({
  planOrder,
  plans,
  addPlans,
}: {
  planOrder: number;
  plans: {
    planOrder: number;
    spots: SpotType[];
  }[];
  addPlans: (
    plans: {
      planOrder: number;
      spots: SpotType[];
    }[]
  ) => void;
}) => {
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const containerRef = useRef<HTMLUListElement | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  console.log(plans);
  // 현재 planOrder에 해당하는 spots 가져오기
  const currentPlan = plans.find((plan) => plan.planOrder === planOrder);
  if (!currentPlan) return null; // 현재 planOrder에 해당하는 계획이 없으면 렌더링하지 않음

  const spots = currentPlan.spots;

  // 드래그 종료 후 Zustand 상태 업데이트
  const updatePlans = (newSpots: SpotType[]) => {
    const updatedPlans = plans.map((plan) => (plan.planOrder === planOrder ? { ...plan, spots: newSpots } : plan));
    addPlans(updatedPlans); // Zustand 상태 업데이트
  };

  // 공통 로직: 항목 이동 처리
  const moveItem = (clientY: number) => {
    let targetIndex = -1;
    for (let i = 0; i < itemsRef.current!.length; i++) {
      const sib = itemsRef.current![i];
      if (!sib) continue;

      const rect = sib.getBoundingClientRect();
      const itemMiddle = rect.top + rect.height / 2;

      if (clientY <= itemMiddle) {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex === -1) {
      targetIndex = itemsRef.current!.length;
    }

    const draggingItemIndex = spots.findIndex((item) => item.id === draggingId);
    const draggingItem = spots[draggingItemIndex];

    const updatedSpots = [...spots];
    updatedSpots.splice(draggingItemIndex, 1); // 기존 위치에서 제거
    updatedSpots.splice(targetIndex, 0, draggingItem); // 새로운 위치에 삽입

    updatePlans(updatedSpots); // 상태 업데이트
  };

  /** 마우스 이벤트 핸들러 */
  const handleMouseDown = (id: string) => () => {
    setDraggingId(id);
  };

  const handleDelete = (id: string) => {
    const updatedSpots = spots.filter((spot) => spot.id !== id);
    const updatedPlans = plans.map((plan) => (plan.planOrder === planOrder ? { ...plan, spots: updatedSpots } : plan));
    addPlans(updatedPlans);
  };

  const handleDragStart = (e: DragEvent) => {
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (!draggingId) return;
    moveItem(e.clientY);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  /** 터치 이벤트 핸들러 */
  const handleTouchStart = (id: string) => (e: React.TouchEvent) => {
    setDraggingId(id);
    touchStartY.current = e.touches[0].clientY; // 터치 시작 위치 저장
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggingId || touchStartY.current === null) return;

    moveItem(e.touches[0].clientY); // 터치 위치를 기반으로 항목 이동 처리

    if (containerRef.current) {
      containerRef.current.scrollTop += e.touches[0].clientY - touchStartY.current; // 스크롤 처리
    }

    touchStartY.current = e.touches[0].clientY; // 현재 터치 위치 갱신
  };

  const handleTouchEnd = () => {
    setDraggingId(null);
    touchStartY.current = null;
  };

  return (
    <ul
      ref={containerRef}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {spots.map((item, i) => (
        <ForwardedDndItem
          {...item}
          idx={i}
          key={item.id}
          handleDelete={() => handleDelete(item!.id as string)}
          isDragging={draggingId === (item!.id as string)}
          handleMouseDown={handleMouseDown(item!.id as string)}
          handleTouchStart={handleTouchStart(item!.id as string)}
          handleDragStart={handleDragStart}
          ref={(r) => {
            itemsRef.current[i] = r;
          }}
        />
      ))}
    </ul>
  );
};

const Item = styled.li<{ isDragging: boolean }>`
  display: flex;
  ${(props) =>
    props.isDragging
      ? `
      padding: 0 12px;
      border-radius: 20px;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    `
      : "padding: 0 10px;"}
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease-out;
  height: 58px;
  user-select: none;
  touch-action: none;
`;

const Index = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 18px;
  border-radius: 100px;
  height: 18px;
  background-color: ${palette.기본};
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
`;

const RightContainer = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  width: 42px;
  height: 42px;
  justify-content: center;
  cursor: move;
  touch-action: none;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  line-height: 19px;
`;

const Description = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${palette.비강조};
  line-height: 14px;
`;

export default DnDList;
