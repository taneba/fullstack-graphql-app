import { ZodObject } from 'zod'

import { GqlError } from '~/common/error'

export const validateParams = (params: unknown, zodSchema: ZodObject<any>) => {
  const result = zodSchema.safeParse(params)

  if (result.success) {
    return
  } else {
    throw new GqlError('validation error', {
      code: 'VALIDATION_ERROR',
    })
  }
}
