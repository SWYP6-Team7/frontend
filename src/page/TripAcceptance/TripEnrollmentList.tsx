"use client";
import useEnrollment from "@/hooks/enrollment/useEnrollment";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import TripEnrollmentCard from "./TripEnrollmentCard";
import { tripDetailStore } from "@/store/client/tripDetailStore";
import { todayFormattedDate, isNewApply } from "@/utils/time";
import { useParams } from "next/navigation";
import { getEnrollments } from "@/api/enrollment";
import { useQuery } from "@tanstack/react-query";
import { authStore } from "@/store/client/authStore";

interface enrollment {
  enrollmentNumber: number;
  userName: string;
  userAgeGroup: string;
  enrolledAt: string;
  message: string;
  status: string;
  profileUrl: string;
}
export default function TripEnrollmentList() {
  const params = useParams();
  const travelNumber = params?.travelNumber as string;
  const { createdAt, hostUserCheck } = tripDetailStore();
  const { accessToken } = authStore();
  const enrollmentList = useQuery({
    queryKey: ["enrollment", travelNumber],
    queryFn: () => getEnrollments(parseInt(travelNumber), accessToken),
    enabled: !!travelNumber && !!accessToken && hostUserCheck,
  });
  const { enrollmentsLastViewed, updateLastViewed } = useEnrollment(
    parseInt(travelNumber!)
  );

  // 최근에 본 시점.
  const list = enrollmentList.data?.data;

  // 처음에는 null 값이니, 생성했을 때 시간 으로 두기.
  const lastViewed =
    enrollmentsLastViewed.data?.lastViewedAt === null
      ? createdAt
      : enrollmentsLastViewed.data?.lastViewedAt;

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 최근 열람 시간 put API 요청 보내기.
    return () => {
      updateLastViewed(todayFormattedDate());
    };
  }, []);

  return (
    <Container>
      {list && lastViewed && (
        <>
          <Count>
            총
            <p style={{ marginLeft: "4px", color: palette.keycolor }}>
              {!list.totalCount ? 0 : list.totalCount}
            </p>
            건
          </Count>
          <div style={{ marginTop: "16px" }}>
            {list.enrollments?.map((enrollment: enrollment) => (
              <TripEnrollmentCard
                key={enrollment.enrollmentNumber}
                isNew={isNewApply(lastViewed, enrollment.enrolledAt)}
                enrollmentNumber={enrollment.enrollmentNumber}
                userName={enrollment.userName}
                ageGroup={enrollment.userAgeGroup}
                enrolledAt={enrollment.enrolledAt}
                message={enrollment.message}
                profileUrl={enrollment.profileUrl}
              />
            ))}
          </div>
        </>
      )}
      <div></div>
    </Container>
  );
}

const Container = styled.div`
  padding: 0px 24px;
`;
const Count = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  text-align: left;
`;
