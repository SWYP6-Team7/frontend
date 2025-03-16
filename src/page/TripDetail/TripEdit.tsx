"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "@emotion/styled";
import Button from "@/components/designSystem/Buttons/Button";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
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
import { getDateByPlanOrder, getDateRangeCategory } from "@/utils/time";
import { editTripStore } from "@/store/client/editTripStore";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPlans } from "@/api/trip";
import { tripDetailStore } from "@/store/client/tripDetailStore";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useTripDetail from "@/hooks/tripDetail/useTripDetail";
import { getPlanChanges } from "@/utils/trip";

dayjs.locale("ko"); // 한국어 설정
dayjs.extend(isSameOrBefore);

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

    genderType,
    addDate,
    addGenderType,
    addMaxPerson,
    maxPerson,

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
  useEffect(() => {
    if (hasNextPage && !isFetching) {
      const timer = setTimeout(() => {
        fetchNextPage();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [hasNextPage, isFetching, fetchNextPage]);
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

  const [mergedPlans, setMergedPlans] = useState<any[]>([]);

  // 통합된 useEffect
  useEffect(() => {
    const handlePlans = () => {
      if (!date?.startDate || !date?.endDate) return;

      // 1. 초기 데이터 처리
      if (data?.pages && initStartDate) {
        const [year, month, day] = initStartDate.split("-").map(Number);
        const baseDate = new Date(Date.UTC(year, month - 1, day));

        const fetchedPlans = data.pages.reduce((acc, page) => {
          return acc.concat(
            page.plans.map((item) => {
              const calculatedDate = new Date(baseDate);
              calculatedDate.setUTCDate(baseDate.getUTCDate() + item.planOrder - 1);

              const formattedDate = `${calculatedDate.getUTCFullYear()}-${String(
                calculatedDate.getUTCMonth() + 1
              ).padStart(2, "0")}-${String(calculatedDate.getUTCDate()).padStart(2, "0")}`;

              return {
                ...item,
                spots: item?.spots?.map((spot) => ({ ...spot, id: uuidv4() })),
                date: formattedDate,
              };
            })
          );
        }, []);

        setMergedPlans((prev) => {
          const newPlans = fetchedPlans.filter((fp) => !prev.some((p) => p.planId === fp.planId));
          return [...prev, ...newPlans];
        });
      }

      // 2. 날짜 범위 기반 계획 생성
      const start = new Date(date.startDate);
      const end = new Date(date.endDate);
      const diffDays = Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1;

      const dateBasedPlans = Array.from({ length: diffDays }, (_, index) => {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + index);
        const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(currentDate.getDate()).padStart(2, "0")}`;

        return {
          planOrder: index + 1,
          date: formattedDate,
          spots: mergedPlans.find((p) => p.date === formattedDate)?.spots || [],
        };
      });

      // 3. 최종 병합
      setMergedPlans((prev) => {
        const combined = dateBasedPlans.map((dbp) => prev.find((p) => p.date === dbp.date) || dbp);
        return combined.sort((a, b) => a.planOrder - b.planOrder);
      });
    };

    handlePlans();
  }, [data?.pages, initStartDate, date?.startDate, date?.endDate]);

  // 변경 사항 저장 함수
  const updatePlan = (updatedPlan) => {
    setMergedPlans((prev) =>
      prev.map((plan) => (plan.date === updatedPlan.date ? { ...plan, spots: updatedPlan.spots } : plan))
    );
  };

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
    mergedPlans.length > 0
      ? mergedPlans.map((plan) => {
          return {
            ...plan,
            planOrder: plan.planOrder + 1,
            spots: plan.spots.map((spot) => {
              const { ...newSpots } = {
                ...spot,
                latitude: Number(spot.latitude).toFixed(9),
                longitude: Number(spot.longitude).toFixed(9),
              };
              return newSpots;
            }),
          };
        })
      : [];

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

      planChanges: getPlanChanges(
        [
          ...mergedPlans.map((plan) => ({
            ...plan,
            planOrder: plan.planOrder + 1,
            spots: plan.spots.map((spot) => {
              const { ...newSpots } = {
                ...spot,
                latitude: Number(spot.latitude).toFixed(9),
                longitude: Number(spot.longitude).toFixed(9),
              };
              return newSpots;
            }),
          })),
        ],
        newPlan
      ),
    };
    // console.log(
    //   "travelData",
    //   travelData,
    //   [...originalPlans.map((plan) => ({ ...plan, planOrder: plan.planOrder + 1 }))],
    //   plans
    // );
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
  console.log(mergedPlans, "plans");
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
              plans={mergedPlans}
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
                  mergedPlans.length > 0 &&
                  mergedPlans?.map((item, idx) => (
                    <CreateScheduleItem
                      addPlans={updatePlan}
                      type="edit"
                      travelNumber={travelNumber}
                      idx={idx}
                      plans={mergedPlans}
                      title={getDateByPlanOrder(date?.startDate ?? "", item.planOrder)}
                      isOpen={openItemIndex === idx}
                      onToggle={() => handleItemToggle(idx)}
                    />
                  ))}
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
