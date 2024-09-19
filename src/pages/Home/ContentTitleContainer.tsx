import styled from '@emotion/styled'
import ArrowIcon from '@/components/icons/ArrowIcon'
import { useNavigate } from 'react-router-dom'
interface TitleContainerProps {
  text: React.ReactNode
  minWidth?: string
  detailLink?: string
}
const TitleContainer = ({
  text,
  minWidth = 'auto',
  detailLink = '/'
}: TitleContainerProps) => {
  const navigate = useNavigate()
  const clickHandler = () => navigate(`${detailLink}`) // 후에 보여줄 페이지 부분.
  return (
    <ContentTitle>
      <span css={{ minWidth }}>{text}</span>
      <More onClick={clickHandler}>
        <ArrowIcon />
      </More>
    </ContentTitle>
  )
}
export default TitleContainer
const ContentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 22px;
    font-weight: 600;
    line-height: 30.8px;

    text-align: left;
  }
`
const More = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`
