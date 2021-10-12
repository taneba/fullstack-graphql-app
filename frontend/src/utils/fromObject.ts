export function fromObject<T extends Record<string, unknown>>(
  obj: T
): (cb: (obj: T) => any) => T {
  return (cb) => cb(obj)
}
