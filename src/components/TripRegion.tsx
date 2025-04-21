"use client";

import styled from "@emotion/styled";
import ButtonContainer from "./ButtonContainer";
import Button from "./designSystem/Buttons/Button";
import InputField from "./designSystem/input/InputField";
import Spacing from "./Spacing";
import { useEffect, useRef, useState } from "react";
import useRelationKeyword from "@/hooks/search/useRelationKeyword";
import RelationKeywordList from "./relationKeyword/RelationKeywordList";
import PlaceIcon from "./icons/PlaceIcon";

const TripRegion = ({
  nextFunc,
  addLocationName,
  initLocationName,
  isDetail = false,
}: {
  initLocationName: {
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
  nextFunc: () => void;
  isDetail?: boolean;
}) => {
  const [keyword, setKeyword] = useState(initLocationName.locationName);
  const [showRelationList, setShowRelationList] = useState(true);
  const [isLoad, setIsLoad] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false&libraries=services`;

    const handleLoad = () => {
      window.kakao.maps.load(() => {
        setIsLoad(true);
      });
    };

    script.addEventListener("load", handleLoad);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
      document.head.removeChild(script);
    };
  }, []);

  // Submit 처리 효과
  useEffect(() => {
    console.log("submit", submit, isLoad, keyword);
    if (!submit || !isLoad) return;
    const handleLoad = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(keyword, (result, status) => {
          console.log("result", result, status);
          if (status === window.kakao.maps.services.Status.OK) {
            addLocationName({
              locationName: keyword,
              mapType: "kakao",
              countryName: "대한민국",
            });
          } else {
            addLocationName({
              locationName: keyword,
              mapType: "google",
              countryName: "",
            });
          }
        });
        setSubmit(false);
        nextFunc();
      });
    };

    handleLoad();
  }, [submit, isLoad, keyword, setSubmit, nextFunc]);

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    if (!showRelationList) {
      setShowRelationList(true);
    }
  };

  const clickRelationKeyword = (keyword: string) => {
    setKeyword(keyword);
    setShowRelationList(false);
  };

  const handleRemoveValue = () => setKeyword("");

  const handleNext = () => {
    if (!isLoad) return;
    setSubmit(true);
  };

  return (
    <>
      <Title>어디로 떠나볼까요?</Title>
      <Spacing size={8} />
      <InputField
        value={keyword}
        placeholder="여행지를 입력하세요."
        handleRemoveValue={handleRemoveValue}
        onChange={changeKeyword}
        icon={<PlaceIcon />}
      />
      {keyword.length > 0 && (
        <>
          {showRelationList && (
            <>
              <Spacing size={16} />
              <RelationKeywordList onClick={clickRelationKeyword} keyword={keyword} />
            </>
          )}
        </>
      )}
      <ButtonContainer>
        <Button
          onClick={handleNext}
          disabled={keyword === ""}
          addStyle={
            keyword === ""
              ? {
                  backgroundColor: "rgba(220, 220, 220, 1)",
                  color: "rgba(132, 132, 132, 1)",
                  boxShadow: "-2px 4px 5px 0px rgba(170, 170, 170, 0.1)",
                }
              : undefined
          }
          text={"다음"}
        />
      </ButtonContainer>
    </>
  );
};

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  margin-left: 6px;
  text-align: left;
`;

export default TripRegion;
