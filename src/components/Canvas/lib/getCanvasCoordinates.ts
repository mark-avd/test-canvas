export const getCanvasCoordinates = (
  canvasWidth: number,
  canvasHeight: number,
  relativeX: number,
  relativeY: number,
) => {
  const x = relativeX * canvasWidth
  const y = relativeY * canvasHeight

  return { x, y }
}
