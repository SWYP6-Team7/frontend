import styled from '@emotion/styled'
import React from 'react'
import SearchFilterTag from '../designSystem/tag/SearchFilterTag'
import { palette } from '@/styles/palette'
import EmptyHeartIcon from '../icons/EmptyHeartIcon'
import CommentIcon from '../icons/CommentIcon'

const CommunityItem = () => {
  return (
    <Container>
      <div>
        <SearchFilterTag
          text="여행팁"
          idx={0}
          addStyle={{
            backgroundColor: palette.비강조4,
            color: palette.비강조,
            border: 'none',
            borderRadius: '12px',
            fontSize: '12px',
            padding: '4px 10px',
            fontWeight: '400'
          }}
        />
      </div>
      <Title>여행 짐쌀 때 꿀팁</Title>
      <Content>
        무조건 가볍게 싸세요. 이게 필요한지 긴가민가한 것들은 그냥 필요할 때
        여행지에서 산다는 마인드로 가져가지 마세요.
      </Content>
      <BottomContainer>
        <UserBox>
          <div>박건상</div>
          <Dot>·</Dot>
          <div>1일전</div>
          <Dot>·</Dot>
          <div>조회수 102</div>
        </UserBox>
        <InfoContainer>
          <IconContainer>
            <Icon>
              <EmptyHeartIcon
                width={17.42}
                height={15.19}
                stroke={palette.비강조2}
              />
            </Icon>
            <span>2</span>
          </IconContainer>
          <IconContainer>
            <Icon>
              <CommentIcon
                size={15}
                stroke={palette.비강조2}
              />
            </Icon>
            <span>2</span>
          </IconContainer>
        </InfoContainer>
      </BottomContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  border-bottom: 1px solid ${palette.비강조4};
  padding: 11px 0 16px 0;
`

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
`
const Content = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  white-space: nowrap; //텍스트가 한 줄로 유지되도록 설정
  overflow: hidden;
  text-overflow: ellipsis; // 텍스트가 잘릴 때 줄임표(...)를 표시
  color: ${palette.비강조};
`

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
`

const UserBox = styled.div`
  display: flex;
  gap: 4px;

  color: ${palette.비강조2};
  font-size: 12px;
  text-align: center;
  line-height: 16.71px;
  font-weight: 400;
  flex: 1;
`
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`

const Dot = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.비강조3};
`

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${palette.비강조2};
  font-family: Pretendard;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.32px;

  gap: 8px;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

export default CommunityItem
