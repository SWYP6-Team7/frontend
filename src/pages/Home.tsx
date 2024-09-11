import useAuth from '@/hooks/user/useAuth'
import useUser from '@/hooks/user/useUser'
import { authStore } from '@/store/client/authStore'
import React from 'react'

const Home = () => {
  const { user } = useUser()
  const { userId, accessToken } = authStore()
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
  }
  console.log(user, userId, accessToken)
  return (
    <div>
      <div>{JSON.stringify(user)}</div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  )
}

export default Home
