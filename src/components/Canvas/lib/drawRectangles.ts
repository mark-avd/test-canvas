import dayjs from 'dayjs'
import { getCanvasCoordinates } from './getCanvasCoordinates.ts'
import { getPointNestedValue } from './getNestedObjValue.ts'
import type { Point } from 'types'

interface DrawRectanglesParams {
  ctx: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  points: Point[]
  color: CanvasFillStrokeStyles['strokeStyle']
  lineWidth: number
  nestedKeys: string[]
  timestamps: boolean
}

export const drawRectangles = ({
  ctx,
  canvas,
  points,
  color,
  lineWidth,
  nestedKeys,
  timestamps,
}: DrawRectanglesParams) => {
  for (const point of points) {
    const value = getPointNestedValue(point, nestedKeys)
    if (value && 'rt' in value && 'lt' in value && 'lb' in value && 'rb' in value) {
      const { lt, rt, lb, rb } = value

      const ltC = getCanvasCoordinates(canvas.width, canvas.height, lt.x, lt.y)
      const rtC = getCanvasCoordinates(canvas.width, canvas.height, rt.x, rt.y)
      const rbC = getCanvasCoordinates(canvas.width, canvas.height, rb.x, rb.y)
      const lbC = getCanvasCoordinates(canvas.width, canvas.height, lb.x, lb.y)

      ctx.beginPath()
      ctx.moveTo(ltC.x, ltC.y)
      ctx.lineTo(rtC.x, rtC.y)
      ctx.lineTo(rbC.x, rbC.y)
      ctx.lineTo(lbC.x, lbC.y)
      ctx.closePath()
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.stroke()

      if (timestamps) {
        ctx.fillStyle = 'white'
        ctx.font = '12px Roboto'
        const date = dayjs(point.detection_state.local_timestamp).format('DD.MM.YY HH:mm:ss')
        ctx.fillText(date, rtC.x + 10, rbC.y - 10)
      }
    } else {
      throw new Error(`Not a rectangle value: ${JSON.stringify(value)}`)
    }
  }
}
