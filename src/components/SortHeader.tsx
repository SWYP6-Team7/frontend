import styled from '@emotion/styled'
import React, { useState } from 'react'
import SortIcon from './icons/SortIcon'
import { searchStore } from '@/store/client/searchStore'
import BottomModal from './BottomModal'
import Spacing from './Spacing'

interface SortHeaderProps {
  list: string[]
  sort: string
  clickSort: (value: any) => void
  totalElements: number
  setFixed?: (bool: boolean) => void
}

const SortHeader = ({
  list,
  clickSort,
  sort,
  setFixed,
  totalElements
}: SortHeaderProps) => {
  const [showModal, setShowModal] = useState(false)
  const handleSort = (value: (typeof list)[number]) => {
    clickSort(value as (typeof list)[number])
    setShowModal(false)
  }
  const handleShowModal = (type: boolean) => {
    setShowModal(type)
    if (setFixed) {
      setFixed(!type)
    }
  }
  return (
    <>
      {showModal && (
        <BottomModal
          initialHeight={40}
          closeModal={() => handleShowModal(false)}>
          <SortContainer>
            <Spacing size={24} />
            {list.map(value => (
              <SortButton
                selected={sort === value}
                onClick={() => handleSort(value)}
                key={value}>
                <span>{value}</span>
                {sort === value && (
                  <svg
                    css={{ paddingRight: 6 }}
                    width="21"
                    height="16"
                    viewBox="0 0 21 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2 8L8.375 14L19 2"
                      stroke="#3E8D00"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </SortButton>
            ))}
            <Spacing size={66} />
          </SortContainer>
        </BottomModal>
      )}
      <Header>
        <CountContainer>
          총&nbsp;<Count>{totalElements}건</Count>
        </CountContainer>
        <ShowSortButton onClick={() => handleShowModal(true)}>
          <SortIcon />
          {sort}
        </ShowSortButton>
      </Header>
    </>
  )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 17px;
`

const ShowSortButton = styled.div`
  display: flex;
  cursor: pointer;
  gap: 4px;
  align-items: center;
`

const SortButton = styled.button<{ selected: boolean }>`
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
  width: 100%;
  color: ${props => (props.selected ? 'rgb(62,141,0)' : 'black')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid rgba(240, 240, 240, 1);
`
const CountContainer = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  letter-spacing: -0.025em;
`
const SortContainer = styled.div`
  padding: 0 20px;
`

const Count = styled.span`
  color: #3e8d00;
  font-weight: 700;
`

export default SortHeader
