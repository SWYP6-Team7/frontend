import Button from '@/components/Button'
import InputField from '@/components/designSystem/input/InputField'
import TextareaField from '@/components/designSystem/input/TextareaField'
import SecondStepIcon from '@/components/icons/SecondStepIcon'
import Spacing from '@/components/Spacing'
import { createTripStore } from '@/store/client/createTripStore'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateTripIntroduce = () => {
  const {
    title: initTitle,
    details: initDetails,
    addDetails,
    addTitle
  } = createTripStore()
  const [title, setTitle] = useState(initTitle)
  const [details, setDetails] = useState(initDetails)
  const navigate = useNavigate()

  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleRemoveValue = () => setTitle('')

  const handleNext = () => {
    if (title.length > 20 || title === '') {
      return
    } else if (details.length > 2000 || details === '') {
      return
    }
    addTitle(title)
    addDetails(details)
    navigate('/createTripDetail')
  }

  return (
    <Container>
      <StepIconContainer>
        <SecondStepIcon />
      </StepIconContainer>
      <Title>여행을 소개해주세요.</Title>
      <Spacing size={8} />
      <InputField
        value={title}
        placeholder="제목을 입력해주세요. (최대 20자)"
        handleRemoveValue={handleRemoveValue}
        onChange={changeKeyword}
      />
      <Spacing size={'5.6svh'} />
      <DetailTitle>소개글</DetailTitle>
      <Spacing size={8} />
      <TextareaField
        value={details}
        onChange={e => setDetails(e.target.value)}
        placeholder="어떤 여행을 떠나실 예정인가요?
자유롭게 소개해보세요. (최대 2,000자)"
      />
      <ButtonContainer>
        <Button
          onClick={handleNext}
          disabled={title === '' || details === ''}
          addStyle={
            title === '' || details === ''
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

const ButtonContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;

  position: absolute;
  padding: 0 24px;
  background-color: white;
  padding-top: 16px;
  padding-bottom: 40px;
  left: 0;
`

const StepIconContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 40px;
`

const DetailTitle = styled.h5`
  font-size: 18px;
  font-weight: 600;
  line-height: 25.2px;
  margin-left: 6px;
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

export default CreateTripIntroduce
