"use client";
import FilterList from "@/components/FilterList";
import RecommendKeyword from "@/components/RecommendKeyword";
import SearchFilterTag from "@/components/designSystem/tag/SearchFilterTag";
import SearchResultList from "@/components/SearchResultList";
import Spacing from "@/components/Spacing";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useSearch from "@/hooks/search/useSearch";
import styled from "@emotion/styled";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import RelationKeywordList from "@/components/relationKeyword/RelationKeywordList";
import InputField from "@/components/designSystem/input/InputField";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { authStore } from "@/store/client/authStore";

const RECOMMEND_TAGS1 = ["유럽", "강릉", "제주"];
const RECOMMEND_TAGS2 = ["호주", "미국"];

const SearchTravel = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const keywordParams = searchParams?.get("keyword") ?? "";
  const [keyword, setKeyword] = useState(keywordParams);
  const [finalKeyword, setFinalKeyword] = useState(keywordParams);
  const [bookmarked, setBookmarked] = useState(false);
  const { accessToken } = authStore();
  const [showRelationKeyword, setShowRelationKeyword] = useState(true);
  const [ref, inView] = useInView();
  const { data, isLoading, refetch, fetchNextPage, hasNextPage, isFetching } =
    useSearch({
      keyword: finalKeyword,
    });

  useEffect(() => {
    if (!!accessToken) {
      refetch();
    }
  }, [accessToken]);
  useEffect(() => {
    if (bookmarked) {
      refetch();
      setBookmarked(false);
    }
  }, [bookmarked]);

  useEffect(() => {
    console.log("data updated:", data);
  }, [data]);
  useInfiniteScroll(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, !isFetching, fetchNextPage, hasNextPage]);
  useEffect(() => {
    if (finalKeyword !== "") {
      refetch();

      const params = new URLSearchParams(searchParams?.toString());
      params.set("keyword", finalKeyword);

      router.push(`${pathname}?${params.toString()}`);
    }
  }, [finalKeyword, refetch]);

  useEffect(() => {
    if (finalKeyword !== "" && data && finalKeyword !== keyword) {
      setShowRelationKeyword(true);
      setFinalKeyword("");
    }
  }, [finalKeyword, JSON.stringify(data), keyword]);

  const handleRemoveValue = () => {
    setKeyword("");
  };

  const changeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleRecommendKeyword = (keyword: string) => {
    setKeyword(keyword);
    setFinalKeyword(keyword);
    refetch();
  };

  const onClickRelationKeyword = (keyword: string) => {
    setKeyword(keyword);
    setFinalKeyword(keyword);
    setShowRelationKeyword(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      e.preventDefault();
      setFinalKeyword(keyword.trim());
    }
  };

  return (
    <Container>
      <InputField
        value={keyword}
        onChange={changeKeyword}
        onKeyDown={handleKeyDown}
        placeholder="어디로 여행을 떠날까요?"
        handleRemoveValue={handleRemoveValue}
      />
      <Spacing size={16} />
      <FilterList />

      {typeof data !== "undefined" ? (
        <>
          {isLoading && <div>검색 중...</div>}
          {!isLoading && data && (
            <>
              <SearchResultList
                setBookmarked={setBookmarked}
                key={JSON.stringify(data)}
                searchResult={data.pages}
              />
              <div ref={ref} style={{ height: 20 }} />
            </>
          )}
          {!isLoading && data?.pages[0].content.length === 0 && (
            <>
              <NoDataContainer>
                <Spacing size={"12.3svh"} />
                <img
                  alt="검색 결과가 없습니다"
                  width={80}
                  height={80}
                  src={"/images/noData.png"}
                />
                <Spacing size={16} />
                <NoDataTitle>
                  원하시는 검색 결과가 없어요.
                  <br />
                  이런 검색어는 어떠세요?
                </NoDataTitle>
                <Spacing size={24} />
                <RecommendList>
                  {RECOMMEND_TAGS1.map((keyword, idx) => (
                    <SearchFilterTag
                      idx={idx}
                      text={keyword}
                      key={keyword}
                      onClick={() => handleRecommendKeyword(keyword)}
                    />
                  ))}
                </RecommendList>
                <Spacing size={18} />
                <RecommendList>
                  {RECOMMEND_TAGS2.map((keyword, idx) => (
                    <SearchFilterTag
                      idx={idx}
                      text={keyword}
                      key={keyword}
                      onClick={() => handleRecommendKeyword(keyword)}
                    />
                  ))}
                </RecommendList>
              </NoDataContainer>
            </>
          )}
        </>
      ) : (
        <>
          {keyword.length > 0 ? (
            <>
              {showRelationKeyword && (
                <>
                  <Spacing size={29} />
                  <RelationKeywordList
                    onClick={onClickRelationKeyword}
                    keyword={keyword}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <Spacing size={25} />
              <RecommendKeyword setKeyword={handleRecommendKeyword} />
            </>
          )}
        </>
      )}
    </Container>
  );
};

const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  padding: 0 24px;
`;

const RecommendList = styled.div`
  align-items: center;
  gap: 16px;
  display: flex;
`;

const NoDataTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 22.4px;
  letter-spacing: -0.025em;
  text-align: center;
`;

export default SearchTravel;
