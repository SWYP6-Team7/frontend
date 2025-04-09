"use client";
import Button from "@/components/designSystem/Buttons/Button";
import PlaceIcon from "@/components/icons/PlaceIcon";
import GoogleMap, { PoiMarkers } from "@/components/map/GoogleMap";
import KakaoMap from "@/components/map/KakaoMap";
import MapBottomModal from "@/components/MapBottomModal";
import Spacing from "@/components/Spacing";
import { createTripStore } from "@/store/client/createTripStore";
import { editTripStore } from "@/store/client/editTripStore";
import { tripPlanStore } from "@/store/client/tripPlanStore";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const SearchPlaceDetail = () => {
  const { placeId, planOrder } = useParams();
  const map = useMap();
  const [placeDetails, setPlaceDetails] = useState<{
    location: { lat: number; lng: number };
    name: string;
    address: string;
    region: string;
    type: string;
    openingHours: string;
  }>();
  const router = useRouter();
  const placesLib = useMapsLibrary("places");
  const [isClient, setIsClient] = useState(false);
  const { addScrollTop } = tripPlanStore();
  const searchParams = useSearchParams();
  const paramsType = searchParams?.get("type") ?? "create";
  const travelNumber = searchParams?.get("travelNumber") ?? "";
  const { locationName, addPlans, plans } =
    paramsType === "create" ? createTripStore() : editTripStore();
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    console.log(map, placesLib, placeId);

    let isMounted = true;
    let script: HTMLScriptElement | null = null;

    async function fetchPlacePredictions() {
      try {
        console.log(placesLib, "info");
        // @ts-ignore
        const { Place } = placesLib;
        const place = new Place({
          id: placeId,
          requestedLanguage: "ko", // 원하는 언어 설정
        });

        // 원하는 필드 요청
        await place.fetchFields({
          fields: [
            "displayName",
            "formattedAddress",
            "regularOpeningHours",
            "location",
            "primaryTypeDisplayName",
            "primaryType",
          ],
        });
        console.log(place, "placew");
        if (isMounted) {
          setPlaceDetails({
            name: place.displayName,
            address: place.formattedAddress,
            region: place.formattedAddress.split(" ")[1],
            type: place.primaryTypeDisplayName,
            openingHours: place.regularOpeningHours?.weekdayText || [],
            location: { lat: place.location.lat(), lng: place.location.lng() },
          });
        }
      } catch (error) {
        console.error("Error fetching place predictions:", error);
      }
    }

    if (locationName.mapType === "google") {
      fetchPlacePredictions();
    } else {
      script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
      document.head.appendChild(script);

      script.addEventListener("load", () => {
        window.kakao.maps.load(() => {
          function placesSearchCB(data, status) {
            if (!isMounted) return;

            if (status === window.kakao.maps.services.Status.OK) {
              console.log(data[0]);
              setPlaceDetails({
                name: data[0].place_name,
                address:
                  data[0].address_name !== ""
                    ? data[0].address_name
                    : data[0].road_address_name,
                region: data[0].address_name.split(" ")[0],
                type: data[0].category_group_name,
                openingHours: "",
                location: { lat: Number(data[0].y), lng: Number(data[0].x) },
              });
            } else if (
              status === window.kakao.maps.services.Status.ZERO_RESULT
            ) {
              console.log("zero result");
            } else if (status === window.kakao.maps.services.Status.ERROR) {
              console.error("검색 결과 중 오류가 발생했습니다.");
            }
          }

          const ps = new window.kakao.maps.services.Places();

          // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
          const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
          console.log("placeId", decodeURIComponent(placeId as string));
          // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
          ps.keywordSearch(
            decodeURIComponent(placeId as string),
            placesSearchCB
          );
        });
      });
    }

    return () => {
      isMounted = false;
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [placeId, locationName.mapType, placesLib, map]);

  console.log(placeDetails, "placeDetail");

  const handlePlans = () => {
    if (!planOrder) return;

    const targetPlanIndex = plans.findIndex(
      (plan) =>
        plan.planOrder ===
        (paramsType === "create" ? Number(planOrder) : Number(planOrder) + 1)
    );
    let newPlans: any[] = [];
    if (targetPlanIndex > -1) {
      newPlans = plans.map((plan) =>
        plan.planOrder ===
        (paramsType === "create" ? targetPlanIndex : targetPlanIndex + 1)
          ? {
              ...plan,
              spots: [
                ...plan.spots,
                {
                  id: uuidv4(),
                  name: placeDetails?.name,
                  category: placeDetails?.type,
                  region: placeDetails?.region,
                  latitude: placeDetails?.location.lat,
                  longitude: placeDetails?.location.lng,
                },
              ],
            }
          : { ...plan }
      );
    } else {
      newPlans = [
        ...plans,
        {
          planOrder:
            paramsType === "create" ? Number(planOrder) : Number(planOrder) + 1,
          spots: [
            {
              id: uuidv4(),
              name: placeDetails?.name,
              category: placeDetails?.type,
              region: placeDetails?.region,
              latitude: placeDetails?.location.lat,
              longitude: placeDetails?.location.lng,
            },
          ],
        },
      ];
    }
    addScrollTop(document.getElementById("container-scroll")?.scrollTop ?? 0);
    addPlans(newPlans);
    if (paramsType === "create") {
      router.push("/create/trip/detail");
    } else {
      router.push(`/trip/edit/${travelNumber}`);
    }
  };

  if (typeof window === "undefined") {
    return <></>;
  }
  if (!isClient) {
    return null; // 또는 로딩 인디케이터
  }

  return (
    <>
      <BackButton onClick={() => router.back()}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.7782 2.22202L2.22183 17.7784M17.7782 17.7784L2.22183 2.22202"
            stroke="#1A1A1A"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </BackButton>
      <MapContainer>
        {placeDetails?.location.lat &&
          (locationName.mapType === "google" ? (
            <GoogleMap
              zoom={17}
              lat={(placeDetails?.location.lat - 0.0015) as number}
              lng={placeDetails?.location.lng as number}
            >
              {placeDetails?.location && (
                <PoiMarkers
                  pois={[
                    {
                      key: (placeId as string) || "",
                      location: placeDetails?.location,
                    },
                  ]}
                />
              )}
            </GoogleMap>
          ) : (
            <KakaoMap
              positions={[
                {
                  lat: placeDetails?.location.lat,
                  lng: placeDetails?.location.lng,
                },
              ]}
              lat={placeDetails?.location.lat - 0.013}
              lng={placeDetails?.location.lng}
              zoom={6}
            ></KakaoMap>
          ))}
      </MapContainer>
      <MapBottomModal initialHeight={400}>
        <ModalWrapper>
          <ModalContainer>
            <TitleContainer>
              <Title>{placeDetails?.name}</Title>
              <SubTitle>
                {placeDetails?.type}ㆍ{placeDetails?.region}
              </SubTitle>
            </TitleContainer>
            <Spacing size={4} />
            <Description>
              <IconContainer>
                <svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6.54545C12 11.6364 6 16 6 16C6 16 0 11.6364 0 6.54545C2.37122e-08 4.80949 0.632141 3.14463 1.75736 1.91712C2.88258 0.689608 4.4087 0 6 0C7.5913 0 9.11742 0.689608 10.2426 1.91712C11.3679 3.14463 12 4.80949 12 6.54545Z"
                    fill="#CDCDCD"
                  />
                  <path
                    d="M5.99609 8.72741C7.10066 8.72741 7.99609 7.75057 7.99609 6.54559C7.99609 5.3406 7.10066 4.36377 5.99609 4.36377C4.89152 4.36377 3.99609 5.3406 3.99609 6.54559C3.99609 7.75057 4.89152 8.72741 5.99609 8.72741Z"
                    fill="#FEFEFE"
                  />
                </svg>
              </IconContainer>
              <div>{placeDetails?.address}</div>
            </Description>
            {placeDetails?.openingHours !== "" && (
              <Description>
                <IconContainer>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 3.80029V8.00029L10.8 9.40029"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconContainer>
                <div>{placeDetails?.openingHours}</div>
              </Description>
            )}
          </ModalContainer>
        </ModalWrapper>
        <ButtonContainer>
          <Button
            onClick={handlePlans}
            disabled={false}
            addStyle={
              false
                ? {
                    backgroundColor: "rgba(220, 220, 220, 1)",
                    color: "rgba(132, 132, 132, 1)",
                    boxShadow: "-2px 4px 5px 0px rgba(170, 170, 170, 0.1)",
                  }
                : undefined
            }
            text={"추가"}
          />
        </ButtonContainer>
      </MapBottomModal>
    </>
  );
};

