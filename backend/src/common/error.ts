export const AppError = {
  database: 'DATABASE',
  validation: 'VALIDATION',
  resourceNotFound: 'RESOURCE_NOT_FOUND',
} as const
export type AppErrorType = typeof AppError[keyof typeof AppError]
