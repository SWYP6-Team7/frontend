import Spacing from '@/components/Spacing'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from './Home/Navbar'
import SortHeader from '@/components/SortHeader'
import CommunityInfinite from '@/components/community/CommunityInfinite'
import ResultToast from '@/components/designSystem/toastMessage/resultToast'
import { editStore } from '@/store/client/editStore'
import { COMMUNITY_TOAST_MESSAGES } from '@/constants/toastMessages'
import useCommunity from '@/hooks/useCommunity'
import { isGuestUser } from '@/utils/user'
import LoginButtonForGuest from '@/components/LoginButtonForGuest'
import RoundedImage from '@/components/designSystem/profile/RoundedImage'

const LIST = ['최신순', '추천순', '등록일순']
const MyCommunity = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [fixed, setFixed] = useState(true)
  const sort = searchParams.get('sortingTypeName') ?? '최신순'
  const categoryName = searchParams.get('categoryName') ?? '전체'
  const {
    communityList: { data }
  } = useCommunity(
    undefined,
    {
      sortingTypeName: sort,
      categoryName: categoryName
    },
    true
  )

  const { setRemoveToastShow, removeToastShow } = editStore()
  const onClickSort = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('sortingTypeName', value)

    setSearchParams(newSearchParams)
  }

  const handleFixed = (type: boolean) => {
    setFixed(type)
  }

  return (
    <>
      <ResultToast
        bottom="80px"
        isShow={removeToastShow}
        setIsShow={setRemoveToastShow}
        text={COMMUNITY_TOAST_MESSAGES.deletePost}
      />
      <div>
        {isGuestUser() ? (
          <Container isNodata={true}>
            <Empty>
              <RoundedImage
                size={80}
                src="/images/noData.png"
              />
              <NoData
                css={{
                  marginTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>
                <>
                  <div>로그인 후 이용할 수 있어요</div>
                  <LoginButtonForGuest />
                </>
              </NoData>
            </Empty>
          </Container>
        ) : (
          <>
            <Spacing size={24} />
            <SortContainer>
              <SortHeader
                list={LIST}
                clickSort={onClickSort}
                setFixed={handleFixed}
                sort={sort}>
                <CountContainer>
                  총&nbsp;
                  <Count>{data?.pages[0].page.totalElements ?? 0}건</Count>
                </CountContainer>
              </SortHeader>
            </SortContainer>
            <CommunityInfinite isMine={true} />
          </>
        )}
      </div>
      <Navbar />
    </>
  )
}

const CountContainer = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  letter-spacing: -0.025em;
`

const Count = styled.span`
  color: #3e8d00;
  font-weight: 700;
`

const SortContainer = styled.div`
  padding: 0 24px;
  padding-bottom: 11px;
  border-bottom: 1px solid rgb(240, 240, 240);
  position: sticky;
  top: 100px;
  z-index: 1001;
  background-color: ${palette.BG};
  box-sizing: border-box;
`

const Container = styled.div<{ isNodata: boolean | undefined }>`
  padding: 0 24px;
  position: relative;
  display: ${props => (props.isNodata ? 'flex' : 'auto')};
  justify-content: center;
  align-items: center;
`

const NoData = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 22.4px;
  letter-spacing: -0.025em;
  text-align: center;
  color: ${palette.기본};
`
const Empty = styled.div`
  position: fixed;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100svh;
`

export default MyCommunity
