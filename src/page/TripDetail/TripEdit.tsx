"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "@emotion/styled";
import Button from "@/components/designSystem/Buttons/Button";
import { useRouter } from "next/navigation";

import { authStore } from "@/store/client/authStore";
import ButtonContainer from "@/components/ButtonContainer";
import TopModal from "@/components/TopModal";
import RegionWrapper from "../CreateTrip/CreateTripDetail/RegionWrapper";
import InputField from "@/components/designSystem/input/InputField";
import Spacing from "@/components/Spacing";
import TextareaField from "@/components/designSystem/input/TextareaField";
import TagListWrapper from "../CreateTrip/CreateTripDetail/TagListWrapper";
import CalendarWrapper from "../CreateTrip/CreateTripDetail/CalendarWrapper";
import InfoWrapper from "../CreateTrip/CreateTripDetail/InfoWrapper";
import MapContainer from "../CreateTrip/CreateTripDetail/MapContainer";
import { useInView } from "react-intersection-observer";
import "dayjs/locale/ko"; // 한국어 로케일 추가
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import CreateScheduleItem from "../CreateTrip/CreateTripDetail/CreateScheduleItem";
import TripToast from "@/components/designSystem/toastMessage/tripToast";
import { getDateByIndex, getDateRangeCategory } from "@/utils/time";
import { editTripStore } from "@/store/client/editTripStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPlans } from "@/api/trip";
import { tripDetailStore } from "@/store/client/tripDetailStore";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

dayjs.locale("ko"); // 한국어 설정
dayjs.extend(isSameOrBefore);

function generatePlanChanges(combinedPlans, plans) {
  const planChanges: any = {
    added: [],
    updated: [],
    deleted: [],
  };

  // 새로 추가되거나 업데이트된 계획 찾기
  plans.forEach((plan) => {
    const existingPlan = combinedPlans.find((cp) => cp.planOrder === plan.planOrder);
    if (!existingPlan) {
      // 새로 추가된 계획
      planChanges.added.push({
        planOrder: plan.planOrder,
        spots: plan.spots.map((spot) => ({
          name: spot.name,
          category: spot.category,
          region: spot.region,
          latitude: spot.latitude.toString(),
          longitude: spot.longitude.toString(),
        })),
      });
    } else if (JSON.stringify(existingPlan.spots) !== JSON.stringify(plan.spots)) {
      // 업데이트된 계획
      planChanges.updated.push({
        planOrder: plan.planOrder,
        spots: plan.spots.map((spot) => ({
          name: spot.name,
          category: spot.category,
          region: spot.region,
          latitude: spot.latitude.toString(),
          longitude: spot.longitude.toString(),
        })),
      });
    }
  });

  // 삭제된 계획 찾기
  combinedPlans.forEach((cp) => {
    if (!plans.some((plan) => plan.planOrder === cp.planOrder)) {
      planChanges.deleted.push(cp.planOrder);
    }
  });

  return planChanges;
}

