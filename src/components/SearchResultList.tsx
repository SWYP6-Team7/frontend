"use client";
import { ISearchData } from "@/model/search";
import styled from "@emotion/styled";
import React from "react";
import Spacing from "./Spacing";
import HorizonBoxLayout from "./HorizonBoxLayout";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { searchStore } from "@/store/client/searchStore";
import SortHeader from "./SortHeader";
import { formatTime } from "@/utils/time";
import { useSearchParams } from "next/navigation";
import { useBackPathStore } from "@/store/client/backPathStore";
import useViewTransition from "@/hooks/useViewTransition";
dayjs.extend(customParseFormat);

const LIST = ["추천순", "최신순", "등록일순"];

const SearchResultList = ({
  searchResult,
  setBookmarked,
}: {
  searchResult: ISearchData[];
  setBookmarked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { sort, setSort } = searchStore();
  const { setTravelDetail } = useBackPathStore();
  const navigateWithTransition = useViewTransition();

  const searchParams = useSearchParams();
  const keyword = searchParams?.get("keyword") ?? "";

  const clickSort = (value: string) => {
    setSort(value as "추천순" | "최신순" | "등록일순");
  };

  const clickTrip = (travelNumber: number) => {
    setTravelDetail(`/search/travel`);
    document.documentElement.style.viewTransitionName = "forward";
    navigateWithTransition(`/trip/detail/${travelNumber}?keyword=${keyword}`);
  };

  return (
    <Container>
      <Spacing size={15} />
      <SortHeader sort={sort} list={LIST} clickSort={clickSort}>
        <CountContainer>
          총&nbsp;<Count>{searchResult[0].page.totalElements}건</Count>
        </CountContainer>
      </SortHeader>
      <Spacing size={16} />
      {searchResult.map((page) =>
        page.content.map((content) => (
          <BoxContainer key={content.travelNumber}>
            <div onClick={() => clickTrip(content.travelNumber)}>
              <HorizonBoxLayout
                bookmarkNeed={true}
                bookmarked={content.bookmarked}
                travelNumber={content.travelNumber}
                userName={content.userName}
                title={content.title}
                tags={content.tags}
                location={content.location}
                total={content.maxPerson}
                daysAgo={formatTime(content.createdAt)}
                daysLeft={dayjs(content.registerDue, "YYYY-MM-DD").diff(dayjs().startOf("day"), "day")}
                recruits={content.nowPerson}
              />
            </div>
          </BoxContainer>
        ))
      )}
    </Container>
  );
};
const BookmarkBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 6px;
`;
const BoxContainer = styled.div`
  padding: 11px 0;
  border-bottom: 1px solid rgb(240, 240, 240);
  position: relative;
`;

const Container = styled.div``;

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

export default SearchResultList;
