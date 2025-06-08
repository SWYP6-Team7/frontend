import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React from "react";

const AllTravelCount = ({ count }: { count: number }) => {
  return (
    <Container>
      ✨ 총 <Count>{count}</Count>개국을 여행했어요
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
  margin: 16px 24px;
  background-color: ${palette.검색창};
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
  border-radius: 20px;
`;
const Count = styled.span`
  font-size: 16px;
  line-height: 16px;
  color: ${palette.keycolor};
  font-weight: 600;
`;

export default AllTravelCount;
