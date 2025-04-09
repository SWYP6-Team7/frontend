"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "@emotion/styled";
import Button from "@/components/designSystem/Buttons/Button";
import { useParams, useRouter } from "next/navigation";
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
import useTripDetail from "@/hooks/tripDetail/useTripDetail";
import { trackPlanChanges } from "@/utils/trip";
import { tripPlanStore } from "@/store/client/tripPlanStore";

dayjs.locale("ko"); // 한국어 설정
dayjs.extend(isSameOrBefore);

const TripEdit = () => {
  const { scrollTop, addScrollTop, planIndex, addPlanIndex } = tripPlanStore();

  const params = useParams();
  const travelNumber = params?.travelNumber as string;
  const { tripDetail } = useTripDetail(parseInt(travelNumber!));
  const tripInfos = tripDetail.data as any;
  const [isKakaoMapLoad, setIsKakaooMapLoad] = useState(false);
  const {
    title: initTitle,
    startDate: initStartDate,
    endDate: initEndDate,
    details: initDetails,
    tags: initTags,
    nowPerson,
    location,
    initGeometry: initInitGeometry,
    maxPerson: initMaxPerson,
    genderType: initGenderType,
  } = tripInfos ?? {};
  const [dataInitialized, setDataInitialized] = useState(false);
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

    originalPlans,
    setOriginalPlans,
    resetEditTripDetail,
  } = editTripStore();
  useEffect(() => {
    console.log("trip", tripInfos);
    if (tripDetail.isFetched) {
      const {
        travelNumber,
        userNumber,
        userName,
        createdAt,
        location,
        title,
        details,
        maxPerson,
        genderType,

        periodType,
        tags,
        postStatus,
        nowPerson,
        bookmarkCount,
        viewCount,
        enrollCount,
        userAgeGroup,
        startDate,
        endDate,
        profileUrl,
        loginMemberRelatedInfo,
      } = tripInfos;

      addTitle(title);
      addDetails(details);
      addMaxPerson(maxPerson);
      addGenderType(genderType);

      addTags(tags);
    }
  }, [tripDetail.isFetched, tripInfos]);
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`;

    script.addEventListener("load", () => {
      setIsKakaooMapLoad(true);
    });
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", () => {
        setIsKakaooMapLoad(false);
      });
      document.head.removeChild(script);
    };
  }, []);
  useEffect(() => {
    const handleLoad = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(location, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK && result?.[0]) {
            addLocationName({ locationName: location, mapType: "kakao" });
          } else {
            addLocationName({ locationName: location, mapType: "google" });
          }
        });
      });
    };
    if (isKakaoMapLoad) {
      handleLoad();
    }
  }, [isKakaoMapLoad, location]);
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    refetch,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery({
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
    if (scrollTop !== 0) {
      setOpenItemIndex(planIndex);
      addPlanIndex(0);
    }
  }, [planIndex, scrollTop]);

  // 첫 번째 useEffect - 데이터 초기화와 날짜 추가
  useEffect(() => {
    console.log("data", data, dataInitialized, hasNextPage);

    if (!isLoading && data && !dataInitialized && !hasNextPage) {
      const allPlans = data.pages.flatMap((page) => page.plans || []);
      console.log("allPlans", allPlans);
      const formattedPlans = allPlans.map((plan) => {
        const planDate = dayjs(initStartDate)
          .add(plan.planOrder - 1, "day")
          .format("YYYY-MM-DD");

        return {
          ...plan,
          planOrder: plan.planOrder,
          date: planDate,

          spots: plan.spots.map((spot) => ({
            ...spot,
            id: uuidv4(),
            latitude: Number(spot.latitude).toFixed(9),
            longitude: Number(spot.longitude).toFixed(9),
          })),
        };
      });

      console.log("formattedPlans", formattedPlans);
      setOriginalPlans(formattedPlans);

      addPlans(formattedPlans);
      setDataInitialized(true);
    }
  }, [
    JSON.stringify(data),
    isLoading,
    dataInitialized,
    initStartDate,
    hasNextPage,
  ]);
  useEffect(() => {
    if (hasNextPage && !isFetching) {
      const timer = setTimeout(() => {
        fetchNextPage();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  useEffect(() => {
    if (
      title === "" &&
      initTitle &&
      locationName.locationName === "" &&
      details === "" &&
      initDetails
    ) {
      addTitle(initTitle);
      addDetails(initDetails || "");
      addTags(initTags || []);
      addInitGeometry(
        initInitGeometry || { lat: 37.57037778, lng: 126.9816417 }
      );
      addDate({ startDate: initStartDate || "", endDate: initEndDate || "" });
      addGenderType(initGenderType || "");
      addMaxPerson(initMaxPerson || 0);
    }
  }, [
    initTitle,
    initDetails,
    initTags,

    initInitGeometry,
    initStartDate,
    initEndDate,
    initGenderType,
    initMaxPerson,
    title,
  ]);

  useEffect(() => {
    if (date?.startDate && date?.endDate && dataInitialized) {
      const start = dayjs(date.startDate);
      const end = dayjs(date.endDate);
      const dayDiff = end.diff(start, "day") + 1;

      const dateRange: string[] = [];
      for (let i = 0; i < dayDiff; i++) {
        dateRange.push(start.add(i, "day").format("YYYY-MM-DD"));
      }

      if (
        plans.length !== dayDiff ||
        !dateRange.every((date) => plans.some((p) => p.date === date))
      ) {
        const newPlans = dateRange.map((currentDate, index) => {
          // 1. 현재 plans에서 먼저 조회
          // 2. 없으면 originalPlans에서 조회
          const existingPlan =
            plans.find((p) => p.date === currentDate) ||
            originalPlans?.find((p) => p.date === currentDate);

          return existingPlan
            ? {
                ...existingPlan, // 기존 데이터 유지
                planOrder: index + 1, // 순서만 업데이트
              }
            : {
                planOrder: index + 1,
                date: currentDate,
                spots: [],
                id: uuidv4(),
              };
        });

        addPlans(newPlans);
      }
    }
  }, [
    date?.startDate,
    date?.endDate,
    dataInitialized,
    plans.length,
    originalPlans,
  ]);
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

  const { updateTripDetailMutate } = useTripDetail(Number(travelNumber));
  console.log("originalPlans", originalPlans);
  const completeClickHandler = () => {
    if (
      title === "" ||
      details === "" ||
      maxPerson === 0 ||
      genderType === "" ||
      !date?.startDate ||
      !date?.endDate ||
      tags.length === 0 ||
      locationName.locationName === ""
    ) {
      console.log(
        "test",
        title,
        details,
        maxPerson,
        genderType,
        !date?.startDate,
        !date?.endDate,
        periodType,
        tags.length,
        locationName.locationName
      );
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
      periodType: getDateRangeCategory(
        date?.startDate ?? "",
        date?.endDate ?? ""
      ),
      locationName: locationName.locationName,
      tags,
      planChanges: trackPlanChanges(originalPlans, plans),
    };

    updateTripDetailMutate(travelData, {
      onSuccess: (data: any) => {
        resetEditTripDetail();
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
                nowPerson={nowPerson}
                addGenderType={addGenderType}
                genderType={genderType}
                maxPerson={maxPerson}
                addMaxPerson={addMaxPerson}
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
                {!isLoading &&
                  plans.length > 0 &&
                  plans?.map((item, idx) => (
                    <CreateScheduleItem
                      key={item.id || idx}
                      addPlans={addPlans}
                      type="edit"
                      travelNumber={Number(travelNumber)}
                      idx={idx}
                      plans={plans}
                      title={item?.date ?? ""}
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
    </>
  );
};

export default TripEdit;

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
  margin-top: ${(props) =>
    `${props.isMapFull ? 32 : props.topModalHeight + 32}px`};
  min-height: 100svh;
  transition: padding-top 0.3s ease-out;
  overscroll-behavior: none;
`;