const MapContainer = styled.div<{ isMapFull: boolean }>`
  width: 100%;

  height: calc(100svh - 116px);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  left: 0;
  bottom: 0;
  position: absolute;
  width: 100%;

  @media (min-width: 440px) {
    width: 390px;
    left: 50%;
    transform: translateX(-50%);
  }

  padding: 0 24px;
  background-color: ${palette.BG};

  height: 104px;
  padding: 16px 24px 40px 24px;
  width: calc(100%);
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  font-size: 12px;
  font-weight: 400;
`;

const IconContainer = styled.div`
  width: 24px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const ModalContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 20px;
  margin-top: 45px;
  padding-bottom: 104px;

  &::-webkit-scrollbar {
    // scrollbar 자체의 설정
    // 너비를 작게 설정
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    // scrollbar의 배경부분 설정
    // 부모와 동일하게 함(나중에 절전모드, 밤모드 추가되면 수정하기 번거로우니까... 미리 보이는 노동은 최소화)
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    // scrollbar의 bar 부분 설정
    // 동글동글한 회색 바를 만든다.
    border-radius: 1rem;

    background: rgba(217, 217, 217, 1);
  }
  &::-webkit-scrollbar-button {
    // scrollbar의 상하단 위/아래 이동 버튼
    // 크기를 안줘서 안보이게 함.
    width: 0;
    height: 0;
  }
`;

const TitleContainer = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  padding-left: 4px;
  gap: 8px;
`;

const Title = styled.div`
  line-height: 24px;
  font-weight: 600;
  font-size: 20px;
  color: ${palette.기본};
`;

const BackButton = styled.div`
  cursor: pointer;
  position: fixed;
  background-color: white;
  z-index: 1004;
  top: 52px;
  left: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  box-shadow: -2px 3px 5px rgba(106, 97, 73, 0.1);
  align-items: center;
  justify-content: center;
`;

const SubTitle = styled.div`
  line-height: 17px;
  font-size: 14px;
  font-weight: 400;
  color: ${palette.비강조};
`;

export default SearchPlaceDetail;
