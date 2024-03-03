import dayjs from 'dayjs'
import { getCanvasCoordinates } from './getCanvasCoordinates.ts'
import { getPointNestedValue } from './getNestedObjValue.ts'
import type { Point } from 'types'

interface DrawDotsParams {
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  points: Point[]
  color: CanvasFillStrokeStyles['fillStyle']
  lineWidth: number
  nestedKeys: string[]
  radius: number
  timestamps: boolean
}

export const drawDots = ({ ctx, canvas, points, color, radius, nestedKeys, timestamps, lineWidth }: DrawDotsParams) => {
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  for (const point of points) {
    const value = getPointNestedValue(point, nestedKeys)
    if (value && 'x' in value && 'y' in value) {
      const { x, y } = getCanvasCoordinates(canvas.width, canvas.height, value.x, value.y)

      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.stroke()

      if (timestamps) {
        ctx.fillStyle = 'white'
        ctx.font = '12px Roboto'
        const date = dayjs(point.detection_state.local_timestamp).format('DD.MM.YY HH:mm:ss')
        ctx.fillText(date, x + 10, y + 5)
      }
    } else {
      throw new Error(`Not a dot value: ${JSON.stringify(value)}`)
    }
  }
}
