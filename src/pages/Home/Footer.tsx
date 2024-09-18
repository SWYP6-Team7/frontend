import { palette } from '@/styles/palette'
import styled from '@emotion/styled'

const Footer = () => {
  return (
    <Container>
      <Box>
        <Team>TEAM 모잉</Team>
        <Policy>
          <div>서비스이용약관</div>
          <div>개인정보처리방침</div>
        </Policy>
      </Box>
    </Container>
  )
}
export default Footer
const Box = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 54px;
`
const Container = styled.div`
  position: relative;
  height: 250px;
  background-color: ${palette.비강조4};
  display: flex;
  margin: 0px -24px;
`
const Team = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 16.8px;
  color: ${palette.기본};
  margin-bottom: 8px;
`
const Policy = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 16.8px;
  color: ${palette.비강조2};
  display: flex;
  justify-content: space-between;
  div:nth-child(1) {
    margin-right: 28px;
  }
`
