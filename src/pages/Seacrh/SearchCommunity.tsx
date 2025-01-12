'use client'
import Spacing from '@/components/Spacing'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import styled from '@emotion/styled'
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import InputField from '@/components/designSystem/input/InputField'
import SortHeader from '@/components/SortHeader'
import CategoryList from '@/components/community/CategoryList'
import { palette } from '@/styles/palette'
import CommunityItem from '@/components/community/CommunityItem'
import useCommunity from '@/hooks/useCommunity'
import CustomLink from '@/components/CustomLink'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const LIST = ['최신순', '추천순', '등록일순']

const SearchCommunity = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const keywordParams = searchParams?.get('keyword') ?? ''
  const [keyword, setKeyword] = useState(keywordParams)
  const [finalKeyword, setFinalKeyword] = useState(keywordParams)
  const category = searchParams?.get('categoryName') ?? '전체'
  const sort = searchParams?.get('sortingTypeName') ?? '최신순'
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
    sortingTypeName: sort,
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
      const newSearchParams = new URLSearchParams(searchParams?.toString())
      newSearchParams.set('keyword', finalKeyword)
      router.push(pathname + '?' + newSearchParams)
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
    const newSearchParams = new URLSearchParams(searchParams?.toString())

    newSearchParams.set('sortingTypeName', value)
    router.push(pathname + '?' + newSearchParams)
  }

  const onClickCategory = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString())

    if (value === '잡담') {
      newSearchParams.set('categoryName', '잡담')
    } else if (value === '여행팁') {
      newSearchParams.set('categoryName', '여행팁')
    } else if (value === '후기') {
      newSearchParams.set('categoryName', '후기')
    } else {
      newSearchParams.set('categoryName', '전체')
    }
    router.push(pathname + '?' + newSearchParams)
  }

  return (
    <Container>
      <InputField
        value={keyword}
        onChange={changeKeyword}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력해주세요"
        handleRemoveValue={handleRemoveValue}
      />
      <Spacing size={16} />

      <>
        {isLoading && <div>검색 중...</div>}
        {!isLoading &&
          data &&
          data.pages[0].content.length > 0 &&
          keyword !== '' && (
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
                  {page.content.map((content, itemIndex) =>
                    content ? (
                      <CustomLink
                        to={`/community/detail/${content.postNumber}`}>
                        <CommunityItem data={content} />
                      </CustomLink>
                    ) : (
                      <div>오류가 발생했습니다.</div>
                    )
                  )}
                </React.Fragment>
              ))}

              <div
                ref={ref}
                style={{ height: 80 }}
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
