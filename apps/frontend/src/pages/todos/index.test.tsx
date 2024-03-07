import {
  act,
  cleanup,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql, HttpResponse } from 'msw'
import React from 'react'

import {
  GetTodosDocument,
  GetTodosQuery,
  GetTodosQueryVariables,
  SaveTodoDocument,
  SaveTodoMutation,
  SaveTodoMutationVariables,
} from '~/generated/graphql'
import { testRenderer } from '~/utils/test-util'

import Todos from './index.page'

describe('Todos Page', () => {
  const renderPage = testRenderer(<Todos />)

  it('displays fetched todo list', async () => {
    renderPage()
    const loading = await screen.findByRole('loading')
    expect(loading).toBeInTheDocument()
    await waitForElementToBeRemoved(loading)
    const target = await screen.findAllByRole('todo')
    expect(target.length).toBe(2)
  })

  it('displays "No Items" when there is no todo', async () => {
    renderPage(
      graphql.query<GetTodosQuery, GetTodosQueryVariables>(
        'GetTodos',
        () => {
          return HttpResponse.json({
            data: {
              todosByCurrentUser: [],
            }
          })
        }
      )
    )
    const loading = await screen.findByRole('loading')
    expect(loading).toBeInTheDocument()
    await waitForElementToBeRemoved(loading)
    const target = await screen.findByText('No Items', { exact: false })
    expect(target).toBeInTheDocument()
  })

  it('opens CreateTodoModal when click "New Todo" button', async () => {
    renderPage()
    const button = await screen.findByText('New Todo')
    fireEvent.click(button)
    const modal = await screen.findByRole('dialog')
    await waitFor(() => {
      expect(modal).toBeInTheDocument()
    })
  })

  describe('CreateTodoModal', () => {
    it('should create todo', async () => {
      // mock mutation
      const mutationInterceptor = jest.fn()
      renderPage(
        graphql.mutation<SaveTodoMutation, SaveTodoMutationVariables>(
          'SaveTodo',
          ({ variables }) => {
            mutationInterceptor(variables)
            return HttpResponse.json({
              data: {
                saveTodo: {
                  __typename: 'Todo',
                  id: '1',
                },
              }
            })
          }
        )
      )
      // act
      const button = await screen.findByText('New Todo')
      fireEvent.click(button)
      const modal = await screen.findByRole('dialog')
      expect(modal).toBeInTheDocument()
      const input = await within(modal).findByLabelText('title')
      fireEvent.change(input, { target: { value: 'test' } })
      const submitButton = await within(modal).findByText('Submit')
      fireEvent.click(submitButton)

      // MEMO: workaround
      await new Promise((res) => setTimeout(res, 100))

      // // assert
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
