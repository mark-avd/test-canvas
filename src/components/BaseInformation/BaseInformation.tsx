import type { FC } from 'react'
import './BaseInformation.scss'

interface BaseInformationProps {
  historyPlate: string
  historyClass: string
  historyUuid: string
  versionTag: string
  versionLprSdk: string
  timestamp: string
}

export const BaseInformation: FC<BaseInformationProps> = ({
  historyPlate,
  historyClass,
  historyUuid,
  versionTag,
  versionLprSdk,
  timestamp,
}) => (
  <div className={'base-information'}>
    <p>
      Plate: <span>{historyPlate}</span>
    </p>
    <p>
      Class: <span>{historyClass}</span>
    </p>
    <p>
      UUID: <span>{historyUuid}</span>
    </p>
    <p>
      Version (app): <span>{versionTag}</span>
    </p>
    <p>
      Version (appsdk): <span>{versionLprSdk}</span>
    </p>
    <p>
      Timestamp: <span>{timestamp}</span>
    </p>
  </div>
)
