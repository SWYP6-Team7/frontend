"use client";
import useNotification from "@/hooks/notification/useNotification";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import Image from "next/image";

interface AlarmProps {
  size?: number;
  stroke?: string;
}

const AlarmIcon = ({ size = 24, stroke = palette.기본 }: AlarmProps) => {
  const { data } = useNotification();

  return (
    <Container size={size}>
      <Image alt={"alarm icon"} height={23} width={20} src={"/images/alarm.svg"} />
      {data?.pages[0]?.content[0]?.isRead === false && <RedDot />}
    </Container>
  );
};

const Container = styled.div<{ size: number }>`
  position: relative;
  width: 20px;
  height: 23px;
`;

const RedDot = styled.div`
  background-color: #ea2a2a;
  position: absolute;
  top: -1px;
  right: -1px;
  height: 8px;
  width: 8px;
  border-radius: 50%;
`;
export default AlarmIcon;
