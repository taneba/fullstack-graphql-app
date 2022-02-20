export function fromObject<T extends Record<string, unknown>>(
  obj: T
): <R>(fn: (obj: T) => R) => R {
  return (fn) => fn(obj)
}
