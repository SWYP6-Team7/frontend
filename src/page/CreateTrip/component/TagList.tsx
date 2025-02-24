"use client";
import SearchFilterTag from "@/components/designSystem/tag/SearchFilterTag";
import { TAG_LIST } from "@/constants/tags";
import { palette } from "@/styles/palette";
import styled from "@emotion/styled";
import React from "react";

interface TagListProps {
  taggedArray: string[];
  clickTag: (tag: string) => void;
}

const TagList = ({ taggedArray, clickTag }: TagListProps) => {
  const isActive = (tag: string) => {
    return taggedArray.includes(tag);
  };

  return (
    <>
      <TagContainer>
        {TAG_LIST[0].tags?.map((tag, idx) => (
          <SearchFilterTag
            key={tag}
            idx={idx}
            addStyle={{
              backgroundColor: isActive(tag) ? "rgba(227, 239, 217, 1)" : " rgba(240, 240, 240, 1)",
              color: isActive(tag) ? `${palette.keycolor}` : "rgba(52, 52, 52, 1)",

              border: isActive(tag) ? `1px solid ${palette.keycolor}` : `1px solid ${palette.검색창}`,
              borderRadius: "30px",
              padding: "10px 20px",
              fontWeight: isActive(tag) ? "600" : "400",
              lineHeight: "22px",
            }}
            text={tag}
            onClick={() => clickTag(tag)}
          />
        ))}
      </TagContainer>
    </>
  );
};

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export default TagList;
