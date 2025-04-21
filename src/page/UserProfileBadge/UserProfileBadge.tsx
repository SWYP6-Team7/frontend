"use client";

import BadgeLockIcon from "@/components/icons/BadgeLockIcon";
import { palette } from "@/styles/palette";
import { useEffect } from "react";
import styled from "@emotion/styled";
import { useParams } from "next/navigation";
import { myPageStore } from "@/store/client/myPageStore";
import { authStore } from "@/store/client/authStore";
import useUserProfile from "@/hooks/userProfile/useUserProfile";

export function UserProfileBadge() {
  // API 요청. hooks 캐시 값 이용.
  const tempBadgeArray = new Array(12).fill({ Icon: BadgeLockIcon, name: "배지 이름" });
  const params = useParams();
  const ID = params.userId as string; // 혹은 params['id'
  const { userProfileInfo } = useUserProfile();

  // params에서 userId가 내 꺼랑 같으면 배지 그거 쓰고, 아니라면 userProfile()쓰기.

  const profileData =
    ID === authStore().userId?.toString()
      ? {
          travelBadgeCount: myPageStore().travelBadgeCount,
        }
      : {
          travelBadgeCount: userProfileInfo!.travelBadgeCount,
        };

  const { travelBadgeCount } = profileData;
  return (
    <Container>
      <Text>
        현재
        <BadgeCount>{travelBadgeCount}</BadgeCount>
        개의 배지를 획득했어요.
      </Text>
      <BadgeGrid>
        {tempBadgeArray.map((badge) => (
          <BadgeItem key={badge.name}>
            <BadgeLockIcon />
            <BadgeName>{badge.name}</BadgeName>
          </BadgeItem>
        ))}
      </BadgeGrid>
    </Container>
  );
}

export const Container = styled.div`
  padding: 0px 24px;
`;

export const Text = styled.p`
  margin-top: 40px;
  margin-bottom: 24px;
  padding-left: 4px;
  line-height: 140%;
  letter-spacing: -2.5%;
  color: ${palette.기본};
  font-weight: 600;
  font-size: 18px;
`;

export const BadgeCount = styled.span`
  font-weight: bold;
  color: ${palette.keycolor}; /* 예시: 코랄 색상 */
  margin: 0 4px;
`;

export const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  column-gap: 27px; /* 열 간 간격 */
  row-gap: 32px; /* 행 간 간격 */

  @media (max-width: 360px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const BadgeItem = styled.div`
  width: 100%;

  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BadgeName = styled.div`
  text-align: center;
  margin-top: 12px;
  font-weight: 400;
  font-size: 12px;
  color: "#000000";
`;
