import styled from '@emotion/styled'
import Badge from './designSystem/Badge'
import PersonIcon from './icons/PersonIcon'
import BoxLayoutTag from './designSystem/tag/BoxLayoutTag'
import EmptyHeartIcon from './icons/EmptyHeartIcon'
import { palette } from '@/styles/palette'
interface HorizonBoxProps {
  daysLeft: number
  title: string
  recruits: number
  total: number
  description: string
  userName: string
  daysAgo: number
  imgSrc?: string // 이미지 없는 경우 대비.
  tags: string[]
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
  description,
  userName,
  daysAgo,
  imgSrc = '',
  tags
}: HorizonBoxProps) => {
  const cutTags = tags.length > 5 ? tags.slice(0, 4) : tags
  return (
    <HorizonBoxContainer>
      {/* <Thumbnail src={imgSrc}></Thumbnail> */}

      <PostInfo>
        <Badge
          text={'마감'}
          backgroundColor={'rgba(227, 239, 217, 1)'}
          color={`${palette.keycolor}`}
          daysLeft={daysLeft}
        />
        <div>
          <TitleBox>
            <Title>{title}</Title>
            <RecruitingBox>
              <div>
                <PersonIcon stroke={`${palette.비강조}`} />
              </div>
              <Recruiting>
                {recruits}/{total}
              </Recruiting>
            </RecruitingBox>
          </TitleBox>
          {/* <Description>{description}</Description> */}
          <UserBox>
            <UserName>{userName}</UserName>
            <div css={{ fontWeight: 500, fontSize: '14px' }}>·</div>
            <div css={{ fontSize: '14px', fontWeight: 40 }}>{daysAgo}일전</div>
          </UserBox>
        </div>
        <Tags>
          {cutTags.map((text: string, idx) => (
            <BoxLayoutTag text={text} />
          ))}
        </Tags>
      </PostInfo>
      <button>
        <EmptyHeartIcon
          width={24}
          height={21.4}
          stroke={`${palette.비강조3}`}
        />
      </button>
    </HorizonBoxContainer>
  )
}

const HorizonBoxContainer = styled.div`
  width: 100%;
  /* height: 120px; */
  display: flex;
  justify-content: space-between;
`
const TitleBox = styled.div`
  margin-top: 8px;
  display: flex;
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
const Recruiting = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: ${palette.비강조};
  padding-left: 1.6px;
`
const PostInfo = styled.div`
  width: 65%;
`
const UserBox = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
`
const UserName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: rgba(98, 98, 98, 1);
`
const Tags = styled.div`
  display: flex;
  justify-content: space-betweens;
`
export default HorizonBoxLayout
