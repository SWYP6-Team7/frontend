'use client'
import Button from '@/components/designSystem/Buttons/Button'
import ButtonContainer from '@/components/ButtonContainer'
import InputField from '@/components/designSystem/input/InputField'
import FirstStepIcon from '@/components/icons/FirstStepIcon'
import PlaceIcon from '@/components/icons/PlaceIcon'
import RelationKeywordList from '@/components/relationKeyword/RelationKeywordList'
import Spacing from '@/components/Spacing'
import useRelationKeyword from '@/hooks/search/useRelationKeyword'
import { createTripStore } from '@/store/client/createTripStore'
import styled from '@emotion/styled'
import React, { useMemo, useState } from 'react'

import useViewTransition from '@/hooks/useViewTransition'

export default function CreateTripPlace() {
  const [keyword, setKeyword] = useState('')
  const { addLocation } = createTripStore()
  const [showRelationList, setShowRelationList] = useState(true)
  const navigateWithTransition = useViewTransition()

  const { data, isLoading, error } = useRelationKeyword(keyword)

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
    if (!showRelationList) {
      setShowRelationList(true)
    }
  }

  const clickRelationKeyword = (keyword: string) => {
    setKeyword(keyword)
    setShowRelationList(false)
  }

  const handleRemoveValue = () => setKeyword('')

  const handleNext = () => {
    // if (!isMatchedKeyword) {
    //   return
    // }
    addLocation(keyword)
    document.documentElement.style.viewTransitionName = 'forward'
    navigateWithTransition('/createTripIntroduce')
  }

  // const isMatchedKeyword = useMemo(() => {
  //   if (data?.suggestions && Array.isArray(data.suggestions)) {
  //     return data.suggestions.includes(keyword)
  //   } else {
  //     return false
  //   }
  // }, [keyword, data?.suggestions])
  return (
    <Container>
      <StepIconContainer>
        <FirstStepIcon />
      </StepIconContainer>
      <Title>어디로 떠나볼까요?</Title>
      <Spacing size={8} />
      <InputField
        value={keyword}
        handleRemoveValue={handleRemoveValue}
        onChange={changeKeyword}
        icon={<PlaceIcon />}
      />
      {keyword.length > 0 && (
        <>
          {showRelationList && (
            <>
              <Spacing size={16} />
              <RelationKeywordList
                onClick={clickRelationKeyword}
                keyword={keyword}
              />
            </>
          )}
        </>
      )}
      <ButtonContainer>
        <Button
          onClick={handleNext}
          disabled={keyword === ''}
          addStyle={
            keyword === ''
              ? {
                  backgroundColor: 'rgba(220, 220, 220, 1)',
                  color: 'rgba(132, 132, 132, 1)',
                  boxShadow: '-2px 4px 5px 0px rgba(170, 170, 170, 0.1)'
                }
              : undefined
          }
          text={'다음'}
        />
      </ButtonContainer>
    </Container>
  )
}

const StepIconContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 40px;
`

const Container = styled.div`
  padding: 0 24px;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 33.6px;
  margin-left: 6px;
  text-align: left;
`
