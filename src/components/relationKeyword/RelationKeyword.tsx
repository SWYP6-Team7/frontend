import styled from '@emotion/styled'
import SearchIcon from '../icons/SearchIcon'
import RelationSearchIcon from '../icons/RelationSearchIcon'
import { splitByKeyword } from '@/utils/search'
import { palette } from '@/styles/palette'

interface RelationKeyowrdProps {
  data: string
  keyword: string
}

const RelationKeyword = ({ data, keyword }: RelationKeyowrdProps) => {
  const matchingKeyword = splitByKeyword(keyword, data)
  return (
    <Container>
      <RelationSearchIcon />
      <span>
        {matchingKeyword.map((value, idx) => (
          <Keyword
            key={idx}
            match={value.match}>
            {value.str}
          </Keyword>
        ))}
      </span>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 4px;
`

const Keyword = styled.span<{ match: boolean }>`
  font-size: 16px;
  color: ${props => (props.match ? palette.keycolor : palette.기본)};
  font-weight: ${props => (props.match ? 700 : 500)};
  line-height: 19.09px;
`

export default RelationKeyword
