import styled from '@emotion/styled'
import Badge from './designSystem/Badge'
import PersonIcon from './icons/PersonIcon'
import BoxLayoutTag from './designSystem/tag/BoxLayoutTag'
import EmptyHeartIcon from './icons/EmptyHeartIcon'
import { palette } from '@/styles/palette'
import PlaceIcon from './icons/PlaceIcon'
interface HorizonBoxProps {
  daysLeft: number
  title: string
  recruits: number
  total: number
  location?: string
  userName: string
  daysAgo: number
  imgSrc?: string // 이미지 없는 경우 대비.
  tags: string[]
  showTag?: boolean
  isBar?: boolean
  bookmarkPosition?: 'top' | 'middle'
}
// 사용 방식
{
  /* <HorizonBoxLayout
        daysLeft={40}
        title="먹고죽는 유럽여행"
        recruits={2}
        total={5}
        imgSrc="/경로"
        description="바게트만 부시는 테마 여행 갈사람 여기..."
        userName="김모잉"
        daysAgo={3}
        tags={array}
      /> */
}

const HorizonBoxLayout = ({
  daysLeft,
  title,
  recruits,
  total,
  location = '',
  userName,
  daysAgo,
  imgSrc = '',
  isBar = false,
  showTag = true,
  bookmarkPosition = 'top',
  tags
}: HorizonBoxProps) => {
  const cutTags = tags.length > 2 ? tags.slice(0, 2) : tags
  return (
    <HorizonBoxContainer>
      {/* <Thumbnail src={imgSrc}></Thumbnail> */}

      <PostInfo>
        <TopContainer>
          <Badge
            text={'마감'}
            backgroundColor={'rgba(227, 239, 217, 1)'}
            color={`${palette.keycolor}`}
            daysLeft={daysLeft}
          />
          {bookmarkPosition === 'top' && <BookmarkButton />}
        </TopContainer>
        <div>
          <TitleBox>
            <Title>{title}</Title>
            {bookmarkPosition === 'middle' && <BookmarkButton />}
          </TitleBox>
          {/* <Description>{description}</Description> */}
          <UserBox>
            <UserName>{userName}</UserName>
            <Dot>·</Dot>
            <RecruitingBox>
              <div>
                <PersonIcon stroke={`${palette.비강조}`} />
              </div>
              <Recruiting>
                {recruits}/{total}
              </Recruiting>
            </RecruitingBox>
            <Dot>·</Dot>
            <div>{daysAgo}일전</div>
          </UserBox>
        </div>
        {isBar && <Bar />}
        {showTag && (
          <Tags>
            <BoxLayoutTag
              text={
                <div>
                  <PlaceIcon
                    height={12}
                    width={10}
                  />
                  &nbsp;{location}
                </div>
              }
            />
            {cutTags.map((text: string, idx) => (
              <BoxLayoutTag text={text} />
            ))}
            {tags.length > cutTags.length ? (
              <BoxLayoutTag
                addStyle={{
                  backgroundColor: `${palette.비강조4}`,
                  padding: '4px 6px 4px 6px',
                  color: `${palette.비강조}`,
                  height: '22px',
                  borderRadius: '20px',
                  fontSize: '12px'
                }}
                text={`+${tags.length - cutTags.length}`}
              />
            ) : null}
          </Tags>
        )}
      </PostInfo>
    </HorizonBoxContainer>
  )
}

const BookmarkButton = () => {
  return (
    <button>
      <EmptyHeartIcon
        width={24}
        height={21.4}
        stroke={`${palette.비강조3}`}
      />
    </button>
  )
}

const Bar = styled.div`
  margin-bottom: 8px;
  width: 100%;
  height: 1px;
  background-color: ${palette.비강조4};
`

const HorizonBoxContainer = styled.div`
  width: 100%;
  /* height: 120px; */
`
const TitleBox = styled.div`
  margin-top: 8px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`
const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-right: 8px;
  line-height: 21.48px;
`

const Description = styled.div`
  font-size: 14px;
  font-weight: 400;

  color: rgba(132, 132, 132, 1);
  white-space: nowrap; //텍스트가 한 줄로 유지되도록 설정
  overflow: hidden;
  text-overflow: ellipsis; // 텍스트가 잘릴 때 줄임표(...)를 표시
  margin-bottom: 4px;
  line-height: 16.71px;
`

const Dot = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${palette.비강조3};
`

const Thumbnail = styled.div<{ src: string }>`
  margin-right: 12px;
  width: 100%;
  max-width: 120px;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  position: relative;

  border-radius: 20px;
  background-image: url(${props => props.src});
  background-color: ${props =>
    props.src === '' ? 'rgba(217, 217, 217, 1)' : 'inherit'};
  background-size: cover;
`
const RecruitingBox = styled.div`
  display: flex;
  justify-content: center;

  align-items: center;
`

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const Recruiting = styled.div`
  padding-left: 1.6px;
`
const PostInfo = styled.div`
  width: 100%;
`
const UserBox = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
  color: ${palette.비강조};
  font-size: 12px;
  text-align: center;
  line-height: 16.71px;
  font-weight: 400;
`
const UserName = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;

  color: ${palette.기본};
`
const Tags = styled.div`
  display: flex;
  justify-content: space-betweens;
`
export default HorizonBoxLayout
