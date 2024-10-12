import Button from '@/components/Button'
import ButtonContainer from '@/components/ButtonContainer'
import CategoryButton from '@/components/CategoryButton'
import SearchFilterTag from '@/components/designSystem/tag/SearchFilterTag'
import Spacing from '@/components/Spacing'
import useMyPage from '@/hooks/myPage/useMyPage'
import { myPageStore } from '@/store/client/myPageStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const TAG_LIST = [
  {
    title: '태그 설정',
    tags: [
      '⏱️ 단기',
      '✊ 즉흥',
      '📝 계획',
      '🧳 중장기',
      '🏄‍♂️ 액티비티',
      '☁️ 여유',
      '🍔 먹방',
      '💸 가성비',
      '📷 핫플',
      '🛍️ 쇼핑',
      '🎨 예술',
      '🗿 역사',
      '🏔️ 자연',
      '🥳 단체',
      '😊 소수'
    ] as const
  }
]

const AGE_LIST = ['10대', '20대', '30대', '40대', '50대 이상']
export default function EditMyTag() {
  const [isChanged, setIsChanged] = useState(false)
  const {
    agegroup,
    addPreferredTags,
    addAgegroup,
    preferredTags,
    addIsTagUpdated
  } = myPageStore()
  console.log(agegroup, preferredTags, '나이, 태그')
  const { updateMyPageMutation, isUpdatedSuccess } = useMyPage()
  const tempArray = preferredTags.filter(v => v !== '국내' && v !== '해외')
  // 일단 국내 해외 태그는 제외해두고 저장. 수정해서 전송시에는 포함 예정.
  const [taggedArray, setTaggedArray] = useState<string[]>(tempArray)
  const [age, setAge] = useState(agegroup)
  const navigate = useNavigate()

  const completeClickHandler = () => {
    addPreferredTags([...taggedArray, ...tempArray])
    addAgegroup(age)
    updateMyPageMutation()
  }
  useEffect(() => {
    if (isUpdatedSuccess) {
      console.log('태그 변경 성공.')
      addIsTagUpdated(true)
      navigate(-1)
    }
  }, [isUpdatedSuccess])
  // 버튼 활성화상태.

  const isActive = (tag: string) => {
    const value = tag.split(' ')[1]
    return taggedArray.includes(value)
  }

  const clickTag = (tag: string) => {
    if (taggedArray.length >= 5) {
      //이미 5개.
      if (!isActive(tag)) {
        taggedArray.pop()
      }
    }
    const newArray = taggedArray.includes(tag)
      ? taggedArray.filter(v => v !== tag)
      : [...taggedArray, tag]
    if (JSON.stringify(newArray) !== JSON.stringify(taggedArray)) {
      setIsChanged(true)
    }
    addPreferredTags(newArray)
    setTaggedArray(newArray)
  }
  const handleClickage = (ageInput: string) => {
    if (ageInput !== age) {
      setIsChanged(true)
    }
    setAge(ageInput)
  }

  return (
    <Container>
      <AgeStep>
        <Content>연령대를 선택해주세요</Content>
        <AgeList>
          {AGE_LIST.map((ageValue, idx) => (
            <SearchFilterTag
              addStyle={{
                backgroundColor:
                  age === ageValue
                    ? 'rgba(227, 239, 217, 1)'
                    : ' rgba(240, 240, 240, 1)',
                color:
                  age === ageValue
                    ? `${palette.keycolor}`
                    : 'rgba(52, 52, 52, 1)',
                fontWeight: age === ageValue ? '600' : '400',
                border:
                  age === ageValue ? `1px solid ${palette.keycolor}` : 'none'
              }}
              idx={idx}
              onClick={() => handleClickage(ageValue)}
              text={ageValue}
              key={ageValue}
            />
          ))}
        </AgeList>
      </AgeStep>
      <TripStyleContainer>
        <Content>
          연령대를 선택해주세요
          <SubContent>(최대 5개)</SubContent>
        </Content>
        <StyleBtns>
          {TAG_LIST.map((item, idx) => (
            <TagContainer>
              {item.tags.map((tag, idx) => (
                <SearchFilterTag
                  key={tag}
                  idx={idx}
                  addStyle={{
                    backgroundColor: isActive(tag)
                      ? 'rgba(227, 239, 217, 1)'
                      : ' rgba(240, 240, 240, 1)',
                    color: isActive(tag)
                      ? `${palette.keycolor}`
                      : 'rgba(52, 52, 52, 1)',
                    border: isActive(tag)
                      ? `1px solid ${palette.keycolor}`
                      : `1px solid ${palette.검색창}`,
                    borderRadius: '30px',
                    padding: '10px 20px',
                    fontWeight: isActive(tag) ? '600' : '400'
                  }}
                  text={tag}
                  onClick={() => clickTag(tag.split(' ')[1])}
                />
              ))}
            </TagContainer>
          ))}
        </StyleBtns>
      </TripStyleContainer>
      <Spacing size={120} />
      <ButtonContainer>
        <Button
          disabled={!isChanged}
          text="완료"
          onClick={completeClickHandler}
          addStyle={{
            backgroundColor:
              taggedArray.length > 0
                ? 'rgba(62, 141, 0, 1)'
                : 'rgba(220, 220, 220, 1)',
            color:
              taggedArray.length > 0
                ? 'rgba(240, 240, 240, 1)'
                : palette.비강조,
            boxShadow: 'rgba(170, 170, 170, 0.1)'
          }}
        />
      </ButtonContainer>
    </Container>
  )
}
const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`
const SubContent = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  text-align: left;
  color: ${palette.비강조2};
  padding-left: 10px;
`
const Container = styled.div`
  padding: 0px 24px;
`
const AgeList = styled.div`
  flex-wrap: wrap;
  display: flex;
  gap: 16px;
  width: 70%;
  margin-top: 8px;
`
const AgeStep = styled.div`
  margin-top: 24px;
`
const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 6px;

  opacity: 0px;

  font-size: 16px;
  font-weight: 600;
  line-height: 16px;

  text-align: left;
  color: ${palette.기본};
`

const TripStyleContainer = styled.div`
  margin-top: 36px;
`
const StyleBtns = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`
