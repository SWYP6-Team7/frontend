"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "@emotion/styled";
import Button from "@/components/designSystem/Buttons/Button";
import { useRouter } from "next/navigation";

import { createTripStore } from "@/store/client/createTripStore";
import { useCreateTrip } from "@/hooks/createTrip/useCreateTrip";
import { authStore } from "@/store/client/authStore";
import ButtonContainer from "@/components/ButtonContainer";
import TopModal from "@/components/TopModal";
import RegionWrapper from "./RegionWrapper";
import InputField from "@/components/designSystem/input/InputField";
import Spacing from "@/components/Spacing";
import TextareaField from "@/components/designSystem/input/TextareaField";
import TagListWrapper from "./TagListWrapper";
import CalendarWrapper from "./CalendarWrapper";
import InfoWrapper from "./InfoWrapper";
import MapContainer from "./MapContainer";
import { useInView } from "react-intersection-observer";
import "dayjs/locale/ko"; // 한국어 로케일 추가
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import CreateScheduleItem from "./CreateScheduleItem";
import TripToast from "@/components/designSystem/toastMessage/tripToast";
import { getDateRangeCategory } from "@/utils/time";
import { tripPlanStore } from "@/store/client/tripPlanStore";

dayjs.locale("ko"); // 한국어 설정
dayjs.extend(isSameOrBefore);
export function getDatesArray(startDate, endDate) {
  const dates: string[] = [];
  let currentDate = dayjs(startDate);
  const lastDate = dayjs(endDate);

  while (currentDate.isSameOrBefore(lastDate)) {
    dates.push(currentDate.format("M월D일(ddd)"));
    currentDate = currentDate.add(1, "day");
  }

  return dates;
}

