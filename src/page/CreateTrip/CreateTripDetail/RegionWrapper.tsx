"use client";
import ArrowIcon from "@/components/icons/ArrowIcon";
import PlaceIcon from "@/components/icons/PlaceIcon";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React, { useCallback, useEffect, useState } from "react";

import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import RegionModal from "@/components/RegionModal";

interface RegionInfo {
  country: string | null;
  adminArea: string | null;
}

const InnerMap = ({
  locationNameStr,
  locationName,
  setRegionInfo,
  addInitGeometry,
  addLocationName,
  isLoad,
}) => {
  const map = useMap();
  const placesLib = useMapsLibrary("places");

  const fetchPlaceInfo = useCallback(async () => {
    if (!map || !placesLib) return;

    console.log(map, placesLib, "result");
    const { PlacesService } = placesLib as google.maps.PlacesLibrary;
    const service = new PlacesService(map);

    const request: google.maps.places.FindPlaceFromQueryRequest = {
      query: locationNameStr,
      fields: ["name", "formatted_address", "geometry"],
    };

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        console.log(results, "result");
        if (
          results[0].geometry?.location?.lat() &&
          results[0].geometry?.location?.lng()
        ) {
          addInitGeometry({
            lat: results[0].geometry?.location?.lat(),
            lng: results[0].geometry?.location?.lng(),
          });
        }

        if (results[0]) {
          const parts = results[0].formatted_address
            ?.split(",")
            .map((part) => part.trim());
          setRegionInfo({
            country: parts ? parts[parts.length - 1] : null,
            adminArea: parts ? parts[parts.length - 2] : null,
          });
          addLocationName({
            locationName: locationName.locationName,
            mapType: "google",
            countryName: parts ? parts[parts.length - 1] : "",
          });
        }
      } else {
        setRegionInfo({
          country: locationNameStr,
          adminArea: locationNameStr,
        });
        addLocationName({
          locationName: locationName.locationName,
          mapType: "google",
          countryName: locationNameStr,
        });
      }
    });
  }, [map, placesLib, locationNameStr, addInitGeometry, setRegionInfo]);

  const handleKakaoInfo = useCallback(() => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(locationNameStr, (result, status) => {
        console.log(result, "result");

        if (
          status === window.kakao.maps.services.Status.OK &&
          result.length > 0
        ) {
          if (result[0].x && result[0].y) {
            addInitGeometry({
              lat: Number(result[0].y),
              lng: Number(result[0].x),
            });
          }
          setRegionInfo({
            country: "한국",
            adminArea: result[0]?.address_name ?? locationNameStr,
          });
          addLocationName({
            locationName: locationName.locationName,
            mapType: "kakao",
            countryName: "한국",
          });
        } else {
          addInitGeometry(null);
        }
      });
    });
  }, [locationNameStr, addInitGeometry, setRegionInfo]);

  useEffect(() => {
    if (locationName.mapType === "google") {
      if (!map || !placesLib) return;
      fetchPlaceInfo();
    } else {
      if (!isLoad) return;
      handleKakaoInfo();
    }
  }, [
    locationName.mapType,
    map,
    placesLib,
    isLoad,
    fetchPlaceInfo,
    handleKakaoInfo,
  ]);

  return (
    <Map
      style={{
        height: 1,
        width: 1,
        position: "fixed",
        top: -99,
        left: -99,
        opacity: 1,
        visibility: "hidden",
      }}
      defaultZoom={13}
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || ""}
      disableDefaultUI
      defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
    />
  );
};

const RegionWrapper = ({
  locationName,
  addInitGeometry,
  addLocationName,
  location,
  isDetail = false,
}: {
  locationName: {
    locationName: string;
    mapType: "google" | "kakao";
    countryName: string;
  };
  addLocationName: ({
    locationName,
    mapType,
    countryName,
  }: {
    locationName: string;
    mapType: "google" | "kakao";
    countryName: string;
  }) => void;
  addInitGeometry: (obj: { lat: number; lng: number } | null) => void;
  location?: string;
  isDetail?: boolean;
}) => {
  const [regionInfo, setRegionInfo] = useState<RegionInfo | null>(null);
  const [isLoad, setIsLoad] = useState(false);
  const [isModalOPen, setIsModalOpen] = useState(false);
  const locationNameStr = location ?? locationName.locationName;

  // 카카오맵 스크립트 로딩
  useEffect(() => {
    const script: HTMLScriptElement = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.addEventListener("load", () => {
      setIsLoad(true);
    });

    return () => {
      script.removeEventListener("load", () => {
        setIsLoad(false);
      });
      document.head.removeChild(script);
    };
  }, []);

  if (isDetail) {
    return (
      <TextContainer>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
          <InnerMap
            locationNameStr={locationNameStr}
            locationName={locationName}
            setRegionInfo={setRegionInfo}
            addInitGeometry={addInitGeometry}
            addLocationName={addLocationName}
            isLoad={isLoad}
          />
        </APIProvider>
        <Region>{locationNameStr}</Region>
        <Small>
          {regionInfo?.country} {regionInfo?.adminArea}
        </Small>
      </TextContainer>
    );
  } else {
    return (
      <>
        <RegionModal
          locationName={locationName}
          addLocationName={addLocationName}
          isModalOpen={isModalOPen}
          setIsModalOpen={setIsModalOpen}
        />
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}>
          <InnerMap
            locationNameStr={locationNameStr}
            locationName={locationName}
            setRegionInfo={setRegionInfo}
            addInitGeometry={addInitGeometry}
            addLocationName={addLocationName}
            isLoad={isLoad}
          />
        </APIProvider>
        <Container>
          <PlaceIconContainer>
            <PlaceIcon width={21} height={24} />
          </PlaceIconContainer>
          <TextContainer>
            <Region>{locationNameStr}</Region>
            <Small>
              {regionInfo?.country} {regionInfo?.adminArea}
            </Small>
          </TextContainer>
          <ArrowIconContainer onClick={() => setIsModalOpen(true)}>
            <ArrowIcon />
          </ArrowIconContainer>
        </Container>
      </>
    );
  }
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PlaceIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 42px;
`;

const ArrowIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  cursor: pointer;
  height: 48px;
`;

const Region = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${palette.기본};
  line-height: 16px;
`;

const Small = styled.div`
  line-height: 16px;
  font-size: 12px;
  color: ${palette.비강조};
  font-weight: 400;
`;

export default RegionWrapper;
