import { useRef, useEffect } from 'react'
import { useStore } from 'store'
import { drawDots, drawRectangles } from './lib'
import type { FC } from 'react'
import type { Point } from 'types'

interface CanvasProps {
  backgroundImageUrl: string
  points: Point[]
}

export const Canvas: FC<CanvasProps> = ({ backgroundImageUrl, points }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { detectionStateTimestamp, plateCenter, plateRegion, vehicleRegion } = useStore((state) => state.checkboxState)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const image = new Image()
        image.src = backgroundImageUrl
        image.addEventListener('load', function () {
          const aspectRatio = image.width / image.height
          const maxHeight = window.innerHeight * 0.95
          const scaledHeight = Math.min(maxHeight, image.height)

          canvas.width = scaledHeight * aspectRatio
          canvas.height = scaledHeight
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

          if (plateCenter) {
            drawDots({
              ctx,
              canvas,
              points,
              color: 'red',
              lineWidth: 1,
              radius: 2,
              nestedKeys: ['plate', 'center'],
              timestamps: detectionStateTimestamp,
            })
          }

          if (plateRegion) {
            drawRectangles({
              ctx,
              canvas,
              points,
              color: 'red',
              lineWidth: 1,
              nestedKeys: ['plate', 'region'],
              timestamps: detectionStateTimestamp,
            })
          }

          if (vehicleRegion) {
            drawRectangles({
              ctx,
              canvas,
              points,
              color: 'blue',
              lineWidth: 1,
              nestedKeys: ['vehicle_region'],
              timestamps: detectionStateTimestamp,
            })
          }
        })
      }
    }
  }, [backgroundImageUrl, detectionStateTimestamp, plateCenter, plateRegion, points, vehicleRegion])

  return <canvas ref={canvasRef} />
}
