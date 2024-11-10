import styled from '@emotion/styled'
import BackIcon from './icons/BackIcon'
import { useNavigate, useLocation } from 'react-router-dom'
import TripDetailHeader from '@/pages/TripDetail/TripDetailHeader'
import AlarmIcon from './icons/AlarmIcon'
import { palette } from '@/styles/palette'

import CommunityHeader from './community/CommunityHeader'
import { userStore } from '@/store/client/userStore'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isRegister = location.pathname.startsWith('/register')
  const isCreateTrip = location.pathname.startsWith('/createTrip')
  const isSearchTravel = location.pathname === '/search/travel'
  const isSearchCommunity = location.pathname === '/search/community'
  const isTripDetail = location.pathname.startsWith('/trip/detail')
  const isTripEnrollment = location.pathname.startsWith('/trip/enrollmentList')
  const isNotification = location.pathname.startsWith('/notification')
  const isTripDetailEdit = location.pathname.startsWith('/trip/edit')
  const isMyTrip = location.pathname.startsWith('/myTrip')
  const isCommunityCreate = location.pathname.startsWith('/community/create')
  const isApply = location.pathname.startsWith('/trip/apply')
  const isMyPage = location.pathname.startsWith('/myPage')
  const isEditMyInfo = location.pathname.startsWith('/editMyInfo')
  const isEditMyName = location.pathname.startsWith('/editMyName')
  const isTripComment = location.pathname.startsWith('/trip/comment')
  const isCommunityDetail = location.pathname.startsWith('/community/detail')
  const isCommunityEdit = location.pathname.startsWith('/community/edit')
  const isEditMyPassword = location.pathname.startsWith('/editMyPassword')
  const isEditMyTag = location.pathname.startsWith('/editMyTag')
  const isWithdrawal = location.pathname.startsWith('/withdrawal')
  const isAnnouncement = location.pathname.startsWith('/announcement')
  const isRequestedTrip = location.pathname.startsWith('/requestedTrip')
  const isRegisterGender = location.pathname.startsWith(
    '/registerAge/registerGender'
  )
  const isRegisterAge = location.pathname.startsWith('/registerAge')
  const isRegisterForm = location.pathname.startsWith('/registerForm')
  const isRegisterName = location.pathname.startsWith('/registerName')

  const {
    resetAge,
    resetForm,
    resetGender,
    resetName,
    socialLogin,
    setSocialLogin
  } = userStore()

  const isSocialLoginGoogle = socialLogin === 'google'
  const isSocialLoginKakao = socialLogin === 'kakao'

  const handleBack = () => {
    if (isTripDetail) {
      navigate(-1)
      return
    }
    if (isSearchTravel || isSearchCommunity) {
      navigate('/')
      return
    }
    if (isCommunityDetail) {
      navigate('/community')
      return
    }
    if (isSocialLoginGoogle) {
      if (isRegisterAge) {
        resetAge()
        navigate('/login')
        setSocialLogin(null)
        return
      }
      if (isRegisterGender) {
        resetGender()
        navigate(-1)
        return
      }
      navigate(-1)
      return
    }
    if (isSocialLoginKakao) {
      if (isRegisterAge) {
        resetAge()
        navigate('/registerForm')
        return
      }
      if (isRegisterGender) {
        resetGender()
        navigate(-1)
        return
      }
      if (isRegisterForm) {
        navigate('/login')
        resetForm()
        setSocialLogin(null)
        return
      }

      navigate(-1)

      return
    }
    if (isRegisterForm) {
      resetForm()
    } else if (isRegisterName) {
      resetName()
    } else if (isRegisterAge) {
      resetAge()
    } else if (isRegisterGender) {
      resetGender()
    }

    if (isEditMyInfo) {
      navigate('/myPage')
      return
    }
    navigate(-1)
    return
  }
  return (
    <HeaderContainer>
      {isMyTrip ? (
        <Title>내 여행</Title>
      ) : isMyPage ? (
        <Title>마이 페이지</Title>
      ) : (
        <ButotnContainer onClick={handleBack}>
          <BackIcon />
        </ButotnContainer>
      )}

      <Title>
        {isRegister && '회원가입'}
        {isSearchTravel && '여행검색'}
        {isSearchCommunity && '검색'}
        {isCreateTrip && '여행 만들기'}
        {isApply && '참가 신청'}
        {isTripEnrollment && '참가 신청 목록'}
        {isTripComment && '멤버 댓글'}
        {isNotification && '알림'}
        {isEditMyInfo && '내 정보 수정'}
        {isEditMyName && '이름 변경'}
        {isCommunityCreate && '글쓰기'}
        {isCommunityEdit && '수정하기'}
        {isEditMyPassword && '비밀번호 변경'}
        {isEditMyTag && '태그 수정'}
        {isWithdrawal && '탈퇴하기'}
        {isAnnouncement && '공지사항'}
        {isRequestedTrip && '참가 신청한 여행'}
        {isTripDetailEdit && (
            <TripDetailHeader isTripDetailEdit={isTripDetailEdit} />
          ) &&
          '게시글 수정'}
      </Title>
      {location.pathname == '/registerTripStyle' && (
        <Skip onClick={() => navigate('/')}>건너뛰기</Skip>
      )}
      {location.pathname != '/registerTripStyle' && <VoidArea />}
      {isTripDetail && <TripDetailHeader />}
      {isCommunityDetail && <CommunityHeader />}
      {(isMyTrip || isMyPage) && (
        <div onClick={() => navigate(`/notification`)}>
          <AlarmIcon
            size={23}
            stroke={palette.기본}
          />
        </div>
      )}
    </HeaderContainer>
  )
}

// button에 cursor pointer 추가
const ButotnContainer = styled.button`
  cursor: pointer;
`

// header container
// 상단 헤더 스타일
const HeaderContainer = styled.header`
  width: 100%;
  height: 68px;
  padding: 20px 24px;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px; // 헤더 높이 100px.
`

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  line-height: 23.87px;
`

// 레이아웃을 맞추기 위한 빈 공간 할당
const VoidArea = styled.div`
  size: 24px;
`
// skip
const Skip = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: rgba(155, 155, 155, 1);
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`
export default Header
