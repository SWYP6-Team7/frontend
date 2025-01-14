'use client'
import Button from '@/components/designSystem/Buttons/Button'
import ButtonContainer from '@/components/ButtonContainer'
import CreateTripInputField from '@/components/designSystem/input/InputField'
import PlaceIcon from '@/components/icons/PlaceIcon'
import RelationKeywordList from '@/components/relationKeyword/RelationKeywordList'
import Spacing from '@/components/Spacing'

import { tripDetailStore } from '@/store/client/tripDetailStore'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditTripPlace() {
  const [showRelationList, setShowRelationList] = useState(true)
  const router = useRouter()

  const { location, addLocation: addLocationForEdit } = tripDetailStore()
  const [keyword, setKeyword] = useState(location)
  // const { data, isLoading } = useRelationKeyword(keyword)
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

  const handleDone = () => {
    addLocationForEdit(keyword)
    router.back()
  }

  return (
    <Container>
      <Title>어디로 떠나볼까요?</Title>
      <Spacing size={8} />
      <CreateTripInputField
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
          onClick={handleDone}
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
          text={'완료'}
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
