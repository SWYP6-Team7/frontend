import ApplyTripProfile from '@/components/ApplyTripProfile'
import Button from '@/components/Button'
import ButtonContainer from '@/components/ButtonContainer'
import TextareaField from '@/components/designSystem/input/TextareaField'
import useEnrollment from '@/hooks/enrollment/useEnrollment'
import useAuth from '@/hooks/user/useAuth'
import { authStore } from '@/store/client/authStore'
import { tripDetailStore } from '@/store/client/tripDetailStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import { FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ApplyTrip = () => {
  const [message, setMessage] = useState('')
  const { userId } = authStore()
  const { travelNumber } = useParams()
  const { setApplySuccess } = tripDetailStore()
  const { apply, applyMutation } = useEnrollment(Number(travelNumber))
  const navigate = useNavigate()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    try {
      if (Number.isNaN(Number(travelNumber))) {
        throw new Error('잘못된 경로입니다.')
      }
      // if (!userId) {
      //   throw new Error('로그인한 유저만 사용 가능합니다.')
      // }
      if (!message) {
        throw new Error('메세지는 비워둘 수 없습니다.')
      }
      if (message.length > 1000) {
        throw new Error('메제지는 1,000자 미만이여야 합니다.')
      }
      apply({ travelNumber: Number(travelNumber), message })
      if (applyMutation.isSuccess) {
        setApplySuccess(true)
        navigate(`/trip/detail/${travelNumber}`)
        setTimeout(() => {
          setApplySuccess(false)
        }, 3000)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container onSubmit={handleSubmit}>
      <ApplyTripProfile />
      <TextareaField
        placeholder="참가 신청 메세지를 적어주세요.
(최대 1,000자)"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <ButtonContainer>
        <Button
          text={'보내기'}
          disabled={message === '' || applyMutation.isPending}
          addStyle={
            message === ''
              ? {
                  backgroundColor: palette.비강조3,
                  color: palette.비강조,
                  boxShadow: '-2px 4px 5px 0px rgba(170, 170, 170, 0.1)'
                }
              : undefined
          }
        />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.form`
  margin-top: 2.5svh;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2.5svh;
`

export default ApplyTrip
