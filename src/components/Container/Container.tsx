import { Canvas } from 'components/Canvas/Canvas.tsx'
import { BaseInformation } from 'components/BaseInformation/BaseInformation.tsx'
import { GeometryControls } from 'components/GeometryControls/GeometryControls.tsx'
import image from 'assets/debug.jpg'
import mockData from 'mocks/trace.json'
import type { FC } from 'react'
import type { Point } from 'types'
import './Container.scss'

export const Container: FC = () => {
  const { plate, class: historyClass, uuid } = mockData.history
  const { tag, lprsdk } = mockData.version
  const { points } = mockData.history.tracks[0]

  return (
    <div className={'container'}>
      <div className={'container__canvas'}>
        <Canvas backgroundImageUrl={image} points={points as unknown as Point[]} />
        <div className={'container__description'}>
          <BaseInformation
            historyPlate={plate}
            historyClass={historyClass}
            historyUuid={uuid}
            versionTag={tag}
            versionLprSdk={lprsdk}
            timestamp={mockData.timestamp}
          />
          <GeometryControls />
        </div>
      </div>
    </div>
  )
}
