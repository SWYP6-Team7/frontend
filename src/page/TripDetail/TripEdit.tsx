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
    dataInitialized,
    setDataInitialized,
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

  const [originalPlans, setOriginalPlans] = useState<any[]>([]);

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

  // Initial data setup - only run once
  useEffect(() => {
    if (!isLoading && data && !dataInitialized) {
      // Extract all plans from all pages
      const allPlans = data.pages.flatMap((page) => page.plans || []);

      // Store in originalPlans for comparison later
      setOriginalPlans(allPlans);

      // Store in plans state for editing
      const formattedPlans = allPlans.map((plan) => ({
        ...plan,
        planOrder: plan.planOrder,
        spots: plan.spots.map((spot) => ({
          ...spot,
          latitude: Number(spot.latitude).toFixed(9),
          longitude: Number(spot.longitude).toFixed(9),
        })),
      }));

      addPlans(formattedPlans);
      setDataInitialized(true);
    }
  }, [data, isLoading, dataInitialized, addPlans]);

  // Fetch next page if available
  useEffect(() => {
    if (hasNextPage && !isFetching) {
      const timer = setTimeout(() => {
        fetchNextPage();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  // Initial trip details setup - only run once for static data
  useEffect(() => {
    // Only initialize if not already done
    if (title === "" && initTitle) {
      addTitle(initTitle);
      addDetails(initDetails || "");
      addTags(initTags || []);
      addLocationName(initLocationName || { locationName: "" });
      addInitGeometry(initInitGeometry || { lat: 37.57037778, lng: 126.9816417 });
      addDate({ startDate: initStartDate || "", endDate: initEndDate || "" });
      addGenderType(initGenderType || "");
      addMaxPerson(initMaxPerson || 0);
    }
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
    title,
    addTitle,
    addDetails,
    addTags,
    addLocationName,
    addInitGeometry,
    addDate,
    addGenderType,
    addMaxPerson,
  ]);

  useEffect(() => {
    if (date?.startDate && date?.endDate && dataInitialized) {
      const start = dayjs(date.startDate);
      const end = dayjs(date.endDate);
      const dayDiff = end.diff(start, "day") + 1;

      if (plans.length !== dayDiff) {
        const newPlans: any = [];

        for (let i = 0; i < dayDiff; i++) {
          const existingPlan = plans.find((p) => p.planOrder === i + 1);

          if (existingPlan) {
            newPlans.push(existingPlan);
          } else {
            // Create a new empty plan for this day
            newPlans.push({
              planOrder: i + 1,
              spots: [],
              id: uuidv4(),
            });
          }
        }

        addPlans(newPlans);
      }
    }
  }, [date?.startDate, date?.endDate, dataInitialized, plans.length, addPlans]);

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

  const { updateTripDetailMutate } = useTripDetail(travelNumber);

  const completeClickHandler = () => {
    if (
      title === "" ||
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
      setIsToastShow(true);
      return;
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
          ...originalPlans.map((plan) => ({
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
        plans
      ),
    };

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
  console.log("plans", plans, originalPlans);
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
                      key={item.id || idx}
                      addPlans={addPlans}
                      type="edit"
                      travelNumber={travelNumber}
                      idx={idx}
                      plans={plans}
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

const CreateTripDetailContainer = styled.div<{ topModalHeight?: number }>`
  padding: 0px 24px;
  overflow-y: auto;
  position: relative;
  height: calc(100svh - 116px);
  &::-webkit-scrollbar {
    display: none;
  }
  overscroll-behavior: none;
  padding-bottom: 104px;
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
