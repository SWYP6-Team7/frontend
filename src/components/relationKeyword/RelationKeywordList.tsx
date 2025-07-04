"use client";
import useRelationKeyword from "@/hooks/search/useRelationKeyword";
import styled from "@emotion/styled";
import RelationKeyword from "./RelationKeyword";

interface RelationKeywordListProps {
  keyword: string;
  onClick: (keyword: string) => void;
}

const RelationKeywordList = ({
  keyword,
  onClick,
}: RelationKeywordListProps) => {
  const { data, isLoading, error } = useRelationKeyword(keyword);

  if (isLoading) {
    return null;
  }
  if (error) {
    return null;
  }
  console.log(data, "관련 키워드.");
  return (
    <Contianer>
      {data &&
        data.suggestions.length > 0 &&
        data?.suggestions?.map((data) => (
          <button
            style={{ display: "block", cursor: "pointer" }}
            key={data}
            onClick={() => onClick(data)}
          >
            <RelationKeyword keyword={keyword} data={data} />
          </button>
        ))}
    </Contianer>
  );
};

const Contianer = styled.div``;

export default RelationKeywordList;
