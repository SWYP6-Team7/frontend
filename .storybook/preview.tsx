import type { Preview } from '@storybook/react'
import { Global } from '@emotion/react'
import React from 'react'
import globalStyles from '../src/styles/globalStyle'
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    Story => {
      return (
        <>
          <Global styles={globalStyles} />
          <Story />
        </>
      )
    }
  ]
}

export default preview
