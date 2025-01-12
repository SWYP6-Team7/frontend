'use client'
import styled from '@emotion/styled'
import React from 'react'
import Spacing from './Spacing'
import SearchFilterTag from './designSystem/tag/SearchFilterTag'

const TAG_LIST = ['유럽', '일본', '제주', '강릉', '미국']

interface RecoomendKeywordProps {
  setKeyword: (keyword: string) => void
}

const RecommendKeyword = ({ setKeyword }: RecoomendKeywordProps) => {
  return (
    <div>
      <Title>추천 검색어</Title>
      <Spacing size={14} />
      <TagContainer>
        {TAG_LIST.map((keyword, idx) => (
          <SearchFilterTag
            idx={idx}
            text={keyword}
            key={keyword}
            onClick={() => setKeyword(keyword)}
          />
        ))}
      </TagContainer>
    </div>
  )
}

const Title = styled.h5`
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
`
const TagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export default RecommendKeyword
