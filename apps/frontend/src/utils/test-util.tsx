import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GraphQLHandler, GraphQLRequest } from 'msw'
import React, { StrictMode } from 'react'

import { UrqlClientProvider } from '~/components/util/UrqlClientProvider'
import { server } from '~/mocks/server'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const testRenderer =
  (children: React.ReactNode) =>
  (responseOverride?: GraphQLHandler<GraphQLRequest<never>>) => {
    if (responseOverride) {
      server.use(responseOverride)
    }
    render(
      <StrictMode>
        <UrqlClientProvider>{children}</UrqlClientProvider>
      </StrictMode>
    )

    return {
      user: userEvent.setup(),
    }
  }
