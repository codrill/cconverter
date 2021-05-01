import React from 'react'
import { render } from '@testing-library/react'

import { App } from './App'

describe('App', () => {
  test('it should render without crashing', () => {
    render(<App />)
  })
})
