let nextFactoryIds: Record<string, number> = {}

export function resetFactoryIds() {
  nextFactoryIds = {}
}

export function nextFactoryId(objectName: string): string {
  const nextId = nextFactoryIds[objectName] || 1
  nextFactoryIds[objectName] = nextId + 1
  return String(nextId)
}
