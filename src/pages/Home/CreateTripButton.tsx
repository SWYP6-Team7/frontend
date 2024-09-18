import AddIcon from '@/components/icons/AddIcon'
import { palette } from '@/styles/palette'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateTripButton() {
  const [isClicked, setIsClicked] = useState(false)
  const addRef = useRef<HTMLButtonElement>(null) // 버튼 참조
  const createButtonRef = useRef<HTMLButtonElement>(null) // 버튼 참조
  const toggleRotation = () => {
    setIsClicked(!isClicked)
  }
  const navigate = useNavigate()
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 만약 클릭한 곳이 버튼이 아닌 경우
      if (
        createButtonRef.current &&
        !createButtonRef.current.contains(event.target as Node) &&
        addRef.current &&
        !addRef.current.contains(event.target as Node)
      ) {
        setIsClicked(false) // 상태를 false로 변경
      }
    }

    // 문서에 click 이벤트를 등록
    document.addEventListener('click', handleClickOutside)

    // cleanup 함수: 이벤트 해제
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  return (
    <CreatedTripWrapper>
      {isClicked && (
        <CreateBtn
          onClick={() => navigate('/createTrip')}
          ref={createButtonRef}>
          <img
            src="/images/createTripBtn.png"
            alt=""
            css={{ marginRight: '13px' }}
          />
          여행 만들기
        </CreateBtn>
      )}

      <IconContainer
        ref={addRef}
        onClick={toggleRotation}
        rotated={isClicked}>
        <AddIcon />
      </IconContainer>
      {isClicked && <Hide></Hide>}
    </CreatedTripWrapper>
  )
}
const Hide = styled.div`
  position: fixed;
  width: 100%;
  height: 100svh;
  z-index: 1001;
  top: 0;
  background-color: rgba(26, 26, 26, 0.3);
  opacity: 0.8;
`
const CreatedTripWrapper = styled.div``
const CreateBtn = styled.button`
  position: fixed;
  bottom: 210px;
  right: 24px;

  height: 48px;
  padding: 14px 24px;
  border-radius: 20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  color: ${palette.기본};
  z-index: 1003;
`
const IconContainer = styled.button<{ rotated: boolean }>`
  position: fixed;
  right: 24px;
  bottom: 124px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${palette.keycolor};
  z-index: 1003;
  font-size: 32px;
  transition: transform 0.3s ease; /* 회전 애니메이션 */
  transform: ${props => (props.rotated ? 'rotate(45deg)' : 'rotate(0deg)')};
`
