"use client";
import Spacing from "@/components/Spacing";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import styled from "@emotion/styled";
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import InputField from "@/components/designSystem/input/InputField";

import { palette } from "@/styles/palette";
import CommunityItem from "@/components/community/CommunityItem";
import useCommunity from "@/hooks/useCommunity";
import CustomLink from "@/components/CustomLink";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { APIProvider, Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { createTripStore } from "@/store/client/createTripStore";
import { postTranslate } from "@/api/translation";
import SearchItem from "./SearchItem";

const SearchPlace = () => {
  const [keyword, setKeyword] = useState("");

  const [ref, inView] = useInView();
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const map = useMap();

  const placesLib = useMapsLibrary("places");
  useEffect(() => {
    console.log(placesLib, map, keyword);
    if (!placesLib || keyword === "") return;
    async function fetchPlacePredictions() {
      try {
        console.log(placesLib, "info");
        // @ts-ignore
        const { AutocompleteSessionToken, AutocompleteSuggestion } = placesLib;

        let request = {
          input: keyword,

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

        const mappedSuggestions: any[] = [];
        suggestions.forEach(async (suggestion) => {
          console.log(suggestion.placePrediction.text.text.split(" ")[1], "text");
          mappedSuggestions.push({
            placeId: suggestion.placePrediction.placeId,
            place: suggestion.placePrediction.mainText.text,
            type: suggestion.placePrediction.types[suggestion.placePrediction.types.length - 2],
            region: suggestion.placePrediction.text.text.split(" ")[1],
          });
        });
        // const uniqueSuggestions = mappedSuggestions.filter(
        //   (suggestion, index, self) => index === self.findIndex((t) => t.place === suggestion.place)
        // );
        setSuggestions(mappedSuggestions);
      } catch (error) {
        console.error("Error fetching place predictions:", error);
      }
    }

    fetchPlacePredictions();
  }, [placesLib, map, keyword]);

  const handleRemoveValue = () => {
    setKeyword("");
  };

  const changeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyword !== "") {
      e.preventDefault();
    }
  };
  console.log("sug", suggestions);
  return (
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
              location={suggestion.region}
            />
          ))}

          <div ref={ref} style={{ height: 80 }} />
        </>
      </Container>
    </APIProvider>
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

export default SearchPlace;
