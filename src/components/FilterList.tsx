import styled from '@emotion/styled'
import React, { useState } from 'react'
import SelectArrow from './icons/SelectArrow'
import Accordion from './Accordion'
import BottomModal from './BottomModal'
import SearchFilterTag from './designSystem/tag/SearchFilterTag'


const FILTER_LIST = [
  { title: '장소', tags: ['국내', '해외'] },
  { title: '인원', tags: ['2인', '3인', '4인', '5인 이상'] },
  { title: '기간', tags: ['일주일 이하', '1~4주', '한달 이상'] },
  {
    title: '스타일',
    tags: ['여유', '도시', '액티비티', '전통', '가성비', '태그', '태그', '태그']
  }
]

const FilterList = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {showModal && (
        <BottomModal closeModal={() => setShowModal(false)}>
          {FILTER_LIST.map(item => (
            <Accordion
              id={item.title}
              title={item.title}
              initialChecked={false}
              key={item.title}>
              <TagContainer>
                {item.tags?.map((tag, idx) => (
                  <SearchFilterTag
                  
                    key={tag}
                    idx={idx}
                    text={tag}
                  />
                ))}
              </TagContainer>
            </Accordion>
          ))}
        </BottomModal>
      )}
      <Container>
        {FILTER_LIST.map(filter => (
          <FilterContainer
            onClick={() => setShowModal(true)}
            key={filter.title}>
            <div>{filter.title}</div>
            <SelectArrow />
          </FilterContainer>
        ))}
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`

const FilterContainer = styled.button`
  transition: 0.2s ease-in-out;

  border-radius: 15px;
  background: #ffffff;
  border: 1px solid #ababab;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background-color: white;
`

export default FilterList
