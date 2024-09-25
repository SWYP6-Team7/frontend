import Button from '@/components/Button'
import CreateTripInputField from '@/components/designSystem/input/CreateTripInputField'
import InputField from '@/components/designSystem/input/InputField'
import SecondStepIcon from '@/components/icons/SecondStepIcon'
import Spacing from '@/components/Spacing'
import { createTripStore } from '@/store/client/createTripStore'
import { palette } from '@/styles/palette'
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
        success={title !== ''}
        hasError={title.length > 20}
        value={title}
        placeholder="제목을 입력해주세요. (최대 20자)"
        handleRemoveValue={handleRemoveValue}
        onChange={changeKeyword}
      />
      <Spacing size={'5.6svh'} />
      <DetailTitle>소개글</DetailTitle>
      <Spacing size={8} />
      <DetailTextArea
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

const DetailTextArea = styled.textarea`
  width: 100%;
  height: 31svh;
  padding: 16px;
  font-family: 'Pretandard', sans-serif;
  background-color: ${palette.검색창};
  &::placeholder {
    color: ${palette.비강조2};

    font-size: 16px;
    font-weight: 500;
    line-height: 22.4px;
    letter-spacing: -0.025em;
  }
  font-size: 16px;
  &::-webkit-scrollbar {
    // scrollbar 자체의 설정
    // 너비를 작게 설정
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    // scrollbar의 배경부분 설정
    // 부모와 동일하게 함(나중에 절전모드, 밤모드 추가되면 수정하기 번거로우니까... 미리 보이는 노동은 최소화)
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    // scrollbar의 bar 부분 설정
    // 동글동글한 회색 바를 만든다.
    border-radius: 1rem;
    height: 80px;
    background: rgba(217, 217, 217, 1);
  }
  &::-webkit-scrollbar-button {
    // scrollbar의 상하단 위/아래 이동 버튼
    // 크기를 안줘서 안보이게 함.
    width: 0;
    height: 0;
  }
  line-height: 22.4px;
  letter-spacing: -0.025em;
  text-align: left;
  border-radius: 20px;
  border: none;
  outline: none;
  resize: none;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 33.6px;
  margin-left: 6px;
  text-align: left;
`

export default CreateTripIntroduce
