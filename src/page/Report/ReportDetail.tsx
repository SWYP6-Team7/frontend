"use client";
import styled from "@emotion/styled";
import { useParams, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { REPORT_LIST } from "./Report";
import Spacing from "@/components/Spacing";
import Image from "next/image";
import ButtonContainer from "@/components/ButtonContainer";
import Button from "@/components/designSystem/Buttons/Button";
import TextareaField from "@/components/designSystem/input/TextareaField";
import { palette } from "@/styles/palette";
import { postReport } from "@/api/report";
import { authStore } from "@/store/client/authStore";
import { reportStore } from "@/store/client/reportStore";
import { useMutation } from "@tanstack/react-query";
import { errorStore } from "@/store/client/errorStore";
import { userProfileOverlayStore } from "@/store/client/userProfileOverlayStore";

const ReportDetail = () => {
  const { reportType, id, type: backType } = useParams();
  const { accessToken } = authStore();
  const router = useRouter();
  const [text, setText] = useState("");
  const { detailId, setDetailId, setReportSuccess, userNumber, setUserNumber } = reportStore();
  const [checkIndex, setCheckIndex] = useState(-1);
  const { updateError, setIsMutationError } = errorStore();

  const type = REPORT_LIST.find((item) => item.query === reportType);
  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: (data: any) => {
      return postReport(data, accessToken as string);
    },
    onSuccess: (data: any) => {
      if (data.success === "이미 신고한 이력이 있습니다.") {
        updateError(data.success);
        setIsMutationError(true);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      switch (backType) {
        case "travel":
          router.replace(`/trip/detail/${id}`);
          setUserNumber(null);

          setTimeout(() => {
            setReportSuccess(true);
          }, 300);
          return;
        case "travelComment":
          if (!detailId) return;
          router.replace(`/trip/detail/${detailId}`);
          setUserNumber(null);

          setTimeout(() => {
            setReportSuccess(true);
          }, 300);
          return;
        case "communityComment":
          if (!detailId) return;
          router.replace(`/community/detail/${detailId}`);
          setDetailId(null);
          setUserNumber(null);

          setTimeout(() => {
            setReportSuccess(true);
          }, 300);
          return;
        case "community":
          router.replace(`/community/detail/${id}`);
          setDetailId(null);
          setUserNumber(null);
          setTimeout(() => {
            setReportSuccess(true);
          }, 300);
          return;
        case "userProfile":
          const { setProfileShow } = userProfileOverlayStore();
          setProfileShow(true);
          setUserNumber(null);
          setTimeout(() => {
            setReportSuccess(true);
          }, 300);
          return;
        default:
          router.replace("/");
      }
    }
  }, [isSuccess, isError]);
  console.log(type);
  const handleClick = (idx: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    setCheckIndex((prev) => (prev === idx ? -1 : idx));
  };

  const submitReport = async (e: FormEvent) => {
    e.preventDefault();
    console.log(id, accessToken, type, checkIndex);
    if (!id || !accessToken || !userNumber) {
      return;
    }
    if (type?.query === "etc") {
      mutate({
        reportedUserNumber: userNumber,
        reportReasonId: 13,
        reportReasonExtra: text,
      });
    } else {
      if (!type?.item?.[checkIndex].id) {
        return;
      }
      mutate({
        reportedUserNumber: userNumber,
        reportReasonId: type?.item?.[checkIndex].id,
      });
    }
  };
  if (!type) {
    router.back();
  }
  if (type?.query === "etc") {
    return (
      <Container>
        <Title>{type?.title}</Title>
        <Spacing size={16} />
        <TextareaField
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="신고 사유 직접 입력 (최대 500자)"
          height="120px"
          placeholderColor={palette.비강조}
          isReport
          padding={"12px 16px"}
          lineHeight="20px"
          fontSize="14px"
        />

        <ButtonContainer>
          <Button
            onClick={submitReport}
            disabled={!id || !accessToken || !userNumber || text === "" ? true : false}
            addStyle={
              (!id || !accessToken || !userNumber || text === "" ? true : false)
                ? {
                    backgroundColor: "rgba(220, 220, 220, 1)",
                    color: "rgba(132, 132, 132, 1)",
                    boxShadow: "-2px 4px 5px 0px rgba(170, 170, 170, 0.1)",
                  }
                : undefined
            }
            text={"신고하기"}
          />
        </ButtonContainer>
      </Container>
    );
  }
  return (
    <Container>
      <Title>{type?.title}</Title>
      <Spacing size={16} />
      {type?.item?.map((item, idx) => (
        <Description onClick={handleClick(idx)} isFirst={idx === 0}>
          <Image
            src={checkIndex === idx ? "/images/radio_active.svg" : "/images/radio.svg"}
            alt=""
            height={18}
            width={18}
          />

          <Text>{item.title}</Text>
        </Description>
      ))}
      <ButtonContainer>
        <Button
          onClick={submitReport}
          disabled={!id || !accessToken || !userNumber || checkIndex === -1 || checkIndex === 5 ? true : false}
          addStyle={
            (!id || !accessToken || !userNumber || checkIndex === -1 || checkIndex === 5 ? true : false)
              ? {
                  backgroundColor: "rgba(220, 220, 220, 1)",
                  color: "rgba(132, 132, 132, 1)",
                  boxShadow: "-2px 4px 5px 0px rgba(170, 170, 170, 0.1)",
                }
              : undefined
          }
          text={"신고하기"}
        />
      </ButtonContainer>
    </Container>
  );
};

export default ReportDetail;

const Container = styled.div`
  padding: 0 24px;
  padding-top: 18px;
  padding-bottom: 214px;
`;

const Title = styled.div`
  font-size: 18px;
  line-height: 36px;
  font-weight: 600;
  padding-left: 6px;
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  padding-left: 4px;
`;

const Description = styled.div<{ isFirst: boolean }>`
  display: flex;
  cursor: pointer;
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
  width: 100%;
  align-items: center;
  gap: 8px;
  height: 66px;
  border-bottom: 1px #e7e7e7 solid;
  border-top: ${(props) => (props.isFirst ? "1px" : 0)} #e7e7e7 solid;
`;
