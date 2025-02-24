"use client";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import ThirdStepIcon from "@/components/icons/ThirdStepIcon";
import { palette } from "@/styles/palette";
import Button from "@/components/designSystem/Buttons/Button";
import { useRouter } from "next/navigation";

import { createTripStore } from "@/store/client/createTripStore";
import { useCreateTrip } from "@/hooks/createTrip/useCreateTrip";
import { authStore } from "@/store/client/authStore";
import ButtonContainer from "@/components/ButtonContainer";
import BottomModal from "@/components/BottomModal";
import TopModal from "@/components/TopModal";
import RegionWrapper from "./RegionWrapper";
import InputField from "@/components/designSystem/input/InputField";
import Spacing from "@/components/Spacing";
import TextareaField from "@/components/designSystem/input/TextareaField";
import TagListWrapper from "./TagListWrapper";
import CalendarWrapper from "./CalendarWrapper";
import InfoWrapper from "./InfoWrapper";

const CreateTripDetail = () => {
  const { location, title, details, addTitle, addDetails, tags } = createTripStore();
  const handleRemoveValue = () => addTitle("");

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    addTitle(e.target.value);
  };
  return (
    <CreateTripDetailWrapper>
      <CreateTripDetailContainer>
        <TopModal>
          <ModalContainer>
            <RegionWrapper region={"대전"} />
            <Spacing size={16} />
            <InputField
              value={title}
              placeholder="제목을 입력해주세요. (최대 20자)"
              handleRemoveValue={handleRemoveValue}
              onChange={changeKeyword}
            />

            <Spacing size={16} />
            <TextareaField
              minRows={3}
              maxRows={6}
              isFlexible
              value={details}
              onChange={(e) => addDetails(e.target.value)}
              placeholder="어떤 여행을 떠나실 예정인가요?
자유롭게 소개해보세요. (최대 2,000자)"
            />
            <Spacing size={16} />
            <TagListWrapper type="create" taggedArray={tags} />
            <Spacing size={16} />
            <Bar />
            <CalendarWrapper />
            <Bar />
            <InfoWrapper />
          </ModalContainer>
        </TopModal>
      </CreateTripDetailContainer>

      <ButtonContainer>
        <Button
          text="완료"
          onClick={() => {}}
          addStyle={{
            backgroundColor: "rgba(62, 141, 0, 1)",
            color: "rgba(240, 240, 240, 1)",
            boxShadow: "rgba(170, 170, 170, 0.1)",
          }}
        />
      </ButtonContainer>
    </CreateTripDetailWrapper>
  );
};

export default CreateTripDetail;

const CreateTripDetailWrapper = styled.div`
  position: relative;
`;
const CreateTripDetailContainer = styled.div`
  padding: 0px 24px;
`;

const ModalContainer = styled.div`
  padding: 0 24px;
`;

const Bar = styled.div`
  background-color: #e7e7e7;
  width: 100%;
  height: 1px;
`;
