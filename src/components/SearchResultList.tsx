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
dayjs.extend(customParseFormat)

const SearchResultList = ({
  searchResult
}: {
  searchResult: ISearchData[]
}) => {
  const { sort, setSort } = searchStore()
  const [showModal, setShowModal] = useState(false)

  const handleSort = (value: '추천순' | '최신순' | '등록일순' | '정확도순') => {
    setSort(value)
    setShowModal(false)
  }
  console.log(searchResult)
  return (
    <Container>
      {showModal && (
        <BottomModal closeModal={() => setShowModal(false)}>
          <Spacing size={24} />
          {['추천순', '최신순', '등록일순', '정확도순'].map(value => (
            <SortButton
              selected={sort === value}
              onClick={() =>
                handleSort(
                  value as '추천순' | '최신순' | '등록일순' | '정확도순'
                )
              }
              key={value}>
              <span>{value}</span>
              {sort === value && (
                <svg
                  css={{ paddingRight: 6 }}
                  width="21"
                  height="16"
                  viewBox="0 0 21 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 8L8.375 14L19 2"
                    stroke="#3E8D00"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </SortButton>
          ))}
          <Spacing size={66} />
        </BottomModal>
      )}

      <FilterList />
      <Spacing size={15} />
      <Header>
        <CountContainer>
          총&nbsp;<Count>{searchResult[0].totalElements}건</Count>
        </CountContainer>
        <ShowSortButton onClick={() => setShowModal(true)}>
          <SortIcon />
          {sort}
        </ShowSortButton>
      </Header>

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
              description={content.summary}
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

const CountContainer = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  letter-spacing: -0.025em;
`

const Count = styled.span`
  color: #3e8d00;
  font-weight: 700;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ShowSortButton = styled.div`
  display: flex;
  cursor: pointer;
  gap: 4px;
  align-items: center;
`

const SortButton = styled.button<{ selected: boolean }>`
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  width: 100%;
  color: ${props => (props.selected ? 'rgb(62,141,0)' : 'black')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
`

export default SearchResultList