const EditTrip = () => {
  const {
    locationName,
    title,
    details,
    addTitle,
    addDetails,
    tags,
    initGeometry,
    date,
    plans,
    genderType,
    addDate,
    addGenderType,
    addMaxPerson,
    maxPerson,
    addPlans,
    addTags,
    addLocationName,
    addInitGeometry,
    periodType,
    addCompletionStatus,
    resetCreateTripDetail,
  } = editTripStore();
  const {
    travelNumber,

    title: initTitle,
    startDate: initStartDate,
    endDate: initEndDate,
    details: initDetails,
    tags: initTags,
    locationName: initLocationName,
    initGeometry: initInitGeometry,
    maxPerson: initMaxPerson,
    genderType: initGenderType,
  } = tripDetailStore();
  const { data, isLoading, error, fetchNextPage, refetch, isFetching, hasNextPage } = useInfiniteQuery({
    queryKey: ["plans", travelNumber],
    queryFn: ({ pageParam }) => {
      return getPlans(Number(travelNumber), pageParam) as any;
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.nextCursor) {
        return undefined;
      } else {
        return lastPage?.nextCursor;
      }
    },
  });
  const [ref, inView] = useInView();
  useEffect(() => {
    addTitle(initTitle); // 제목 설정
    addDetails(initDetails); // 상세 내용 설정
    addTags(initTags); // 태그 설정
    addLocationName(initLocationName); // 위치 이름 설정
    addInitGeometry(initInitGeometry); // 초기 지오메트리 설정
    addDate({ startDate: initStartDate || "", endDate: initEndDate || "" }); // 날짜 설정
    addGenderType(initGenderType); // 성별 타입 설정
    addMaxPerson(initMaxPerson); // 최대 인원 설정
  }, [
    initTitle,
    initDetails,
    initTags,
    initLocationName,
    initInitGeometry,
    initStartDate,
    initEndDate,
    initGenderType,
    initMaxPerson,
  ]);

  const combinedPlans = data?.pages.reduce(
    (acc, page) => acc.concat([...page.plans.map((item) => ({ ...item, planOrder: item.planOrder - 1 }))]),
    []
  );

  useEffect(() => {
    if (combinedPlans && combinedPlans.length > 0) {
      addPlans([...plans, ...combinedPlans]);
    }
  }, [combinedPlans?.length]);

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
  const newPlan =
    plans.length > 0
      ? plans.map((plan) => {
          return {
            ...plan,
            planOrder: plan.planOrder + 1,
            spots: plan.spots.map((spot) => {
              const { id, ...newSpots } = {
                ...spot,
                latitude: Number(spot.latitude).toFixed(9),
                longitude: Number(spot.longitude).toFixed(9),
              };
              return newSpots;
            }),
          };
        })
      : [];

  useInfiniteScroll(() => {
    if (inView) {
      console.log("inview");
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, !isFetching, fetchNextPage, hasNextPage]);

  // const { createTripMutate } = useCreateTrip(travelData, accessToken as string); // 여행 생성 api 요청.

  const completeClickHandler = () => {
    if (
      title === "" ||
      details === "" ||
      details === "" ||
      maxPerson === 0 ||
      genderType === "" ||
      date?.startDate ||
      date?.endDate ||
      periodType === "" ||
      tags.length === 0 ||
      locationName.locationName === ""
    ) {
      addCompletionStatus(false);
    }
    const travelData = {
      title,
      details,
      maxPerson,
      genderType: genderType!,
      startDate: date?.startDate || "",
      endDate: date?.endDate || "",
      periodType: getDateRangeCategory(date?.startDate ?? "", date?.endDate ?? ""),
      locationName: locationName.locationName,
      tags,
      plans: generatePlanChanges(combinedPlans, newPlan),
    };
    console.log("travelData", travelData);
    // createTripMutate(undefined, {
    //   onSuccess: (data: any) => {
    //     resetCreateTripDetail();
    //     if (data) {
    //       router.push(`/trip/detail/${data.travelNumber}`);
    //     } else {
    //       router.push(`/`);
    //     }
    //   },
    //   onError: (e) => {
    //     console.log(e, "여행 생성에 오류 발생.");
    //   },
    // });
  };

  useEffect(() => {
    if (isMapFull) {
      setIsToastShow(false);
    } else {
      setIsToastShow(true);
    }
  }, [isMapFull]);
  console.log(plans, "plans");
  return (
    <>
      <CreateTripDetailWrapper>
        <CreateTripDetailContainer ref={containerRef}>
          <TopModal containerRef={containerRef} setIsMapFull={setIsMapFull} onHeightChange={setTopModalHeight}>
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
                genderType={genderType}
                maxPerson={maxPerson}
                addMaxPerson={addMaxPerson}
              />
            </ModalContainer>
          </TopModal>
          <BottomContainer isMapFull={isMapFull} topModalHeight={topModalHeight}>
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
                {!isLoading &&
                  plans.length > 0 &&
                  plans?.map((item, idx) => (
                    <CreateScheduleItem
                      addPlans={addPlans}
                      type="edit"
                      travelNumber={travelNumber}
                      idx={idx}
                      plans={plans}
                      title={getDateByIndex(date?.startDate ?? "", idx + 1)}
                      isOpen={openItemIndex === idx}
                      onToggle={() => handleItemToggle(idx)}
                    />
                  ))}
                <div ref={ref} style={{ width: "100%", height: 5 }} />
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
      <TripToast isShow={isToastShow} setIsShow={setIsToastShow} />
    </>
  );
};

export default EditTrip;

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
  margin-top: ${(props) => `${props.isMapFull ? 32 : props.topModalHeight + 32}px`};
  min-height: 100svh;
  transition: padding-top 0.3s ease-out;
  overscroll-behavior: none;
`;
