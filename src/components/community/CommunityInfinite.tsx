import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import { useTripList } from '@/hooks/useTripList'
import styled from '@emotion/styled'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import HorizonBoxLayout from '../HorizonBoxLayout'
import dayjs from 'dayjs'
import { Link, useSearchParams } from 'react-router-dom'
import FullHeartIcon from '../icons/FullHeartIcon'
import EmptyHeartIcon from '../icons/EmptyHeartIcon'
import { palette } from '@/styles/palette'
import { authStore } from '@/store/client/authStore'
import { useUpdateBookmark } from '@/hooks/bookmark/useUpdateBookmark'
import { daysAgo } from '@/utils/time'
import CommunityItem from './CommunityItem'
import useCommunity from '@/hooks/useCommunity'
import CustomLink from '../CustomLink'

const CommunityInfinite = () => {
  const [ref, inView] = useInView()
  const [searchParams, setSearchParams] = useSearchParams()

  const sort = searchParams.get('sortingTypeName') ?? '최신순'
  const categoryName = searchParams.get('categoryName') ?? '전체'
  const {
    communityList: { data, isFetching, hasNextPage, fetchNextPage, isLoading }
  } = useCommunity(undefined, {
    sortingTypeName: sort,
    categoryName: categoryName
  })

  useInfiniteScroll(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, !isFetching, fetchNextPage, hasNextPage])
  return (
    <Container>
      {!isLoading &&
        data &&
        data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.content.map((content, itemIndex) => (
              <CustomLink to={`/community/detail/${content.postNumber}`}>
                <CommunityItem data={content} />
              </CustomLink>
            ))}
          </React.Fragment>
        ))}
      <div
        ref={ref}
        css={{ height: 130 }}
      />
    </Container>
  )
} // 아래 북마크 버튼은 Link에 구속되지 않도록 하는 버튼.
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
const Container = styled.div`
  padding: 0 24px;
`

const TopContainer = styled.div`
  margin-bottom: 16px;
`
const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
`

const BoxContainer = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgb(240, 240, 240);
  position: relative;
`

export default CommunityInfinite
