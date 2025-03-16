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
import useTripDetail from "@/hooks/tripDetail/useTripDetail";

dayjs.locale("ko"); // 한국어 설정
dayjs.extend(isSameOrBefore);

function areSpotsSame(spots1, spots2) {
  if (spots1.length !== spots2.length) {
    return false;
  }

  // 두 배열의 각 요소를 비교
  for (let i = 0; i < spots1.length; i++) {
    const spot1 = spots1[i];
    const spot2 = spots2[i];

    // 간단한 필드 비교
    if (
      spot1.name !== spot2.name ||
      spot1.category !== spot2.category ||
      spot1.region !== spot2.region ||
      spot1.latitude !== spot2.latitude ||
      spot1.longitude !== spot2.longitude
    ) {
      return false;
    }
  }

  return true;
}

function getPlanChanges(originalPlans, updatedPlans) {
  const planChanges: any = {
    added: [],
    updated: [],
    deleted: [],
  };

  // 원래 계획의 인덱스를 맵으로 만들어 빠른 접근을 가능하게 함
  const originalPlansMap: any = {};
  originalPlans.forEach((plan) => {
    originalPlansMap[plan.planOrder] = plan;
  });

  // 변경된 계획의 인덱스를 맵으로 만듦
  const updatedPlansMap: any = {};
  updatedPlans.forEach((plan) => {
    updatedPlansMap[plan.planOrder] = plan;
  });

  // 추가되거나 수정된 항목 찾기
  updatedPlans.forEach((plan) => {
    const originalPlan = originalPlansMap[plan.planOrder];

    if (!originalPlan) {
      // 원래 계획에 없는 경우 추가된 항목
      planChanges.added.push({
        planOrder: plan.planOrder,
        spots: plan.spots,
      });
    } else {
      // 원래 계획에 있는 경우 변경사항 확인
      const spotsChanged = !areSpotsSame(originalPlan.spots, plan.spots);

      if (spotsChanged) {
        planChanges.updated.push({
          planOrder: plan.planOrder,
          spots: plan.spots,
        });
      }
    }
  });

  // 삭제된 항목 찾기
  originalPlans.forEach((plan) => {
    if (!updatedPlansMap[plan.planOrder]) {
      planChanges.deleted.push(plan.planOrder);
    }
  });

  return { planChanges };
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

  const [originalPlans, setOriginalPlans] = useState<any[]>([]);

  useEffect(() => {
    if (!data?.pages) return;

    const fetchedPlans = data.pages.reduce(
      (acc, page) =>
        acc.concat(
          page.plans.map((item) => ({
            ...item,
            planOrder: item.planOrder - 1,
          }))
        ),
      []
    );

    setOriginalPlans((prev) => {
      const uniqueNewPlans = fetchedPlans.filter(
        (newPlan) => !prev.some((existingPlan) => existingPlan.planOrder === newPlan.planOrder)
      );
      return uniqueNewPlans.length > 0 ? [...prev, ...uniqueNewPlans] : prev;
    });

    const uniqueNewPlans = fetchedPlans.filter(
      (newPlan) => !plans.some((existingPlan) => existingPlan.planOrder === newPlan.planOrder)
    );

    if (uniqueNewPlans.length > 0) {
      console.log("123");
      addPlans([...plans, ...uniqueNewPlans]); // 기존 plans에 새로운 계획 추가
    }
  }, [data?.pages, plans, addPlans]);
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
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, !isFetching, fetchNextPage, hasNextPage]);

  const { updateTripDetailMutate } = useTripDetail(travelNumber);

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
      ...getPlanChanges(originalPlans, newPlan),
    };
    console.log("travelData", travelData, originalPlans, plans);
    updateTripDetailMutate(travelData, {
      onSuccess: (data: any) => {
        resetCreateTripDetail();
        if (data) {
          router.push(`/trip/detail/${data.travelNumber}`);
        } else {
          router.push(`/`);
        }
      },
      onError: (e) => {
        console.log(e, "여행 수정 오류 발생.");
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
