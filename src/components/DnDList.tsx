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
    handleTouchStart,
    handleDragStart,
  }: DndItemType & {
    isDragging: boolean;
    handleMouseDown: () => void;
    handleTouchStart: (e: React.TouchEvent) => void;
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
      onTouchStart={handleTouchStart}
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
  const touchStartY = useRef<number | null>(null);

  const handleMouseDown = (id: number) => () => {
    setDraggingId(Number(id));
  };

  const handleTouchStart = (id: number) => (e: React.TouchEvent) => {
    setDraggingId(Number(id));
    touchStartY.current = e.touches[0].clientY;
  };

  const handleDragStart = (e: DragEvent) => {
    cacheList.current = list;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();

    const findDragHandle = (element: HTMLElement | null): HTMLElement | null => {
      while (element && !element.dataset.dragHandle) {
        element = element.parentElement;
      }
      return element;
    };

    const el = findDragHandle(e.target as HTMLElement);
    if (!el) return;

    const { clientY } = e;

    let targetIndex = -1;
    for (let i = 0; i < itemsRef.current!.length; i++) {
      const sib = itemsRef.current![i];
      console.log("sib", sib);
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

    const draggingItemIndex = list.findIndex((item) => item.id === Number(draggingId));
    const draggingItem = list[draggingItemIndex];
    console.log(draggingItem);
    setList((prev) => {
      const next = prev.filter((p) => p !== draggingItem);
      next.splice(targetIndex, 0, draggingItem);
      return next;
    });
  };

  const handleDragEnd = (e: DragEvent) => {
    if (e.dataTransfer?.dropEffect === "none") setList(cacheList.current);
    setDraggingId(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (draggingId === null || touchStartY.current === null) return;
    console.log(123);
    const touchY = e.touches[0].clientY;
    const deltaY = touchY - touchStartY.current;

    handleDragOver({
      preventDefault: () => {},
      target: e.target,
      clientY: touchY,
    } as unknown as DragEvent);

    if (containerRef.current) {
      containerRef.current.scrollTop += deltaY;
    }

    touchStartY.current = touchY;
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
      {list.map((item, i) => (
        <ForwardedDndItem
          {...item}
          key={item.id}
          isDragging={draggingId === item.id}
          handleMouseDown={handleMouseDown(item.id)}
          handleTouchStart={handleTouchStart(item.id)}
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
