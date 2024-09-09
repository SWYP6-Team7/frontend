import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { userStore } from '@/store/userStore'

interface ContextType {
  setGenderCheck: React.Dispatch<React.SetStateAction<boolean>>
  isVisible: boolean
}

const RegisterGender = () => {
  // Outlet으로 렌더링 될 하위 컴포넌트에 Props로 성별 선택확인 변수 전달.
  const { setGenderCheck } = useOutletContext<ContextType>()
  const { sex, addSex } = userStore()
  const [maleClicked, setMaleClicked] = useState(sex == '남자' ? true : false)
  const [femaleClicked, setFemaleClicked] = useState(
    sex == '여자' ? true : false
  )

  const clickedMale = () => {
    if (!maleClicked) {
      setMaleClicked(true)
      setFemaleClicked(false)
      setGenderCheck(true)
      addSex('남자')
    }
  }
  const clickedFemale = () => {
    if (!femaleClicked) {
      setFemaleClicked(true)
      setMaleClicked(false)
      setGenderCheck(true)
      addSex('여자')
    }
  }
  // 이전 화면으로 돌아왔을 때, 이미 체크 했다면, true값을 할당해주기.
  useEffect(() => {
    if (!maleClicked && !femaleClicked) setGenderCheck(false)
    else setGenderCheck(true)
  }, [])
  return (
    <div css={{ position: 'relative' }}>
      <GenderContainer>
        <StepContent>성별을 선택해주세요.</StepContent>
        <GenderImgContainer>
          <MaleBox>
            <Male
              onClick={clickedMale}
              src={
                maleClicked
                  ? '/images/activeMale.png'
                  : '/images/defaultGender.png'
              }
              alt=""
            />
            <p
              css={
                maleClicked
                  ? { color: 'black' }
                  : { color: 'rgba(171, 171, 171, 1)' }
              }>
              남자
            </p>
          </MaleBox>
          <FemaleBox>
            <Female
              onClick={clickedFemale}
              src={
                femaleClicked
                  ? '/images/activeFemale.png'
                  : '/images/defaultGender.png'
              }
              alt=""
            />
            <p
              css={
                femaleClicked
                  ? { color: 'black' }
                  : { color: 'rgba(171, 171, 171, 1)' }
              }>
              여자
            </p>
          </FemaleBox>
        </GenderImgContainer>
      </GenderContainer>
    </div>
  )
}

export default RegisterGender

const fadeIn = keyframes`
  0% {
      opacity: 0;
      transform: translate3d(0, 20%, 0);
  }
  to {
      opacity: 1;
      transform: translateZ(10);
  }
`
const GenderContainer = styled.div`
  width: 342px;
  height: 281px;
  margin-top: 34px;
  animation: ${fadeIn} 0.5s;
`
const StepContent = styled.p`
  font-size: 24px;
  font-weight: 600;

  text-align: left;
`
const GenderImgContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`
const MaleBox = styled.div`
  margin-right: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-top: 18px;
    font-size: 18px;
    font-weight: 500;
  }
`
const FemaleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-top: 18px;
    font-size: 18px;
    font-weight: 500;
  }
`

const Male = styled.img`
  width: 102px;
  height: 102px;
`
const Female = styled.img`
  width: 102px;
  height: 102px;
`
