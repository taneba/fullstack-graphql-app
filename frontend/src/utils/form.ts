export function removeEmptyFields<T extends Record<string, unknown>>(
  obj: T
): T {
  return Object.keys(obj).reduce((r, e: keyof T) => {
    if (obj[e] !== '') {
      r[e] = obj[e]
    }
    return r
  }, {} as T)
}
