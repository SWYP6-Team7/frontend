import Badge from '@/components/designSystem/Badge'
import RoundedImage from '@/components/designSystem/profile/RoundedImage'
import ResultToast from '@/components/designSystem/toastMessage/resultToast'
import RightVector from '@/components/icons/RightVector'
import Spacing from '@/components/Spacing'
import useMyPage from '@/hooks/myPage/useMyPage'
import { ImyPage } from '@/model/myPages'
import { myPageStore } from '@/store/client/myPageStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { symbol } from 'zod'

export default function EditMyInfo() {
  const navigate = useNavigate()
  const {
    name,
    agegroup,
    email,
    preferredTags,
    isNameUpdated,
    addIsNameUpdated
  } = myPageStore()
  const [isNameChangeToastShow, setIsNameChangeToastShow] = useState(false) // 변경시 보이게 해줄 토스트 메시지
  console.log(isNameUpdated)
  useEffect(() => {
    if (isNameUpdated) {
      setTimeout(() => {
        setIsNameChangeToastShow(true)
        addIsNameUpdated(false)
      }, 500)
    }
  }, [isNameUpdated])

  return (
    <Container>
      <ResultToast
        height={120}
        isShow={isNameChangeToastShow}
        setIsShow={setIsNameChangeToastShow}
        text="이름 변경이 완료되었어요"
      />
      <ProfileImg>
        <RoundedImage
          size={80}
          src="/images/activeFemale.png"
        />
      </ProfileImg>
      <div>
        <Box>
          <SmallTitle>이름</SmallTitle>
          <Name onClick={() => navigate('/editMyName')}>
            <Value css={{ marginRight: '8px' }}>{name}</Value>
            <div css={{ padding: '8px 9px' }}>
              <RightVector />
            </div>
          </Name>
        </Box>
        <Spacing size={8} />
        <Line></Line>
        <Spacing size={8} />
        <Box>
          <SmallTitle>이메일</SmallTitle>
          <div>
            <Value>{email}</Value>
          </div>
        </Box>
        {/* 아래는 배포 이후 예정 */}
        {/* <div>
              <div>비밀번호 변경</div>
              <div>
                <div>김모잉</div>
                <RightVector />
              </div>
            </div> */}
        <Spacing size={8} />
        <Line></Line>
        <Spacing size={8} />
        <TagBox>
          <div css={{ padding: '18px 8px' }}>
            <SmallTitle css={{ display: 'flex' }}>나의 태그</SmallTitle>
            {/* <RightVector /> */}
          </div>
          <MyTag>
            <AgeBox css={{ display: 'flex' }}>
              <LastTitle css={{ marginRight: '24px' }}>연령대</LastTitle>
              <Badge
                isDueDate={false}
                fontWeight="600"
                color={palette.keycolor}
                backgroundColor={palette.keycolorBG}
                text={agegroup}
              />
            </AgeBox>
            <div
              css={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center'
              }}>
              <LastTitle>선호태그</LastTitle>
              <Tags>
                {preferredTags.map((text: string) => (
                  <Badge
                    key={text}
                    isDueDate={false}
                    fontWeight="500"
                    color={palette.비강조}
                    backgroundColor={palette.비강조4}
                    text={text}
                  />
                ))}
              </Tags>
            </div>
          </MyTag>
        </TagBox>
        <Spacing size={8} />
        <Line></Line>
        <Spacing size={8} />
        <LogoutBox>
          <div>로그아웃</div>
        </LogoutBox>
      </div>
    </Container>
  )
}
const LogoutBox = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.25px;
  text-align: left;
  color: ${palette.비강조2};
  margin-top: 32px;
  display: flex;
  justify-content: center;
`
const AgeBox = styled.div`
  display: flex;
  align-items: center;
`
const MyTag = styled.div`
  padding: 0px 8px 16px 8px;
  opacity: 0px;
`
const TagBox = styled.div``
const SmallTitle = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.25px;
  text-align: center;

  color: ${palette.기본};
`
const LastTitle = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 600;
  line-height: 16.71px;
  letter-spacing: -0.025em;
  text-align: left;
  color: ${palette.비강조};
`
const Value = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
  color: ${palette.비강조};
  text-align: center;
`
const Name = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Container = styled.div`
  padding: 0px 24px;
`
const ProfileImg = styled.div`
  display: flex;
  justify-content: center;
`
const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 52px;
  padding: 14px 8px;

  opacity: 0px;
`
const Line = styled.div`
  height: 1px;
  border-bottom: 1px solid rgba(231, 231, 231, 1);
`
const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-left: 8px;
`
