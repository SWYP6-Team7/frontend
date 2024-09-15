import styled from '@emotion/styled'
import Badge from './designSystem/Badge'
import Spacing from './Spacing'
import BoxLayoutTag from './BoxLayoutTag'

interface HorizonBoxProps {
  daysLeft: number
  title: string

  description: string
  userName: string
  daysAgo: number
  imgSrc?: string
  tags: string[]
}

const VerticalBoxLayout = ({
  daysLeft,
  title,

  description,
  userName,
  daysAgo,
  imgSrc = '',
  tags
}: HorizonBoxProps) => {
  const cutTagList = tags.length > 3 ? tags.slice(0, 2) : tags
  return (
    <Container>
      <Image src={imgSrc}>
        <BadgeContainer>
          <Badge daysLeft={daysLeft} />
        </BadgeContainer>
      </Image>
      <Spacing size={10} />
      <TextContainer>
        <Title>{title}</Title>
        <Spacing size={8} />
        <Description>{description}</Description>
        <Spacing size={7} />
        <Info>
          {userName}&nbsp;&#183;&nbsp;{daysAgo}일&nbsp;전
        </Info>
        <Spacing size={5} />
        <TagList>
          {cutTagList.map((text: string) => (
            <BoxLayoutTag
              key={text}
              text={text}
            />
          ))}
        </TagList>
      </TextContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;

  flex-direction: column;
  max-width: 180px;
  justify-content: center;
`

const Image = styled.div<{ src: string }>`
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 20px;
  background-image: url(${props => props.src});
  background-size: cover;
`
const BadgeContainer = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
`

const Title = styled.h4`
  font-weight: 700;
  font-size: 18px;
  line-height: 21.48px;
`

const Description = styled.p`
  font-size: 14px;
  color: #ababab;
  line-weight: 16.71px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TextContainer = styled.div`
  padding-left: 8px;
  padding-right: 5px;
`

const TagList = styled.div`
  display: flex;

  align-items: center;
`

const Info = styled.div`
  font-size: 14px;

  line-weight: 16.71px;
`

export default VerticalBoxLayout
