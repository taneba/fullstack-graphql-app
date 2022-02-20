import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import { graphql } from 'msw'
import React from 'react'

import {
  GetTodosDocument,
  SaveTodoDocument,
  SaveTodoMutationVariables,
} from '~/generated/graphql'
import { testRenderer } from '~/utils/test-util'

import Todos from './index.page'

describe('Todos Page', () => {
  const renderPage = testRenderer(<Todos />)

  it('displays fetched todo list', async () => {
    renderPage()
    const target = await screen.findAllByRole('todo')
    expect(target.length).toBe(2)
  })

  it('displays "No Items" when there is no todo', async () => {
    renderPage(
      graphql.query(GetTodosDocument, (req, res, ctx) =>
        res.once(
          ctx.data({
            todosByCurrentUser: [],
          })
        )
      )
    )
    const target = await screen.findByText('No Items')
    expect(target).toBeInTheDocument()
  })

  it('opens CreateTodoModal when click "New Todo" button', async () => {
    renderPage()
    const button = await screen.findByText('New Todo')
    fireEvent.click(button)
    const modal = await screen.findByRole('dialog')
    expect(modal).toBeInTheDocument()
  })

  describe('CreateTodoModal', () => {
    it('should create todo', async () => {
      // mock mutation
      const mutationInterceptor = jest.fn()
      renderPage(
        graphql.mutation(SaveTodoDocument, (req, res, ctx) => {
          mutationInterceptor(req.variables)
          return res.once(
            ctx.data({
              saveTodo: {
                __typename: 'Todo',
                id: '1',
              },
            })
          )
        })
      )
      // act
      const button = await screen.findByText('New Todo')
      fireEvent.click(button)
      const modal = await screen.findByRole('dialog')
      expect(modal).toBeInTheDocument()
      const input = within(modal).getByLabelText('title')
      fireEvent.change(input, { target: { value: 'test' } })
      const submitButton = within(modal).getByText('Submit')
      fireEvent.click(submitButton)
      // assert
      await waitFor(() =>
        expect(mutationInterceptor).toHaveBeenCalledWith({
          todo: {
            title: 'test',
          },
        } as SaveTodoMutationVariables)
      )
    })
  })
})
