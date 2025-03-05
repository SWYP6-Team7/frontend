"use client";
import Button from "@/components/designSystem/Buttons/Button";
import PlaceIcon from "@/components/icons/PlaceIcon";
import GoogleMap, { PoiMarkers } from "@/components/map/GoogleMap";
import MapBottomModal from "@/components/MapBottomModal";
import Spacing from "@/components/Spacing";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchPlaceDetail = () => {
  const { placeId } = useParams();
  const map = useMap();
  const [placeDetails, setPlaceDetails] = useState<{
    location: { lat: number; lng: number };
    name: string;
    address: string;
    region: string;
    type: string;
    openingHours: string;
  }>();
  const placesLib = useMapsLibrary("places");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    console.log(map, placesLib, placeId);

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
        setPlaceDetails({
          name: place.displayName,
          address: place.formattedAddress,
          region: place.formattedAddress.split(" ")[1],
          type: place.primaryTypeDisplayName,
          openingHours: place.regularOpeningHours?.weekdayText || [],
          location: { lat: place.location.lat(), lng: place.location.lng() },
        });
      } catch (error) {
        console.error("Error fetching place predictions:", error);
      }
    }

    fetchPlacePredictions();
  }, [placeId, placesLib, map]);
  console.log(placeDetails, "placeDetail");

  if (typeof window === "undefined") {
    return <></>;
  }
  if (!isClient) {
    return null; // 또는 로딩 인디케이터
  }

  return (
    <>
      <MapContainer>
        {placeDetails?.location.lat && (
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
        )}
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
                <PlaceIcon width={12} height={16} />
              </IconContainer>
              <div>{placeDetails?.address}</div>
            </Description>
          </ModalContainer>
        </ModalWrapper>
        <ButtonContainer>
          <Button
            onClick={() => {}}
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
  fong-weight: 600;
  font-size: 20px;
  color: ${palette.기본};
`;

const SubTitle = styled.div`
  line-height: 17px;
  font-size: 14px;
  font-weight: 400;
  color: ${palette.비강조};
`;

export default SearchPlaceDetail;
