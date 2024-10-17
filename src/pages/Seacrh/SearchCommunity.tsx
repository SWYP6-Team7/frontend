import SearchResultList from '@/components/SearchResultList'
import Spacing from '@/components/Spacing'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import useSearch from '@/hooks/search/useSearch'
import styled from '@emotion/styled'
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import CreateTripInputField from '@/components/designSystem/input/CreateTripInputField'
import { Link, useSearchParams } from 'react-router-dom'
import SortHeader from '@/components/SortHeader'
import CategoryList from '@/components/community/CategoryList'
import { palette } from '@/styles/palette'
import CommunityItem from '@/components/community/CommunityItem'
import useCommunity from '@/hooks/useCommunity'

const LIST = ['최신순', '추천순']

const SearchCommunity = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const keywordParams = searchParams.get('keyword') ?? ''
  const [keyword, setKeyword] = useState(keywordParams)
  const [finalKeyword, setFinalKeyword] = useState(keywordParams)
  const category = searchParams.get('category') ?? '전체'
  const sort = (() => {
    const value = searchParams.get('sort')
    if (!value || (value !== 'recent' && value !== 'recommend')) {
      return '최신순'
    }
    return value === 'recent' ? '최신순' : '추천순'
  })()
  const [ref, inView] = useInView()
  const {
    communityList: {
      data,
      isLoading,
      refetch,
      fetchNextPage,
      hasNextPage,
      isFetching
    }
  } = useCommunity(undefined, {
    sort: sort,
    categoryName: category,
    keyword: keyword
  })

  useInfiniteScroll(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, !isFetching, fetchNextPage, hasNextPage])
  useEffect(() => {
    if (finalKeyword !== '') {
      refetch()
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set('keyword', finalKeyword)
      setSearchParams(newSearchParams)
    }
  }, [finalKeyword, refetch])

  const handleRemoveValue = () => {
    setKeyword('')
  }

  const changeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword !== '') {
      e.preventDefault()
      setFinalKeyword(keyword)
    }
  }

  const onClickSort = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)

    if (value === '추천순') {
      newSearchParams.set('sort', 'recommend')
    } else {
      newSearchParams.set('sort', 'recent')
    }
    setSearchParams(newSearchParams)
  }

  const onClickCategory = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)

    if (value === '잡담') {
      newSearchParams.set('category', '잡담')
    } else if (value === '여행팁') {
      newSearchParams.set('category', '여행팁')
    } else if (value === '후기') {
      newSearchParams.set('category', '후기')
    } else {
      newSearchParams.set('category', '전체')
    }
    setSearchParams(newSearchParams)
  }

  return (
    <Container>
      <Spacing size={'4.2svh'} />
      <CreateTripInputField
        value={keyword}
        onChange={changeKeyword}
        onKeyDown={handleKeyDown}
        placeholder="어디로 여행을 떠날까요?"
        handleRemoveValue={handleRemoveValue}
      />
      <Spacing size={16} />

      <>
        {isLoading && <div>검색 중...</div>}
        {!isLoading && data && data.pages[0].content.length > 0 && (
          <>
            <SortContainer>
              <SortHeader
                list={LIST}
                clickSort={onClickSort}
                sort={sort}>
                <CategoryList
                  type={category}
                  setType={onClickCategory}
                  list={['전체', '잡담', '여행팁', '후기']}
                />
              </SortHeader>
            </SortContainer>

            {data.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.content.map((content, itemIndex) => (
                  <Link to={`/community/detail/${content.postNumber}`}>
                    <CommunityItem data={content} />
                  </Link>
                ))}
              </React.Fragment>
            ))}

            <div
              ref={ref}
              css={{ height: 80 }}
            />
          </>
        )}
      </>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 24px;
`

const SortContainer = styled.div`
  padding-bottom: 11px;
  border-bottom: 1px solid rgb(240, 240, 240);

  background-color: ${palette.BG};
  box-sizing: border-box;
`

export default SearchCommunity
