"use client";
import styled from "@emotion/styled";
import ArrowIcon from "@/components/icons/ArrowIcon";
import { useRouter } from "next/navigation";
import { useClickTracking } from "@/hooks/useClickTracking";
interface TitleContainerProps {
  text: React.ReactNode;
  minWidth?: string;
  detailLink?: string;
  linkText?: string;
}
const TitleContainer = ({ text, minWidth = "auto", detailLink = "/", linkText = "" }: TitleContainerProps) => {
  const router = useRouter();
  const { track } = useClickTracking();
  const clickHandler = () => {
    track(`${linkText} 버튼 클릭`);
    router.push(`${detailLink}`);
  }; // 후에 보여줄 페이지 부분.
  return (
    <ContentTitle>
      <span style={{ minWidth }}>{text}</span>
      <More onClick={clickHandler}>
        <ArrowIcon />
      </More>
    </ContentTitle>
  );
};
export default TitleContainer;
const ContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;

    text-align: left;
  }
`;
const More = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;
