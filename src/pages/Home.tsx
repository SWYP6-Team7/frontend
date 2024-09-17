import Select from '@/components/designSystem/Select'
import Spacing from '@/components/Spacing'
import VerticalBoxLayout from '@/components/VerticalBoxLayout'
import useAuth from '@/hooks/user/useAuth'
import useUser from '@/hooks/user/useUser'
import { authStore } from '@/store/client/authStore'
import React, { ChangeEvent, useState } from 'react'

const ARRAY = ['일본', '단기', '여유', '힐링']

const Home = () => {
  const { user } = useUser()
  const { userId, accessToken } = authStore()
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
      <Spacing size={40} />
      <VerticalBoxLayout
        daysLeft={40}
        title="먹고죽는 유럽여행"
        imgSrc="https://cdn.pixabay.com/photo/2015/03/12/04/43/landscape-669619_1280.jpg"
        description="바게트만 부시는 테마 여행 갈사람 여기..."
        userName="김모잉"
        daysAgo={3}
        tags={ARRAY}
      />
    </div>
  )
}

export default Home
