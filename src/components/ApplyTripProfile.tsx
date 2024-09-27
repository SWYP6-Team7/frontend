import styled from '@emotion/styled'
import RoundedImage from './designSystem/profile/RoundedImage'
import BoxLayoutTag from './BoxLayoutTag'
import { palette } from '@/styles/palette'

const ApplyTripProfile = () => {
  // 유저 정보 가져오는 로직 추가 필요

  return (
    <Container>
      <RoundedImage
        src={''}
        size={48}
      />
      <TextContainer>
        <Name>신짱구</Name>
        <BoxLayoutTag
          text={'20대'}
          height={'22px'}
          color={palette.keycolor}
          backgroundColor={palette.keycolorBG}
        />
      </TextContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const Name = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 21.48px;
`

export default ApplyTripProfile
