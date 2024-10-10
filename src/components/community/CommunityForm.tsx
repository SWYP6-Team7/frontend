import { useState } from 'react'
import ButtonContainer from '../ButtonContainer'
import Button from '../Button'
import Spacing from '../Spacing'
import AddImage from './AddImage'
import TextareaField from '../designSystem/input/TextareaField'
import CreateTripInputField from '../designSystem/input/CreateTripInputField'
import Select from '../designSystem/Select'
import styled from '@emotion/styled'

const LIST = ['잡담', '여행팁', '후기']

// create request body 타입 추가한 onclick props 추가 필요
// edit 일 경우 data props 추가 필요

const Communityform = () => {
  const [value, setValue] = useState<string>()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const changeValue = (element: string) => {
    setValue(element)
  }
  return (
    <Container>
      <Spacing size={8} />
      <Select
        noneValue="말머리"
        list={LIST}
        value={value}
        setValue={changeValue}
      />
      <Spacing size={'3.8svh'} />
      <CreateTripInputField
        value={title}
        placeholder="제목을 입력해주세요. (최대 20자)"
        isRemove={false}
        onChange={e => setTitle(e.target.value)}
      />
      <Spacing size={'3.8svh'} />
      <TextareaField
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="내용을 입력해주세요. (최대 2,000자)"
      />
      <Spacing size={'3.8svh'} />
      <AddImage />
      <ButtonContainer>
        <Button
          onClick={() => {}}
          disabled={title === '' || content === '' || !value}
          addStyle={
            title === '' || content === '' || !value || !value
              ? {
                  backgroundColor: 'rgba(220, 220, 220, 1)',
                  color: 'rgba(132, 132, 132, 1)',
                  boxShadow: '-2px 4px 5px 0px rgba(170, 170, 170, 0.1)'
                }
              : undefined
          }
          text={'완료'}
        />
      </ButtonContainer>
    </Container>
  )
}
const Container = styled.div`
  padding: 0 24px;
`

export default Communityform
