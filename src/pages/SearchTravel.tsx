import InputField from '@/components/designSystem/input/InputField'
import FilterList from '@/components/FilterList'
import RecommendKeyword from '@/components/RecommendKeyword'
import SearchFilterTag from '@/components/SearchFilterTag'
import SearchResultList from '@/components/SearchResultList'
import Spacing from '@/components/Spacing'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import useSearch from '@/hooks/search/useSearch'
import { searchStore } from '@/store/client/searchStore'
import styled from '@emotion/styled'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import RelationKeywordList from '@/components/relationKeyword/RelationKeywordList'

const RECOMMEND_TAGS1 = ['유럽', '일본', '제주']
const RECOMMEND_TAGS2 = ['유럽', '일본']

const SearchTravel = () => {
  const [keyword, setKeyword] = useState('')
  const { keyword: finalKeyword, setKeyword: setFinalKeyword } = searchStore()
  const [success, setSuccess] = useState(false)
  const [ref, inView] = useInView()
  const { data, isLoading, refetch, fetchNextPage, hasNextPage, isFetching } =
    useSearch({
      keyword: finalKeyword
    })

  useInfiniteScroll(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage()
    }
  }, [inView, !isFetching, fetchNextPage, hasNextPage])

  useEffect(() => {
    if (finalKeyword !== '') {
      refetch()
    }
  }, [finalKeyword, refetch])

  const handleRemoveValue = () => {
    setKeyword('')
  }

  const changeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const handleRecommendKeyword = (keyword: string) => {
    setKeyword(keyword)
    refetch()
  }

  const onFocus = () => {
    setSuccess(true)
  }

  const onBlur = () => {
    setSuccess(false)
  }

  const onClickRelationKeyword = (keyword: string) => {
    setFinalKeyword(keyword)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword !== '') {
      e.preventDefault()
      setFinalKeyword(keyword)
    }
  }

  return (
    <Container>
      <Spacing size={'4.2svh'} />
      <InputField
        onBlur={onBlur}
        onFocus={onFocus}
        success={success}
        value={keyword}
        onChange={changeKeyword}
        onKeyDown={handleKeyDown}
        placeholder="어디로 여행을 떠날까요?"
        handleRemoveValue={handleRemoveValue}
      />
      <Spacing size={16} />
      <FilterList />

      {typeof data !== 'undefined' ? (
        <>
          {isLoading && <div>검색 중...</div>}
          {!isLoading && data && (
            <>
              <SearchResultList searchResult={data.pages} />
              <div
                ref={ref}
                css={{ height: 80 }}
              />
            </>
          )}
          {!isLoading && data?.pages[0].content.length === 0 && (
            <>
              <NoDataContainer>
                <Spacing size={'12.3svh'} />
                <div
                  css={{
                    borderRadius: '50%',
                    backgroundColor: 'rgba(217, 217, 217, 1)',
                    width: 65,
                    height: 65
                  }}
                />
                <Spacing size={16} />
                <NoDataTitle>
                  원하시는 검색 결과가 없어요.
                  <br />
                  이런 검색어는 어떠세요?
                </NoDataTitle>
                <Spacing size={24} />
                <RecommendList>
                  {RECOMMEND_TAGS1.map((keyword, idx) => (
                    <SearchFilterTag
                      idx={idx}
                      text={keyword}
                      key={keyword}
                      onClick={() => handleRecommendKeyword(keyword)}
                    />
                  ))}
                </RecommendList>
                <Spacing size={18} />
                <RecommendList>
                  {RECOMMEND_TAGS2.map((keyword, idx) => (
                    <SearchFilterTag
                      idx={idx}
                      text={keyword}
                      key={keyword}
                      onClick={() => handleRecommendKeyword(keyword)}
                    />
                  ))}
                </RecommendList>
              </NoDataContainer>
            </>
          )}
        </>
      ) : (
        <>
          {keyword.length > 0 ? (
            <>
              <Spacing size={29} />
              <RelationKeywordList
                onClick={onClickRelationKeyword}
                keyword={keyword}
              />
            </>
          ) : (
            <>
              <Spacing size={25} />
              <RecommendKeyword setKeyword={handleRecommendKeyword} />
            </>
          )}
        </>
      )}
    </Container>
  )
}

const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Container = styled.div`
  padding: 0 24px;
`

const RecommendList = styled.div`
  align-items: center;
  gap: 16px;
  display: flex;
`

const NoDataTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 22.4px;
  letter-spacing: -0.025em;
  text-align: center;
`

export default SearchTravel