const CreateTripDetail = () => {
  const {
    locationName,
    title,
    details,
    addTitle,
    addDetails,
    tags,
    initGeometry,
    addTags,
    date,
    plans,
    genderType,
    addDate,
    addGenderType,
    addMaxPerson,
    maxPerson,
    addPlans,
    addLocationName,
    addInitGeometry,
    periodType,
    addCompletionStatus,
    resetCreateTripDetail,
  } = createTripStore();

  const [topModalHeight, setTopModalHeight] = useState(0);
  const handleRemoveValue = () => addTitle("");
  const [isMapFull, setIsMapFull] = useState(false);
  const [isToastShow, setIsToastShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    addTitle(e.target.value);
  };
  const { accessToken } = authStore();
  const [openItemIndex, setOpenItemIndex] = useState(0);
  const router = useRouter();
  const handleItemToggle = (index) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };
  const { isChange, addIsChange, planIndex, addPlanIndex } = tripPlanStore();

  useEffect(() => {
    if (isChange) {
      setOpenItemIndex(planIndex);
      addPlanIndex(0);
      addIsChange(false);
    }
  }, [planIndex, isChange]);

  const newPlan = plans.map((plan) => {
    return {
      ...plan,
      planOrder: plan.planOrder + 1,
      spots: plan.spots.map((spot) => {
        const { id, ...newSpots } = {
          ...spot,
          latitude: Number(spot.latitude.toFixed(9)),
          longitude: Number(spot.longitude.toFixed(9)),
        };
        return newSpots;
      }),
    };
  });

  const travelData = {
    title,
    details,
    maxPerson,
    genderType: genderType!,
    startDate: date?.startDate ?? "",
    endDate: date?.endDate ?? "",
    periodType: getDateRangeCategory(
      date?.startDate ?? "",
      date?.endDate ?? ""
    ),
    locationName: locationName.locationName,
    countryName: locationName.countryName,
    tags,
    plans: newPlan,
  };
  const { createTripMutate } = useCreateTrip(travelData, accessToken as string); // 여행 생성 api 요청.

  const completeClickHandler = () => {
    if (
      title === "" ||
      details === "" ||
      details === "" ||
      maxPerson === 0 ||
      genderType === "" ||
      !date?.startDate ||
      !date?.endDate ||
      periodType === "" ||
      tags.length === 0 ||
      locationName.locationName === ""
    ) {
      addCompletionStatus(false);
    }

    createTripMutate(undefined, {
      onSuccess: (data: any) => {
        resetCreateTripDetail();

        if (data) {
          router.push(`/trip/detail/${data.travelNumber}`);
        } else {
          router.push(`/`);
        }
      },
      onError: (e) => {
        console.log(e, "여행 생성에 오류 발생.");
      },
    });
  };

  useEffect(() => {
    if (isMapFull) {
      setIsToastShow(false);
    } else {
      setIsToastShow(true);
    }
  }, [isMapFull]);
  console.log(plans, "plans", locationName);
  return (
    <>
      <CreateTripDetailWrapper>
        <CreateTripDetailContainer id="container-scroll" ref={containerRef}>
          <TopModal
            isToastShow={isToastShow}
            containerRef={containerRef}
            setIsMapFull={setIsMapFull}
            onHeightChange={setTopModalHeight}
          >
            <ModalContainer>
              <RegionWrapper
                locationName={locationName}
                addInitGeometry={addInitGeometry}
                addLocationName={addLocationName}
              />
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
              <TagListWrapper addTags={addTags} taggedArray={tags} />
              <Spacing size={16} />
              <Bar />
              <CalendarWrapper addDate={addDate} date={date} />
              <Bar />
              <InfoWrapper
                addGenderType={addGenderType}
                addMaxPerson={addMaxPerson}
                maxPerson={maxPerson}
                genderType={genderType}
              />
            </ModalContainer>
          </TopModal>
          <BottomContainer
            isMapFull={isMapFull}
            topModalHeight={topModalHeight}
          >
            <MapContainer
              index={openItemIndex}
              plans={plans}
              locationName={locationName}
              isMapFull={isMapFull}
              lat={initGeometry?.lat || 37.57037778}
              lng={initGeometry?.lng || 126.9816417}
              zoom={locationName.mapType === "google" ? 11 : 9}
            />
            <ScheduleContainer>
              <Title>여행 일정</Title>
              <ScheduleList>
                {date &&
                  getDatesArray(date?.startDate ?? "", date?.endDate ?? "").map(
                    (item, idx) => (
                      <CreateScheduleItem
                        plans={plans}
                        idx={idx}
                        addPlans={addPlans}
                        type="create"
                        title={item}
                        isOpen={openItemIndex === idx}
                        onToggle={() => handleItemToggle(idx)}
                      />
                    )
                  )}
              </ScheduleList>
            </ScheduleContainer>
          </BottomContainer>
        </CreateTripDetailContainer>

        <ButtonContainer>
          <Button
            text="완료"
            onClick={completeClickHandler}
            addStyle={{
              backgroundColor: "rgba(62, 141, 0, 1)",
              color: "rgba(240, 240, 240, 1)",
              boxShadow: "rgba(170, 170, 170, 0.1)",
            }}
          />
        </ButtonContainer>
      </CreateTripDetailWrapper>
    </>
  );
};

export default CreateTripDetail;

const CreateTripDetailWrapper = styled.div`
  position: relative;
`;

const ScheduleContainer = styled.div`
  margin-top: 24px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #000;
  line-height: 21px;
`;

const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CreateTripDetailContainer = styled.div<{ topModalHeight: number }>`
  padding: 0px 24px;
  overflow-y: auto;
  position: relative;
  height: calc(100svh - 116px);
  &::-webkit-scrollbar {
    display: none;
  }
  overscroll-behavior: none;
  padding-bottom: 104px;

  /* margin-top: ${(props) => `${props.topModalHeight + 32}px`};
  transition:
    margin-top 0.3s ease-out,
    transform 0.3s ease-out; */
`;

const ModalContainer = styled.div`
  padding: 0 24px;
`;

const Bar = styled.div`
  background-color: #e7e7e7;
  width: 100%;
  height: 1px;
`;

const BottomContainer = styled.div<{
  topModalHeight: number;
  isMapFull: boolean;
}>`
  margin-top: ${(props) =>
    `${props.isMapFull ? 32 : props.topModalHeight + 32}px`};
  min-height: 100svh;
  transition: padding-top 0.3s ease-out;
  overscroll-behavior: none;
`;
