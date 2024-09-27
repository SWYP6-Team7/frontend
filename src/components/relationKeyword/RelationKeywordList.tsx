import useRelationKeyword from '@/hooks/search/useRelationKeyword'
import styled from '@emotion/styled'
import RelationKeyword from './RelationKeyword'

interface RelationKeywordListProps {
  keyword: string
  onClick: (keyword: string) => void
}

const RelationKeywordList = ({
  keyword,
  onClick
}: RelationKeywordListProps) => {
  const { data, isLoading, error } = useRelationKeyword(keyword)

  if (isLoading) {
    return null
  }
  if (error) {
    return null
  }
  console.log(data)
  return (
    <Contianer>
      {data &&
        data.length > 0 &&
        data?.map(data => (
          <button
            css={{ display: 'block' }}
            key={data}
            onClick={() => onClick(data)}>
            <RelationKeyword
              keyword={keyword}
              data={data}
            />
          </button>
        ))}
    </Contianer>
  )
}

const Contianer = styled.div``

export default RelationKeywordList
