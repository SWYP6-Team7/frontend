import styled from '@emotion/styled'

type SpacingProps = {
  size: number | string
  direction?: 'vertical' | 'horizontal'
}

const Spacing = styled.div<SpacingProps>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical'
      ? `height: ${typeof size === 'string' ? size : `${size}px`};`
      : `width: ${typeof size === 'string' ? size : `${size}px`};`}
`
export default Spacing
