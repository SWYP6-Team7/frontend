import XIcon from '@/components/icons/XIcon'
import styled from '@emotion/styled'

const RemoveButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <XIconButton
      type="button"
      onClick={onClick}>
      <XIcon />
    </XIconButton>
  )
}
const XIconButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-items: center;
  align-items: center;
`

export default RemoveButton
