export const AppError = {
  database: 'DATABASE',
  validation: 'VALIDATION',
  resourceNotFound: 'RESOURCE_NOT_FOUND',
  auth0: 'AUTH0',
} as const
export type AppErrorType = typeof AppError[keyof typeof AppError]

// class DbError extends Error {
//   constructor(e?: string) {
//     super(e)
//     this.name = new.target.name
//   }
// }
