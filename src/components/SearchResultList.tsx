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
import { Link } from 'react-router-dom'
import { palette } from '@/styles/palette'
import EmptyHeartIcon from './icons/EmptyHeartIcon'
import FullHeartIcon from './icons/FullHeartIcon'
import { authStore } from '@/store/client/authStore'
import { useUpdateBookmark } from '@/hooks/bookmark/useUpdateBookmark'
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
            <Link to={`/trip/detail/${content.travelNumber}`}>
              <HorizonBoxLayout
                bookmarkNeed={false}
                bookmarked={content.bookmarked}
                travelNumber={content.travelNumber}
                userName={content.userName}
                title={content.title}
                tags={content.tags}
                total={content.maxPerson}
                daysAgo={dayjs().diff(
                  dayjs(content.createdAt, 'YYYY-MM-DD HH:mm'),
                  'day'
                )}
                daysLeft={dayjs(content.registerDue, 'YYYY-MM-DD').diff(
                  dayjs(),
                  'day'
                )}
                recruits={content.nowPerson}
              />
            </Link>
            <BookmarkButton
              travelNumber={content.travelNumber}
              bookmarked={content.bookmarked}
            />
          </BoxContainer>
        ))
      )}
    </Container>
  )
}
// 아래 북마크 버튼은 Link에 구속되지 않도록 하는 버튼.
interface BookmarkButtonProps {
  bookmarked: boolean
  travelNumber: number
}
const BookmarkButton = ({ bookmarked, travelNumber }: BookmarkButtonProps) => {
  const { accessToken, userId } = authStore()
  const { postBookmarkMutation, deleteBookmarkMutation } = useUpdateBookmark(
    accessToken!,
    userId!,
    travelNumber
  )
  const bookmarkClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (bookmarked) {
      deleteBookmarkMutation()
    } else {
      // 북마크 추가.
      postBookmarkMutation()
    }
  }

  return (
    <BookmarkBtn onClick={bookmarkClickHandler}>
      {bookmarked ? (
        <FullHeartIcon
          width={24}
          height={21.4}
        />
      ) : (
        <EmptyHeartIcon
          width={24}
          height={21.4}
          stroke={`${palette.비강조3}`}
        />
      )}
    </BookmarkBtn>
  )
}
const BookmarkBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 6px;
`
const BoxContainer = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgb(240, 240, 240);
  position: relative;
`

const Container = styled.div``

export default SearchResultList
