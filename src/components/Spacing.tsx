import styled from '@emotion/styled'

type SpacingProps = {
  size: number | string
  direction?: 'vertical' | 'horizontal'
}

// direction: 수직, 수평
// size: number로 들어오면 px로 적용하고 그 외 규격 같은 경우 string으로 받게 함
const Spacing = styled.div<SpacingProps>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical'
      ? `height: ${typeof size === 'string' ? size : `${size}px`};`
      : `width: ${typeof size === 'string' ? size : `${size}px`};`}
`
export default Spacing
