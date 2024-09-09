import styled from '@emotion/styled'

const RegisterGender = () => {
  return (
    <div>
      <GenderContainer>
        <StepContent>성별을 선택해주세요.</StepContent>
        <GenderImgContainer>
          <Male
            src="/img/defaultGender.png"
            alt=""
          />
          <Female
            src="/img/defaultGender.png"
            alt=""
          />
        </GenderImgContainer>
      </GenderContainer>
    </div>
  )
}

export default RegisterGender

const GenderContainer = styled.div`
  margin-top: 34px;
  width: 342px;
  height: 281px;
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
const Male = styled.img`
  margin-right: 34px;
`
const Female = styled.img``
