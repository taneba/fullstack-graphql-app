import { screen } from '@testing-library/react'
import React from 'react'
import { testRenderer } from 'src/utils/test-util'
import Todos from './index.page'

describe('Todos Page', () => {
  const renderPage = testRenderer(<Todos />)

  it('displays fetched todo list', async () => {
    renderPage()
    const target = await screen.findAllByRole('todo')
    expect(target.length).toBe(2)
  })
})
