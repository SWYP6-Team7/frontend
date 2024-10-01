import { ISearchData } from '@/model/search'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import BottomModal from './BottomModal'
import Spacing from './Spacing'
import SortIcon from './icons/SortIcon'
import HorizonBoxLayout from './HorizonBoxLayout'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import FilterList from './FilterList'
import { searchStore } from '@/store/client/searchStore'
import SortHeader from './SortHeader'
dayjs.extend(customParseFormat)

const LIST = ['추천순', '최신순', '등록일순', '정확도순']

const SearchResultList = ({
  searchResult
}: {
  searchResult: ISearchData[]
}) => {
  const { sort, setSort } = searchStore()

  const clickSort = (value: string) => {
    setSort(value as '추천순' | '최신순' | '등록일순' | '정확도순')
  }

  return (
    <Container>
      <Spacing size={15} />
      <SortHeader
        sort={sort}
        list={LIST}
        clickSort={clickSort}
        totalElements={searchResult[0].page.totalElements}
      />

      {searchResult.map(page =>
        page.content.map(content => (
          <BoxContainer>
            <HorizonBoxLayout
              userName={content.userName}
              title={content.title}
              tags={content.tags}
              total={content.maxPerson}
              daysAgo={dayjs().diff(
                dayjs(content.createdAt, 'YYYY년MM월DD일'),
                'day'
              )}
              daysLeft={dayjs(content.registerDue, 'YYYY년MM월DD일').diff(
                dayjs(),
                'day'
              )}
              recruits={content.nowPerson}
            />
          </BoxContainer>
        ))
      )}
    </Container>
  )
}

const BoxContainer = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgb(240, 240, 240);
`

const Container = styled.div``

export default SearchResultList
