import InputField from '@/components/designSystem/input/InputField'
import RecommendKeyword from '@/components/RecommendKeyword'
import SearchResultList from '@/components/SearchResultList'
import Spacing from '@/components/Spacing'
import useSearch from '@/hooks/user/useSearch'
import styled from '@emotion/styled'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'

const SearchTravel = () => {
  const [keyword, setKeyword] = useState('')
  const [finalKeyword, setFinalKeyword] = useState<string>('')
  const [success, setSuccess] = useState(false)
  const { data, isLoading, refetch } = useSearch({
    keyword: finalKeyword,
    tags: ['gksk']
  })

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
  }

  const onFocus = () => {
    setSuccess(true)
  }

  const onBlur = () => {
    setSuccess(false)
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

      {typeof data !== 'undefined' ? (
        <>
          {isLoading && <div>검색 중...</div>}

          {!isLoading && data?.pages[0].content.length === 0 && (
            <div>검색 결과가 없습니다.</div>
          )}

          {!isLoading && data && <SearchResultList searchResult={data.pages} />}
        </>
      ) : (
        <>
          {keyword.length > 0 ? (
            <></>
          ) : (
            <RecommendKeyword setKeyword={handleRecommendKeyword} />
          )}
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 0 24px;
`

export default SearchTravel
