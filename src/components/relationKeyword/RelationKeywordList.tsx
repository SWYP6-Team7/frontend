import useRelationKeyword from '@/hooks/search/useRelationKeyword'
import styled from '@emotion/styled'
import RelationKeyword from './RelationKeyword'

interface RelationKeywordListProps {
  keyword: string
}

const RelationKeywordList = ({ keyword }: RelationKeywordListProps) => {
  const { data, isLoading } = useRelationKeyword(keyword)
  if (isLoading) {
    return null
  }
  return (
    <Contianer>
      {data &&
        data.length > 0 &&
        data.map(data => (
          <RelationKeyword
            keyword={keyword}
            key={data}
            data={data}
          />
        ))}
    </Contianer>
  )
}

const Contianer = styled.div``

export default RelationKeywordList
