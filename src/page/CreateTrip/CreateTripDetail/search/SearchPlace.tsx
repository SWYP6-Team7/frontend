"use client";
import Spacing from "@/components/Spacing";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import styled from "@emotion/styled";
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import InputField from "@/components/designSystem/input/InputField";

import { APIProvider, Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { createTripStore } from "@/store/client/createTripStore";
import { postTranslate } from "@/api/translation";
import SearchItem from "./SearchItem";
import { palette } from "@/styles/palette";
import { useRouter } from "next/navigation";

const SearchPlace = () => {
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const { locationName } = createTripStore();
  const [ref, inView] = useInView();
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const map = useMap();
  useEffect(() => {
    if (keyword.trim() === "") {
      setDebouncedKeyword("");
      return;
    }

    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  const placesLib = useMapsLibrary("places");
  useEffect(() => {
    if (!placesLib || debouncedKeyword === "") return;

    let script: HTMLScriptElement | null = null;
    let isMounted = true;

    async function fetchPlacePredictions() {
      try {
        console.log(placesLib, "info");
        // @ts-ignore
        const { AutocompleteSessionToken, AutocompleteSuggestion } = placesLib;

        let request = {
          input: debouncedKeyword,
          language: "ko-KR",
        };

        // Create a session token.
        const token = new AutocompleteSessionToken();
        // Add the token to the request.
        // @ts-ignore
        request.sessionToken = token;

        // Fetch autocomplete suggestions.
        const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
        console.log(suggestions, "sug");

        const mappedSuggestions = await Promise.all(
          suggestions.map(async (suggestion) => {
            try {
              const place = await suggestion.placePrediction.toPlace();
              await place.fetchFields({
                fields: ["displayName", "primaryTypeDisplayName", "location"],
              });

              // 주소 분할 안전장치 추가
              const regionParts = suggestion.placePrediction.text.text.split(" ");
              const region = regionParts.length > 1 ? regionParts[1] : "N/A";

              return {
                placeId: suggestion.placePrediction.placeId,
                place: suggestion.placePrediction.mainText.text,
                type: place.primaryTypeDisplayName || "N/A",
                region: region,
                lat: place.location?.lat() || 0,
                lng: place.location?.lng() || 0,
              };
            } catch (error) {
              console.error("Error processing suggestion:", error);
              return null; // 실패한 항목은 필터링
            }
          })
        );

        // null 값 필터링 및 중복 제거
        const validSuggestions = mappedSuggestions.filter(Boolean);
        const uniqueSuggestions = validSuggestions.filter(
          (suggestion, index, self) => index === self.findIndex((t) => t.placeId === suggestion.placeId)
        );

        console.log("Mapped suggestions:", uniqueSuggestions);
        if (isMounted) {
          setSuggestions(uniqueSuggestions);
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
          function placesSearchCB(data, status, pagination) {
            if (!isMounted) return;

            if (status === window.kakao.maps.services.Status.OK) {
              const mappedSuggestions: any[] = [];
              const seenIds = new Set();

              for (const item of data) {
                if (!seenIds.has(item.id)) {
                  mappedSuggestions.push({
                    placeId: item.id,
                    place: item.place_name,
                    type: item.category_group_name,
                    region: item.address_name.split(" ")[0],
                    lat: item.y,
                    lng: item.x,
                  });
                  seenIds.add(item.id);
                }
              }
              setSuggestions(mappedSuggestions);
            } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
              console.log("zero result");
              return;
            } else if (status === window.kakao.maps.services.Status.ERROR) {
              alert("검색 결과 중 오류가 발생했습니다.");
              return;
            }
          }

          var ps = new window.kakao.maps.services.Places();

          // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
          var infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

          // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
          ps.keywordSearch(debouncedKeyword, placesSearchCB);
        });
      });
    }

    // 클린업 함수
    return () => {
      isMounted = false;
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [placesLib, map, debouncedKeyword, locationName.mapType]);

  const handleRemoveValue = () => {
    setKeyword("");
  };

  const changeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && debouncedKeyword !== "") {
      e.preventDefault();
    }
  };
  console.log("sug", suggestions);
  return (
    <div>
      <HeaderContainer>
        <IconContainer onClick={() => router.back()}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.7782 2.22202L2.22183 17.7784M17.7782 17.7784L2.22183 2.22202"
              stroke="#343434"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconContainer>
        <HeaderTitle>장소추가</HeaderTitle>
        <IconContainer></IconContainer>
      </HeaderContainer>
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API || ""}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          style={{ height: 0, width: 0 }}
          defaultZoom={13}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || ""}
          disableDefaultUI
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
        />
        <Container>
          <InputField
            value={keyword}
            onChange={changeKeyword}
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력해주세요"
            handleRemoveValue={handleRemoveValue}
          />
          <Spacing size={16} />
          <CountContainer>
            총&nbsp;
            {/* <Count>{data?.pages[0].page.totalElements ?? 0}건</Count> */}
            <Count>{suggestions.length}건</Count>
          </CountContainer>
          <Spacing size={15}></Spacing>
          <Bar />
          <>
            {suggestions.map((suggestion, index) => (
              <SearchItem
                key={suggestion.placeId}
                id={suggestion.placeId}
                title={suggestion.place}
                type={suggestion.type}
                lat={suggestion.lat}
                lng={suggestion.lng}
                location={suggestion.region}
              />
            ))}

            <div ref={ref} style={{ height: 80 }} />
          </>
        </Container>
      </APIProvider>
    </div>
  );
};

// function PlacePredictions() {

//   return (
//     <div>
//       <h2>장소 검색:</h2>
//       <input value={text} onChange={(e) => setText(e.target.value)} />
//       <ul id="results">
//         {suggestions.map((suggestion, index) => (
//           <li key={index}>
//             {suggestion.place} - {suggestion.type}
//           </li>
//         ))}
//       </ul>
//       {placeInfo && <p id="prediction">{placeInfo}</p>}
//     </div>
//   );
// }

const Container = styled.div`
  padding: 0 24px;
`;

const CountContainer = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  letter-spacing: -0.025em;
`;

const Count = styled.span`
  color: #3e8d00;
  font-weight: 700;
`;

const Bar = styled.div`
  background-color: #e7e7e7;
  width: 100%;
  height: 1px;
`;

const HeaderContainer = styled.header`
  display: flex;
  padding: 52px 24px 16px 24px;
  height: 116px;
  align-items: center;

  position: sticky;
  top: 0px;
  background-color: ${palette.BG};
  z-index: 1000;
  justify-content: space-between;
  width: 100%;
`;

const HeaderTitle = styled.div`
  font-size: 22px;
  color: ${palette.기본};
  line-height: 26px;
  font-weight: 600;
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SearchPlace;
