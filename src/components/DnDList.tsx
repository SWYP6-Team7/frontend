"use client";

import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import { DragEvent, ForwardedRef, forwardRef, useRef, useState } from "react";

type DndItemType = {
  id: number;
  title: string;
  description: string;
};

const DndItem = (
  {
    id,
    title,
    description,
    isDragging,
    handleMouseDown,
    handleDragStart,
  }: DndItemType & {
    isDragging: boolean;
    handleMouseDown: () => void;
    handleDragStart: (e: DragEvent) => void;
  },
  ref: ForwardedRef<HTMLLIElement>
) => {
  return (
    <Item
      data-id={id}
      draggable={isDragging}
      isDragging={isDragging}
      onMouseDown={handleMouseDown}
      onDragStart={handleDragStart}
      ref={ref}
    >
      <LeftContainer>
        <Index>{id + 1}</Index>
        <TextContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
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
        <IconContainer>
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

const DnDList = ({ data }: { data: any[] }) => {
  const [list, setList] = useState<DndItemType[]>(data);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const cacheList = useRef<DndItemType[]>(data);
  const containerRef = useRef<HTMLUListElement | null>(null);

  const handleMouseDown = (id: number) => () => {
    setDraggingId(Number(id));
  };

  const handleDragStart = (e: DragEvent) => {
    cacheList.current = list;
    console.log("dldldl");
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
    }
  };
  console.log("list", list);
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();

    const el = e.target as HTMLElement;
    if (!el.dataset.dragHandle) return;

    const { clientY } = e;

    // 현재 드래그 위치(clientY)와 비교하여 대상 요소 찾기
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

    // 마지막 요소로 이동 처리
    if (targetIndex === -1) {
      targetIndex = itemsRef.current!.length; // 리스트 끝으로 이동
    }

    // 드래그 중인 항목과 대상 항목 찾기
    const draggingItemIndex = list.findIndex((item) => item.id === Number(draggingId));
    const draggingItem = list[draggingItemIndex];

    // 리스트 업데이트
    setList((prev) => {
      const next = prev.filter((p) => p !== draggingItem); // 드래그 중인 항목 제거
      next.splice(targetIndex, 0, draggingItem); // 새로운 위치에 삽입
      return next;
    });
  };

  const handleDragEnd = (e: DragEvent) => {
    console.log(e.dataTransfer);
    if (e.dataTransfer?.dropEffect === "none") setList(cacheList.current);
    setDraggingId(null);
  };
  return (
    <ul ref={containerRef} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      {list.map((item, i) => (
        <ForwardedDndItem
          {...item}
          key={item.id}
          isDragging={draggingId === item.id}
          handleMouseDown={handleMouseDown(item.id)}
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
