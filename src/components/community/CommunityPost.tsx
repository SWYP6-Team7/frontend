import styled from '@emotion/styled'
import Badge from '../designSystem/Badge'
import { palette } from '@/styles/palette'
import RoundedImage from '../designSystem/profile/RoundedImage'
import { daysAgo } from '@/utils/time'
import DetailImages from './DetailImages'
import SearchFilterTag from '../designSystem/tag/SearchFilterTag'
import CommunityHeartIcon from '../icons/CommunityHeartIcon'

const CommunityPost = () => {
  return (
    <PostWrapper>
      <MainContent>
        <BadgeContainer>
          <Badge
            isDueDate={false}
            text={'잡담'}
            height="22px"
            backgroundColor={palette.비강조4}
            color={palette.비강조}
            fontWeight="600"
          />
        </BadgeContainer>
        <ProfileContainer>
          {/* 프로필 */}
          <RoundedImage
            src={''}
            size={40}
          />
          <div css={{ marginLeft: '8px' }}>
            <UserName>{'김모잉'}</UserName>
            <div
              css={{
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '16.71px',
                color: palette.비강조
              }}>
              {daysAgo('2024-10-03 13:03')}
            </div>
          </div>
        </ProfileContainer>
        {/* 제목  */}
        <Title>{'가을되니까 놀러가고 싶다'}</Title>
        {/* 내용 */}
        <Details>{'가을조아'}</Details>
        {/*태그   */}
        <ImageContainer>
          <DetailImages
            images={[
              '/images/jeju.png',
              '/images/japan.png',
              '/images/seoul.png'
            ]}
          />
        </ImageContainer>
        <LikeContainer>
          <SearchFilterTag
            addStyle={{
              padding: '11px 16px',
              fontSize: '16px',
              backgroundColor: true ? palette.keycolorBG : palette.검색창,
              color: true ? palette.keycolor : palette.기본,
              border: true ? `1px solid ${palette.keycolor}` : 'none',
              borderRadius: '30px'
            }}
            icon={<CommunityHeartIcon />}
            text={'3'}
            idx={0}
          />
        </LikeContainer>
      </MainContent>
      <ViewsETC>
        <div>댓글 {2}</div>
        <div css={{ margin: '0px 4px' }}> · </div>
        <div>좋아요 {5}</div>
        <div css={{ margin: '0px 4px' }}> · </div>
        <div>조회수 {102}</div>
      </ViewsETC>
    </PostWrapper>
  )
}

const PostWrapper = styled.div`
  background-color: ${palette.BG};
  padding: 24px;

  top: 100px;
  left: 24px;
  gap: 32px;
  border-radius: 20px;
  box-shadow: 0px 2px 6px 3px rgba(170, 170, 170, 0.18);
`
const MainContent = styled.div``

const ViewsETC = styled.div`
  margin-top: 32px;
  border-top: 1px solid ${palette.비강조4};
  padding-top: 16px;
  display: flex;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  text-align: left;
  color: ${palette.비강조2};
`
const BadgeContainer = styled.div`
  display: flex;
`

const ProfileContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`
const Title = styled.div`
  margin-top: 3.8svh;
  font-size: 22px;
  font-weight: 600;
  line-height: 26.25px;
  text-align: left;
`
const Details = styled.div`
  margin-top: 1.9svh;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  text-align: left;
  color: ${palette.기본};
`

const ImageContainer = styled.div`
  margin-top: 3.8svh;
`
const UserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  text-align: left;
  color: ${palette.기본};
  margin-bottom: 4px;
`

const LikeContainer = styled.div`
  margin: 3.8svh 0;
`

export default CommunityPost
