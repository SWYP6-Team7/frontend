"use client";
import styled from "@emotion/styled";
import React from "react";
import SearchFilterTag from "../designSystem/tag/SearchFilterTag";

interface CategoryListProps {
  list: string[];
  type: string;
  setType: (type: string) => void;
}

const CategoryList = ({ list, type, setType }: CategoryListProps) => {
  return (
    <TagContainer>
      {list.map((keyword, idx) => (
        <SearchFilterTag
          style={{ cursor: "pointer" }}
          idx={idx}
          active={keyword === type}
          text={keyword}
          key={keyword}
          onClick={() => setType(keyword)}
        />
      ))}
    </TagContainer>
  );
};

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-around;
`;

export default CategoryList;
