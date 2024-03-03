import type { PointCoordinates, RectCoordinates } from 'types'

export const getPointNestedValue = (obj: any, keys: string[]): RectCoordinates | PointCoordinates | undefined => {
  const [currentKey, ...remainingKeys] = keys

  if (Object.prototype.hasOwnProperty.call(obj, currentKey)) {
    const currentValue = obj[currentKey]

    if (remainingKeys.length === 0) {
      return currentValue as RectCoordinates | PointCoordinates | undefined
    }

    return typeof currentValue === 'object' && currentValue !== null
      ? getPointNestedValue(currentValue, remainingKeys)
      : undefined
  } else {
    throw new Error(`Invalid key: ${currentKey.toString()}, available keys: ${Object.keys(obj as object).join(', ')}`)
  }
}
