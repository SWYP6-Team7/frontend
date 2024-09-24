import styled from '@emotion/styled'
import SearchIcon from '../icons/SearchIcon'

interface RelationKeyowrdProps {
  data: string
}

const RelationKeyword = ({ data }: RelationKeyowrdProps) => {
  return (
    <Container>
      <SearchIcon />
      <span>{data}</span>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 4px;
  font-size: 16px;
  font-weight: 500;
  line-height: 19.09px;

  text-align: left;
`

export default RelationKeyword
