'use client'
import ApplyTripProfile from '@/components/ApplyTripProfile'
import Button from '@/components/designSystem/Buttons/Button'
import ButtonContainer from '@/components/ButtonContainer'
import TextareaField from '@/components/designSystem/input/TextareaField'
import useEnrollment from '@/hooks/enrollment/useEnrollment'
import { authStore } from '@/store/client/authStore'
import { tripDetailStore } from '@/store/client/tripDetailStore'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import { FormEvent, useEffect, useState } from 'react'
import useViewTransition from '@/hooks/useViewTransition'
import { useParams, useRouter } from 'next/navigation'

const ApplyTrip = () => {
  const [message, setMessage] = useState('')
  const { userId } = authStore()
  const params = useParams()

  const travelNumber = params?.travelNumber as string
  const { setApplySuccess } = tripDetailStore()
  const { apply, applyMutation } = useEnrollment(Number(travelNumber))
  const router = useRouter()
  const navigateWithTransition = useViewTransition()
  const handleSubmit = async () => {
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
      await apply({ travelNumber: Number(travelNumber), message })
      console.log(applyMutation, 'applyMutation')
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (applyMutation.isSuccess) {
      setApplySuccess(true)
      document.documentElement.style.viewTransitionName = 'forward'
      navigateWithTransition(`/trip/detail/${travelNumber}`)
    }
  }, [applyMutation.isSuccess, setApplySuccess, travelNumber])

  return (
    <Container>
      <ApplyTripProfile />
      <TextareaField
        placeholder="참가 신청 메세지를 적어주세요.
(최대 1,000자)"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <ButtonContainer>
        <Button
          onClick={handleSubmit}
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

const Container = styled.div`
  margin-top: 2.5svh;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2.5svh;
`

export default ApplyTrip
